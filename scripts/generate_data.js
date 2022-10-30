import { chooseAssets } from "../assets/assets.js";
import { genAmount } from "../config.js";
import male_assets from "../assets/data/male_assets.json";

import * as fs from 'fs';

let all_data = {
    asset_traits: [],
    metadata: [],
    uris: []
}

const generateNFT = (type) => {
    for(let i=1; i <= genAmount; i++){
        const nft_data = chooseAssets(type)

        let metadata = {
            "attributes": [],
            "description": "Alpha Centaurian #" + i,
            "id": i.toString(),
            "external_url": "https://alphacentaurians.club/",
            "name": "Alpha Centaurian #" + i
        }

        for(const category of male_assets.categories) {
            metadata.attributes.push({
                "trait_type": category,
                "value": nft_data.asset_traits[category]
            })
        }

        all_data.asset_traits.push(nft_data.asset_traits)
        all_data.metadata.push(metadata)
        all_data.uris.push(nft_data.uris)

        fs.writeFileSync(`./generated/traits/${type}/${i}.txt`, nft_data.values.join("").toString())
        fs.writeFileSync(`./generated/metadata/${type}/${i}.json`, JSON.stringify(metadata, null, 4))
        console.log("Successfully generated NFT #" + i)
    }

    fs.writeFileSync(`./output/${type}/metadata.json`, JSON.stringify(all_data.metadata, null, 4))
    fs.writeFileSync(`./output/${type}/traits.json`, JSON.stringify(all_data.asset_traits, null, 4))
    fs.writeFileSync(`./output/${type}/uris.json`, JSON.stringify(all_data.uris, null, 4))
    console.log("Success")
}

const params = process.argv.slice(2)
if(params.length === 0) {
    console.log(
        "No arguments provided. Please include the collection type. \n" +
        "Example: yarn generate-data --type male"
    )
} else if(params.length === 2 && params[0] === "--type") {
    const types = ["male", "female", "child"]
    if(types.includes(params[1])) {
        generateNFT(params[1])
    } else {
        console.log("Incorrect argument provided. Expected 'male', 'female' or 'child'.")
    }
} else {
    console.log(
        "Incorrect arguments provided. Please include the collection type. \n" +
        "Example: yarn generate-data --type male"
    )
}
