# 一个用Deno写的后端框架

> 第一次尝试Deno，然后用的是oak这个框架，因为oak框架与koa相近，koa又是我用过的，因此选型用oak

这个仓库可能要停更一段时间，因为断点调试现在有点问题

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