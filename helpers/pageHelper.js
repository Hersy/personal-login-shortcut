export async function loginToWebsite(page, website, navigationPromise, emailSelector, passwordSelector, submitSelector, nextSelector = null) {
  // Set email selector and click it's field
  await page.waitForSelector(emailSelector);
  await page.click(emailSelector);

  // Type email into it's field
  await page.type(emailSelector, website.username);
  
  if (nextSelector) {
      // Set 'next' button's selector and click it's field
      await page.waitForSelector(nextSelector);
      await page.click(nextSelector);

      // Wait for password page to load
      await new Promise(resolve => setTimeout(resolve, 2500));
  }

  // Set password selector and click it's field
  await page.waitForSelector(passwordSelector);
  await page.click(passwordSelector);

  // Type password into it's field
  await page.type(passwordSelector, website.password);
  
  // Set 'next' button's selector and click it's field
  await page.waitForSelector(submitSelector);
  await page.click(submitSelector);

  // Wait for site to load
  await navigationPromise;
}
