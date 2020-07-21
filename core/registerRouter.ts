import { Application, State } from "../deps.ts";
import { blue, magenta, green } from "fmt/colors.ts";

export default async function loadRouters(app: Application<State>) {
  // The path when reading the directory is path
  const path: string = "./controller";
  // The path when exporting the module is paths
  const paths: string = "../controller";
  const dir = await Deno.readDir(path);

  for await (const d of dir) {
    console.log(`${green(`[${d.name}]`)}`);
    const dirs = await Deno.readDir(`${path}/${d.name}/`);
    if (dirs) {
      for await (const file of dirs) {
        const fileName: string = file.name;
        console.log(blue(`Load route ${fileName}`));
        const router = await import(`${paths}/${d.name}/${fileName}`);
        app.use(router.default.routes());
        app.use(router.default.allowedMethods());
      }
    }
  }
  console.log(magenta("[ loadding Routers successful ]"));
}
