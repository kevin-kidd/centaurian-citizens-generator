import mergeImages from "merge-images";
import { Canvas, Image } from "canvas";
import fs from "fs";
import { genAmount } from "../config.js";

const generateImage = async (type) => {
    const assetUris = JSON.parse(fs.readFileSync(`./output/${type}/uris.json`, "utf8"))
    for(let i=1; i <= genAmount; i++){
        const uris = assetUris[i-1]
        const base64Data = await mergeImages(uris, {
            Canvas: Canvas,
            Image: Image
        })

        fs.writeFileSync(`./generated/images/${type}/${i}.png`, base64Data.replace(/^data:image\/\w+;base64,/, ''), {encoding: 'base64'})

        console.log("Successfully generated image for NFT #" + i)
    }
    return "Success!"
}


const params = process.argv.slice(2)
if(params.length === 0) {
    console.log(
        "No arguments provided. Please include the collection type. \n" +
        "Example: yarn generate-images --type male"
    )
} else if(params.length === 2 && params[0] === "--type") {
    const types = ["male", "female", "child"]
    if(types.includes(params[1])) {
        generateImage(params[1]).then(res => console.log(res))
    } else {
        console.log("Incorrect argument provided. Expected 'male', 'female' or 'child'.")
    }
} else {
    console.log(
        "Incorrect arguments provided. Please include the collection type. \n" +
        "Example: yarn generate-images --type male"
    )
}