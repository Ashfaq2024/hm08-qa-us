const OrderPage = require('../../pages/OrderPage');

describe('Order Taxi Tests', () => {

    // This will run before each test to open the page in a new session
    beforeEach(() => {
        browser.reloadSession();
        OrderPage.open();
    });

    it('should allow the user to set a pickup address', () => {
        OrderPage.setPickupAddress('123 Main St');
        expect(OrderPage.addressConfirmation).toHaveTextContaining('123 Main St');
    });

    it('should allow the user to select a supportive plan', () => {
        OrderPage.selectSupportivePlan();
        expect(OrderPage.selectedPlan).toHaveTextContaining('Supportive');
    });

    it('should allow the user to fill in the phone number', () => {
        OrderPage.setPhoneNumber('555-123-4567');
        expect(OrderPage.phoneConfirmation).toHaveTextContaining('555-123-4567');
    });

    it('should allow the user to add a credit card', () => {
        OrderPage.addCreditCard('4111 1111 1111 1111', '12/25', '123');
        expect(OrderPage.cardLinkConfirmation).toHaveTextContaining('Card linked successfully');
    });

    it('should allow the user to write a message for the driver', () => {
        OrderPage.addDriverMessage('Please come to the side entrance.');
        expect(OrderPage.messageConfirmation).toHaveTextContaining('Please come to the side entrance.');
    });

    it('should allow the user to order a blanket and handkerchiefs', () => {
        OrderPage.orderBlanketAndHandkerchiefs();
        expect(OrderPage.blanketCheckbox).toBeSelected();
        expect(OrderPage.handkerchiefCheckbox).toBeSelected();
    });

    it('should allow the user to order 2 ice creams', () => {
        OrderPage.orderIceCream();
        expect(OrderPage.iceCreamOrderConfirmation).toHaveTextContaining('2 Ice Creams');
    });

    it('should display the car search modal', () => {
        OrderPage.orderButton.click();
        expect(OrderPage.carSearchModal).toBeDisplayed();
    });

    it('should wait for the driver information to appear in the modal', () => {
        expect(OrderPage.carSearchModal).toBeDisplayed();

        browser.waitUntil(() => {
            return OrderPage.driverInfo.isDisplayed();
        }, {
            timeout: 10000,
            timeoutMsg: 'Driver information did not appear within 10 seconds'
        });

        expect(OrderPage.driverInfo).toHaveTextContaining('Driver: John Doe');
    });

});
