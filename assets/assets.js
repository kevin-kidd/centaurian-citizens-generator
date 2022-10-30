import { chooseAsset } from "./chooseAsset.js";
import male_assets from "./data/male_assets.json";

let dnaSequences = []

export const chooseAssets = (type) => {

    let nft_data = {
        values: [],
        asset_traits: {},
        uris: [],
        dna_sequence: []
    }

    if(type === "male") {
        const categories = male_assets.categories

        for(const category of categories) {
            let [chosenAsset, rng] = chooseAsset(male_assets[category]);
            nft_data.values.push(`${category}: ${chosenAsset.value}\n`)
            nft_data.asset_traits[category] = chosenAsset.value
            nft_data.dna_sequence.push(rng)
            if(chosenAsset.URI.length !== 0) {
                nft_data.uris.push("./assets/media/" + chosenAsset.URI);
            }
        }

    } else if(type === "female") {
        // Coming soon
    } else {
        // Coming soon
    }

    if(dnaSequences.indexOf(JSON.stringify(nft_data.dna_sequence)) === -1){ // Check if chosen combo of assets exists already
        dnaSequences.push(JSON.stringify(nft_data.dna_sequence))
        nft_data.asset_traits["id"] = dnaSequences.length.toString()
        nft_data.values.push("ID: " + dnaSequences.length)
        return nft_data
    }
    return chooseAssets(type)
}