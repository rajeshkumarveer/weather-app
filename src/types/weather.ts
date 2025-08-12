export interface CityGeo {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
  time? : String
}

export interface Weather {
  dt: number;
  weather: { id: number; main: string; description: string; icon: string }[];
  main: { temp: number; temp_min: number; temp_max: number; humidity: number };
  timezone: number;
  name: string;
  coord: {
      lon: number,
      lat: number
   },

}
