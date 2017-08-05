import { OneNightPage } from './app.po';

describe('one-night App', () => {
  let page: OneNightPage;

  beforeEach(() => {
    page = new OneNightPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
