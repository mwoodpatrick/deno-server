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

router.post('/', async ctx=>{
  const v = await new Validator().validate(ctx);
  console.log("v3 book post");
  console.dir(v);
  ctx.response.body = {
    id:v.get('body.bookId'),
    name:v.get("body.bookame"),
    'hunky': 'monkey',
  }
})

router.put('/', async ctx=>{
  const v = await new Validator().validate(ctx);
  console.log("v3 book put");
  console.dir(v);
  ctx.response.body = {
    id:v.get('body.bookId'),
    name:v.get("body.bookame"),
    'hunky': 'putty',
  }
})

export default router;