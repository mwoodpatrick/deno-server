import { Router, RouterContext } from "oak";
import Validator from "../../core/validator.ts";
import { NotFound } from "../../core/HttpException.ts";

interface Book {
  bookId: number;
  bookName: string;
}

let books: Array<Book> = [
  {
    bookId: 1,
    bookName: "2001: A Space Odyssey",
  },
  {
    bookId: 2,
    bookName: "Peaceful Warrior",
  },
];
const router = new Router({
  prefix: "/v3/book",
});

router.get("/", ctx => {
  ctx.response.body = books;
});

router.post('/', async ctx => {
  const v = await new Validator().validate(ctx);
  console.log("v3 book post");
  console.dir(v);
  console.debug(v.data.body);

  const book : Book = {
    bookId:v.get('body.bookId'),
    bookName:v.get("body.bookName"),
  }

  ctx.response.body = book;

  books.push(book);
})

router.put('/', async ctx=>{
  const v = await new Validator().validate(ctx);
  console.log("v3 book put");
  console.dir(v);
  ctx.response.body = {
    id:v.get('body.bookId'),
    name:v.get("body.bookName"),
  }
})

export default router;