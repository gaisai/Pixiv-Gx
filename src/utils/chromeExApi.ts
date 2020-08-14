// eslint-disable
/**
 * Chrome拡張でのURLを取得
 * @param assetsPath assetsの相対パス
 */
function getUrl(assetsPath: string) {
    return chrome.extension.getURL(assetsPath);
}

export {
    getUrl,
};
