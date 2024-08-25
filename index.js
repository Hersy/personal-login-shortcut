import config from './config.js';
import { launchChromeBrowser } from './helpers/browserHelper.js';
import { loginToWebsite } from './helpers/pageHelper.js';

const { websites } = config;

(async () => {
    // Launch chrome incognito window
    const { browser, context } = await launchChromeBrowser();

    for (const website of websites) {
        // Open tab
        const page = await context.newPage();

        // Navigate to website
        const navigationPromise = page.waitForNavigation();
        await page.goto(website.url);
        await navigationPromise;
        
        // Wait for site to load
        if (website.url.includes('accounts.google.com'))
            // Login to google
            await loginToWebsite(page, website, navigationPromise, '#identifierId', 'input[name="Passwd"]', '#passwordNext', '#identifierNext');
        else if (website.url.includes('discord.com'))
            // Login to discord
            await loginToWebsite(page, website, navigationPromise, 'input[name="email"]', 'input[name="password"]', 'button[type="submit"]');
        else if (website.url.includes('dwservice.net'))
            // Login to dw-service
            await loginToWebsite(page, website, navigationPromise, 'input[autocomplete="email"]', 'input[type="password"]', '#id54_button', '#id52_panel');
    }
})();
