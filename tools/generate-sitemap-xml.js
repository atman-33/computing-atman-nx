/**
 * Usage
 * node tools/generate-sitemap-xml.js
 */

const fs = require('fs');
const path = require('path');

function generateSitemapXml(folderPath) {
  const subfolders = fs.readdirSync(folderPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const currentDate = new Date().toISOString(); // 現在の日時をW3C datetime形式で取得

  const sitemapUrls = subfolders.map(subfolder => {
    const url = `https://computing-atman.onrender.com/blog/posts/${subfolder}`;
    const lastmod = `<lastmod>${currentDate}</lastmod>`; // 現在の日時をlastmod要素に追加
    return `<url><loc>${url}</loc>${lastmod}</url>`;
  });

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapUrls.join('\n')}
    </urlset>`;

  const outputFilePath = path.join(__dirname, 'sitemap.xml');
  fs.writeFileSync(outputFilePath, sitemapXml);
}

// フォルダパスを指定してサイトマップXMLを生成する
const folderPath = './apps/server/src/assets/posts';
generateSitemapXml(folderPath);
