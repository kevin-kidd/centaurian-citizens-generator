import fs from "fs";

const getRarityData = (type) => {
  const allTraits = JSON.parse(
    fs.readFileSync(`./output/${type}/traits.json`, { encoding: "utf8" })
  );
  let allAssets = {
    Background: {},
    Skin: {},
    Suit: {},
    Breastcomputer: {},
    Helmet: {},
    "Face Mask": {},
    "Gas Tank": {},
    "Handheld Item": {},
    Horns: {},
    Eyes: {},
    Pet: {}
  };
  // Count all assets
  for (const traits of allTraits) {
    for (const [traitType, traitValue] of Object.entries(traits)) {
      if (traitType === "id") continue;
      allAssets[traitType][traitValue] =
        (+allAssets[traitType][traitValue] || 0) + 1;
    }
  }
  // Calculate trait rarity and score for all assets
  for (const [traitType, assets] of Object.entries(allAssets)) {
    for (const [asset, assetDetails] of Object.entries(assets)) {
      const assetRarity = assetDetails / 1570;
      const assetRarityScore = 1 / assetRarity;
      allAssets[traitType][asset] = {
        count: assetDetails,
        rarity: assetRarity,
        rarity_score: assetRarityScore,
      };
    }
  }
  fs.writeFileSync(
    `./output/${type}/rarity.json`,
    JSON.stringify(allAssets, null, 2),
    { encoding: "utf8" }
  );

  let allNfts = [];

  // Determine cumulative rarity score for all NFTs
  for (const traits of allTraits) {
    let totalRarityScore = 0;
    for (const [traitType, traitValue] of Object.entries(traits)) {
      if (traitType === "id") continue;
      totalRarityScore += allAssets[traitType][traitValue].rarity_score;
    }
    allNfts.push({
      id: traits.id,
      rarity_score: totalRarityScore,
    });
  }
  // Rank all the NFTs from first->last
  let rankedNfts = allNfts.sort(function(a, b) {
    return b.rarity_score - a.rarity_score
  });

  rankedNfts = rankedNfts.map((nft, index) => ({
    id: nft.id,
    rank: index + 1,
    rarity_score: nft.rarity_score
  }));

  fs.writeFileSync(
    `./output/${type}/ranks.json`,
    JSON.stringify(rankedNfts, null, 2),
    { encoding: "utf8" }
  );

  console.log("All the NFTs have been ranked and the data was exported to the output folder!")

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
