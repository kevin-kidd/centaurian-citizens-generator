import fs from "fs";

let blueCounter = 0,
  nonBlueCounter = 0,
  textureCounter = 0;
const blueSkins = {
  female: ["Blue Green", "Purple Blue", "Rose Purple"],
  male: ["Blue Gray", "Blue Green", "Purple Blue", "Rose Purple"],
  child: ["Purple Blue", "Purple", "Blue"],
};
const skinTextures = [
  "Ethereal",
  "Fur",
  "Lava",
  "Diamond",
  "Plasmic",
  "Scales",
  "Wrinkled",
];

const count_skin_types = (type) => {
  const metadata = JSON.parse(
    fs.readFileSync(`./output/${type}/metadata.json`, { encoding: "utf8" })
  );
  for (const nft of metadata) {
    if (
      nft.attributes.some(
        ({ trait_type, value }) =>
          trait_type === "Skin" && blueSkins[type].includes(value)
      )
    ) {
      blueCounter += 1;
    } else if (
      nft.attributes.some(
        ({ trait_type, value }) =>
          trait_type === "Skin" && skinTextures.includes(value)
      )
    ) {
      textureCounter += 1;
    } else {
      nonBlueCounter += 1;
    }
  }
  console.log(`### ${type.toUpperCase()} ###`);
  console.log("BLUE: " + blueCounter);
  console.log("NON-BLUE: " + nonBlueCounter);
  console.log("TEXTURE: " + textureCounter);
};

const params = process.argv.slice(2);
if (params.length === 0) {
  console.log(
    "No arguments provided. Please include the collection type. \n" +
      "Example: yarn count-skin-types --type male"
  );
} else if (params.length === 2 && params[0] === "--type") {
  const types = ["male", "female", "child"];
  if (types.includes(params[1])) {
    count_skin_types(params[1]);
  } else {
    console.log(
      "Incorrect argument provided. Expected 'male', 'female' or 'child'."
    );
  }
} else {
  console.log(
    "Incorrect arguments provided. Please include the collection type. \n" +
      "Example: yarn count-skin-types --type male"
  );
}
