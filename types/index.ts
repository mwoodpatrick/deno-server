import { RouterContext } from 'oak';
declare module "https://deno.land/x/oak/mod.ts" {
  interface RouterContext {
    json: Object,
    v: any
  }
}