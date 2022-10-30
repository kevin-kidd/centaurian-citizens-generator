import fs from 'fs';

const IPFS_CID = "bafybeia7uiqs7rw3kahhl33in3tdo4rggzfl3wnv2ust6d4ymyk2kq45ra";

const updateMetadata = (id) => {
    let metadata = JSON.parse(
        fs.readFileSync(`./generated/metadata/male/${id}.json`, { encoding: "utf8" })
    );
    metadata["image"] = `ipfs://${IPFS_CID}/${id}.png`
    fs.writeFileSync(
        `./generated/metadata/updated_male/${id}`,
        JSON.stringify(metadata, null, 2),
        { encoding: "utf8" }
    )
    console.log("Updated metadata for NFT #" + id);
}

for(let i = 1; i <= 1570; i++) {
    updateMetadata(i);
}