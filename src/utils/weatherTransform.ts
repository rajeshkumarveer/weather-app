// utils/weatherTransform.ts
export function groupHourly(forecastList: any[]) {
  return forecastList.slice(0, 8); // first 8 = next 24 hours
}

export function groupDaily(forecastList: any[]) {
  const days: Record<string, any[]> = {};
  forecastList.forEach(item => {
    const date = item.dt_txt.split(' ')[0];
    if (!days[date]) days[date] = [];
    days[date].push(item);
  });

  return Object.keys(days).map(date => {
    const temps = days[date].map(d => d.main.temp);
    return {
      date,
      min: Math.min(...temps),
      max: Math.max(...temps),
      icon: days[date][0].weather[0].icon,
      description: days[date][0].weather[0].description
    };
  });
}
