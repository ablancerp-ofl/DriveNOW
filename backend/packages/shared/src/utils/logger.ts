// Simple logger utility (placeholder for Winston)
export const logger = {
  info: (message: string, data?: any) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] INFO: ${message}`, data ? JSON.stringify(data) : '');
  },

  error: (message: string, error?: any) => {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] ERROR: ${message}`, error ? JSON.stringify(error) : '');
  },

  warn: (message: string, data?: any) => {
    const timestamp = new Date().toISOString();
    console.warn(`[${timestamp}] WARN: ${message}`, data ? JSON.stringify(data) : '');
  },

  debug: (message: string, data?: any) => {
    if (process.env.DEBUG) {
      const timestamp = new Date().toISOString();
      console.debug(`[${timestamp}] DEBUG: ${message}`, data ? JSON.stringify(data) : '');
    }
  },
};

export default logger;
