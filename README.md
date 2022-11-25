NFT Generator for [Alpha Centaurian Citizens](https://www.stargaze.zone/launchpad/stars1ekhzkjes36smfzx3k3aewvyf70yhlppxagcshp05pc4n9jqmtt7q2ndd9k) on the [Stargaze blockchain](https://stargaze.zone).

### Usage
1. Generate metadata: `yarn generate-metadata`
2. Generate images: `yarn generate-images`
3. Run tests: `yarn run-tests`
4. Add images to metadata:
   1. Upload all images to IPFS and replace the CID in `scripts/add_images_to_metadata.js`
   2. Run `yarn add-images-to-metadata`
5. Count the blue & non-blue skins (for birthing children): `yarn count-skin-types --type [male,female,child]`
6. Generate rarity data: `yarn generate-rarity-data --type [male,female,cild]`