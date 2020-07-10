import { Application } from "./deps.ts";
// import bookRouter from './controller/v1/book.ts'
import registerRouter from "./core/registerRouter.ts";
import logger from "./middleware/logger.ts";

const app = new Application();
// const bookRouter = await import ('./controller/v1/book.ts')
// bookRouter.default.routes()
// app.use(bookRouter.default.routes())
// app.use(bookRouter.default.allowedMethods())
app.use(logger);
await registerRouter(app);
await app.listen({ port: 8000 });
