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

  async validate(ctx: RouterContext) {
    this.data = await this._getParameters(ctx);
    // ctx.state.prototype.v = this.data
    return this;
  }

  /**
   * body: JSON Request body
   * query: URL query parameters
   * pathParams: url parameter
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
        return this.data.body[parameter];
      case "query":
        return this.data[prefix].get(parameter);
      case "pathParams":
        return this.data[prefix][parameter]
      default:
        throw new NotFound("Failed to get parameters！",9998)
    }
  }

}

export default Validator;
