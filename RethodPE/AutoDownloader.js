const Utils_ = net.zhuoweizhang.mcpelauncher.Utils,
    PATH_FREE = "/sdcard/games/com.mojang/RethodPE for Free.apk",
    PATH_PRO = "/sdcard/games/com.mojang/RethodPE for Pro.apk",
    PATH_DEX = "/sdcard/games/com.mojang/RethodPEDex.dex",
    ADDON_URL_FREE = "https://github.com/ljuwon321/RethodPE-APK/raw/master/VERSION/RethodPE%20for%20FREE.apk",
    ADDON_URL_PRO = "https://github.com/ljuwon321/RethodPE-APK/raw/master/VERSION/RethodPE%20for%20PRO.apk",
    DEX_URL = "https://github.com/ljuwon321/RethodPE-APK/raw/master/VERSION/Dex/RethodPEDex.dex",
    GITHUB_URL = "https://github.com/ljuwon321/RethodPE-APK",
    VERSIONS = ["1.0.0.16", "1.0.2.1"];

let isLibraryLoaded = false;

function onLibraryLoaded(name, nameCode, version) {
    if (nameCode === "me_astro_library") {
        isLibraryLoaded = true;
    }
}

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
    ModPE.showTipMessage("Error: Unsupported version");
};

RethodPE.prototype.isEnabled = function () {
    return this._addonManager.isEnabled();
};

RethodPE.prototype.isInstalled = function () {
    return this._addonManager.isInstalled();
};

RethodPE.prototype.setEnabled = function () {
    this._addonManager.setEnabled();
};

function chatHook(str) {
    if (isLibraryLoaded) {
        let rethodPE = new RethodPE();
        if (str === ".install") {
            rethodPE.install();
        } else if (str === ".enable") {
            rethodPE.setEnabled();
        }
    }
}