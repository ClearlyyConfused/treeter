const { By, Builder, Browser, until } = require('selenium-webdriver');

describe('', () => {
	let driver;
	beforeAll(async () => {
		driver = await new Builder().forBrowser(Browser.CHROME).build();
		await driver.get('http://localhost:3000/');
		await driver.manage().window().maximize();
	});
	afterAll(async () => {
		await driver.quit();
	});

	test('');
});
