import { Router, RouterContext } from "oak";

const router = new Router({
  prefix: "/v1/user",
});

router.get("/", (ctx: RouterContext) => {
  ctx.response.body = {
    ctx: "user",
  };
});

export default router;
