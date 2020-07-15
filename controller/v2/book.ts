import { Router, RouterContext } from "oak";
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

router.get("/search", async (ctx: RouterContext) => {
  const v = await new Validator().validate(ctx);
  console.log(
    v.get("path"),
    v.get("query.id"),
    v.get("query.name"),
    v.get("body.id"),
    v.get("body.book_name")
  );
});

router.get("/:id", (ctx: RouterContext) => {
  console.log(ctx);
  ctx.response.body = {
    book_id: ctx.params.id,
  };
});

export default router;
