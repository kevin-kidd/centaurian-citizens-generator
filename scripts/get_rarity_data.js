import fs from "fs";

const getRarityData = (type) => {
  const traits = JSON.parse(
    fs.readFileSync(`./output/${type}/traits.json`, { encoding: "utf8" })
  );
};

const params = process.argv.slice(2);
if (params.length === 0) {
  console.log(
    "No arguments provided. Please include the collection type. \n" +
      "Example: yarn get-rarity-data --type male"
  );
} else if (params.length === 2 && params[0] === "--type") {
  const types = ["male", "female", "child"];
  if (types.includes(params[1])) {
    getRarityData(params[1]);
  } else {
    console.log(
      "Incorrect argument provided. Expected 'male', 'female' or 'child'."
    );
  }
} else {
  console.log(
    "Incorrect arguments provided. Please include the collection type. \n" +
      "Example: yarn get-rarity-data --type male"
  );
}
