const HD44780 = require('./HD44780');

const bigFont = {
    CGRAMGlyphs: [
        [0b00011, 0b00111, 0b01111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111],
        [0b11111, 0b11111, 0b11111, 0b00000, 0b00000, 0b00000, 0b11111, 0b11111],
        [0b11000, 0b11100, 0b11110, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111],
        [0b11111, 0b11111, 0b11111, 0b00000, 0b00000, 0b00000, 0b00000, 0b00000],
        [0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b01111, 0b00111, 0b00011],
        [0b11111, 0b00000, 0b00000, 0b00000, 0b00000, 0b11111, 0b11111, 0b11111],
        [0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11110, 0b11100, 0b11000],
        [0b00000, 0b00000, 0b00000, 0b00000, 0b00000, 0b11111, 0b11111, 0b11111]
    ],
    charGlyphs: [
        [0x00, 0x03, 0x02, 0x04, 0x07, 0x06], // 0
        [0x03, 0x02, 0x20, 0x07, 0xFF, 0x07], // 1
        [0x01, 0x01, 0x02, 0xFF, 0x05, 0x05], // 2
        [0x03, 0x01, 0x02, 0x07, 0x05, 0x06], // 3
        [0x04, 0x07, 0xFF, 0x20, 0x20, 0xFF], // 4
        [0x04, 0x01, 0x01, 0x07, 0x07, 0x06], // 5
        [0x00, 0x01, 0x01, 0x04, 0x07, 0x06], // 6
        [0x03, 0x03, 0x02, 0x20, 0x20, 0xFF], // 7
        [0x00, 0x01, 0x02, 0x04, 0x07, 0x06], // 8
        [0x00, 0x01, 0x02, 0x20, 0x20, 0xFF]  // 9
    ],
    charWidth: 3, // Each char uses 3 columns
    charHeight: 2, // Each char uses 2 lines
    zeroInASCII: 0x30,
    nineInASCII: 0x39,
    capitalAInASCII: 0x41,
    capitalZInASCII: 0x5A,
    smallAInASCII: 0x61,
    smallZInASCII: 0x7A,
    zeroInCharGlyphs: 0x00,
    capitalAInCharGlyphs: 0x0A,
    smallAInCharGlyphs: 0x25,
    loadCGRAM: function() {
        for(let i = 0; i < this.CGRAMGlyphs.length; i++) {
            HD44780.loadCGRAMChar(i, this.CGRAMGlyphs[i]);
        }
    },
    init: function() {
        const pinDefinitions = {
            RS: 19,
            RW: 21,
            E: 23,
            D4: 18, 
            D5: 22,
            D6: 24, 
            D7: 26
        }

        HD44780.init(pinDefinitions);
        this.loadCGRAM();
        HD44780.setBrightness(3); //75% brightness        
    },

    writeChar: function(position, char) {
        //TODO add validation

        /* Convert input as string to ASCII byte, to work with both ASCII and chars as input */
        if(typeof char === 'string') {
            char = char.charCodeAt(0);
        }
        
        /* Map ASCII to custom encoding used in charGlyphsTable */
        if(char >= this.zeroInASCII && char <= this.nineInASCII) {
            char = char - this.zeroInASCII + this.zeroInCharGlyphs;
        } else if(char >= this.capitalAInASCII && char <= this.capitalZInASCII) { // Capitals
            char = char - this.capitalAInASCII + this.capitalAInCharGlyphs;
        } else if(char >= this.smallAInASCII && char <= this.smallZInASCII) {
            char = char - this.smallAInASCII + this.smallAInCharGlyphs;
        }

        const selectedCharGlyphs = this.charGlyphs[char];

        HD44780.goToPosition(1, position);
        for(let index = 0; index < this.charHeight * this.charWidth; index++) {
            if(index === (this.charWidth)) { // Go to second line after first one has been printed
                HD44780.goToPosition(2, position);
            }
            HD44780.sendChar(selectedCharGlyphs[index]);
        }
    }
}

module.exports = bigFont;
