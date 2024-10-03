const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
    it('should open phone number modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const pnoneNumberModal = await $(page.phoneNumberModal);
        await expect(pnoneNumberModal).toBeExisting();
    })

    it('should save the phone', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })
})
test('TC009 - Login with empty username and password', async () => {
    const response = await login('', '');
    expect(response.message).toBe("Username and password cannot be empty");
});

test('TC010 - Login with maximum length password', async () => {
    const longPassword = 'A'.repeat(255); // Example maximum length
    const response = await login('validUsername', longPassword);
    expect(response.message).toBe("Login successful");
});

test('TC011 - Multiple login attempts with invalid credentials', async () => {
    for (let i = 0; i < 3; i++) {
        const response = await login('validUsername', 'invalidPassword');
        expect(response.message).toBe("Invalid credentials");
    }
    const lockoutResponse = await login('validUsername', 'invalidPassword');
    expect(lockoutResponse.message).toBe("Account temporarily locked");
});

