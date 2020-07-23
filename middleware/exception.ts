import { Context } from "oak";
import { HttpException } from "../core/HttpException.ts";

const catchError = async (ctx: Context, next: Function) => {
  try {
    await next();
  } catch (error) {
    const isHttpException: boolean = error instanceof HttpException;
    if (isHttpException) {
      ctx.response.body = {
        msg: error.msg, //error comes with message parameters
        errorCode: error.errorCode,
        request: `${ctx.request.method} ${ctx.request.url.pathname}`,
      };
      ctx.response.status = error.code;
    } else {
      ctx.response.body = {
        msg: error.message, //error comes with message parameters
        stack: error.stack,
        errorCode: 999,
        request: `${ctx.request.method} ${ctx.request.url.pathname}`,
      };
      ctx.response.status = 500;
    }
  }
};

export default catchError;
