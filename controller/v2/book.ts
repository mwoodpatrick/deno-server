import { Router, RouterContext,Context } from "oak";
import Validator from "../../core/validator.ts";
import { NotFound } from "../../core/HttpException.ts";

const router = new Router({
  prefix: "/v2/book",
});

router.get("/", (ctx: RouterContext) => {

  const h:string = "hello2"
  ctx.response.body = {
    ctx: h,
  };
});

router.get("/hello", (ctx: RouterContext) => {
  throw new NotFound()
});

router.get("/:id/search", async (ctx: any) => {

  const v = await new Validator().validate(ctx);
  console.log(ctx.v.data);
  
  ctx.response.body = {
    "URL": v.get("path"),
    "queryId": v.get("query.id"),
    "queryName": v.get("query.name"),
    "bodyId": v.get("body.id"),
    "bodyBookName": v.get("body.book_name"),
    "pathParamsId": v.get("pathParams.id")
  }

});

router.get("/:id", (ctx: RouterContext) => {
  console.log(ctx);
  ctx.response.body = {
    book_id: ctx.params.id,
  };
});

export default router;
