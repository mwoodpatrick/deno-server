import { RouterContext } from "oak";

const json = async (ctx: RouterContext, next: Function) => {

//   ctx.json = ctx.response.body
  await next();
  
};

export default json;
