/**
 * @fileOverview Logger utility for the Electron application.
 * Uses 'electron-log' for robust logging in main and renderer processes.
 */
import log, { LogLevel } from 'electron-log';
import path from 'path';
import { app } from 'electron';

// Configure electron-log
// You can customize the log format, level, and transports (file, console)

export function initializeLogger(logLevel: LogLevel = 'info'): void {
  log.transports.file.resolvePathFn = () => path.join(app.getPath('userData'), 'logs', 'main.log');
  log.transports.file.level = logLevel;
  log.transports.console.level = logLevel;

  // Example format: [YYYY-MM-DD HH:mm:ss.SSS] [level] (scope) message
  log.transports.file.format = '[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}] {text}';
  log.transports.console.format = '[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}] {text}';

  // Set log level for all transports
  log.variables.appName = app.getName(); // Optional: Add app name to log entries

  // Catch unhandled errors and rejected promises
  log.catchErrors({
    showDialog: !app.isPackaged, // Show error dialog in development
    onError: (error, versions, submitIssue) => {
      log.error('Unhandled error or promise rejection:', error);
      // If you have an issue reporting system:
      // submitIssue?.('https://github.com/your-repo/issues/new', {
      //   title: `Electron App Error: ${error.message}`,
      //   body: `Error: ${error.stack}\nOS: ${versions.os}\nElectron: ${versions.electron}\nApp: ${versions.app}`
      // });
    }
  });

  // Make electron-log the default console
  // console.log = log.log;
  // console.error = log.error;
  // console.warn = log.warn;
  // console.info = log.info;
  // console.debug = log.debug;
  // console.trace = log.verbose; // electron-log uses 'verbose' for trace-like level

  log.info(`Logger initialized. Log level: ${logLevel}. Logs will be saved to: ${log.transports.file.getFile().path}`);
}

// Export the logger instance for use in other modules
export default log;
