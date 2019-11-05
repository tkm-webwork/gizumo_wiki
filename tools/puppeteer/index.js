const puppeteer = require('puppeteer');
const fs = require('fs');

const TARGET_URL = 'http://localhost:8000';
const CAPTURE_PATH = 'tools/puppeteer/screenshot/';
// スクリーンショット保存ディレクトリがなければ作成
if (!fs.existsSync(CAPTURE_PATH)) {
  fs.mkdirSync(CAPTURE_PATH);
}
const user = process.env.USER || null;
const pass = process.env.PASS || null;

const addCategory = Math.random().toString(32).substring(2);

(async () => {
  if (!user || !pass) {
    throw new Error('not exist user or password');
  }
  console.log('==================================================');
  console.log('<==USE ACCOUNT==>');
  console.log('USER: ', user);
  console.log('PASS: ', pass);
  console.log('==================================================');
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(TARGET_URL);
    // ログイン情報入力
    await page.type('#mail > div > input', user);
    await page.type('#pass > div > input', pass);
    // ログイン直前の画面出力
    await page.screenshot({
      path: `${CAPTURE_PATH}beforeLogin.png`,
      fullPage: true,
    });
    // サインインボタン押下
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      page.waitForNavigation({ waitUntil: 'networkidle2' }),
      page.click('.login-button > button'),
    ]);
    // 表示完了まで待つ
    await page.waitFor(3000);
    await page.screenshot({
      path: `${CAPTURE_PATH}afterLogin.png`,
      fullPage: true,
    });
    // サイドバーボタン押下
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      page.waitForNavigation({ waitUntil: 'networkidle2' }),
      page.click('#toCategory > a'),
    ]);
    // 表示完了まで待つ
    await page.waitFor(3000);
    await page.screenshot({
      path: `${CAPTURE_PATH}categoryList_firstView.png`,
      fullPage: true,
    });
    // バリデートエラーパターン
    await page.click('.category-management-post__submit');
    await page.waitFor(3000);
    await page.screenshot({
      path: `${CAPTURE_PATH}categoryList_wrongValidate.png`,
      fullPage: true,
    });
    // 値を入力して送信
    await page.type('form > div > input', addCategory);
    await page.screenshot({
      path: `${CAPTURE_PATH}categoryList_inputValue.png`,
      fullPage: true,
    });
    await page.click('.category-management-post__submit');
    await page.waitFor(3000);
    // カテゴリー追加後の表示
    await page.screenshot({
      path: `${CAPTURE_PATH}categoryList_afterSubmit.png`,
      fullPage: true,
    });
  } catch (e) {
    console.log(e);
  } finally {
    await browser.close();
  }
})();
