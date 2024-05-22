const { By, Builder, Browser, until } = require('selenium-webdriver');

describe('Test authentication of site', () => {
	let driver;
	beforeAll(async () => {
		driver = await new Builder().forBrowser(Browser.CHROME).build();
		await driver.get('http://localhost:3000/');
		await driver.manage().window().maximize();
	});
	afterAll(async () => {
		await driver.quit();
	});

	test("Login to account with user that doesn't exist returns an error", async () => {
		await driver.wait(until.elementLocated(By.xpath('//button[text()="LOGIN"]'))).then(async (e) => {
			await e.click();
		});
		await driver.wait(until.elementLocated(By.name('username'))).then(async (e) => {
			await e.sendKeys('-1');
		});
		await driver.wait(until.elementLocated(By.xpath('//button[text()="Submit"]'))).then(async (e) => {
			await e.click();
		});
		const message = await driver
			.wait(until.elementLocated(By.className('error-message')))
			.then((e) => e.getText());
		expect(message).toBe('Username not found');
	});

	test('Login to account with incorrect password returns an error', async () => {
		await driver.wait(until.elementLocated(By.name('username'))).then(async (e) => {
			await e.clear();
			await e.sendKeys('Test');
		});
		await driver.wait(until.elementLocated(By.name('password'))).then(async (e) => {
			await e.sendKeys('-1');
		});
		await driver.wait(until.elementLocated(By.xpath('//button[text()="Submit"]'))).then(async (e) => {
			await e.click();
		});
		const message = await driver
			.wait(until.elementLocated(By.className('error-message')))
			.then((e) => e.getText());
		expect(message).toBe('Incorrect password');
	});

	test('Login to account with correct username and password', async () => {
		await driver.wait(until.elementLocated(By.name('username'))).then(async (e) => {
			await e.clear();
			await e.sendKeys('Test');
		});
		await driver.wait(until.elementLocated(By.name('password'))).then(async (e) => {
			await e.clear();
			await e.sendKeys('testPassword');
		});
		await driver.wait(until.elementLocated(By.xpath('//button[text()="Submit"]'))).then(async (e) => {
			await e.click();
		});
		const title = await driver
			.wait(until.elementLocated(By.xpath('//h1[text()="Home"]')))
			.then((e) => e.getText());
		expect(title).toBe('Home');
	});
});
