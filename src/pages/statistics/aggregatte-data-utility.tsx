import { IClothItem } from "@/types/clothState";


export function aggregateWardrobeData(items: IClothItem[]) {
  const aggregatedData = {
    itemsPerCategory: {} as Record<string, number>,
    colorDistribution: {} as Record<string, number>,
    seasonSuitability: {
      Winter: 0,
      Summer: 0,
      Spring: 0,
      Autumn: 0,
    },
    weatherSuitability: {
      Wind: 0,
      Rain: 0,
      Snowy: 0,
      Cloudy: 0,
      Sunny: 0,
    },
    brandDistribution: {} as Record<string, number>,
    averageWearCount: 0,
    conditionBreakdown: {
      New: 0,
      Good: 0,
      Worn: 0,
      Old: 0,
    },
    totalSpendingPerCategory: {} as Record<string, number>,
  };

  items.forEach(item => {
    // Items per Category
    aggregatedData.itemsPerCategory[item.category] = (aggregatedData.itemsPerCategory[item.category] || 0) + 1;

    // Color Distribution
    aggregatedData.colorDistribution[item.color] = (aggregatedData.colorDistribution[item.color] || 0) + 1;

    // Season Suitability
    if (item.seasonSuitability.isWinter) aggregatedData.seasonSuitability.Winter++;
    if (item.seasonSuitability.isSummer) aggregatedData.seasonSuitability.Summer++;
    if (item.seasonSuitability.isSpring) aggregatedData.seasonSuitability.Spring++;
    if (item.seasonSuitability.isAutumn) aggregatedData.seasonSuitability.Autumn++;

    // Weather Suitability
    if (item.weatherSuitability.isWindSuitable) aggregatedData.weatherSuitability.Wind++;
    if (item.weatherSuitability.isRainSuitable) aggregatedData.weatherSuitability.Rain++;
    if (item.weatherSuitability.isSnowySuitable) aggregatedData.weatherSuitability.Snowy++;
    if (item.weatherSuitability.isCloudySuitable) aggregatedData.weatherSuitability.Cloudy++;
    if (item.weatherSuitability.isSunnySuitable) aggregatedData.weatherSuitability.Sunny++;

    // Brand Distribution
    aggregatedData.brandDistribution[item.brand] = (aggregatedData.brandDistribution[item.brand] || 0) + 1;

    // Average Wear Count
    aggregatedData.averageWearCount += item.wearcount;

    // Condition Breakdown
    aggregatedData.conditionBreakdown[item.condition as keyof typeof aggregatedData.conditionBreakdown]++;

    // Total Spending per Category
    aggregatedData.totalSpendingPerCategory[item.category] = (aggregatedData.totalSpendingPerCategory[item.category] || 0) + item.cost;
  });

  // Calculate average wear count
  aggregatedData.averageWearCount /= items.length;

  return aggregatedData;
}

