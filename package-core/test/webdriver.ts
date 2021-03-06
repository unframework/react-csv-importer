import { Builder, ThenableWebDriver } from 'selenium-webdriver';
import { Options as ChromeOptions } from 'selenium-webdriver/chrome';
import 'chromedriver';

export function runDriver(): () => ThenableWebDriver {
  let webdriver: ThenableWebDriver | null = null;

  // same webdriver instance serves all the tests in the suite
  before(function () {
    webdriver = new Builder()
      .forBrowser('chrome')
      .setChromeOptions(
        process.env.CI ? new ChromeOptions().headless() : new ChromeOptions()
      )
      .build();
  });

  after(async function () {
    if (!webdriver) {
      throw new Error(
        'cannot clean up webdriver because it was not initialized'
      );
    }

    await webdriver.quit();

    // complete cleanup
    webdriver = null;
  });

  // expose singleton getter
  return () => {
    if (!webdriver) {
      throw new Error('webdriver not initialized');
    }

    return webdriver;
  };
}
