import { Dataxamas } from "@dataxamas/tracker-js";
import { env } from './lib/env';

export const dataxamas = new Dataxamas({
  apiKey: env.VITE_DATAXAMAS_API_KEY,
});
