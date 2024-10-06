class OrderPage {
    // Selectors
    get addressInput() { return $('#address-input'); }
    get submitAddressButton() { return $('#submit-address'); }
    get addressConfirmation() { return $('#address-confirmation'); }

    get planDropdown() { return $('#support-plan-dropdown'); }
    get supportivePlanOption() { return $('#support-plan-option-supportive'); }
    get selectedPlan() { return $('#selected-support-plan'); }

    get phoneInput() { return $('#phone-number'); }
    get phoneConfirmButton() { return $('#phone-number-confirm'); }
    get phoneConfirmation() { return $('#phone-confirmation'); }

    get addCardButton() { return $('#add-card'); }
    get cardNumberInput() { return $('#card-number'); }
    get cardExpiryInput() { return $('#card-expiry'); }
    get cardCVVInput() { return $('#card-cvv'); }
    get linkCardButton() { return $('#link-card'); }
    get cardLinkConfirmation() { return $('#card-link-confirmation'); }

    get driverMessageInput() { return $('#driver-message'); }
    get submitMessageButton() { return $('#submit-driver-message'); }
    get messageConfirmation() { return $('#message-confirmation'); }

    get blanketCheckbox() { return $('#blanket-checkbox'); }
    get handkerchiefCheckbox() { return $('#handkerchief-checkbox'); }

    get iceCreamDropdown() { return $('#ice-cream-dropdown'); }
    get iceCreamOption2() { return $('#ice-cream-option-2'); }
    get iceCreamOrderConfirmation() { return $('#ice-cream-order'); }

    get orderButton() { return $('#order-taxi-button'); }
    get carSearchModal() { return $('#car-search-modal'); }

    get driverInfo() { return $('#driver-info'); }

    // Actions
    open() {
        browser.url('/order-taxi');
    }

    setPickupAddress(address) {
        this.addressInput.setValue(address);
        this.submitAddressButton.click();
    }

    selectSupportivePlan() {
        this.planDropdown.click();
        this.supportivePlanOption.click();
    }

    setPhoneNumber(phone) {
        this.phoneInput.setValue(phone);
        this.phoneConfirmButton.click();
    }

    addCreditCard(number, expiry, cvv) {
        this.addCardButton.click();
        this.cardNumberInput.setValue(number);
        this.cardExpiryInput.setValue(expiry);
        this.cardCVVInput.setValue(cvv);
        browser.keys('Tab');
        this.linkCardButton.click();
    }

    addDriverMessage(message) {
        this.driverMessageInput.setValue(message);
        this.submitMessageButton.click();
    }

    orderBlanketAndHandkerchiefs() {
        this.blanketCheckbox.click();
        this.handkerchiefCheckbox.click();
    }

    orderIceCream() {
        this.iceCreamDropdown.click();
        this.iceCreamOption2.click();
    }
}

module.exports = new OrderPage();

module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    // Modals
    phoneNumberModal: '.modal',
    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },
};