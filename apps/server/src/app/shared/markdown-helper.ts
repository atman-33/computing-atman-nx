import MarkdownIt = require('markdown-it');

/**
 * mdファイル内の画像に文字列を追加
 * @param prefix 
 * @returns 
 */
export function addMdPrefixToImageSource(str: string, prefix: string) : string {
    const md = new MarkdownIt();
    md.renderer.rules.image = (tokens, idx, options, env, self) => {
        const imgToken = tokens[idx];
        const srcIndex = imgToken.attrIndex('src');
        if (imgToken.attrs !== null) {
            const srcValue = imgToken.attrs[srcIndex][1];
            const newSrcValue = prefix + srcValue;
            imgToken.attrs[srcIndex][1] = newSrcValue;
        }
        return self.renderToken(tokens, idx, options);
    };
    return md.render(str);
}

/**
 * mdファイルのコンテンツデータを取得
 * @param str 
 * @returns 
 */
export function getMdContent(str: string): string {
    const startIndex = str.indexOf('---');
    const endIndex = str.indexOf('---', startIndex + 1);
    const content = str.slice(endIndex + 3).trim();

    return content;
}

/**
 * mdファイルのメタデータを取得
 * @param str 
 * @param key 
 * @returns 
 */
export function getMetadataValue(str: string, key: string): string {
    const startIndex = str.indexOf('---');
    const endIndex = str.indexOf('---', startIndex + 1) + 1;
    const metadata = str.slice(startIndex + 3, endIndex).trim();

    const keyStartIndex = metadata.indexOf(key);
    if (keyStartIndex === -1) {
        return '';
    }

    const keyEndIndex = metadata.indexOf('\n', keyStartIndex);
    const value = metadata.slice(keyStartIndex + key.length, keyEndIndex).trim();

    return value;
}

/**
 * mdファイルのメタデータの配列を取得
 * @param str 
 * @param key 
 * @returns 
 */
export function getMetadataArray(str: string, key: string): string[] {

    const find = getMetadataValue(str, key);
    if (find) {
        return [find];
    }

    const startIndex = str.indexOf('---');
    const endIndex = str.indexOf('---', startIndex + 1);
    const metadata = str.slice(startIndex + 3, endIndex).trim();

    const keyStartIndex = metadata.indexOf(key);
    if (keyStartIndex < 0) {
        return [];
    }

    const keyEndIndex = metadata.indexOf(':', keyStartIndex + key.length);
    const value = metadata.slice(keyStartIndex + key.length, keyEndIndex);

    const lines = value.split('\n').filter(line => line.startsWith('-'));
    const values = lines.map(v => v.slice(1).trim());

    return values;
}
