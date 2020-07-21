# A back-end framework written in Deno

> I tried Deno for the first time, and then used the oak framework, because the oak framework is similar to koa, and koa is the one I have used, so I chose oak

# Breakpoint

I think breakpoint debugging is an indispensable means to solve program running errors, and then through research, it is found that it is an official problem of `VScode`, which has been troubled for a long time, and finally solved
However, there are still some minor problems. Compared with nodemon, denon is only suitable for hot restart. When debugging, denon appears to be inferior.

-Give my solution

VSCode configuration

1. Automatically hit the break point

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
2. Hit the breakpoint manually (debugging in deno is more recommended)

Start deno debugger first, then start Deno Attach

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

# start up

Denon is a hot restart library similar to nodemon.

-denon start (recommended)
```sh
 denon start
```

-deno start

```ssh
deno run -A --importmap=importmap.json --unstable app.ts
```



# completed

-logger middleware
-Route automatically loaded
-Global exception handling

# TODO

-Parameter verification
-Simplify the representation method of the returned data `ctx.response.body` => `ctx.json`
-JWT token integration
-MySQL integration
- and many more