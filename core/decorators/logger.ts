export default function logger(args: Number) {
  return function () {
    console.log(args);
  };
}
