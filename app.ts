import { Application, green } from "./deps.ts";
import registerRouter from "./core/registerRouter.ts";


import logger from "./middleware/logger.ts";
import catchError from './middleware/exception.ts';

const app = new Application();
app.use(logger);
app.use(catchError);
await registerRouter(app);

console.log(green("The server run with http://localhost:8000"))

await app.listen({ port: 8000 });
