/**
 * @fileOverview Manages application auto-updates using electron-updater.
 */
import { BrowserWindow } from 'electron';
import { autoUpdater, UpdateInfo, ProgressInfo } from 'electron-updater';
import log from 'electron-log'; // electron-updater uses electron-log internally
import type { ElectronConfig } from './config';

type UpdaterConfig = Required<NonNullable<ElectronConfig['updater']>>;

export function initializeUpdater(
    mainWindow: BrowserWindow, 
    config: UpdaterConfig,
    isDevOrDebug: boolean = false
): void {
    if (process.env.NODE_ENV === 'development' && !isDevOrDebug) {
        log.info('Updater: Skipping auto-updater in development environment unless debug mode is enabled.');
        return;
    }

    log.info('Updater: Initializing auto-updater.');
    autoUpdater.logger = log; // Use the same logger instance
    (autoUpdater.logger as any).transports.file.level = isDevOrDebug ? 'debug' : 'info';
    
    autoUpdater.autoDownload = config.autoDownload;
    autoUpdater.autoInstallOnAppQuit = config.autoInstallOnAppQuit;
    autoUpdater.allowDowngrade = config.allowDowngrade;
    
    // Example provider setup (if needed, often auto-detected)
    // if (config.provider && config.url) {
    //   autoUpdater.setFeedURL({
    //     provider: config.provider as 'github' | 'generic' | 's3' | 'bintray' | 'custom' | 'spaces' | 'snapStore',
    //     url: config.url,
    //     // token, publishAutoUpdate for GitHub private repo, etc.
    //   });
    // }

    autoUpdater.on('checking-for-update', () => {
        log.info('Updater: Checking for update...');
        mainWindow.webContents.send('updater-message', { event: 'checking-for-update' });
    });

    autoUpdater.on('update-available', (info: UpdateInfo) => {
        log.info('Updater: Update available.', info);
        mainWindow.webContents.send('updater-message', { event: 'update-available', info });
        if (!config.autoDownload) {
            // Optionally ask user to download
            log.info('Updater: Auto-download disabled. User action required to download.');
        }
    });

    autoUpdater.on('update-not-available', (info: UpdateInfo) => {
        log.info('Updater: Update not available.', info);
        mainWindow.webContents.send('updater-message', { event: 'update-not-available', info });
    });

    autoUpdater.on('error', (err) => {
        log.error('Updater: Error in auto-updater.', err);
        mainWindow.webContents.send('updater-message', { event: 'error', error: err.message });
    });

    autoUpdater.on('download-progress', (progressObj: ProgressInfo) => {
        log.info(`Updater: Download progress: ${progressObj.percent}%`);
        mainWindow.webContents.send('updater-message', { event: 'download-progress', progress: progressObj });
    });

    autoUpdater.on('update-downloaded', (info: UpdateInfo) => {
        log.info('Updater: Update downloaded; will install on quit (if autoInstallOnAppQuit is true).', info);
        mainWindow.webContents.send('updater-message', { event: 'update-downloaded', info });
        // Optionally, prompt user to restart now
        // const dialogOpts = {
        //   type: 'info',
        //   buttons: ['Restart', 'Later'],
        //   title: 'Application Update',
        //   message: process.platform === 'win32' ? info.releaseNotes : info.releaseName,
        //   detail: 'A new version has been downloaded. Restart the application to apply the updates.'
        // };
        // dialog.showMessageBox(dialogOpts).then((returnValue) => {
        //   if (returnValue.response === 0) autoUpdater.quitAndInstall();
        // });
        if (config.autoInstallOnAppQuit) {
            log.info("Updater: Update will be installed when the application quits.");
        } else {
            log.info("Updater: Update downloaded. Manual restart and install required or call autoUpdater.quitAndInstall().");
            // Consider prompting user to install now if autoInstallOnAppQuit is false.
        }
    });

    // Check for updates
    // For testing, you might need to set up a local update server or use a public release.
    // If app is not packaged, electron-updater might not work as expected.
    if (app.isPackaged || isDevOrDebug) {
        log.info('Updater: Checking for updates now.');
        autoUpdater.checkForUpdatesAndNotify().catch(err => {
            log.error('Updater: checkForUpdatesAndNotify failed.', err);
        });
    } else {
        log.info('Updater: App is not packaged and not in debug mode, skipping update check.');
    }
}

// You might want to expose a way for the renderer to trigger checks or installs
// e.g., via an IPC message handled in ipc.ts that calls autoUpdater methods.
// ipcMain.on('updater-check-for-updates', () => autoUpdater.checkForUpdatesAndNotify());
// ipcMain.on('updater-quit-and-install', () => autoUpdater.quitAndInstall());
