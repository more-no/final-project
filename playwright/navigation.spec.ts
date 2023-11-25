import test from '@playwright/test';

test('navigation test', async ({ page }) => {
  await page.goto('https://final-project-upleveled.fly.dev/');
  await page.getByRole('button', { name: 'Login' }).first().click();
  await page.getByPlaceholder('username', { exact: true }).fill('manuel');
  await page.getByPlaceholder('username', { exact: true }).press('Tab');
  await page.getByPlaceholder('password').fill('manuel323');
  await page.getByPlaceholder('password').press('Enter');
  await page
    .locator('#my_modal_2')
    .getByRole('button', { name: 'Login' })
    .click();
  await page.getByPlaceholder('Where are you going?').click();
  await page.getByPlaceholder('Where are you going?').fill('Vienna');
  await page.getByPlaceholder('Where are you going?').press('Enter');
  await page.getByRole('link', { name: 'See Profile' }).nth(1).click();
  await page.getByRole('link', { name: 'Contact' }).click();
  await page.getByRole('link', { name: 'Map' }).click();
  await page.locator('.css-19bb58m').click();
  await page.locator('[id="react-select-\\:r0\\:-input"]').fill('Vienna');
  await page.getByRole('option', { name: 'Vienna, Austria' }).click();
  await page.getByRole('button', { name: 'Save Changes' }).click();
  await page.getByRole('button', { name: 'Save Changes' }).press('F5');
  await page.getByRole('button', { name: 'Marker' }).nth(1).click();
  await page.getByRole('link', { name: 'manuel Available: No Last' }).click();
  await page
    .locator('div')
    .filter({ hasText: 'My profileMapFind a hostMy' })
    .getByRole('button')
    .click();
  await page.getByRole('button', { name: 'Logout' }).click();
});

test('edit data test', async ({ page }) => {
  await page.goto('https://final-project-upleveled.fly.dev/');
  await page.getByRole('button', { name: 'Login' }).first().click();
  await page.getByPlaceholder('username', { exact: true }).fill('manuel');
  await page.getByPlaceholder('username', { exact: true }).press('Tab');
  await page.getByPlaceholder('password').fill('manuel323');
  await page.getByPlaceholder('password').press('Enter');
  await page.getByRole('link', { name: 'My profile' }).click();
  await page
    .locator('div')
    .filter({ hasText: 'My profileMapFind a hostMy' })
    .getByRole('button')
    .click();
  await page.getByRole('link', { name: 'Edit Profile' }).click();
  await page.getByLabel("Gender I am I'd rather not").selectOption('Male');
  await page
    .locator('form')
    .filter({ hasText: "Gender I am I'd rather not" })
    .getByRole('button')
    .click();
  await page.getByLabel('Host animals:').uncheck();
  await page
    .locator('form')
    .filter({ hasText: 'Available to host: Last' })
    .getByRole('button')
    .click();
  await page.getByRole('link', { name: 'My profile' }).click();
  await page
    .locator('div')
    .filter({ hasText: 'My profileMapFind a hostMy' })
    .getByRole('button')
    .click();
  await page.getByRole('link', { name: 'Edit Profile' }).click();
  await page
    .getByLabel("Gender I am I'd rather not")
    .selectOption('Non-binary');
  await page
    .locator('form')
    .filter({ hasText: "Gender I am I'd rather not" })
    .getByRole('button')
    .click();
  await page.getByLabel('Host animals:').check();
  await page
    .locator('form')
    .filter({ hasText: 'Available to host: Last' })
    .getByRole('button')
    .click();
  await page.getByRole('link', { name: 'My profile' }).click();
  await page
    .locator('div')
    .filter({ hasText: 'My profileMapFind a hostMy' })
    .getByRole('button')
    .click();
  await page.getByRole('button', { name: 'Logout' }).click();
});
