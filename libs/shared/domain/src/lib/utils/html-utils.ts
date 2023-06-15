/**
  * htmlのタグにクラスを追加
  * @param html 
  * @param className 
  * @param tagName 
  * @returns 
  */
export function addClassToHtml(html: string, className: string, tagName: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const elements = doc.querySelectorAll(tagName);
    elements.forEach((el) => {
        el.classList.add(className);
    });
    return doc.documentElement.innerHTML;
}

/**
 * 要素の終了タグの後ろにテキストを追加
 * @param html
 * @param tagName 
 * @param text 
 * @returns 
 */
export function addTextAfterClosingTag(html: string, tagName: string, text: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const elements = doc.querySelectorAll(tagName);
    elements.forEach((el) => {
        const textNode = document.createTextNode(text);
        if (el.parentNode) {
            el.parentNode.insertBefore(textNode, el.nextSibling);
        }
    });
    return doc.documentElement.innerHTML.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
}

/**
 * HTML要素を除去して、指定した文字数を抽出
 * 記事のリード文抽出などに利用
 * @param article 
 * @param maxLength 
 * @returns 
 */
export function extractLead(article: string, maxLength: number): string {
    // HTML要素を除去する
    const div = document.createElement('div');
    div.innerHTML = article;
    const text = div.textContent || div.innerText || '';

    let truncated = text.substring(0, maxLength);
    if (text.length > maxLength) {
        truncated += '...';
    }
    return truncated;
}