import pino from "pino";

export const logger = pino({
  browser: {
    asObject: true,
    serialize: true,
    transmit: {
      send: function (level, logEvent) {
        const msg = {
          ...logEvent,
          userAgent: navigator.userAgent,
          env: process.env.NODE_ENV,
          version: process.env.REACT_APP_VERSION,
        };

        // if (logEvent.level.value >= LOG_LEVEL.DEBUG) {
        fetch("/logs", {
          method: "post",
          body: JSON.stringify(msg),
        }).catch(logger.error);
        // }
      },
    },
  },
});
