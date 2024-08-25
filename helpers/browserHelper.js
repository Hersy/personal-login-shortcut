import * as ChromeLauncher from 'chrome-launcher';
import * as Util from 'util';
import * as puppeteer from "puppeteer";
import request from 'request';

export async function launchChromeBrowser() {
/*    // Launch a google chrome web browser
    const chrome = await ChromeLauncher.launch({
    headless: false,
});

    // Retrieving chrome window's web socket debugger url
    const chromeUrl = `http://127.0.0.1:${chrome.port}/json/version`;
    const response = await Util.promisify(request)(chromeUrl);
    const { webSocketDebuggerUrl } = JSON.parse(response.body);

    // Connect puppeteer to chrome
  
    const browser = await puppeteer.connect({
        browserWSEndpoint: webSocketDebuggerUrl,
        defaultViewport: null,
    }) 
*/
    const browser = await puppeteer.launch({
    headless: false, 
    ignoreDefaultArgs: ['--mute-audio'],
    args: [  
        '--enable-features=AudioServiceOutOfProcess', 
        '--no-sandbox', 
        '--disable-setuid-sandbox',
        '--disable-infobars',
        '--ignore-certificate-errors',
        '--disable-blink-features=AutomationControlled'
    ],
    defaultViewport: null,
    });
    
    const context = await browser.createBrowserContext();

    return { browser, context };
    
}
