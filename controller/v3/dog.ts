import { Router, RouterContext } from "oak";
import Validator from "../../core/validator.ts";
import { NotFound } from "../../core/HttpException.ts";

interface Dog {
  name: string;
  age: number;
}

let dogs: Array<Dog> = [
  {
    name: "Roger",
    age: 8,
  },
  {
    name: "Syd",
    age: 7,
  },
];

export const getDogs = ({ response }: { response: any }) => {
  console.log("listing dogs");
  response.body = dogs;
};

export const getDog = ({
  params,
  response,
}: {
  params: {
    name: string;
  };
  response: any;
}) => {
  const dog = dogs.filter((dog) => dog.name === params.name);
  if (dog.length) {
    response.status = 200;
    response.body = dog[0];
    return;
  }

  response.status = 400;
  response.body = { msg: `Cannot find dog ${params.name}` };
};

export const addDog = async (ctx : RouterContext) => {
  console.log("adding dog");
  const v = await new Validator().validate(ctx);
  ctx.response.body = {
    name:v.get("body.name"),
    age:v.get("body.age"),
  }

  const dog: Dog = {
    name:v.get("body.name"),
    age:v.get("body.age"),
  };

  console.log(`Adding ${dog.name}`);

  dogs.push(dog);

  console.log("new dog db");
  console.dir(dogs);

  ctx.response.status = 200;
};

export const updateDog = async (ctx:RouterContext) => {
  const v = await new Validator().validate(ctx);

  console.log("Updating dog");
  console.dir(v);

  const d: Dog = {
    name:v.get("pathParams.name"),
    age:v.get("body.age"),
  };
  
  const u = dogs.filter((existingDog) => existingDog.name === d.name);
  
  if (u.length) {
    console.log(`Updating ${d.name}`);
    u[0].age = d.age;
    ctx.response.status = 200;
    ctx.response.body = { msg: "OK" };
  }
  else {
    ctx.response.status = 400;
    ctx.response.body = { msg: `Cannot find dog ${d.name}` };
  }
};

export const removeDog = async (ctx:RouterContext) => {
  const v = await new Validator().validate(ctx);
  const which = v.get("pathParams.name");
  const lengthBefore = dogs.length;
  dogs = dogs.filter((dog) => dog.name !== which);

  if (dogs.length === lengthBefore) {
    ctx.response.status = 400;
    ctx.response.body = { msg: `Cannot find dog ${which}` };
    return;
  }

  ctx.response.body = { msg: "OK" };
  ctx.response.status = 200;
};

const router = new Router({
  prefix: "/v3/dog",
});

router
  .get("/", getDogs)
  .get("/:name", getDog)
  .post("/", addDog)
  .put("/:name", updateDog)
  .delete("/:name", removeDog);

export default router;