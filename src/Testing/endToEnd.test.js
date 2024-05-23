const { By, Builder, Browser, until } = require('selenium-webdriver');

function randomString(length) {
	let string = '';
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let counter = 0;
	while (counter < length) {
		string += chars.charAt(Math.floor(Math.random() * chars.length));
		counter += 1;
	}
	return string;
}

describe('Test login page of site', () => {
	let driver;
	beforeAll(async () => {
		driver = await new Builder().forBrowser(Browser.CHROME).build();
		await driver.get('http://localhost:3000/');
		await driver.manage().window().maximize();
		await driver.wait(until.elementLocated(By.xpath('//button[text()="LOGIN"]'))).then(async (e) => {
			await e.click();
		});
	});
	afterAll(async () => {
		await driver.quit();
	});

	test("Login to account with user that doesn't exist returns an error", async () => {
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

	test('Login to account with correct username and password brings user to main page', async () => {
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
		const sidebarUsername = await driver.wait(until.elementLocated(By.css('h2'))).then((e) => e.getText());
		expect(title).toBe('Home');
		expect(sidebarUsername).toBe('Test');
	});
});

describe('Test register page of site', () => {
	let driver;
	beforeAll(async () => {
		driver = await new Builder().forBrowser(Browser.CHROME).build();
		await driver.get('http://localhost:3000/');
		await driver.manage().window().maximize();
		await driver.wait(until.elementLocated(By.xpath('//button[text()="REGISTER"]'))).then(async (e) => {
			await e.click();
		});
	});
	afterAll(async () => {
		await driver.quit();
	});

	test('Registering without a username returns an error', async () => {
		await driver.wait(until.elementLocated(By.xpath('//button[text()="Submit"]'))).then(async (e) => {
			await e.click();
		});
		const message = await driver
			.wait(until.elementLocated(By.name('username')))
			.then((e) => e.getAttribute('validationMessage'));
		expect(message).toBe('Please fill out this field.');
	});

	test('Registering without a password returns an error', async () => {
		await driver.wait(until.elementLocated(By.name('username'))).then(async (e) => {
			await e.clear();
			await e.sendKeys('user');
		});
		await driver.wait(until.elementLocated(By.xpath('//button[text()="Submit"]'))).then(async (e) => {
			await e.click();
		});
		const message = await driver
			.wait(until.elementLocated(By.name('password')))
			.then((e) => e.getAttribute('validationMessage'));
		expect(message).toBe('Please fill out this field.');
	});

	test('Registering with a username < 3 chars returns an error', async () => {
		await driver.wait(until.elementLocated(By.name('username'))).then(async (e) => {
			await e.clear();
			await e.sendKeys('123');
		});
		await driver.wait(until.elementLocated(By.xpath('//button[text()="Submit"]'))).then(async (e) => {
			await e.click();
		});
		const message = await driver
			.wait(until.elementLocated(By.name('username')))
			.then((e) => e.getAttribute('validationMessage'));
		expect(message).toBe(
			'Please lengthen this text to 4 characters or more (you are currently using 3 characters).'
		);
	});

	test('Registering with a password < 3 chars returns an error', async () => {
		await driver.wait(until.elementLocated(By.name('username'))).then(async (e) => {
			await e.clear();
			await e.sendKeys('Test');
		});
		await driver.wait(until.elementLocated(By.name('password'))).then(async (e) => {
			await e.clear();
			await e.sendKeys('123');
		});
		await driver.wait(until.elementLocated(By.xpath('//button[text()="Submit"]'))).then(async (e) => {
			await e.click();
		});
		const message = await driver
			.wait(until.elementLocated(By.name('password')))
			.then((e) => e.getAttribute('validationMessage'));
		expect(message).toBe(
			'Please lengthen this text to 4 characters or more (you are currently using 3 characters).'
		);
	});

	test('Registering with an already existing username returns an error', async () => {
		await driver.wait(until.elementLocated(By.name('username'))).then(async (e) => {
			await e.clear();
			await e.sendKeys('Test');
		});
		await driver.wait(until.elementLocated(By.name('password'))).then(async (e) => {
			await e.clear();
			await e.sendKeys('1234');
		});
		await driver.wait(until.elementLocated(By.xpath('//button[text()="Submit"]'))).then(async (e) => {
			await e.click();
		});
		const message = await driver
			.wait(until.elementLocated(By.className('error-message')))
			.then((e) => e.getText());
		expect(message).toBe('Username already exists');
	});

	test('Registering with a valid username and password brings user to the home page', async () => {
		const username = randomString(6);
		const password = randomString(6);
		await driver.wait(until.elementLocated(By.name('username'))).then(async (e) => {
			await e.clear();
			await e.sendKeys(username);
		});
		await driver.wait(until.elementLocated(By.name('password'))).then(async (e) => {
			await e.clear();
			await e.sendKeys(password);
		});
		await driver.wait(until.elementLocated(By.xpath('//button[text()="Submit"]'))).then(async (e) => {
			await e.click();
		});
		const title = await driver
			.wait(until.elementLocated(By.xpath('//h1[text()="Home"]')))
			.then((e) => e.getText());
		const sidebarUsername = await driver.wait(until.elementLocated(By.css('h2'))).then((e) => e.getText());
		expect(title).toBe('Home');
		expect(sidebarUsername).toBe(username);
	});
});
