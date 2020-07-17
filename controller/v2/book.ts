import { Router, RouterContext } from "oak";
import Validator from "../../core/validator.ts";
import { NotFound } from "../../core/HttpException.ts";

const router = new Router({
  prefix: "/v2/book",
});

router.get("/", (ctx: RouterContext) => {

  const h:string = "hello2"
  const h1:string = ",world!!!"
  ctx.response.body = {
    ctx: h+h1,
  };
});

router.get("/hello", (ctx: RouterContext) => {
  throw new NotFound()
});

router.get("/:id/search", async (ctx: RouterContext) => {

  const v = await new Validator().validate(ctx);
  // console.log(ctx.state.v.data);
  
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
