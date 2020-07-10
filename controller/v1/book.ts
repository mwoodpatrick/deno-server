import { Router, RouterContext } from "oak";

const router = new Router({
  prefix: "/v1/book",
});

router.get("/", (ctx: RouterContext) => {
  ctx.response.body = {
    ctx: "book",
  };
});

router.post("/add", async (ctx: RouterContext) => {
  console.log(ctx.request);
  const result = await ctx.request.body({
    contentTypes: {
      text: ["application/json"],
    },
  });
  console.log(result.value);
  ctx.response.body = result.value;
});

router.get("/book_id/:id", (ctx: RouterContext) => {
  ctx.response.body = {
    id: ctx.params.id,
  };
});

export default router;
