export default function Legend({ layer }: { layer: string }) {
  const temperature = [
    { value: 30, rgba: [252, 128, 20, 1] },
    { value: 25, rgba: [255, 194, 40, 1] },
    { value: 20, rgba: [255, 240, 40, 1] },
    { value: 10, rgba: [194, 255, 40, 1] },
    { value: 0, rgba: [35, 221, 221, 1] },
    { value: -10, rgba: [32, 196, 232, 1] },
    { value: -20, rgba: [32, 140, 236, 1] },
    { value: -30, rgba: [130, 87, 219, 1] },
    //{ value: -40, rgba: [130, 22, 146, 1] },
    //{ value: -45, rgba: [130, 22, 146, 1] },
    //{ value: -55, rgba: [130, 22, 146, 1] },
    //{ value: -65, rgba: [130, 22, 146, 1] },
  ];

  const pressure = [
    { value: 940, rgba: [0, 115, 255, 1] },
    { value: 960, rgba: [0, 170, 255, 1] },
    { value: 980, rgba: [75, 208, 214, 1] },
    { value: 1000, rgba: [141, 231, 199, 1] },
    { value: 1010, rgba: [176, 247, 32, 1] },
    { value: 1020, rgba: [240, 184, 0, 1] },
    { value: 1040, rgba: [251, 85, 21, 1] },
    { value: 1060, rgba: [243, 54, 59, 1] },
    { value: 1080, rgba: [198, 0, 0, 1] },
  ];

  const wind = [
    { value: 1, rgba: [255, 255, 255, 0] },
    { value: 5, rgba: [238, 206, 206, 0.4] },
    { value: 15, rgba: [179, 100, 188, 0.7] },
    { value: 15, rgba: [179, 100, 188, 0.7] },
    { value: 25, rgba: [63, 33, 59, 0.8] },
    { value: 50, rgba: [116, 76, 172, 0.9] },
    { value: 100, rgba: [70, 0, 175, 1] },
    { value: 200, rgba: [13, 17, 38, 1] },
  ];

  const clouds = [
    { value: 0, rgba: [255, 255, 255, 0.0] },
    { value: 10, rgba: [253, 253, 255, 0.1] },
    { value: 20, rgba: [252, 251, 255, 0.2] },
    { value: 30, rgba: [250, 250, 255, 0.3] },
    { value: 40, rgba: [249, 248, 255, 0.4] },
    { value: 50, rgba: [247, 247, 255, 0.5] },
    { value: 60, rgba: [246, 245, 255, 0.75] },
    { value: 70, rgba: [244, 244, 255, 1] },
    { value: 80, rgba: [243, 242, 255, 1] },
    { value: 90, rgba: [242, 241, 255, 1] },
    { value: 100, rgba: [240, 240, 255, 1] },
  ];

  const rain = [
    { value: 0, rgba: [225, 200, 100, 0] },
    { value: 0.1, rgba: [200, 150, 150, 0] },
    { value: 0.2, rgba: [150, 150, 170, 0] },
    { value: 0.5, rgba: [120, 120, 190, 0] },
    { value: 1, rgba: [110, 110, 205, 0.3] },
    { value: 10, rgba: [80, 80, 225, 0.7] },
    { value: 140, rgba: [20, 20, 255, 0.9] },
  ];

  const weatherLayer = {
    Clouds: "clouds_new",
    Precipitation: "precipitation_new",
    SeaLevelPressure: "pressure_new",
    WindSpeed: "wind_new",
    Temperature: "temp_new",
  };
  let legend: any;
  let unit: string | null;
  switch (layer) {
    case weatherLayer.Clouds:
      legend = clouds;
      unit = "%";
      break;
    case weatherLayer.Precipitation:
      legend = rain;
      unit = "mm";
      break;
    case weatherLayer.SeaLevelPressure:
      legend = pressure;
      unit = "hPa";
      break;
    case weatherLayer.WindSpeed:
      legend = wind;
      unit = "m/s";
      break;
    case weatherLayer.Temperature:
      legend = temperature;
      unit = "°C";
      break;
    default:
      legend = null;
  }

  return (
    <div className="flex justify-between">
      {legend?.map((l: any, i: number) => (
        <div key={i} className="w-full">
          <div className="text-center"
            style={{
              backgroundImage: `linear-gradient(to right,rgba(${
                legend[i].rgba[0]
              },${legend[i].rgba[1]},${legend[i].rgba[2]},${
                legend[i].rgba[3]
              }),rgba(${(legend[i + 1] || legend[i]).rgba[0]},${
                (legend[i + 1] || legend[i]).rgba[1]
              },${(legend[i + 1] || legend[i]).rgba[2]},${
                (legend[i + 1] || legend[i]).rgba[3]
              }))`,
              color: `rgba(${255 - l.rgba[0]},${255 - l.rgba[1]},${
                255 - l.rgba[2]
              },${255 - l.rgba[3]})`,
            }}
          >
            {l.value}
            {unit}
          </div>
        </div>
      ))}
    </div>
  );
}
