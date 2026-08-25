---
title: Primitive Operation Painter：把图像生成变成绘图操作序列
description: 文章摘要，用于 SEO 和列表展示
date: 2026-08-25
category: tech
template: tech
tags:
  - 标签1
  - 标签2
  - 标签3
featured: true
toc: true
draft: false
---
## 项目概览

Primitive Operation Painter 探索了一种不同于扩散模型的图像生成方式：**模型不直接预测像素或 latent，而是逐步生成可解释、可编辑的绘图操作。**

一张图片被表示成：

```text
Background
→ Primitive 1
→ Primitive 2
→ Primitive 3
→ ...
```

当前主要使用两类 primitive：

- rotated rectangle：旋转矩形
    
- ellipse：椭圆
    

每个 primitive 都有明确的位置、尺寸、旋转角度和颜色，因此最终图片不仅是渲染结果，同时也是一份完整的“绘制历史”。

项目完整流程可以概括为：

```text
原始图片
   ↓
GPU 图形拟合
   ↓
Primitive Sequence
   ↓
离散化 / Tokenization
   ↓
GPT 自回归建模
   ↓
Primitive Sequence
   ↓
Renderer
   ↓
最终图片
```

项目最值得学习的不是 Transformer 本身，而是三个设计：

**表示设计、搜索优化、结构化自回归生成。**

---

## 1. 核心思想：先设计表示，再选择模型

通常我们会把图像生成定义成：

```text
模型 → 像素
```

Primitive Operation Painter 先引入一个中间表示：

```text
图像
 ↓
绘图操作
 ↓
Token
 ↓
Transformer
```

其关键变化是：

> 将连续、高维、难解释的像素空间，转换为结构化的操作空间。

一个普通 primitive 可以表示为：

```text
(x, y, angle, width, height, shape, r, g, b)
```

即 9 个字段：

|字段|含义|
|---|---|
|x|中心横坐标|
|y|中心纵坐标|
|angle|旋转角|
|width|宽度|
|height|高度|
|shape|图形类型|
|r|红色通道|
|g|绿色通道|
|b|蓝色通道|

因此一张图片可以理解成一段“小型绘图程序”。

例如：

```text
background(...)
ellipse(...)
rectangle(...)
ellipse(...)
...
```

这带来三个直接优势：

**可解释**：能够知道模型每一步画了什么。

**可编辑**：用户可以直接修改某个 primitive。

**可生成**：操作天然形成序列，可以使用语言模型式的自回归预测。

### 方法论

这是本项目最重要的启发：

> 面对复杂生成任务时，不一定首先问“应该使用什么神经网络”，而应该先问“目标能否转换成更适合学习的中间表示”。

---

## 2. 离散化：把几何参数变成 Token

GPT 处理的是离散 token，而 primitive 中的坐标、角度、尺寸本来是连续数值。

项目因此进行 **Quantization（量化/离散化）**。

256×256 版本中：

```text
x      → 512 bins
y      → 512 bins
angle  → 270 bins
width  → 512 bins
height → 512 bins
shape  → 256 bins
R/G/B  → 各 128 bins
special→ 3 bins
```

其中：

```text
XY_BINS_PER_PIXEL = 2
ANGLE_BINS_PER_DEGREE = 3
SIZE_BINS_PER_PIXEL = 4
```

最终词表大小：

```text
vocab_size = 2961
```

于是：

```text
连续几何参数
      ↓
Quantization
      ↓
整数 bin
      ↓
Token ID
```

一个 primitive：

```text
x y angle width height shape r g b
```

变成：

```text
token token token token token token token token token
```

图片生成由此被转换成标准的序列预测问题。

### 需要记住的概念

**Quantization**

将连续空间划分为有限区间。

例如：

```text
x = 100.37
↓
某个离散 bin
↓
token 201
```

离散程度存在基本权衡：

```text
bins 少
→ token 空间小
→ 学习容易
→ 精度降低

bins 多
→ 表达精细
→ token 空间大
→ 学习难度增加
```

所以 tokenization 本身就是模型设计的一部分，而不是简单的数据预处理。

---

## 3. 自回归建模：把“画下一笔”变成 Next Token Prediction

得到 token 序列后，模型解决的问题就非常接近语言模型：

```text
给定 token1 ... tokenN
预测 tokenN+1
```

语言模型：

```text
今天天气很 → 好
```

Primitive Painter：

```text
x → y → angle → width → height → shape → r → g → b
```

再继续：

```text
下一笔 x → 下一笔 y → ...
```

因此模型其实是在学习：

> 根据此前已经完成的绘图历史，决定下一步应该执行什么绘图操作。

仓库中的 `GeometrizeGPT` 是标准 decoder-only Transformer，默认参数包括：

```text
d_model = 832
n_layer = 12
n_head = 16
```

结构可以简化为：

```text
Token Embedding
+
Position Embedding
        ↓
Transformer Block × 12
        ↓
LayerNorm
        ↓
LM Head
        ↓
Next Token
```

模型使用 PyTorch 的 scaled dot-product attention，并对 Query、Key 加入 QK-Norm；推理时支持 KV Cache，从而避免每生成一个新 token 都重新计算整个历史。

### 关键概念

**Autoregressive Modeling**

将联合概率拆解成：

```text
P(x1, x2, ..., xn)

=

P(x1)
P(x2 | x1)
P(x3 | x1,x2)
...
```

在这个项目中就是：

```text
P(下一笔 | 已经画出的所有笔)
```

---

## 4. Field-aware Sampling：利用输出结构约束模型

这里还有一个很实用的设计。

因为 primitive 的字段顺序固定：

```text
x
y
angle
width
height
shape
r
g
b
```

所以模型在预测 `x` 时，没有必要允许它从整个 2961 token 的词表中任意选择。

可以直接限制：

```text
预测 x
→ 只允许 x token

预测 angle
→ 只允许 angle token

预测 red
→ 只允许 red token
```

项目的推理程序使用这种 **field-aware sampling**，并且不同字段可以分别使用 temperature 和 top-k 调度。

这相当于把：

```text
模型负责学习
+
程序负责结构合法性
```

结合起来。

### 方法论

对于结构化生成问题：

> 不要要求神经网络自己重新学习已经明确知道的语法规则。

如果输出格式已知，可以直接通过：

- vocabulary masking
    
- constrained decoding
    
- schema validation
    
- field-aware sampling
    

限制搜索空间。

这样通常比完全自由生成更加稳定。

---

## 5. 最关键的数据问题：如何从图片得到 Primitive Sequence

现实训练集通常只有：

```text
RGB Image
```

但 GPT 需要：

```text
Primitive Sequence
```

因此项目必须解决：

```text
Image → Primitive Operations
```

仓库中的 `fast_shape_render` 就负责完成这个过程。

它使用：

```text
Rust
+
wgpu
+
WGSL Compute Shader
```

在 GPU 上不断寻找能够降低当前画布与目标图片误差的矩形或椭圆，最终得到操作序列并写入 CSV。输入图片会被处理为 256×256。

核心问题可以表示为：

给定当前 Canvas：

```text
C
```

目标图片：

```text
T
```

寻找一个 primitive：

```text
p
```

使添加这个 primitive 后：

```text
Error(render(C, p), T)
```

尽可能小。

于是图片分解就变成一个连续优化问题。

---

## 6. 搜索算法：随机候选 + Top-K + Hill Climbing

暴力遍历 primitive 参数几乎不可行。

因为需要同时搜索：

```text
x
y
angle
width
height
shape
color
```

参数空间巨大。

项目采取了一种简单但有效的启发式搜索策略。

### 第一阶段：随机海选

生成大量随机 primitive：

```text
candidate 1
candidate 2
candidate 3
...
```

分别计算误差。

然后只保留误差最小的一批 survivor：

```text
Random Search
     ↓
Evaluate
     ↓
Top-K Survivors
```

WGSL 源码中直接把这一阶段标记为“海选”。

### 第二阶段：变异 + 爬山

对 survivor 不断进行小范围 mutation：

```text
当前 primitive
      ↓
改变位置 / 尺寸 / 角度等
      ↓
新 primitive
      ↓
误差更低？
   ↙       ↘
 Yes       No
 接受      保留原值
```

反复进行：

```text
mutate
→ evaluate
→ accept improvement
→ mutate
→ ...
```

如果连续多次没有改善，则认为已经陷入局部最优并停止。

源码明确将这一阶段称为“爬山”。

整体算法可以总结为：

```text
Random Initialization
        ↓
Candidate Evaluation
        ↓
Top-K Selection
        ↓
Mutation
        ↓
Hill Climbing
        ↓
Best Primitive
        ↓
加入 Canvas
        ↓
重复下一笔
```

### 涉及的算法概念

**Random Search**

随机探索参数空间，简单、鲁棒，适合没有梯度或搜索空间复杂的优化问题。

**Top-K Selection**

保留多个较好的候选，而不是只保留一个，可以降低过早陷入差解的风险。

**Hill Climbing**

局部搜索算法，只接受能够改善目标函数的变异：

```text
if new_error < old_error:
    accept
```

优点是实现简单、收敛快。

缺点是容易停在局部最优。

这套方法本质上可以视为：

> 全局随机探索 + 局部优化。

---

## 7. WGSL：为什么这一部分适合 GPU

一次 candidate evaluation 需要检查大量像素：

```text
primitive
   ↓
覆盖哪些 pixels？
   ↓
每个 pixel 与目标图差多少？
   ↓
累加 Error
```

不同像素之间大部分计算互相独立，非常适合 GPU 并行。

项目使用 WGSL Compute Shader：

```wgsl
@compute
@workgroup_size(256)
```

即一个 workgroup 中安排 256 个 invocation 协作计算。

这里 WGSL 的角色不是网页视觉特效，而是：

> **GPU 通用并行计算。**

整体关系：

```text
Rust
 ↓
wgpu
 ↓
WGSL Compute Shader
 ↓
GPU
```

因此这个项目也是理解 Compute Shader 的一个很好案例。

---

## 8. SDF：高效判断 Primitive 对像素的覆盖程度

在判断矩形或椭圆覆盖哪些像素时，项目使用了距离场思想。

### Signed Distance Field

SDF 可以理解成：

```text
d < 0 → 图形内部
d = 0 → 图形边界
d > 0 → 图形外部
```

矩形可以使用解析距离公式。

对于椭圆，项目使用基于梯度的一阶近似距离计算。

然后：

```wgsl
1.0 - smoothstep(-0.5, 0.5, d)
```

把距离转换成 coverage：

```text
内部       → 1
边缘       → 0~1
外部       → 0
```

这样图形边缘就不会简单变成：

```text
0000011111
```

而是类似：

```text
0 0 0.1 0.4 0.8 1 1
```

从而实现抗锯齿。

### 需要记住

SDF 不只是“画特殊效果”的技术。

它本质是一种：

> 用一个距离函数描述几何形状的方法。

因此经常用于：

- 字体渲染
    
- 2D/3D 图形
    
- Ray Marching
    
- 碰撞检测
    
- Procedural Geometry
    
- GPU 图形优化
    

---

## 9. Human-AI Co-creation：操作空间带来的额外能力

如果模型直接输出图片：

```text
AI → Pixels
```

用户修改之后：

```text
Pixels → Photoshop
```

通常修改不会重新进入模型的内部生成历史。

但 Primitive Painter 的状态本身就是：

```text
operation 1
operation 2
operation 3
...
```

所以用户可以：

```text
AI Drawing History
       ↓
修改 operation 4
       ↓
Modified History
       ↓
重新输入 GPT
       ↓
AI 从新状态继续生成
```

人的修改直接成为新的模型上下文。

这也是 operation-based representation 相比 pixel representation 的重要优势：

```text
可解释
+
可编辑
+
可继续生成
```

---

## 10. 项目的主要限制

这种表示方式同时决定了模型能力的上限。

当前输出主要依赖有限数量的：

```text
rectangle
ellipse
```

因此擅长：

- 大体结构
    
- 色块
    
- 轮廓
    
- 简单形状组合
    

但不适合：

- 高频纹理
    
- 毛发
    
- 超细节
    
- 高度写实的材质
    

项目本身也明确指出，它并不是 prompt-to-image 系统，也不能替代高保真纹理或细节渲染器。

这说明一个重要规律：

> Representation 决定模型能够表达什么，同时也决定模型无法表达什么。

---

## 11. 从这个项目提炼出的通用方法

### ① Representation First

复杂问题优先设计合适的中间表示：

```text
Raw Problem
    ↓
Structured Representation
    ↓
Learning
```

一个好的表示可以显著降低模型学习难度。

---

### ② 把生成问题转换成序列问题

只要任务可以描述为一系列操作：

```text
operation 1
operation 2
operation 3
...
```

就可能使用 Transformer 自回归建模。

例如：

```text
3D：
add_cube
→ move
→ rotate
→ scale

CAD：
draw_line
→ extrude
→ fillet

动画：
add_keyframe
→ rotate_bone
→ move_camera

UI：
create_box
→ set_position
→ set_color
```

核心思想是：

```text
State
+
Action History
→
Next Action
```

---

### ③ 能用规则保证的事情，不必全部让模型学习

项目知道：

```text
第一个字段一定是 x
第二个一定是 y
第三个一定是 angle
```

于是直接限制合法 token。

这是一种很重要的工程思想：

```text
Neural Model
负责模糊决策

Deterministic System
负责确定规则
```

二者结合通常比纯神经网络方案更稳定。

---

### ④ 优化问题不一定需要梯度

Primitive fitting 无法方便地直接进行端到端梯度优化，于是项目使用：

```text
Random Search
+
Top-K
+
Mutation
+
Hill Climbing
```

只需要能够计算：

```text
score(candidate)
```

就可以进行优化。

这是处理：

- 黑盒函数
    
- 离散参数
    
- 非可微过程
    
- 复杂搜索空间
    

时非常通用的方法。

---

### ⑤ 找到真正值得 GPU 并行化的部分

项目没有为了“用 GPU”而使用 GPU。

它首先识别出计算瓶颈：

```text
大量 candidate
×
大量 pixel
×
大量 iteration
```

这些计算天然独立，于是交给：

```text
Compute Shader
```

CPU 负责：

```text
流程控制
文件读取
GPU 调度
结果输出
```

GPU 负责：

```text
大规模数值计算
```

这才是 GPU Compute 比较典型的使用方式。

---

## 最终理解

Primitive Operation Painter 可以浓缩成三层：

```text
Representation
    ↓
Optimization
    ↓
Generation
```

第一层解决：

> **图片应该如何表示？**

答案：

```text
Primitive Operations
```

第二层解决：

> **如何从现有图片获得这种表示？**

答案：

```text
GPU Search
+
Random Candidates
+
Top-K
+
Hill Climbing
+
SDF
```

第三层解决：

> **如何学习并继续生成这些操作？**

答案：

```text
Quantization
+
Tokenization
+
Autoregressive Transformer
+
Constrained Sampling
```

因此整个项目最值得记住的不是“用 GPT 画矩形和椭圆”，而是这条完整思路：

```text
寻找可解释的中间表示
        ↓
把现实数据转换成该表示
        ↓
把表示离散成 Token
        ↓
把复杂生成问题转换为序列预测
        ↓
利用规则约束生成空间
        ↓
让人的修改也成为模型上下文
```

这是一种很有迁移价值的 AI 系统设计范式：

> **与其直接训练模型解决最原始的问题，不如先重新定义一个更适合机器学习的问题。**

---

## 12. 从 Primitive Operation Painter 延伸出的产品前景

Primitive Operation Painter 本身更像一个研究原型，但它背后的 **“可编辑操作序列 + 生成模型”** 思路具有明显的产品化潜力。

真正值得关注的并不是“让 GPT 用矩形和椭圆画图”，而是：

> **让生成模型输出可继续编辑、可追踪、可执行的操作，而不是一次性结果。**

这会把 AI 从“内容生成器”进一步变成“创作工具中的协作者”。

---

### 12.1 AI 原生矢量绘图工具

最直接的方向是扩展 primitive 类型。

当前只有：

```text
rectangle
ellipse
```

如果增加：

```text
line
bezier
polygon
gradient
stroke
text
mask
path
```

就可以逐渐形成类似 SVG 的绘图语言：

```text
create_path(...)
set_fill(...)
move(...)
rotate(...)
add_gradient(...)
```

模型不再输出 PNG，而是输出真正可以继续编辑的图形对象。

最终产品可能类似：

```text
Figma / Illustrator
        +
Generative AI
        +
Editable Operation History
```

用户可以：

```text
AI 生成
↓
手动修改一个对象
↓
AI 理解修改
↓
继续完成设计
```

而不是传统的：

```text
AI 生成图片
↓
发现不满意
↓
重新 Prompt
↓
整张重生成
```

这可能比单纯的 text-to-image 更适合 Logo、图标、插画、信息图和 UI 素材等需要反复修改的设计工作。

---

### 12.2 AI + CAD / 3D 建模

这个思想在 3D 和 CAD 中可能比二维绘画更有价值。

例如将模型输出空间定义成：

```text
create_cube
create_cylinder
translate
rotate
scale
extrude
bevel
boolean_union
boolean_subtract
set_material
```

那么一个模型实际上是在学习：

```text
3D Modeling Operation Sequence
```

而不是直接预测 mesh。

整个过程可以变成：

```text
自然语言 / 草图
      ↓
生成建模操作
      ↓
用户调整参数
      ↓
AI 基于修改继续建模
```

相比直接生成一个不可控的 3D Mesh，这种方式最大的优势是：

```text
可参数化
可修改
可撤销
可解释
可继续生成
```

因此很适合：

- CAD 辅助设计
    
- 游戏资产建模
    
- 建筑体块设计
    
- 产品原型设计
    
- 参数化建模
    
- Blender / Houdini 类工作流
    

可以把它理解成：

> **AI 学习使用建模软件，而不是 AI 直接吐出最终模型。**

---

### 12.3 AI 操作设计软件

继续抽象以后，Primitive Operation Painter 的思想甚至不必局限于“绘画”。

如果把：

```text
primitive
```

理解成：

```text
action
```

那么模型学习的就是：

```text
Action History
→
Next Action
```

例如 Figma：

```text
create_frame
→ create_text
→ set_font
→ resize
→ align
→ set_color
```

Blender：

```text
add_cube
→ scale
→ extrude
→ bevel
→ assign_material
```

剪辑软件：

```text
import_clip
→ cut
→ trim
→ add_transition
→ add_subtitle
→ color_grade
```

Photoshop：

```text
create_layer
→ select_region
→ mask
→ adjust_color
→ blur
```

这实际上形成了一个很值得关注的产品形态：

> **让 AI 的输出成为软件操作，而不是最终内容。**

用户和 AI 因此可以共享同一个工作状态。

---

### 12.4 可撤销、可审计的生成式 AI

传统生成模型通常是：

```text
Input
↓
Black Box
↓
Output
```

用户看到结果，却很难回答：

> AI 到底做了什么？

操作序列模型则天然拥有：

```text
Step 1
Step 2
Step 3
...
```

因此可以实现：

```text
Replay
Undo
Redo
Diff
Version Control
```

甚至：

```text
AI 做了哪些修改？
为什么发生变化？
哪一步导致结果改变？
```

都可以直接追踪。

这对于专业软件尤其重要。

例如：

- 工业设计
    
- 建筑设计
    
- CAD
    
- 数据分析
    
- 自动化工作流
    
- 企业内容生产
    

它提供了一条可能的产品路线：

```text
Generative AI
        ↓
Executable Actions
        ↓
Observable State Changes
        ↓
Auditable Workflow
```

相比完全黑盒的生成结果，更容易进入专业生产环境。

---

### 12.5 Human-in-the-loop 创作工具

Primitive Operation Painter 还有一个容易被忽视的价值：

**人的修改本身可以重新成为模型输入。**

例如：

```text
AI：
operation 1
operation 2
operation 3
operation 4

用户：
修改 operation 3

得到：
operation 1
operation 2
operation 3'
operation 4
```

新的状态重新进入模型：

```text
Modified History
      ↓
AI
      ↓
operation 5'
operation 6'
...
```

于是交互方式从：

```text
Prompt
↓
Generate
↓
Prompt
↓
Generate
```

升级成：

```text
AI 操作
↓
人修改
↓
AI 理解修改
↓
AI 继续操作
↓
人再次修改
```

这才是真正意义上的：

> **Human-AI Co-creation Loop**

这种交互模式可能比单纯的聊天框更适合专业创作软件。

---

### 12.6 个性化 AI 创作助手

操作序列还有一个潜在价值：

> 它能够记录“用户是怎么工作的”。

例如两个设计师得到同样的初始图：

设计师 A：

```text
先构图
→ 再确定色块
→ 最后处理细节
```

设计师 B：

```text
先主体
→ 再背景
→ 最后调整比例
```

长期记录这些 operation sequence 后，就有可能训练：

```text
User-specific Action Model
```

最终 AI 学到的并不只是：

> 怎样画一张图。

而是：

> **这个用户通常怎样画这张图。**

因此可以形成真正意义上的个人创作助手：

```text
你的设计习惯
+
你的历史操作
+
当前项目状态
        ↓
Personalized Model
        ↓
预测你的下一步操作
```

这比只学习用户 Prompt 风格具有更强的个性化潜力。

---

### 12.7 AI 创作过程数据可能成为新的训练数据

传统生成模型常用：

```text
Image
Text
Video
Audio
```

作为训练数据。

但专业软件真正珍贵的数据可能是：

```text
Initial State
+
Action 1
+
Action 2
+
Action 3
+
...
+
Final Result
```

例如：

```text
草图
→ 拉线
→ 调整比例
→ 修改轮廓
→ 上色
→ 修正
→ 最终设计
```

这样的数据不仅告诉模型：

> 最终结果是什么。

还告诉模型：

> **最终结果是怎样一步一步得到的。**

因此未来可能出现新的训练数据类型：

> **Process Data / Action Trajectory Data**

这和机器人领域中的 trajectory 数据非常相似。

可以抽象成：

```text
State_t
+
Action_t
→
State_t+1
```

这意味着 Primitive Operation Painter 所探索的其实与更广泛的 Agent 学习存在联系。

---

### 12.8 从生成模型走向 Creative Agent

继续向上抽象：

Primitive Operation Painter：

```text
Canvas
+
Drawing History
        ↓
Model
        ↓
Next Drawing Action
```

Creative Agent：

```text
Current State
+
Action History
+
Goal
        ↓
Model
        ↓
Next Action
```

两者结构实际上非常接近。

区别只是 action space 不同。

绘画：

```text
ellipse
rectangle
```

设计软件：

```text
move
resize
align
```

3D：

```text
extrude
rotate
bevel
```

软件工程：

```text
read_file
edit_file
run_test
commit
```

因此，这个项目可以被理解成一个很小的：

> **视觉领域 Action Model。**

它展示了一条从：

```text
Generative Model
```

走向：

```text
Agentic Creative System
```

的路径。

---

### 12.9 哪些方向最有现实产品价值

如果按照近期产品化可行性来看，可以大致分成三层。

#### 第一层：较容易落地

```text
AI SVG / Icon Generator
AI Logo Editor
AI Diagram Tool
AI Illustration Assistant
```

原因是二维矢量操作空间相对有限，也容易设计明确的 schema。

---

#### 第二层：价值更高，但工程难度更大

```text
Figma Copilot
Blender Copilot
CAD Copilot
Video Editing Copilot
```

这里需要处理更复杂的状态、对象关系和操作历史，但专业用户愿意为效率提升付费。

---

#### 第三层：长期最值得关注

```text
General Creative Agent
```

模型可以理解软件状态，规划操作，调用工具，观察结果，再继续修改：

```text
Goal
 ↓
Plan
 ↓
Action
 ↓
Observe
 ↓
Evaluate
 ↓
Next Action
```

届时 AI 不再只是：

> “帮我生成一个东西。”

而是：

> “进入我的工作环境，与我一起把这个东西做出来。”

---

### 12.10 最值得关注的产品启发

从 Primitive Operation Painter 往产品层面看，最重要的变化可以总结为：

```text
过去：

Prompt
→ AI
→ Final Artifact
```

逐渐转向：

```text
Goal
   ↓
AI Action
   ↓
Editable State
   ↓
Human Action
   ↓
AI Action
   ↓
Editable State
   ↓
...
```

这意味着未来 AI 创作工具的竞争力可能不只来自：

```text
谁生成的结果更漂亮
```

而会越来越来自：

```text
谁能够理解当前工作状态
谁能够生成可靠的下一步操作
谁能与用户共享同一个编辑空间
谁能够从用户修改中继续工作
```

Primitive Operation Painter 虽然规模很小，却很好地展示了这条路线的基础形态：

> **从生成结果，走向生成操作；从一次性生成，走向持续协作。**

这可能也是该项目最值得继续延伸的方向。