import handler, { createServerEntry } from "@tanstack/react-start/server-entry";

import { dataxamas } from "./dataxamas.server";

export default createServerEntry({
  async fetch(request: Request) {
    try {
      const response = await handler.fetch(request);

      dataxamas.crawlers.trackRequest(request, { statusCode: response.status });

      return response;
    } catch (error) {
      void dataxamas.exceptions.captureException(error, { url: request.url, method: request.method });

      throw error;
    }
  },
});
