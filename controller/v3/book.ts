import { Router, RouterContext } from "oak";
import Validator from "../../core/validator.ts";
import { NotFound } from "../../core/HttpException.ts";

const router = new Router({
  prefix: "/v3/book",
});

router.get("/", (ctx: RouterContext) => {
  ctx.response.body = {
    'hunky': 'dory',
  };
});

export default router;