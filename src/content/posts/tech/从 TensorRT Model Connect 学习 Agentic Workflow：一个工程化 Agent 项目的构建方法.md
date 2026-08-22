---
title: 从 TensorRT Model Connect 学习 Agentic Workflow：一个工程化 Agent 项目的构建方法
description: 文章摘要，用于 SEO 和列表展示
date: 2026-08-20
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
## 一、先理解这个项目里的 Agentic Workflow 是什么

第一次接触 Agentic Workflow 时，很容易把它理解成：

> 多个 Agent 分工合作，一个负责规划，一个负责写代码，一个负责测试，一个负责 Review。

于是很自然地开始设计：

```text
Planner Agent
    ↓
Coder Agent
    ↓
Tester Agent
    ↓
Reviewer Agent
```

但研究 NVIDIA 的 **TensorRT Model Connect（TRTMC）** 后，我发现一个成熟的 Agentic Workflow 项目并不一定依赖复杂的 Multi-Agent 架构。

TensorRT Model Connect 本身是一个帮助 Hugging Face 模型接入 TensorRT 的项目。它在 README 中明确说明，项目由一种 **agentic workflow** 驱动，用于持续增加新模型支持，从而降低模型集成成本。([TensorRT Model Connect GitHub 仓库首页与 README](https://github.com/NVIDIA/TensorRT-Model-Connect))

更值得研究的是，它并没有把 Agentic Workflow 单独做成一个庞大的 orchestration 系统。

相反，Agent 能力直接被嵌入了整个软件仓库。

仓库中同时存在：

```text
AGENTS.md
plugins/trtmc-agent-skills/
tools/
scripts/
tests/
MODEL.toml
validation workloads
CI
GitHub PR workflow
```

这些东西共同构成 Agent 的运行环境。

因此，从这个项目得到的第一个重要认识是：

> **Agentic Workflow 的核心不是“让多个 AI 互相交流”，而是把一个工程环境设计成 Agent 可以持续观察、决策、执行、验证和纠错的系统。**

### 1.1 Agentic Workflow 应该被看作一个完整的工程系统

先看仓库根目录的一部分：

```text
TensorRT-Model-Connect/
├── AGENTS.md
├── .agents/
├── plugins/
│   └── trtmc-agent-skills/
├── python/
│   └── tensorrt_model_connect/
├── src/
├── tests/
├── tools/
├── scripts/
├── benchmarks/
└── website/
```

仓库 README 中甚至直接给出了一个 AI Coding Agent 的启动方式：

```text
Use the current TensorRT-Model-Connect checkout...

Read AGENTS.md...

follow source-build.md and quick-start.md exactly...

Do not modify source, tests, Dockerfiles,
git history, or remote state...

Report:
- selected GPU
- exact commands
- bundle path
- inference output
- deviations
```

也就是说，这个项目从一开始就把：

```text
AI Coding Agent
```

当作正式的仓库使用者之一，而不只是开发者偶尔使用的辅助工具。([TensorRT Model Connect GitHub 仓库首页与 README](https://github.com/NVIDIA/TensorRT-Model-Connect))

研究这个项目以后，我更愿意把 Agentic Workflow 抽象成下面这个结构：

```text
                 Goal
                  │
                  ▼
               Agent
                  │
       ┌──────────┼──────────┐
       │          │          │
       ▼          ▼          ▼
    Policy      Skills      State
       │          │          │
       └──────────┼──────────┘
                  ▼
                Tools
                  │
                  ▼
               Result
                  │
                  ▼
              Evaluator
               /     \
            PASS     FAIL
             │         │
             ▼         ▼
          Next      Diagnose
             │         │
             └────┬────┘
                  │
                  ▼
                Agent
```

因此一个完整 Agent 系统至少要思考六个部分：

```text
Policy
Knowledge / Skills
Tools
State
Evaluator
Human Boundary
```

LLM 只是其中负责推理和决策的核心组件。

## 二、Policy 与 Skill：先约束 Agent，再教它如何工作

### 2.1 AGENTS.md 更像项目的“宪法”

TRTMC 根目录存在：

```text
AGENTS.md
```

它只有几十行，却非常重要。

里面规定的不是：

```text
You are an excellent software engineer.
Think step by step.
Write high-quality code.
```

而是具体工程规则。

例如：

```text
GitHub main 是默认分支

不能直接 push main

新任务从 github/main 建立短生命周期 branch

push branch 后创建 PR

等待 GitHub CI

不能为了通过 CI 修改测试通过标准

如果认为测试本身存在问题，交给人类处理
```

仓库还规定：

```text
trtmc-agent-skills
```

默认安装，并从：

```text
plugins/trtmc-agent-skills/skills/
```

暴露仓库自己的 Skills。([TensorRT Model Connect 仓库中的 AGENTS.md](https://github.com/NVIDIA/TensorRT-Model-Connect/blob/main/AGENTS.md))

这里最值得学习的是：

Policy 与 Task Knowledge 被分离了。

`AGENTS.md` 负责回答：

```text
在这个项目里，Agent 应该怎么工作？
```

而不是回答：

```text
怎么给 TensorRT 增加一个模型？
```

后者交给 Skill。

因此可以理解为：

```text
AGENTS.md
=
Repository Constitution
```

也就是项目的“宪法”。

### 2.2 Skill 是 TRTMC Agentic Workflow 最值得研究的部分

仓库当前存在如下 Skills：

```text
plugins/trtmc-agent-skills/skills/

├── debug-trt-mismatch
├── doc-sync
├── fp16-trt-network
├── optimize-model-precision
├── pr-babysitter
├── profile-model
├── setup-trtmc-environment
├── submit-github-bug-issue
├── submit-github-pr
├── transform-model
└── write-git-messages
```

([TensorRT Model Connect 仓库中的 Agent Skills 目录](https://github.com/NVIDIA/TensorRT-Model-Connect/tree/main/plugins/trtmc-agent-skills/skills))

这些名字非常值得注意。

它不是：

```text
planner-agent
coder-agent
tester-agent
reviewer-agent
```

而是：

```text
transform-model
debug-trt-mismatch
profile-model
optimize-model-precision
submit-github-pr
```

这让我意识到：

> **优先按照“能力和工作流”拆 Skill，而不是按照“虚拟员工职位”拆 Agent。**

例如：

```text
transform-model
```

代表一个完整的“模型接入能力”。

而不是创建：

```text
Model Engineer Agent
```

以：

```text
plugins/trtmc-agent-skills/
skills/transform-model/SKILL.md
```

为例。

它的 description 明确说明，该 Skill 用于：

```text
将 Hugging Face 模型接入 TensorRT Model Connect

或者扩展已有模型 family

最终生成 .bundle
```

而且要求工作横跨：

```text
Python Builder
Native Runtime
E2E descriptors
Reference consistency
Runtime evidence
```

([TensorRT Model Connect 的 transform-model Skill 定义](https://github.com/NVIDIA/TensorRT-Model-Connect/blob/main/plugins/trtmc-agent-skills/skills/transform-model/SKILL.md))

这说明 SKILL.md 并不是一句简单 Prompt。

我更愿意把它定义为：

```text
SKILL
=
Domain Knowledge
+
SOP
+
Decision Rules
+
Tool Instructions
+
Validation Contract
+
Failure Handling
```

## 三、从 transform-model 看一个完整任务如何被 Agent 执行

### 3.1 先明确任务到底完成到什么程度

假设目标是：

```text
给 TRTMC 增加一个新的 Hugging Face 模型
```

如果完全交给一个通用 Coding Agent，它可能会：

```text
搜索代码
→ 猜哪个目录需要修改
→ 写代码
→ build
→ 能跑
→ 宣布完成
```

TRTMC 不允许这样随意工作。

`transform-model` 首先要求记录：

```text
exact Hugging Face model ID
immutable revision

task / modality

target hardware

precision / quantization

closest existing family

native runtime
or optimized runtime

需要哪一级 evidence
```

Evidence 还细分为：

```text
build
parity
E2E
performance
qualification
```

并且明确规定：

> 不要从一个通用 manifest 开始工作。

Agent 应该首先阅读：

```text
model config
reference implementation
nearest family descriptors
owned tests
```

([TensorRT Model Connect 的 transform-model Skill 定义](https://github.com/NVIDIA/TensorRT-Model-Connect/blob/main/plugins/trtmc-agent-skills/skills/transform-model/SKILL.md))

这一步实际上是在解决 Agent 项目中一个常见问题：

```text
任务目标定义得太模糊。
```

例如：

```text
“支持 Model X”
```

到底意味着：

```text
代码能编译？

bundle 能生成？

能输出文字？

输出与 Hugging Face 一致？

目标 GPU 通过测试？

性能达到要求？
```

这几个实际上完全不是同一级别的 Claim。

### 3.2 用 Ownership 限制 Agent 的修改范围

TRTMC 的一个设计非常值得借鉴：

**代码所有权非常明确。**

一个 native model 通常跨三个 descriptor：

```text
Python build / family selection
→ python/tensorrt_model_connect/families/<family>/MODEL.toml

Native C++ runtime
→ src/runtime/models/<family>/MODEL.toml

E2E models / manifests
→ tests/e2e/models/<family>/MODEL.toml
```

([TensorRT Model Connect 的 transform-model Skill 定义](https://github.com/NVIDIA/TensorRT-Model-Connect/blob/main/plugins/trtmc-agent-skills/skills/transform-model/SKILL.md))

因此 Agent 面对新模型时，不是在整个仓库随意修改。

而是先确定：

```text
这个模型属于哪个 family？
```

然后：

```text
修改应该留在 family ownership boundary 中。
```

只有真正多个 family 共用的功能，才考虑抽象到共享层。

这实际上是在帮助 Agent 减少：

```text
无意义重构

跨模块污染

为了方便随便修改公共代码

局部问题全局化
```

`transform-model` 中有一个非常典型的标题：

```text
Implement The Smallest Owned Change
```

也就是：

> 在正确 ownership 范围内完成最小修改。

([TensorRT Model Connect 的 transform-model Skill 定义](https://github.com/NVIDIA/TensorRT-Model-Connect/blob/main/plugins/trtmc-agent-skills/skills/transform-model/SKILL.md))

这和很多 AI Coding Agent 的默认行为形成鲜明对比。

一个不受约束的 Agent 很容易：

```text
发现函数不好看
→ 顺手重构

发现公共接口能统一
→ 顺手抽象

发现目录结构不舒服
→ 顺手移动

最后一个模型接入任务
变成几十个文件的大改造
```

Agentic Engineering 中应尽量强调：

```text
Goal scoped
→ Change scoped
→ Validation scoped
```

## 四、Skill 的价值不只是调用工具，而是保存专家决策逻辑

### 4.1 Agent 不只是调用 Tool，还要做“工具路由”

`debug-trt-mismatch` 是另一个非常适合学习的 Skill。

它的目标非常明确：

> 找到 TensorRT 与 reference 第一次发生 divergence 的边界。

([TensorRT Model Connect 的 debug-trt-mismatch Skill 定义](https://github.com/NVIDIA/TensorRT-Model-Connect/blob/main/plugins/trtmc-agent-skills/skills/debug-trt-mismatch/SKILL.md))

它不会告诉 Agent：

```text
出错以后随便 debug。
```

而是先读取模型 capability，然后选择工具：

|模型类型|Debug Tool|
|---|---|
|Decoder|`tools/diff_logits.py`|
|Decoder layer|`tools/diff_layers.py`|
|Vision-Language|`tools/diff_vl.py`|
|Audio|`tools/diff_audio.py`|
|Diffusion|`tools/debug_diffusion_pipeline.py`|
|Python vs C++|`tools/test_runner_parity.py`|

([TensorRT Model Connect 的 debug-trt-mismatch Skill 定义](https://github.com/NVIDIA/TensorRT-Model-Connect/blob/main/plugins/trtmc-agent-skills/skills/debug-trt-mismatch/SKILL.md))

所以这里存在一个非常典型的：

```text
Agent → Skill → Decision → Tool
```

结构。

而不是：

```text
Agent → Tool
```

### 4.2 好的 Skill 保存的是专家经验

`debug-trt-mismatch` 中最有价值的内容，其实是专家经验。

例如 Decoder 出现 logits mismatch 后，Skill 给出了判断模式：

```text
Step 0 就发生 divergence
→ weights / config / prefill graph

误差每一步持续增长
→ precision boundary / normalization

突然在 Step N 跳变
→ RoPE / mask / KV cache

Top-1 一致但 max diff 很大
→ 检查 cosine / rank

logits 差异很小但最终输出不同
→ sampling / seed / tie-breaking
```

([TensorRT Model Connect 的 debug-trt-mismatch Skill 定义](https://github.com/NVIDIA/TensorRT-Model-Connect/blob/main/plugins/trtmc-agent-skills/skills/debug-trt-mismatch/SKILL.md))

这部分非常重要。

因为 Agent 的价值并不只是会：

```text
运行 diff_logits.py
```

更重要的是：

```text
看懂输出
↓
形成假设
↓
选择下一步工具
```

这类信息可以称作：

```text
Reasoning Heuristics
```

或者：

```text
Procedural Knowledge
```

即“专家通常如何解决这类问题”。

因此以后写自己的 Skill 时，不应该只写：

```text
运行：

python test.py
```

更好的 Skill 应该是：

```text
先运行 A

如果：
A1
→ 检查 B

如果：
A2
→ 调用 C

如果：
C 失败
→ 定位 D

如果：
缺少必要信息
→ STOP

如果：
涉及危险操作
→ Human Gate
```

所以 Skill 的真正作用是：

> **把人类专家解决问题时脑子里的 SOP 和判断经验显式化。**

## 五、Validation 与 Evidence 决定 Agent 是否真的完成任务

### 5.1 不要让 Agent 自己宣布成功

这是 TRTMC 给我的另一个重要启发。

`transform-model` 明确建立了 Evidence Gates。

例如：

|Claim|Minimum Evidence|
|---|---|
|Builder implemented|focused tests + bundle build|
|Native runtime connected|descriptor check + isolated plugin load|
|Output parity|model-first comparison artifact|
|Model supported|registered E2E + target hardware pass|
|Performance improved|comparable performance run|
|Optimized path qualified|profile/qualification artifacts|

([TensorRT Model Connect 的 transform-model Skill 定义](https://github.com/NVIDIA/TensorRT-Model-Connect/blob/main/plugins/trtmc-agent-skills/skills/transform-model/SKILL.md))

并且特别指出：

```text
Compilation
Sample output
Build success
Dry run
```

都不能等价于：

```text
Model parity
```

这句话对 Agent 项目非常重要。

很多 Agent Demo 的判断方式其实是：

```text
Agent:
“代码已经实现完成，看起来应该没有问题。”
```

这属于：

```text
Self Evaluation
```

问题是 LLM 同时承担了：

```text
执行者
+
裁判
```

因此容易出现 false positive。

更可靠的结构是：

```text
Agent
↓
Action
↓
Machine-verifiable Evaluator
↓
PASS / FAIL
```

例如 Coding Agent：

```text
pytest
eslint
typecheck
build
integration test
```

爬虫 Agent：

```text
HTTP status
schema validation
field completeness
duplicate rate
```

数据 Agent：

```text
schema
row count
null ratio
statistical check
```

Agent 尽量只负责：

```text
根据 Evidence 决定下一步。
```

而不是：

```text
决定 Evidence 是否存在。
```

### 5.2 Agent 做实验时，也需要明确目标和控制变量

`optimize-model-precision` 这个 Skill 也非常值得研究。

它不是告诉 Agent：

```text
帮我把模型优化一下。
```

而是先要求明确目标。

所谓“最好”必须明确究竟优化：

```text
bundle size

device memory

setup time

prefill

decode

throughput
```

([TensorRT Model Connect 的 optimize-model-precision Skill 定义](https://github.com/NVIDIA/TensorRT-Model-Connect/blob/main/plugins/trtmc-agent-skills/skills/optimize-model-precision/SKILL.md))

这其实对应一个很重要的 Agent 设计原则：

> **Objective 必须机器可判断。**

优化 Skill 中规定了实验顺序：

```text
1. reproduce baseline

2. FP16

3. BF16

4. 一次尝试一种 quantization

5. 定位失败边界后再修改 calibration / exclusion
```

并明确强调：

```text
One Variable Per Attempt
```

([TensorRT Model Connect 的 optimize-model-precision Skill 定义](https://github.com/NVIDIA/TensorRT-Model-Connect/blob/main/plugins/trtmc-agent-skills/skills/optimize-model-precision/SKILL.md))

这实际上是在防止 Agent 做这种事情：

```text
修改 precision
+
修改 backend
+
修改 cache
+
修改 calibration
+
修改 graph
```

然后性能提升 20%。

最终却不知道：

```text
到底哪个修改产生效果？
```

Agentic Workflow 如果涉及：

```text
实验
优化
搜索
调参
```

应该尽量把：

```text
Controlled Experiment
```

写进 Skill。

## 六、State 与 Artifact 让 Agent 的运行过程可恢复、可追踪

### 6.1 系统状态应该存在真实世界里，而不是只存在 LLM Context 里

`optimize-model-precision` 甚至要求每次 attempt 持久化记录：

```json
{
  "repository_sha": "...",
  "model_revision": "...",
  "target": "...",
  "objective": "...",
  "attempts": [
    {
      "precision": "fp16",
      "runtime_path": "...",
      "bundle_sha256": "...",
      "correctness": {
        "status": "pass"
      },
      "performance": {
        "status": "pass"
      },
      "bundle_bytes": 0,
      "device_memory_bytes": 0,
      "code_changes": []
    }
  ]
}
```

([TensorRT Model Connect 的 optimize-model-precision Skill 定义](https://github.com/NVIDIA/TensorRT-Model-Connect/blob/main/plugins/trtmc-agent-skills/skills/optimize-model-precision/SKILL.md))

这是另一个特别值得记住的设计：

> **系统状态应该存在真实世界里，而不是只存在 LLM Context 里。**

也就是：

```text
错误做法：

聊天记录
=
系统状态
```

更可靠的是：

```text
DB
Files
Git
Artifacts
Manifest
JSON
API

=
系统状态
```

Agent 每次重新读取真实状态。

通过 TRTMC 可以把状态大概分成三类。

Environment State：

```text
git SHA
branch
GPU
driver
TensorRT version
container
```

`debug-trt-mismatch` 开始时甚至要求记录：

```bash
git rev-parse HEAD

nvidia-smi --query-gpu=name,driver_version

python3 -c "import tensorrt as trt; print(trt.__version__)"
```

([TensorRT Model Connect 的 debug-trt-mismatch Skill 定义](https://github.com/NVIDIA/TensorRT-Model-Connect/blob/main/plugins/trtmc-agent-skills/skills/debug-trt-mismatch/SKILL.md))

Domain State：

```text
MODEL.toml

model revision

runtime strategy

precision

manifest

workload

threshold
```

这些描述的是：

```text
系统现在“是什么”。
```

Execution State：

```text
bundle build PASS

E2E FAIL

logits mismatch

first divergence = layer 17

performance unrun
```

这些描述：

```text
当前任务做到哪里。
```

### 6.2 Artifact 是 Agent 对结果负责的依据

TRTMC 经常强调：

```text
retain artifact
```

例如 reference consistency 会输出：

```text
comparison-dir
```

而不是只在 terminal 打印一句：

```text
PASS
```

Agent 最终应该能够回答：

```text
我为什么认为这个任务成功？
```

然后指向具体 Evidence。

例如：

```text
bundle hash

comparison artifact

E2E result

performance artifact

repository SHA

model revision
```

这样系统才具备：

```text
可追踪
可复现
可审计
可恢复
```

## 七、真正的 Agentic Loop：失败会改变下一步行为

### 7.1 FAIL 不是结束，而是新的 Observation

现在把 `transform-model` 和 `debug-trt-mismatch` 串起来，就出现一个非常典型的 Agent Loop：

```text
Goal:
Support Model X
      │
      ▼
transform-model
      │
      ▼
Implement
      │
      ▼
Build
      │
      ▼
Validate
    /    \
 PASS    FAIL
  │        │
  │        ▼
  │   debug-trt-mismatch
  │        │
  │        ▼
  │   Locate divergence
  │        │
  │        ▼
  │      Fix
  │        │
  └────────┘
      │
      ▼
Validation
```

这里最关键的是：

```text
FAIL
```

并不意味着 Workflow 结束。

它变成：

```text
新的 Observation
```

Agent 根据 Observation 决定：

```text
下一步 Action。
```

这才是真正的 Agentic。

普通 Workflow：

```text
A
↓
B
↓
C
↓
D
```

程序员提前确定流程。

例如：

```python
download()
convert()
build()
test()
```

Agentic Workflow：

```text
Goal
 ↓
Observe
 ↓
Reason
 ↓
Choose Action
 ↓
Execute
 ↓
Evaluate
 ↓
Observe
 ↓
Reason
```

简化成伪代码：

```python
while not goal_reached:

    state = observe_environment()

    action = agent.decide(
        goal=goal,
        state=state,
        policy=policy,
        skills=skills
    )

    result = execute(action)

    evidence = evaluate(result)

    update_state(evidence)
```

它并不是没有流程。

反而需要更强的流程约束。

区别只是：

```text
程序决定“下一步是什么”
```

变成了：

```text
Agent 根据环境决定“下一步是什么”
```

## 八、Human-in-the-loop 与权限边界

### 8.1 Agent 必须知道什么时候停止

`pr-babysitter` 是非常好的例子。

它负责：

```text
查看 PR

检查 CI

判断 branch 是否落后

必要时 rebase

诊断失败

做最小修改

重新 push

继续观察
```

([TensorRT Model Connect 的 pr-babysitter Skill 定义](https://github.com/NVIDIA/TensorRT-Model-Connect/blob/main/plugins/trtmc-agent-skills/skills/pr-babysitter/SKILL.md))

但它同时有明确禁止事项：

```text
Never push main

Never change unrelated PR branches

Do not skip CI

Never enable auto-merge
```

如果：

```text
需要不存在的硬件

需要产品判断

修改范围过大
```

则：

```text
STOP
→ report blocker
```

([TensorRT Model Connect 的 pr-babysitter Skill 定义](https://github.com/NVIDIA/TensorRT-Model-Connect/blob/main/plugins/trtmc-agent-skills/skills/pr-babysitter/SKILL.md))

这说明成熟 Agent 系统必须存在：

```text
Authority Boundary
```

也就是：

```text
Agent 可以自动做什么？

Agent 做什么之前必须获得授权？

哪些事情 Agent 永远不能自动做？
```

`pr-babysitter` 中有一个很有意思的细节。

即使 GitHub 当前允许 Merge：

```text
mergeable = MERGEABLE
```

也不能自动认为：

```text
可以 merge。
```

Agent 必须确认：

```text
CI 属于当前 HEAD

所有 expected checks 完成

全部 SUCCESS

premerge required status PASS

用户明确授予 merge authority
```

([TensorRT Model Connect 的 pr-babysitter Skill 定义](https://github.com/NVIDIA/TensorRT-Model-Connect/blob/main/plugins/trtmc-agent-skills/skills/pr-babysitter/SKILL.md))

换句话说：

```text
Platform Permission
≠
Agent Permission
```

这是一条非常值得用于自己项目的原则。

## 九、不要过早把 Agentic Workflow 做成 Multi-Agent

研究 TRTMC 后，我现在会避免一开始设计：

```text
Manager Agent
Planner Agent
Developer Agent
Tester Agent
Reviewer Agent
Research Agent
```

因为这样会立刻引入新的问题：

```text
谁负责最终决策？

Context 如何同步？

Agent 如何通信？

冲突怎么办？

谁保存 State？

谁判断 Done？

失败应该返回哪个 Agent？
```

很多时候，一个 Agent 加多个 Skills 已经足够。

例如 TRTMC 可以抽象成：

```text
                   Coding Agent
                        │
       ┌────────────────┼────────────────┐
       ▼                ▼                ▼
transform-model   debug-trt-mismatch   profile-model
       │                │                │
       └────────────────┼────────────────┘
                        ▼
                      Tools
```

这已经是完整 Agentic Workflow。

以后设计 Agent 项目时，可以使用下面这套判断方法。

如果：

> 同一个 Agent 完全可以完成，只是需要不同专业 SOP。

使用 Skill。

例如：

```text
debug

deploy

profile

write PR

optimize
```

如果：

> 工作可以由确定性程序完成。

使用 Tool。

例如：

```text
执行测试

读取数据库

调用 API

编译

计算 metric

读取 Git 状态
```

如果：

> 可以判断一个结果是否满足明确标准。

使用 Evaluator。

例如：

```text
pytest

schema validator

benchmark

rule checker

comparison script
```

只有当：

```text
需要独立 Context

需要独立推理

需要独立权限

需要独立责任边界

任务可以明显并行
```

时，再考虑拆新的 Agent。

## 十、从 TRTMC 抽象出自己的 Agentic Workflow 构建方法

### 10.1 一个完整的 Agentic Engineering 架构

现在我会把一个 Agentic 项目抽象为：

```text
                        USER GOAL
                            │
                            ▼
                    ┌──────────────┐
                    │    Agent     │
                    └──────┬───────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
       Policy            State          Skill Registry
     AGENTS.md       Files / DB / Git         │
                                             │
                                    ┌────────┼────────┐
                                    ▼        ▼        ▼
                                  Skill A  Skill B  Skill C
                                    │
                                    ▼
                                   Tool
                                    │
                                    ▼
                                  Result
                                    │
                                    ▼
                                Evaluator
                                /       \
                            PASS         FAIL
                             │             │
                             ▼             ▼
                          Next Goal      Diagnose
                                            │
                                            └──────┐
                                                   ▼
                                                  Agent
```

外围还有：

```text
Artifacts
Logging
Human Gates
CI
Permission Boundary
```

### 10.2 从最小闭环开始，而不是先做复杂框架

如果以后自己从零构建 Agentic Workflow，我现在不会从 LangGraph、多 Agent、Memory System 开始。

而会逐步做。

先实现：

```text
Goal
↓
Agent
↓
Tool
↓
Evaluator
↓
PASS / FAIL
```

只需要证明：

```text
Agent 能根据结果继续工作。
```

然后增加：

```text
AGENTS.md
```

规定：

```text
项目结构

允许修改范围

禁止行为

工程规范

完成条件

Human Gate
```

再加入 Skills：

```text
skills/

├── implement-feature/
│   └── SKILL.md

├── debug-test-failure/
│   └── SKILL.md

├── analyze-codebase/
│   └── SKILL.md

├── profile-performance/
│   └── SKILL.md

└── prepare-pr/
    └── SKILL.md
```

每一个 SKILL.md 至少包含：

```text
When to use

Goal

Inputs

Sources of truth

Procedure

Decision rules

Tools

Validation

Failure handling

Evidence

Stop conditions
```

之后建立 Validation Contract。

不要只有：

```text
DONE
```

而应该类似：

```text
implementation      PASS

unit_test           PASS

integration_test    PASS

performance         UNRUN

security            UNRUN

human_review        PENDING
```

这样 Claim Boundary 会非常明确。

再持久化 State 与 Artifact，例如：

```text
runs/
└── 2026-08-20-001/
    ├── state.json
    ├── plan.json
    ├── actions.jsonl
    ├── test-results.json
    ├── evaluation.json
    ├── artifacts/
    └── final-report.md
```

Agent 下一轮重新读取：

```text
真实 State
```

而不是完全依赖聊天历史。

只有发现：

```text
单 Agent Context 已经太大

不同职责需要权限隔离

需要独立判断

任务可以高度并行
```

再拆：

```text
                  Orchestrator
                 /      |       \
                /       |        \
         Research     Coding    Evaluation
           Agent       Agent       Agent
```

## 十一、以后分析一个 Agent 项目时应该看什么

以后再看 Agent 项目时，我更应该关注这些问题。

State 在哪里？

```text
真实文件？

数据库？

Git？

还是只存在聊天上下文？
```

Agent 能做什么？

```text
有哪些 Tools？

有哪些 Skills？

权限边界是什么？
```

Agent 如何选择下一步？

```text
固定 Workflow？

Skill 中的 Decision Rules？

Agent 自主 Reasoning？
```

谁判断任务成功？

```text
Agent 自己？

测试？

规则？

Benchmark？

Human？
```

FAIL 之后发生什么？

```text
直接结束？

Retry？

切换 Skill？

进入 Debug Workflow？
```

Evidence 是否留下？

```text
日志？

JSON？

测试结果？

Artifact？

Commit SHA？
```

什么情况下 Agent 必须停下来？

```text
权限操作？

危险操作？

缺少环境？

缺少信息？

产品判断？
```

如果一个 Agent 项目能很好回答这些问题，即使只有一个 Agent，也可能比一个十几个 Agent 的系统更加成熟。

过去我可能会把 Agentic Workflow 理解成：

```text
多个 AI Agent 自动完成复杂任务。
```

现在更准确的理解应该是：

> **Agentic Workflow 是一种以 Agent 作为动态决策器，让系统持续感知真实环境、选择能力、执行工具、读取反馈、验证结果并继续调整行为的软件工作流。**

真正重要的不是：

```text
Agent 数量。
```

而是整个：

```text
Observe
↓
Reason
↓
Act
↓
Evaluate
↓
Update State
↓
Repeat
```

能否稳定闭环。

## 十二、TensorRT Model Connect 真正值得借鉴的是什么

TensorRT Model Connect 给我的最大启发并不是：

> NVIDIA 用 AI Agent 自动写 TensorRT 代码。

而是：

> NVIDIA 正在把一个复杂软件项目本身改造成一个适合 Agent 工作的环境。

这种环境具有：

```text
明确的 Repository Policy

结构化的 Sources of Truth

领域化 Skills

确定性的 Tools

机器可执行的 Validators

可持久化的 Evidence

清晰的 Ownership

明确的 Claim Boundary

严格的 Human Gate
```

因此，一个优秀 Agentic 项目的目标并不是：

```text
让 Agent 尽可能自由。
```

反而应该是：

> **让 Agent 在足够自由地解决问题的同时，很难犯不可控的错误；一旦犯错能够快速发现；发现以后知道下一步如何定位；遇到权限或判断边界时知道停止。**

这也可以浓缩成我以后设计 Agentic Workflow 时最应该记住的一句话：

> **不要只想着如何让 Agent 更聪明，要优先设计一个让 Agent 容易做对、做错能发现、失败能恢复、危险时会停止的工程环境。**

## 十三、继续阅读 TRTMC 仓库时的推荐顺序

后续继续研究 TensorRT Model Connect 时，可以优先阅读：

```text
AGENTS.md

plugins/trtmc-agent-skills/skills/

plugins/trtmc-agent-skills/skills/transform-model/SKILL.md

plugins/trtmc-agent-skills/skills/debug-trt-mismatch/SKILL.md

plugins/trtmc-agent-skills/skills/optimize-model-precision/SKILL.md

plugins/trtmc-agent-skills/skills/pr-babysitter/SKILL.md

tools/

tests/validation/

tests/e2e/models/

python/tensorrt_model_connect/families/

src/runtime/models/
```

其中最推荐的阅读顺序：

```text
AGENTS.md
↓
transform-model
↓
debug-trt-mismatch
↓
optimize-model-precision
↓
pr-babysitter
↓
再顺着 Skill 中引用的 tools / tests / MODEL.toml 阅读
```

这样不是孤立地学习 Prompt 或 Skill，而是可以看到：

```text
Policy
→ Skill
→ Tool
→ State
→ Validation
→ Evidence
→ Human Gate
```

究竟如何在真实大型软件仓库中组成一个完整的 Agentic Workflow。