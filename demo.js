const obj = {
  languages: ["english", "hindi"],
  bio: "self",
};

let query = "Update patients set ";
for (let item in obj) {
  query += item + "=" + `{${obj[item]}}` + ",";
}

console.log(query);
