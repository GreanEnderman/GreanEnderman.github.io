---
title: "TypeScript 类型体操：从入门到放弃"
description: "探索 TypeScript 类型系统的高级特性，理解泛型、条件类型和映射类型的实际应用场景。"
date: 2024-02-20
category: "tech"
template: "tech"
tags: ["TypeScript", "类型系统", "前端开发"]
featured: false
toc: true
---

## 为什么需要类型体操

TypeScript 的类型系统是图灵完备的，这意味着理论上可以用类型系统实现任何计算。但在实际开发中，我们真的需要这么复杂的类型吗？

答案是：**看情况**。

## 实用的类型工具

### 1. 深度只读

标准库的 `Readonly<T>` 只能处理第一层，如果需要深度只读：

```typescript
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? DeepReadonly<T[P]>
    : T[P];
};

interface Config {
  database: {
    host: string;
    port: number;
  };
}

type ReadonlyConfig = DeepReadonly<Config>;
// database.host 和 database.port 都是只读的
```

### 2. 提取函数参数类型

```typescript
type Parameters<T extends (...args: any) => any> = 
  T extends (...args: infer P) => any ? P : never;

function createUser(name: string, age: number) {
  return { name, age };
}

type CreateUserParams = Parameters<typeof createUser>;
// [string, number]
```

### 3. 条件类型的实际应用

```typescript
type ApiResponse<T> = T extends { error: any }
  ? { success: false; error: string }
  : { success: true; data: T };

// 使用
type UserResponse = ApiResponse<{ id: number; name: string }>;
// { success: true; data: { id: number; name: string } }

type ErrorResponse = ApiResponse<{ error: 'Not Found' }>;
// { success: false; error: string }
```

## 何时应该停止

类型体操的陷阱在于：**为了类型安全而牺牲可读性**。

### 反面案例

```typescript
// 过度设计
type ExtractRouteParams<T extends string> = 
  T extends `${infer Start}:${infer Param}/${infer Rest}`
    ? { [K in Param | keyof ExtractRouteParams<Rest>]: string }
    : T extends `${infer Start}:${infer Param}`
    ? { [K in Param]: string }
    : {};

// 简单方案
type RouteParams = Record<string, string>;
```

第一种方案虽然类型更精确，但：
1. 难以理解和维护
2. 编译时间显著增加
3. 错误提示难以阅读

## 最佳实践

1. **优先使用标准库工具类型**：`Partial`, `Pick`, `Omit` 等
2. **类型复杂度有上限**：超过 3 层嵌套就该重新设计
3. **为团队编写类型**：可读性 > 完美性
4. **善用类型注释**：复杂类型加上 JSDoc 说明

## 结论

TypeScript 的类型系统很强大，但不是所有问题都需要用类型解决。记住：

> 类型是为了服务业务逻辑，而不是炫技。

当你发现自己在写类型体操时，问问自己：这真的让代码更好维护了吗？
