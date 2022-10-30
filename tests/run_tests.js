import fs from "fs";

const testRarity = () => {
    const characters = ["male"] // More characters coming soon
    let success = true
    let responses = []
    for(const character of characters) {
        const assets = JSON.parse(fs.readFileSync(`./assets/data/${character}_assets.json`, "utf8"))
        for(const category of assets.categories) {
            let rarityCount = 0
            for(const attribute of assets[category]) {
                rarityCount += attribute.chance_percent
            }
            if(rarityCount !== 100) {
                success = false
                responses.push(
                    `The total percentage is ${rarityCount}\nCharacter: ${character}\nCategory: ${category}\n`
                )
            }
        }
    }
    return {
        success,
        responses
    }
}


const testUris = () => {
    const characters = ["male"] // More characters coming soon
    let success = true
    let responses = []
    for(const character of characters) {
        const assets = JSON.parse(fs.readFileSync(`./assets/data/${character}_assets.json`, "utf8"))
        for(const category of assets.categories) {
            for(const attribute of assets[category]) {
                if(attribute.URI.length !== 0) {
                    const URI = `./assets/media/${attribute.URI}`
                    if(!fs.existsSync(URI)) {
                        success = false
                        responses.push(`Unable to find file: ${URI}`)
                    }
                }
            }
        }
    }
    return {
        success,
        responses
    }
}

const runTests = () => {

    let success;

    console.log("Testing each URI to verify the file exists...")
    const uriTestResponse = testUris()
    if(!uriTestResponse.success) {
        for(const response of uriTestResponse.responses) {
            console.error("\nTest failed.")
            console.error(response)
        }
    }

    success = true;

    console.log("\nTesting rarity percentages...")
    const rarityTestResponse = testRarity()
    if(!rarityTestResponse.success) {
        for(const response of rarityTestResponse.responses) {
            console.error("\nTest failed.")
            console.error(response)
        }
        return
    }

    if(success) {
        console.log("All tests passed!");
    }
}

runTests()