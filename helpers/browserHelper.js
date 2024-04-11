import * as ChromeLauncher from 'chrome-launcher';
import * as Util from 'util';
import puppeteer from 'puppeteer';
import request from 'request';

export async function launchChromeBrowser() {
    // Launch a google chrome web browser
    const chrome = await ChromeLauncher.launch({
        chromeFlags: ['--incognito'],
        logLevel: 'info',
        output: 'json',
    });

    // Retrieving chrome window's web socket debugger url
    const chromeUrl = `http://127.0.0.1:${chrome.port}/json/version`;
    const response = await Util.promisify(request)(chromeUrl);
    const { webSocketDebuggerUrl } = JSON.parse(response.body);

    // Connect puppeteer to chrome
    const browser = await puppeteer.connect({
        browserWSEndpoint: webSocketDebuggerUrl,
        defaultViewport: null
    });
    
    const context = await browser.createBrowserContext();

    return { browser, context };
}
