import { Router, RouterContext } from "oak";
import Validator from "../../core/validator.ts";

const router = new Router({
  prefix: "/v2/book",
});

router.get("/", (ctx: RouterContext) => {
  ctx.response.body = {
    ctx: "book",
  };
});

router.get("/hello", (ctx: RouterContext) => {
  ctx.response.body = {
    ctx: "v2 book hello",
  };
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
