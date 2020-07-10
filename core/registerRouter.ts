import { Application, State } from "oak";
import { blue, magenta, green } from "fmt/colors.ts";

export default async function loadRouters(app: Application<State>) {
  // 读取目录时的路径是path
  const path: string = "./controller";
  // 导出模块时的路径是paths
  const paths: string = "../controller";
  const dir = await Deno.readDir(path);

  for await (const d of dir) {
    console.log(`${green(`[${d.name}]`)}`);
    const dirs = await Deno.readDir(`${path}/${d.name}/`);
    if (dirs) {
      for await (const file of dirs) {
        const fileName: string = file.name;
        console.log(blue(`加载路由 ${fileName}`));
        const router = await import(`${paths}/${d.name}/${fileName}`);
        app.use(router.default.routes());
        app.use(router.default.allowedMethods());
      }
    }
  }
  console.log(magenta("[ load Routers successful ]"));
}
