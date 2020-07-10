import { RouterContext } from "oak";

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
      body: result.value,
      query: ctx.request.url.searchParams,
      path: ctx.request.url.pathname,
      header: ctx.request.headers,
    };
  }

  async validate(ctx: any) {
    this.data = await this._getParameters(ctx);
    ctx.v = this;
    return this;
  }

  get(path: string) {
    const q_prefix = "query.";
    const b_prefix = "body.";
    if (path.startsWith(q_prefix)) {
      const values = path.split(".");
      console.log(values);
      const value1 = values[0];
      const value2 = values[1];
      return this.data[value1].get(value2);
    }
    if (path.startsWith(b_prefix)) {
      const values = path.split(".");
      console.log(values);
      const value1 = values[0];
      const value2 = values[1];
      return this.data[value1][value2];
    }
    return this.data[path];
  }

}

export default Validator;
