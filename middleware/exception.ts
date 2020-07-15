import { Context } from "oak";
import { HttpException } from "../core/HttpException.ts";

const catchError = async (ctx: Context, next: Function) => {
  try {
    await next();
  } catch (error) {
    const isHttpException: boolean = error instanceof HttpException;
    if (isHttpException) {
      ctx.response.body = {
        msg: error.msg, //error自带message参数
        errorCode: error.errorCode,
        request: `${ctx.request.method} ${ctx.request.serverRequest.url}`,
      };
      ctx.response.status = error.code;
    } else {
      ctx.response.body = {
        msg: "we made a mistake", //error自带message参数
        errorCode: 999,
        request: `${ctx.request.method} ${ctx.request.serverRequest.url}`,
      };
      ctx.response.status = 500;
    }
  }
};

export default catchError;
