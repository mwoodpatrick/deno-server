import { RouterContext } from "oak";
import { NotFound } from "./HttpException.ts";

class Validator {
  data: any = {};
  parsed: any = {};

  async _getParameters(ctx: RouterContext) {
    const result = await ctx.request.body({
      contentTypes: {
        text: ["application/json"],
      },
    });
    return {
      body: await result.value,
      query: ctx.request.url.searchParams,
      pathParams: ctx.params,
      path: ctx.request.url.pathname,
      header: ctx.request.headers,
    };
  }

  async validate(ctx: any) {
    this.data = await this._getParameters(ctx);
    ctx.v = this;
    return this;
  }

  /**
   * body: JSON请求体
   * query: url的查询参数
   * pathParams: url参数
   * @param path body,query,pathParams
   */
  get(path: string) {
    const values = path.split(".");
    const prefix = values[0]
    const parameter = values[1];
    switch (prefix) {
      case "path":
        return this.data[path];
      case "body":
        return this.data[prefix][parameter];
      case "query":
        return this.data[prefix].get(parameter);
      case "pathParams":
        return this.data[prefix][parameter]
      default:
        throw new NotFound("获取参数失败！",9998)
    }

    // const q_prefix = "query.";
    // const b_prefix = "body.";
    // const values = path.split(".");
    // if (path.startsWith(q_prefix)) {
    //   const values = path.split(".");
    //   console.log(values);
    //   const value1 = values[0];
    //   const value2 = values[1];
    //   return this.data[value1].get(value2);
    // }
    // if (path.startsWith(b_prefix)) {
    //   const values = path.split(".");
    //   console.log(values);
    //   const value1 = values[0];
    //   const value2 = values[1];
    //   return this.data[value1][value2];
    // }
    // return this.data[path];
  }

}

export default Validator;
