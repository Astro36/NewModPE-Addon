const Utils_ = net.zhuoweizhang.mcpelauncher.Utils,
    PATH_FREE = "/sdcard/games/com.mojang/RethodPE for Free.apk",
    PATH_PRO = "/sdcard/games/com.mojang/RethodPE for Pro.apk",
    PATH_DEX = "/sdcard/games/com.mojang/RethodPEDex.dex",
    ADDON_URL_FREE = "https://github.com/ljuwon321/RethodPE-APK/raw/master/VERSION/RethodPE%20for%20FREE.apk",
    ADDON_URL_PRO = "https://github.com/ljuwon321/RethodPE-APK/raw/master/VERSION/RethodPE%20for%20PRO.apk",
    DEX_URL = "https://github.com/ljuwon321/RethodPE-APK/raw/master/VERSION/Dex/RethodPEDex.dex",
    GITHUB_URL = "https://github.com/ljuwon321/RethodPE-APK",
    VERSIONS = ["1.0.0.16", "1.0.2.1"],
    NAME = "RethodPE Downloader",
    NAME_CODE = "rethodpe_downloader",
    VERSION = "1.0",
    DEVELOPER = "Astro",
    LICENSE_TEXT = "RethodPE Downloader is licensed under the GNU Lesser General Public License, Version 3 (LGPL-3.0).";

let CONTEXT,
    DP,
    PATH,
    theme,
    icDownloadBitmap;



function RethodPE() {
    this._addonManager = new me.astro.utils.AddonManager("com.ljuwon.rethodpe");
}

RethodPE.prototype.getUrl = function () {
    return this._githubUrl;
};

RethodPE.prototype.install = function () {
    let addonManager = this._addonManager,
        version = ModPE.getMinecraftVersion();
    me.astro.utils.File.download(PATH_DEX, DEX_URL.replace("VERSION", version));
    for (let i = VERSIONS.length; i--;) {
        if (version === VERSIONS[i]) {
            if (Utils_.isPro()) {
                addonManager.download(PATH_PRO, ADDON_URL_PRO.replace("VERSION", version));
            } else {
                addonManager.download(PATH_FREE, ADDON_URL_FREE.replace("VERSION", version));
            }
            return;
        }
    }
    me.astro.widget.Toast.show("Error: This version is not supported. Check your Minecraft PE version.");
};

RethodPE.prototype.isEnabled = function () {
    return this._addonManager.isEnabled();
};

RethodPE.prototype.isInstalled = function () {
    return CONTEXT.getPackageManager().getLaunchIntentForPackage("com.ljuwon.rethodpe") !== null;
};

RethodPE.prototype.setEnabled = function () {
    this._addonManager.setEnabled();
};

function showInstaller() {
    let rethodPE = new RethodPE();
    CONTEXT.runOnUiThread({
        run() {
            try {
                let window = new me.astro.widget.Window(theme);
                window.addLayout(icDownloadBitmap, new me.astro.widget.Layout(theme)
                        .addView(new me.astro.widget.TextView()
                            .setPadding(DP * 8, DP * 16, DP * 8, DP * 4)
                            .setText("Installer")
                            .setTextSize(24)
                            .show())
                        .addView(new me.astro.widget.TextView()
                            .setText("Install the addon")
                            .setTextSize(14)
                            .show())
                        .addView(new me.astro.widget.Button(theme)
                            .setText("Install")
                            .setEffect(() => rethodPE.install())
                            .show())
                        .addView(new me.astro.widget.TextView()
                            .setText("Enable the addon")
                            .setTextSize(14)
                            .show())
                        .addView(new me.astro.widget.Button(theme)
                            .setText("Enable")
                            .setEffect(() => rethodPE.setEnabled())
                            .show())
                        .addView(new me.astro.widget.TextView()
                            .setText("After you install and enable the addon, restart BlockLauncher.")
                            .setTextColor(me.astro.design.Color.GREY_DARK)
                            .show())
                        .addView(new me.astro.widget.Button(theme)
                            .setText("Close")
                            .setEffect(() => window.dismiss())
                            .show())
                        .show())
                    .addLayout(me.astro.design.Bitmap.createBitmap(PATH + "ic_info_outline.png"), new me.astro.widget.Layout(theme)
                        .addView(new me.astro.widget.TextView()
                            .setPadding(DP * 8, DP * 16, DP * 8, DP * 4)
                            .setText("Script Info")
                            .setTextSize(24)
                            .show())
                        .addView(new me.astro.widget.TextView()
                            .setText(NAME + " " + VERSION + "\n\nName Code: " + NAME_CODE + "\nDeveleoper: " + DEVELOPER + "\n\n")
                            .setTextColor(me.astro.design.Color.GREY_DARK)
                            .show())
                        .addView(new me.astro.widget.TextView()
                            .setPadding(DP * 8, DP * 16, DP * 8, DP * 4)
                            .setText("License")
                            .setTextSize(24)
                            .show())
                        .addView(new me.astro.widget.TextView()
                            .setText(LICENSE_TEXT)
                            .setTextColor(me.astro.design.Color.GREY_DARK)
                            .show())
                        .addView(new me.astro.widget.Button(theme)
                            .setText("Close")
                            .setEffect(() => window.dismiss())
                            .show())
                        .show())
                    .setFocusable(true)
                    .show();
            } catch (e) {
                print(e);
            }
        }
    });
}

function showEditor() {
    let rethodPE = new RethodPE();
    CONTEXT.runOnUiThread({
        run() {
            try {
                let window = new me.astro.widget.Window(theme);
                window.addLayout(me.astro.design.Bitmap.createBitmap(PATH + "ic_edit.png"), (() => {
                        if (rethodPE.isInstalled() && rethodPE.isEnabled() && typeof R_Player !== "undefined") {
                            return new me.astro.widget.Layout(theme).addView(new me.astro.widget.TextView()
                                    .setPadding(DP * 8, DP * 16, DP * 8, DP * 4)
                                    .setText("Editor")
                                    .setTextSize(24)
                                    .show())
                                .addView(new me.astro.widget.TextView()
                                    .setText("Prevent block destruction")
                                    .setTextSize(14)
                                    .show())
                                .addView(new me.astro.widget.Layout(theme)
                                    .addView(new me.astro.widget.Button(theme)
                                        .setText("On")
                                        .setEffect(() => R_Server.protectBlock(true))
                                        .show())
                                    .addView(new me.astro.widget.Button(theme)
                                        .setText("Off")
                                        .setEffect(() => R_Server.protectBlock(false))
                                        .show())
                                    .setOrientation(0)
                                    .show())
                                .addView(new me.astro.widget.TextView()
                                    .setText("Disable join to the server")
                                    .setTextSize(14)
                                    .show())
                                .addView(new me.astro.widget.Layout(theme)
                                    .addView(new me.astro.widget.Button(theme)
                                        .setText("On")
                                        .setEffect(() => R_Server.enableJoin(false))
                                        .show())
                                    .addView(new me.astro.widget.Button(theme)
                                        .setText("Off")
                                        .setEffect(() => R_Server.enableJoin(true))
                                        .show())
                                    .setOrientation(0)
                                    .show())
                                .addView(new me.astro.widget.TextView()
                                    .setText("Keep player inventory")
                                    .setTextSize(14)
                                    .show())
                                .addView(new me.astro.widget.Layout(theme)
                                    .addView(new me.astro.widget.Button(theme)
                                        .setText("On")
                                        .setEffect(() => R_Player.enableInventorySave(true))
                                        .show())
                                    .addView(new me.astro.widget.Button(theme)
                                        .setText("Off")
                                        .setEffect(() => R_Player.enableInventorySave(false))
                                        .show())
                                    .setOrientation(0)
                                    .show())
                                .addView(new me.astro.widget.TextView()
                                    .setText("Stop moving arrows")
                                    .setTextSize(14)
                                    .show())
                                .addView(new me.astro.widget.Layout(theme)
                                    .addView(new me.astro.widget.Button(theme)
                                        .setText("On")
                                        .setEffect(() => R_Arrow.setPause(true))
                                        .show())
                                    .addView(new me.astro.widget.Button(theme)
                                        .setText("Off")
                                        .setEffect(() => R_Arrow.setPause(false))
                                        .show())
                                    .setOrientation(0)
                                    .show())
                                .addView(new me.astro.widget.Button(theme)
                                    .setText("Close")
                                    .setEffect(() => window.dismiss())
                                    .show())
                                .show();
                        } else {
                            return new me.astro.widget.Layout(theme).addView(new me.astro.widget.TextView()
                                    .setPadding(DP * 8, DP * 16, DP * 8, DP * 4)
                                    .setText("Error")
                                    .setTextSize(24)
                                    .show())
                                .addView(new me.astro.widget.TextView()
                                    .setText("Enable RethodPE addon")
                                    .setTextSize(14)
                                    .show())
                                .addView(new me.astro.widget.Button(theme)
                                    .setText("Close")
                                    .setEffect(() => window.dismiss())
                                    .show())
                                .show();
                        }
                    })())
                    .setFocusable(true)
                    .show();
            } catch (e) {
                print(e);
            }
        }
    });
}



function onLibraryLoaded(name, nameCode, version) {
    if (nameCode === "me_astro_library") {
        CONTEXT = me.astro.getContext();
        DP = CONTEXT.getResources().getDisplayMetrics().density;
        PATH = me.astro.getPath();
        theme = new me.astro.design.Theme({
            primary: me.astro.design.Color.RED,
            primaryDark: me.astro.design.Color.RED_DARK,
            accent: me.astro.design.Color.RED_ACCENT
        });
        icDownloadBitmap = me.astro.design.Bitmap.decodeBase64("iVBORw0KGgoAAAANSUhEUgAAAMAAAADAAgMAAAAvsoSUAAAADFBMVEUAAAD///////////84wDuoAAAABHRSTlMA/wCA4LPRVwAAAQFJREFUeAHt1KFtA1AMRdEs+VXWQTqSLUOP4iUyRWmk/MOrxo8fcMl77P7+drvdeVm87RFvW7BgwYIFCxYs+BAwh/u6gjb4voIy+LmCNHjeo8cJd9BMACgmACQTAGKYANBMACgmACQTAGKYANBMACgmACQTAGKYANBMACgmACQTAGKYANBMACgmACQTAGKYANBMACgmACQTAGKYANBMACgmACQTAGKYANBMACgkECQSCGKQQNBIICgkECQSCGKQQNBIICgkECQSCGKQQNBIICgkECQSCGKQQNBIICgkECQSCGKQQNBIICgkEOSTQPtosGDB8c6CBf8c7Al4CxYsWLDgF/MZlb0HdH39AAAAAElFTkSuQmCC");
        me.astro.widget.NotificationWindow.getInstance().addNotification("RethodPE", "BlockLauncher addon which improves ModPE API.");
        CONTEXT.runOnUiThread({
            run() {
                me.astro.getWindow().addView(new me.astro.widget.ImageButton(me.astro.design.Shape.CIRCLE, theme)
                        .setEffect(showInstaller)
                        .setEffectImage(me.astro.design.Bitmap.resizeBitmap(icDownloadBitmap, DP * 24, DP * 24))
                        .setImage(me.astro.design.Bitmap.resizeBitmap(icDownloadBitmap, DP * 24, DP * 24))
                        .show())
                    .addView(new me.astro.widget.ImageButton(me.astro.design.Shape.CIRCLE, theme)
                        .setEffect(showEditor)
                        .setEffectImage(me.astro.design.Bitmap.resizeBitmap(me.astro.design.Bitmap.createBitmap(PATH + "ic_edit.png"), DP * 24, DP * 24))
                        .setImage(me.astro.design.Bitmap.resizeBitmap(me.astro.design.Bitmap.createBitmap(PATH + "ic_edit.png"), DP * 24, DP * 24))
                        .show());
            }
        });
    }
}

// Thanks to Vertex-Client
function preventChat() {
    CONTEXT.nativeSetTextboxText("");
    CONTEXT.updateTextboxText("");
}

function chatHook(str) {
    if (typeof CONTEXT !== "undefined") {
        let rethodPE = new RethodPE();
        if (str === ".install") {
            preventDefault();
            preventChat();
            rethodPE.install();
        } else if (str === ".enable") {
            preventDefault();
            preventChat();
            rethodPE.setEnabled();
        } else if (str === ".installer") {
            preventDefault();
            preventChat();
            showInstaller();
        } else if (str === ".editor") {
            preventDefault();
            preventChat();
            showEditor();
        }
    }
}