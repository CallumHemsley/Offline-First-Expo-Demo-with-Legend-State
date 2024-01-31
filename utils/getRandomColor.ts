export const getRandomPastelColor = () => {
  const baseLightness = 200; // Base value to ensure lightness
  const range = 56; // Range for variation (255 - 200)

  const r = Math.floor(Math.random() * range) + baseLightness;
  const g = Math.floor(Math.random() * range) + baseLightness;
  const b = Math.floor(Math.random() * range) + baseLightness;

  return `rgb(${r}, ${g}, ${b})`;
};
