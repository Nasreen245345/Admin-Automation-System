// Minimal centralized logger. Swap the implementation (e.g. winston/pino)
// later without touching call sites elsewhere in the app.
const timestamp = () => new Date().toISOString();

export const logger = {
  info: (msg) => console.log(`[${timestamp()}] INFO: ${msg}`),
  warn: (msg) => console.warn(`[${timestamp()}] WARN: ${msg}`),
  error: (msg) => console.error(`[${timestamp()}] ERROR: ${msg}`),
};
