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

export const addDog = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  console.log("adding dog");
  const r = await request;
  const body = r.body();
  const dog: Dog = body.value;

  console.log(`Adding ${dog.name}`);

  dogs.push(dog);

  response.body = { msg: "OK" };
  response.status = 200;
};

const router = new Router({
  prefix: "/v3/dog",
});

router
  .get("/", getDogs)
  .get("/:name", getDog)
  .post("/", addDog);

export default router;