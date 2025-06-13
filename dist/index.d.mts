import { BrowserWindow } from 'electron';
import { z } from 'zod';

/**
 * @fileOverview Configuration management for the Electron application.
 * Defines the configuration schema, default values, and merging logic.
 */

declare const WindowOptionsSchema: z.ZodDefault<z.ZodObject<{
    width: z.ZodDefault<z.ZodNumber>;
    height: z.ZodDefault<z.ZodNumber>;
    minWidth: z.ZodOptional<z.ZodNumber>;
    minHeight: z.ZodOptional<z.ZodNumber>;
    maxWidth: z.ZodOptional<z.ZodNumber>;
    maxHeight: z.ZodOptional<z.ZodNumber>;
    x: z.ZodOptional<z.ZodNumber>;
    y: z.ZodOptional<z.ZodNumber>;
    center: z.ZodDefault<z.ZodBoolean>;
    resizable: z.ZodDefault<z.ZodBoolean>;
    movable: z.ZodDefault<z.ZodBoolean>;
    minimizable: z.ZodDefault<z.ZodBoolean>;
    maximizable: z.ZodDefault<z.ZodBoolean>;
    closable: z.ZodDefault<z.ZodBoolean>;
    focusable: z.ZodDefault<z.ZodBoolean>;
    alwaysOnTop: z.ZodDefault<z.ZodBoolean>;
    fullscreen: z.ZodDefault<z.ZodBoolean>;
    fullscreenable: z.ZodDefault<z.ZodBoolean>;
    skipTaskbar: z.ZodDefault<z.ZodBoolean>;
    kiosk: z.ZodDefault<z.ZodBoolean>;
    title: z.ZodDefault<z.ZodString>;
    icon: z.ZodOptional<z.ZodString>;
    show: z.ZodDefault<z.ZodBoolean>;
    frame: z.ZodDefault<z.ZodBoolean>;
    parent: z.ZodOptional<z.ZodAny>;
    modal: z.ZodDefault<z.ZodBoolean>;
    acceptFirstMouse: z.ZodDefault<z.ZodBoolean>;
    disableAutoHideCursor: z.ZodDefault<z.ZodBoolean>;
    autoHideMenuBar: z.ZodDefault<z.ZodBoolean>;
    enableLargerThanScreen: z.ZodDefault<z.ZodBoolean>;
    backgroundColor: z.ZodDefault<z.ZodString>;
    hasShadow: z.ZodDefault<z.ZodBoolean>;
    opacity: z.ZodDefault<z.ZodNumber>;
    darkTheme: z.ZodDefault<z.ZodBoolean>;
    transparent: z.ZodDefault<z.ZodBoolean>;
    type: z.ZodOptional<z.ZodString>;
    titleBarStyle: z.ZodDefault<z.ZodEnum<["default", "hidden", "hiddenInset", "customButtonsOnHover"]>>;
    trafficLightPosition: z.ZodOptional<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>>;
    roundedCorners: z.ZodDefault<z.ZodBoolean>;
    thickFrame: z.ZodOptional<z.ZodBoolean>;
    vibrancy: z.ZodOptional<z.ZodEnum<["appearance-based", "light", "dark", "titlebar", "selection", "menu", "popover", "sidebar", "medium-light", "ultra-dark", "header", "sheet", "window", "hud", "fullscreen-ui", "tooltip", "content", "under-window", "under-page"]>>;
    zoomToPageWidth: z.ZodDefault<z.ZodBoolean>;
    tabbingIdentifier: z.ZodOptional<z.ZodString>;
    webPreferences: z.ZodDefault<z.ZodObject<{
        devTools: z.ZodOptional<z.ZodBoolean>;
        nodeIntegration: z.ZodDefault<z.ZodBoolean>;
        nodeIntegrationInWorker: z.ZodDefault<z.ZodBoolean>;
        nodeIntegrationInSubFrames: z.ZodDefault<z.ZodBoolean>;
        preload: z.ZodOptional<z.ZodString>;
        sandbox: z.ZodDefault<z.ZodBoolean>;
        contextIsolation: z.ZodDefault<z.ZodBoolean>;
        webSecurity: z.ZodDefault<z.ZodBoolean>;
        allowRunningInsecureContent: z.ZodDefault<z.ZodBoolean>;
        images: z.ZodDefault<z.ZodBoolean>;
        imageAnimationPolicy: z.ZodDefault<z.ZodEnum<["animate", "animateOnce", "noAnimation"]>>;
        textAreasAreResizable: z.ZodDefault<z.ZodBoolean>;
        webgl: z.ZodDefault<z.ZodBoolean>;
        plugins: z.ZodDefault<z.ZodBoolean>;
        experimentalFeatures: z.ZodDefault<z.ZodBoolean>;
        scrollBounce: z.ZodDefault<z.ZodBoolean>;
        enableRemoteModule: z.ZodDefault<z.ZodBoolean>;
        worldSafeExecuteJavaScript: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        nodeIntegration: boolean;
        nodeIntegrationInWorker: boolean;
        nodeIntegrationInSubFrames: boolean;
        sandbox: boolean;
        contextIsolation: boolean;
        webSecurity: boolean;
        allowRunningInsecureContent: boolean;
        images: boolean;
        imageAnimationPolicy: "animate" | "animateOnce" | "noAnimation";
        textAreasAreResizable: boolean;
        webgl: boolean;
        plugins: boolean;
        experimentalFeatures: boolean;
        scrollBounce: boolean;
        enableRemoteModule: boolean;
        worldSafeExecuteJavaScript: boolean;
        devTools?: boolean | undefined;
        preload?: string | undefined;
    }, {
        devTools?: boolean | undefined;
        nodeIntegration?: boolean | undefined;
        nodeIntegrationInWorker?: boolean | undefined;
        nodeIntegrationInSubFrames?: boolean | undefined;
        preload?: string | undefined;
        sandbox?: boolean | undefined;
        contextIsolation?: boolean | undefined;
        webSecurity?: boolean | undefined;
        allowRunningInsecureContent?: boolean | undefined;
        images?: boolean | undefined;
        imageAnimationPolicy?: "animate" | "animateOnce" | "noAnimation" | undefined;
        textAreasAreResizable?: boolean | undefined;
        webgl?: boolean | undefined;
        plugins?: boolean | undefined;
        experimentalFeatures?: boolean | undefined;
        scrollBounce?: boolean | undefined;
        enableRemoteModule?: boolean | undefined;
        worldSafeExecuteJavaScript?: boolean | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    width: number;
    height: number;
    center: boolean;
    resizable: boolean;
    movable: boolean;
    minimizable: boolean;
    maximizable: boolean;
    closable: boolean;
    focusable: boolean;
    alwaysOnTop: boolean;
    fullscreen: boolean;
    fullscreenable: boolean;
    skipTaskbar: boolean;
    kiosk: boolean;
    title: string;
    show: boolean;
    frame: boolean;
    modal: boolean;
    acceptFirstMouse: boolean;
    disableAutoHideCursor: boolean;
    autoHideMenuBar: boolean;
    enableLargerThanScreen: boolean;
    backgroundColor: string;
    hasShadow: boolean;
    opacity: number;
    darkTheme: boolean;
    transparent: boolean;
    titleBarStyle: "default" | "hidden" | "hiddenInset" | "customButtonsOnHover";
    roundedCorners: boolean;
    zoomToPageWidth: boolean;
    webPreferences: {
        nodeIntegration: boolean;
        nodeIntegrationInWorker: boolean;
        nodeIntegrationInSubFrames: boolean;
        sandbox: boolean;
        contextIsolation: boolean;
        webSecurity: boolean;
        allowRunningInsecureContent: boolean;
        images: boolean;
        imageAnimationPolicy: "animate" | "animateOnce" | "noAnimation";
        textAreasAreResizable: boolean;
        webgl: boolean;
        plugins: boolean;
        experimentalFeatures: boolean;
        scrollBounce: boolean;
        enableRemoteModule: boolean;
        worldSafeExecuteJavaScript: boolean;
        devTools?: boolean | undefined;
        preload?: string | undefined;
    };
    minWidth?: number | undefined;
    minHeight?: number | undefined;
    maxWidth?: number | undefined;
    maxHeight?: number | undefined;
    x?: number | undefined;
    y?: number | undefined;
    icon?: string | undefined;
    parent?: any;
    type?: string | undefined;
    trafficLightPosition?: {
        x: number;
        y: number;
    } | undefined;
    thickFrame?: boolean | undefined;
    vibrancy?: "appearance-based" | "light" | "dark" | "titlebar" | "selection" | "menu" | "popover" | "sidebar" | "medium-light" | "ultra-dark" | "header" | "sheet" | "window" | "hud" | "fullscreen-ui" | "tooltip" | "content" | "under-window" | "under-page" | undefined;
    tabbingIdentifier?: string | undefined;
}, {
    width?: number | undefined;
    height?: number | undefined;
    minWidth?: number | undefined;
    minHeight?: number | undefined;
    maxWidth?: number | undefined;
    maxHeight?: number | undefined;
    x?: number | undefined;
    y?: number | undefined;
    center?: boolean | undefined;
    resizable?: boolean | undefined;
    movable?: boolean | undefined;
    minimizable?: boolean | undefined;
    maximizable?: boolean | undefined;
    closable?: boolean | undefined;
    focusable?: boolean | undefined;
    alwaysOnTop?: boolean | undefined;
    fullscreen?: boolean | undefined;
    fullscreenable?: boolean | undefined;
    skipTaskbar?: boolean | undefined;
    kiosk?: boolean | undefined;
    title?: string | undefined;
    icon?: string | undefined;
    show?: boolean | undefined;
    frame?: boolean | undefined;
    parent?: any;
    modal?: boolean | undefined;
    acceptFirstMouse?: boolean | undefined;
    disableAutoHideCursor?: boolean | undefined;
    autoHideMenuBar?: boolean | undefined;
    enableLargerThanScreen?: boolean | undefined;
    backgroundColor?: string | undefined;
    hasShadow?: boolean | undefined;
    opacity?: number | undefined;
    darkTheme?: boolean | undefined;
    transparent?: boolean | undefined;
    type?: string | undefined;
    titleBarStyle?: "default" | "hidden" | "hiddenInset" | "customButtonsOnHover" | undefined;
    trafficLightPosition?: {
        x: number;
        y: number;
    } | undefined;
    roundedCorners?: boolean | undefined;
    thickFrame?: boolean | undefined;
    vibrancy?: "appearance-based" | "light" | "dark" | "titlebar" | "selection" | "menu" | "popover" | "sidebar" | "medium-light" | "ultra-dark" | "header" | "sheet" | "window" | "hud" | "fullscreen-ui" | "tooltip" | "content" | "under-window" | "under-page" | undefined;
    zoomToPageWidth?: boolean | undefined;
    tabbingIdentifier?: string | undefined;
    webPreferences?: {
        devTools?: boolean | undefined;
        nodeIntegration?: boolean | undefined;
        nodeIntegrationInWorker?: boolean | undefined;
        nodeIntegrationInSubFrames?: boolean | undefined;
        preload?: string | undefined;
        sandbox?: boolean | undefined;
        contextIsolation?: boolean | undefined;
        webSecurity?: boolean | undefined;
        allowRunningInsecureContent?: boolean | undefined;
        images?: boolean | undefined;
        imageAnimationPolicy?: "animate" | "animateOnce" | "noAnimation" | undefined;
        textAreasAreResizable?: boolean | undefined;
        webgl?: boolean | undefined;
        plugins?: boolean | undefined;
        experimentalFeatures?: boolean | undefined;
        scrollBounce?: boolean | undefined;
        enableRemoteModule?: boolean | undefined;
        worldSafeExecuteJavaScript?: boolean | undefined;
    } | undefined;
}>>;
type WindowOptions = z.infer<typeof WindowOptionsSchema>;
declare const SecurityConfigSchema: z.ZodDefault<z.ZodObject<{
    csp: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    enableNodeIntegrationInRenderers: z.ZodDefault<z.ZodBoolean>;
    disableContextIsolation: z.ZodDefault<z.ZodBoolean>;
    allowedNavigationHosts: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
}, "strip", z.ZodTypeAny, {
    csp: string;
    enableNodeIntegrationInRenderers: boolean;
    disableContextIsolation: boolean;
    allowedNavigationHosts: string[];
}, {
    csp?: string | undefined;
    enableNodeIntegrationInRenderers?: boolean | undefined;
    disableContextIsolation?: boolean | undefined;
    allowedNavigationHosts?: string[] | undefined;
}>>;
type SecurityConfig = z.infer<typeof SecurityConfigSchema>;
declare const WebGPUConfigSchema: z.ZodDefault<z.ZodObject<{
    forceSoftware: z.ZodDefault<z.ZodBoolean>;
    powerPreference: z.ZodDefault<z.ZodEnum<["default", "low-power", "high-performance"]>>;
}, "strip", z.ZodTypeAny, {
    forceSoftware: boolean;
    powerPreference: "default" | "low-power" | "high-performance";
}, {
    forceSoftware?: boolean | undefined;
    powerPreference?: "default" | "low-power" | "high-performance" | undefined;
}>>;
type WebGPUConfig = z.infer<typeof WebGPUConfigSchema>;
declare const ElectronConfigSchema: z.ZodDefault<z.ZodObject<{
    productName: z.ZodDefault<z.ZodString>;
    appId: z.ZodOptional<z.ZodString>;
    appUrl: z.ZodOptional<z.ZodString>;
    windowOptions: z.ZodDefault<z.ZodObject<{
        width: z.ZodDefault<z.ZodNumber>;
        height: z.ZodDefault<z.ZodNumber>;
        minWidth: z.ZodOptional<z.ZodNumber>;
        minHeight: z.ZodOptional<z.ZodNumber>;
        maxWidth: z.ZodOptional<z.ZodNumber>;
        maxHeight: z.ZodOptional<z.ZodNumber>;
        x: z.ZodOptional<z.ZodNumber>;
        y: z.ZodOptional<z.ZodNumber>;
        center: z.ZodDefault<z.ZodBoolean>;
        resizable: z.ZodDefault<z.ZodBoolean>;
        movable: z.ZodDefault<z.ZodBoolean>;
        minimizable: z.ZodDefault<z.ZodBoolean>;
        maximizable: z.ZodDefault<z.ZodBoolean>;
        closable: z.ZodDefault<z.ZodBoolean>;
        focusable: z.ZodDefault<z.ZodBoolean>;
        alwaysOnTop: z.ZodDefault<z.ZodBoolean>;
        fullscreen: z.ZodDefault<z.ZodBoolean>;
        fullscreenable: z.ZodDefault<z.ZodBoolean>;
        skipTaskbar: z.ZodDefault<z.ZodBoolean>;
        kiosk: z.ZodDefault<z.ZodBoolean>;
        title: z.ZodDefault<z.ZodString>;
        icon: z.ZodOptional<z.ZodString>;
        show: z.ZodDefault<z.ZodBoolean>;
        frame: z.ZodDefault<z.ZodBoolean>;
        parent: z.ZodOptional<z.ZodAny>;
        modal: z.ZodDefault<z.ZodBoolean>;
        acceptFirstMouse: z.ZodDefault<z.ZodBoolean>;
        disableAutoHideCursor: z.ZodDefault<z.ZodBoolean>;
        autoHideMenuBar: z.ZodDefault<z.ZodBoolean>;
        enableLargerThanScreen: z.ZodDefault<z.ZodBoolean>;
        backgroundColor: z.ZodDefault<z.ZodString>;
        hasShadow: z.ZodDefault<z.ZodBoolean>;
        opacity: z.ZodDefault<z.ZodNumber>;
        darkTheme: z.ZodDefault<z.ZodBoolean>;
        transparent: z.ZodDefault<z.ZodBoolean>;
        type: z.ZodOptional<z.ZodString>;
        titleBarStyle: z.ZodDefault<z.ZodEnum<["default", "hidden", "hiddenInset", "customButtonsOnHover"]>>;
        trafficLightPosition: z.ZodOptional<z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
        }, {
            x: number;
            y: number;
        }>>;
        roundedCorners: z.ZodDefault<z.ZodBoolean>;
        thickFrame: z.ZodOptional<z.ZodBoolean>;
        vibrancy: z.ZodOptional<z.ZodEnum<["appearance-based", "light", "dark", "titlebar", "selection", "menu", "popover", "sidebar", "medium-light", "ultra-dark", "header", "sheet", "window", "hud", "fullscreen-ui", "tooltip", "content", "under-window", "under-page"]>>;
        zoomToPageWidth: z.ZodDefault<z.ZodBoolean>;
        tabbingIdentifier: z.ZodOptional<z.ZodString>;
        webPreferences: z.ZodDefault<z.ZodObject<{
            devTools: z.ZodOptional<z.ZodBoolean>;
            nodeIntegration: z.ZodDefault<z.ZodBoolean>;
            nodeIntegrationInWorker: z.ZodDefault<z.ZodBoolean>;
            nodeIntegrationInSubFrames: z.ZodDefault<z.ZodBoolean>;
            preload: z.ZodOptional<z.ZodString>;
            sandbox: z.ZodDefault<z.ZodBoolean>;
            contextIsolation: z.ZodDefault<z.ZodBoolean>;
            webSecurity: z.ZodDefault<z.ZodBoolean>;
            allowRunningInsecureContent: z.ZodDefault<z.ZodBoolean>;
            images: z.ZodDefault<z.ZodBoolean>;
            imageAnimationPolicy: z.ZodDefault<z.ZodEnum<["animate", "animateOnce", "noAnimation"]>>;
            textAreasAreResizable: z.ZodDefault<z.ZodBoolean>;
            webgl: z.ZodDefault<z.ZodBoolean>;
            plugins: z.ZodDefault<z.ZodBoolean>;
            experimentalFeatures: z.ZodDefault<z.ZodBoolean>;
            scrollBounce: z.ZodDefault<z.ZodBoolean>;
            enableRemoteModule: z.ZodDefault<z.ZodBoolean>;
            worldSafeExecuteJavaScript: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            nodeIntegration: boolean;
            nodeIntegrationInWorker: boolean;
            nodeIntegrationInSubFrames: boolean;
            sandbox: boolean;
            contextIsolation: boolean;
            webSecurity: boolean;
            allowRunningInsecureContent: boolean;
            images: boolean;
            imageAnimationPolicy: "animate" | "animateOnce" | "noAnimation";
            textAreasAreResizable: boolean;
            webgl: boolean;
            plugins: boolean;
            experimentalFeatures: boolean;
            scrollBounce: boolean;
            enableRemoteModule: boolean;
            worldSafeExecuteJavaScript: boolean;
            devTools?: boolean | undefined;
            preload?: string | undefined;
        }, {
            devTools?: boolean | undefined;
            nodeIntegration?: boolean | undefined;
            nodeIntegrationInWorker?: boolean | undefined;
            nodeIntegrationInSubFrames?: boolean | undefined;
            preload?: string | undefined;
            sandbox?: boolean | undefined;
            contextIsolation?: boolean | undefined;
            webSecurity?: boolean | undefined;
            allowRunningInsecureContent?: boolean | undefined;
            images?: boolean | undefined;
            imageAnimationPolicy?: "animate" | "animateOnce" | "noAnimation" | undefined;
            textAreasAreResizable?: boolean | undefined;
            webgl?: boolean | undefined;
            plugins?: boolean | undefined;
            experimentalFeatures?: boolean | undefined;
            scrollBounce?: boolean | undefined;
            enableRemoteModule?: boolean | undefined;
            worldSafeExecuteJavaScript?: boolean | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        width: number;
        height: number;
        center: boolean;
        resizable: boolean;
        movable: boolean;
        minimizable: boolean;
        maximizable: boolean;
        closable: boolean;
        focusable: boolean;
        alwaysOnTop: boolean;
        fullscreen: boolean;
        fullscreenable: boolean;
        skipTaskbar: boolean;
        kiosk: boolean;
        title: string;
        show: boolean;
        frame: boolean;
        modal: boolean;
        acceptFirstMouse: boolean;
        disableAutoHideCursor: boolean;
        autoHideMenuBar: boolean;
        enableLargerThanScreen: boolean;
        backgroundColor: string;
        hasShadow: boolean;
        opacity: number;
        darkTheme: boolean;
        transparent: boolean;
        titleBarStyle: "default" | "hidden" | "hiddenInset" | "customButtonsOnHover";
        roundedCorners: boolean;
        zoomToPageWidth: boolean;
        webPreferences: {
            nodeIntegration: boolean;
            nodeIntegrationInWorker: boolean;
            nodeIntegrationInSubFrames: boolean;
            sandbox: boolean;
            contextIsolation: boolean;
            webSecurity: boolean;
            allowRunningInsecureContent: boolean;
            images: boolean;
            imageAnimationPolicy: "animate" | "animateOnce" | "noAnimation";
            textAreasAreResizable: boolean;
            webgl: boolean;
            plugins: boolean;
            experimentalFeatures: boolean;
            scrollBounce: boolean;
            enableRemoteModule: boolean;
            worldSafeExecuteJavaScript: boolean;
            devTools?: boolean | undefined;
            preload?: string | undefined;
        };
        minWidth?: number | undefined;
        minHeight?: number | undefined;
        maxWidth?: number | undefined;
        maxHeight?: number | undefined;
        x?: number | undefined;
        y?: number | undefined;
        icon?: string | undefined;
        parent?: any;
        type?: string | undefined;
        trafficLightPosition?: {
            x: number;
            y: number;
        } | undefined;
        thickFrame?: boolean | undefined;
        vibrancy?: "appearance-based" | "light" | "dark" | "titlebar" | "selection" | "menu" | "popover" | "sidebar" | "medium-light" | "ultra-dark" | "header" | "sheet" | "window" | "hud" | "fullscreen-ui" | "tooltip" | "content" | "under-window" | "under-page" | undefined;
        tabbingIdentifier?: string | undefined;
    }, {
        width?: number | undefined;
        height?: number | undefined;
        minWidth?: number | undefined;
        minHeight?: number | undefined;
        maxWidth?: number | undefined;
        maxHeight?: number | undefined;
        x?: number | undefined;
        y?: number | undefined;
        center?: boolean | undefined;
        resizable?: boolean | undefined;
        movable?: boolean | undefined;
        minimizable?: boolean | undefined;
        maximizable?: boolean | undefined;
        closable?: boolean | undefined;
        focusable?: boolean | undefined;
        alwaysOnTop?: boolean | undefined;
        fullscreen?: boolean | undefined;
        fullscreenable?: boolean | undefined;
        skipTaskbar?: boolean | undefined;
        kiosk?: boolean | undefined;
        title?: string | undefined;
        icon?: string | undefined;
        show?: boolean | undefined;
        frame?: boolean | undefined;
        parent?: any;
        modal?: boolean | undefined;
        acceptFirstMouse?: boolean | undefined;
        disableAutoHideCursor?: boolean | undefined;
        autoHideMenuBar?: boolean | undefined;
        enableLargerThanScreen?: boolean | undefined;
        backgroundColor?: string | undefined;
        hasShadow?: boolean | undefined;
        opacity?: number | undefined;
        darkTheme?: boolean | undefined;
        transparent?: boolean | undefined;
        type?: string | undefined;
        titleBarStyle?: "default" | "hidden" | "hiddenInset" | "customButtonsOnHover" | undefined;
        trafficLightPosition?: {
            x: number;
            y: number;
        } | undefined;
        roundedCorners?: boolean | undefined;
        thickFrame?: boolean | undefined;
        vibrancy?: "appearance-based" | "light" | "dark" | "titlebar" | "selection" | "menu" | "popover" | "sidebar" | "medium-light" | "ultra-dark" | "header" | "sheet" | "window" | "hud" | "fullscreen-ui" | "tooltip" | "content" | "under-window" | "under-page" | undefined;
        zoomToPageWidth?: boolean | undefined;
        tabbingIdentifier?: string | undefined;
        webPreferences?: {
            devTools?: boolean | undefined;
            nodeIntegration?: boolean | undefined;
            nodeIntegrationInWorker?: boolean | undefined;
            nodeIntegrationInSubFrames?: boolean | undefined;
            preload?: string | undefined;
            sandbox?: boolean | undefined;
            contextIsolation?: boolean | undefined;
            webSecurity?: boolean | undefined;
            allowRunningInsecureContent?: boolean | undefined;
            images?: boolean | undefined;
            imageAnimationPolicy?: "animate" | "animateOnce" | "noAnimation" | undefined;
            textAreasAreResizable?: boolean | undefined;
            webgl?: boolean | undefined;
            plugins?: boolean | undefined;
            experimentalFeatures?: boolean | undefined;
            scrollBounce?: boolean | undefined;
            enableRemoteModule?: boolean | undefined;
            worldSafeExecuteJavaScript?: boolean | undefined;
        } | undefined;
    }>>;
    security: z.ZodDefault<z.ZodObject<{
        csp: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        enableNodeIntegrationInRenderers: z.ZodDefault<z.ZodBoolean>;
        disableContextIsolation: z.ZodDefault<z.ZodBoolean>;
        allowedNavigationHosts: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    }, "strip", z.ZodTypeAny, {
        csp: string;
        enableNodeIntegrationInRenderers: boolean;
        disableContextIsolation: boolean;
        allowedNavigationHosts: string[];
    }, {
        csp?: string | undefined;
        enableNodeIntegrationInRenderers?: boolean | undefined;
        disableContextIsolation?: boolean | undefined;
        allowedNavigationHosts?: string[] | undefined;
    }>>;
    enableWebGPU: z.ZodDefault<z.ZodBoolean>;
    webgpu: z.ZodDefault<z.ZodObject<{
        forceSoftware: z.ZodDefault<z.ZodBoolean>;
        powerPreference: z.ZodDefault<z.ZodEnum<["default", "low-power", "high-performance"]>>;
    }, "strip", z.ZodTypeAny, {
        forceSoftware: boolean;
        powerPreference: "default" | "low-power" | "high-performance";
    }, {
        forceSoftware?: boolean | undefined;
        powerPreference?: "default" | "low-power" | "high-performance" | undefined;
    }>>;
    singleInstanceLock: z.ZodDefault<z.ZodBoolean>;
    logLevel: z.ZodDefault<z.ZodEnum<["error", "warn", "info", "verbose", "debug", "silly"]>>;
    openDevTools: z.ZodOptional<z.ZodBoolean>;
    userDataPath: z.ZodOptional<z.ZodString>;
    updater: z.ZodDefault<z.ZodOptional<z.ZodObject<{
        autoDownload: z.ZodDefault<z.ZodBoolean>;
        autoInstallOnAppQuit: z.ZodDefault<z.ZodBoolean>;
        allowDowngrade: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        autoDownload: boolean;
        autoInstallOnAppQuit: boolean;
        allowDowngrade: boolean;
    }, {
        autoDownload?: boolean | undefined;
        autoInstallOnAppQuit?: boolean | undefined;
        allowDowngrade?: boolean | undefined;
    }>>>;
}, "strip", z.ZodTypeAny, {
    productName: string;
    windowOptions: {
        width: number;
        height: number;
        center: boolean;
        resizable: boolean;
        movable: boolean;
        minimizable: boolean;
        maximizable: boolean;
        closable: boolean;
        focusable: boolean;
        alwaysOnTop: boolean;
        fullscreen: boolean;
        fullscreenable: boolean;
        skipTaskbar: boolean;
        kiosk: boolean;
        title: string;
        show: boolean;
        frame: boolean;
        modal: boolean;
        acceptFirstMouse: boolean;
        disableAutoHideCursor: boolean;
        autoHideMenuBar: boolean;
        enableLargerThanScreen: boolean;
        backgroundColor: string;
        hasShadow: boolean;
        opacity: number;
        darkTheme: boolean;
        transparent: boolean;
        titleBarStyle: "default" | "hidden" | "hiddenInset" | "customButtonsOnHover";
        roundedCorners: boolean;
        zoomToPageWidth: boolean;
        webPreferences: {
            nodeIntegration: boolean;
            nodeIntegrationInWorker: boolean;
            nodeIntegrationInSubFrames: boolean;
            sandbox: boolean;
            contextIsolation: boolean;
            webSecurity: boolean;
            allowRunningInsecureContent: boolean;
            images: boolean;
            imageAnimationPolicy: "animate" | "animateOnce" | "noAnimation";
            textAreasAreResizable: boolean;
            webgl: boolean;
            plugins: boolean;
            experimentalFeatures: boolean;
            scrollBounce: boolean;
            enableRemoteModule: boolean;
            worldSafeExecuteJavaScript: boolean;
            devTools?: boolean | undefined;
            preload?: string | undefined;
        };
        minWidth?: number | undefined;
        minHeight?: number | undefined;
        maxWidth?: number | undefined;
        maxHeight?: number | undefined;
        x?: number | undefined;
        y?: number | undefined;
        icon?: string | undefined;
        parent?: any;
        type?: string | undefined;
        trafficLightPosition?: {
            x: number;
            y: number;
        } | undefined;
        thickFrame?: boolean | undefined;
        vibrancy?: "appearance-based" | "light" | "dark" | "titlebar" | "selection" | "menu" | "popover" | "sidebar" | "medium-light" | "ultra-dark" | "header" | "sheet" | "window" | "hud" | "fullscreen-ui" | "tooltip" | "content" | "under-window" | "under-page" | undefined;
        tabbingIdentifier?: string | undefined;
    };
    security: {
        csp: string;
        enableNodeIntegrationInRenderers: boolean;
        disableContextIsolation: boolean;
        allowedNavigationHosts: string[];
    };
    enableWebGPU: boolean;
    webgpu: {
        forceSoftware: boolean;
        powerPreference: "default" | "low-power" | "high-performance";
    };
    singleInstanceLock: boolean;
    logLevel: "error" | "warn" | "info" | "verbose" | "debug" | "silly";
    updater: {
        autoDownload: boolean;
        autoInstallOnAppQuit: boolean;
        allowDowngrade: boolean;
    };
    appId?: string | undefined;
    appUrl?: string | undefined;
    openDevTools?: boolean | undefined;
    userDataPath?: string | undefined;
}, {
    productName?: string | undefined;
    appId?: string | undefined;
    appUrl?: string | undefined;
    windowOptions?: {
        width?: number | undefined;
        height?: number | undefined;
        minWidth?: number | undefined;
        minHeight?: number | undefined;
        maxWidth?: number | undefined;
        maxHeight?: number | undefined;
        x?: number | undefined;
        y?: number | undefined;
        center?: boolean | undefined;
        resizable?: boolean | undefined;
        movable?: boolean | undefined;
        minimizable?: boolean | undefined;
        maximizable?: boolean | undefined;
        closable?: boolean | undefined;
        focusable?: boolean | undefined;
        alwaysOnTop?: boolean | undefined;
        fullscreen?: boolean | undefined;
        fullscreenable?: boolean | undefined;
        skipTaskbar?: boolean | undefined;
        kiosk?: boolean | undefined;
        title?: string | undefined;
        icon?: string | undefined;
        show?: boolean | undefined;
        frame?: boolean | undefined;
        parent?: any;
        modal?: boolean | undefined;
        acceptFirstMouse?: boolean | undefined;
        disableAutoHideCursor?: boolean | undefined;
        autoHideMenuBar?: boolean | undefined;
        enableLargerThanScreen?: boolean | undefined;
        backgroundColor?: string | undefined;
        hasShadow?: boolean | undefined;
        opacity?: number | undefined;
        darkTheme?: boolean | undefined;
        transparent?: boolean | undefined;
        type?: string | undefined;
        titleBarStyle?: "default" | "hidden" | "hiddenInset" | "customButtonsOnHover" | undefined;
        trafficLightPosition?: {
            x: number;
            y: number;
        } | undefined;
        roundedCorners?: boolean | undefined;
        thickFrame?: boolean | undefined;
        vibrancy?: "appearance-based" | "light" | "dark" | "titlebar" | "selection" | "menu" | "popover" | "sidebar" | "medium-light" | "ultra-dark" | "header" | "sheet" | "window" | "hud" | "fullscreen-ui" | "tooltip" | "content" | "under-window" | "under-page" | undefined;
        zoomToPageWidth?: boolean | undefined;
        tabbingIdentifier?: string | undefined;
        webPreferences?: {
            devTools?: boolean | undefined;
            nodeIntegration?: boolean | undefined;
            nodeIntegrationInWorker?: boolean | undefined;
            nodeIntegrationInSubFrames?: boolean | undefined;
            preload?: string | undefined;
            sandbox?: boolean | undefined;
            contextIsolation?: boolean | undefined;
            webSecurity?: boolean | undefined;
            allowRunningInsecureContent?: boolean | undefined;
            images?: boolean | undefined;
            imageAnimationPolicy?: "animate" | "animateOnce" | "noAnimation" | undefined;
            textAreasAreResizable?: boolean | undefined;
            webgl?: boolean | undefined;
            plugins?: boolean | undefined;
            experimentalFeatures?: boolean | undefined;
            scrollBounce?: boolean | undefined;
            enableRemoteModule?: boolean | undefined;
            worldSafeExecuteJavaScript?: boolean | undefined;
        } | undefined;
    } | undefined;
    security?: {
        csp?: string | undefined;
        enableNodeIntegrationInRenderers?: boolean | undefined;
        disableContextIsolation?: boolean | undefined;
        allowedNavigationHosts?: string[] | undefined;
    } | undefined;
    enableWebGPU?: boolean | undefined;
    webgpu?: {
        forceSoftware?: boolean | undefined;
        powerPreference?: "default" | "low-power" | "high-performance" | undefined;
    } | undefined;
    singleInstanceLock?: boolean | undefined;
    logLevel?: "error" | "warn" | "info" | "verbose" | "debug" | "silly" | undefined;
    openDevTools?: boolean | undefined;
    userDataPath?: string | undefined;
    updater?: {
        autoDownload?: boolean | undefined;
        autoInstallOnAppQuit?: boolean | undefined;
        allowDowngrade?: boolean | undefined;
    } | undefined;
}>>;
type ElectronConfig = z.infer<typeof ElectronConfigSchema>;
type MergedElectronConfig = Required<ElectronConfig>;
declare function getDefaultConfig(): ElectronConfig;
declare function configureApp(userConfig?: Partial<ElectronConfig>): MergedElectronConfig;

/**
 * @fileOverview Main entry point for the nextjs-electron library.
 * This file exports the primary functions and types for users of the library.
 *
 * - launchApp: Function to initialize and launch the Electron application.
 * - ElectronConfig: Type definition for the configuration object.
 */

/**
 * Launches the Electron application with the given user configuration.
 * Merges user config with defaults and starts the Electron app lifecycle.
 *
 * @param userConfig - Optional configuration object for the Electron application.
 */
declare function launchApp(userConfig?: Partial<ElectronConfig>): Promise<void>;

declare function getMainWindow(): BrowserWindow | null;

export { type ElectronConfig, type SecurityConfig, type WebGPUConfig, type WindowOptions, configureApp, getDefaultConfig, getMainWindow, launchApp };
