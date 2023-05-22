import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let showFooter: AppPage;

  beforeEach(() => {
    showFooter = new AppPage();
  });

  it('should display welcome message', async () => {
    await showFooter.navigateTo();
    expect(await showFooter.getTitleText()).toEqual(
      'Shopping-Online app is running!'
    );
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });
});
