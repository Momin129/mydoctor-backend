const obj = {
  languages: ["english", "hindi"],
  bio: "self",
};

const set = Object.keys(obj)
  .map((v, i) => `${v}=$${i + 1}`)
  .join(",");

console.log(set);
