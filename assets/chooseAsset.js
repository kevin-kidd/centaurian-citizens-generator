// Helper functions
function weightedRand(spec) {
  let i,
    sum = 0,
    r = Math.random();
  for (i in spec) {
    sum += spec[i];
    if (r <= sum) return i;
  }
}

export const chooseAsset = (assets) => {
  let rngValues = {};

  for (let i = 0; i < assets.length; i++) {
    rngValues[i] = assets[i].chance_percent / 100;
  }

  const rng = weightedRand(rngValues);

  return [assets[rng], rng];
};
