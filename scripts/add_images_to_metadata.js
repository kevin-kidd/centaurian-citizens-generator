import fs from "fs";

const IPFS_CID = {
  male: "bafybeia7uiqs7rw3kahhl33in3tdo4rggzfl3wnv2ust6d4ymyk2kq45ra",
  female: "bafybeifxnqvhkylow3jj3r7udamjihjp3qjalbzwcx2tnqkih5p46shnmq"
};

const updateMetadata = (id, type) => {
  let metadata = JSON.parse(
    fs.readFileSync(`./generated/metadata/${type}/${id}.json`, {
      encoding: "utf8",
    })
  );
  metadata["image"] = `ipfs://${IPFS_CID}/${id}.png`;
  fs.writeFileSync(
    `./generated/metadata/updated_${type}/${id}`,
    JSON.stringify(metadata, null, 2),
    { encoding: "utf8" }
  );
  console.log("Updated metadata for NFT #" + id);
};

const params = process.argv.slice(2);
if (params.length === 0) {
  console.log(
    "No arguments provided. Please include the collection type. \n" +
      "Example: yarn add-images --type male"
  );
} else if (params.length === 2 && params[0] === "--type") {
  const types = ["male", "female", "child"];
  if (types.includes(params[1])) {
    for (let i = 1; i <= 1570; i++) {
      updateMetadata(i, params[1]);
    }
  } else {
    console.log(
      "Incorrect argument provided. Expected 'male', 'female' or 'child'."
    );
  }
} else {
  console.log(
    "Incorrect arguments provided. Please include the collection type. \n" +
      "Example: yarn add-images --type male"
  );
}
