import { Context } from "oak";
import { green } from "fmt/colors.ts";

const json = async (ctx: Context, next: Function) => {

  ctx.response.body
  await next();
  
};

export default json;
