import { Context } from "oak";
import { green } from "fmt/colors.ts";

const logger = async (ctx: Context, next: Function) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  let method = `${ctx.request.method} ${
    ctx.request.url
  }  ------------------> [${":: " + ms + "ms"}] `;
  console.log(green(method));
};

export default logger;
