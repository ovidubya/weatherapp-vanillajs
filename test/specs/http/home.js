var assert = require('assert');
describe('Testing the index page on the http protocal', () => {
    it('Should have data on Chicago IL', () => {
        browser.url('/');
        let currentLocation = $('.current-location');
        assert.equal('Chicago, Illinois', currentLocation.getText());
    });
    it('Should have equal amount of fahrenheit and celsius elements', () => {
        var hiddenFElements = $$('.hide-f');
        var hiddenCElements = $$('.hide-c');

        assert.equal(hiddenCElements.length, hiddenFElements.length);
    });
    it('Should display all values in fahrenheit and celsius', () => {
        
        var allDisplayed = true;

        var fElements = $$('.hide-f');
        var cElements = $$('.hide-c');
        
        for(var i = 0; i < fElements.length; i++) {
            if( fElements[i].isDisplayed() == false) {
                allDisplayed = false;
                break;
            }
        }
        for(var i = 0; i < cElements.length; i++) {
            if( cElements[i].isDisplayed() == false ) {
                allDisplayed = false;
                break;
            }
        }
        assert.equal(allDisplayed, true);      
    });
    it('Should hide all values in fahrenheit', () => {
        let toggleFButton = $('#toggle-f');
        toggleFButton.click();

        var allHidden = true;
        var hiddenFElements = $$('.hide-f');
        for(var i = 0; i < hiddenFElements.length; i++) {
            if( hiddenFElements[i].isDisplayed() == true) {
                allHidden = false;
                break;
            }
        }
        assert.equal(allHidden, true);      
    });
    it('Should hide all values in celsius', () => {
        let toggleFButton = $('#toggle-c');
        toggleFButton.click();

        var allHidden = true;
        var hiddenCElements = $$('.hide-c');
        for(var i = 0; i < hiddenCElements.length; i++) {
            if( hiddenCElements[i].isDisplayed() == true) {
                allHidden = false;
                break;
            }
        }
        assert.equal(allHidden, true);      
    });
    it('Should update view to Minnesota Data', () => {
        let searchBox = $('#search');
            searchBox.setValue('55416');

        let goButton = $('#goButton');

        goButton.click();

        browser.pause(2000);

        let currentLocation = $('.current-location');
        assert.equal('Minneapolis, Minnesota', currentLocation.getText());

    });
});