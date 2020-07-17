# 一个用Deno写的后端框架

> 第一次尝试Deno，然后用的是oak这个框架，因为oak框架与koa相近，koa又是我用过的，因此选型用oak

# 断点

断点调试我认为是解决程序运行错误的必备手段，然后通过研究发现是`VScode`官方的问题，困扰了许久，终于解决了
但是还是存在一些小问题的，对比nodemon来说denon只适合拿来热重启，在调试的时候denon就显得逊色了不少

- 给出我的解决方案

VSCode配置

1. 自动命中断点

```ssh
    {
      "name": "Deno-debugger",
      "type": "pwa-node",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "deno",
      "runtimeArgs": ["run", "--inspect", "-A", "--unstable", "app.ts"],
      "attachSimplePort": 9229,
      "console": "integratedTerminal"
    }
```
2. 手动命中断点(在deno中调试更为推荐)

先启动deno debugger, 然后再启动Deno Attach

```ssh
    {
      "name": "Deno (Attach)",
      "type": "node",
      "request": "attach",
      "port": 9229
    },
    {
      "name": "Deno-debugger",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "deno",
      "runtimeArgs": ["run", "--inspect", "-A", "--unstable", "app.ts"],
      "port": 9229,
      "console": "integratedTerminal"
    }
```

# 启动

denon 是一个 类似与nodemon的热重启库。

- denon启动(推荐)
```sh
 denon start
```

- deno启动

```ssh
deno run -A --importmap=importmap.json --unstable app.ts
```



# 已完成

- logger中间件
- 路由自动加载
- 全局异常处理

# 未来

- 参数校验
- 简化返回的数据的表示方法 `ctx.response.body` => `ctx.json`
- JWT令牌集成
- MySQL集成
- 等等