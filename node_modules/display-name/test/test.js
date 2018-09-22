var assert = require('assert');
var displayName = require('../displayName');

describe('common cases', function () {
    it('should output correct English name', function () {
        assert.equal('Char Aznable', displayName('Char', 'Aznable'));
    });
    it('should output correct Chinese name', function () {
        assert.equal('曾台綸', displayName('台綸', '曾'));
    });
    it('should output correct Hiragana name', function () {
        assert.equal('さがらそうすけ', displayName('そうすけ', 'さがら'));
    });
});

describe('rare cases', function () {
    it('should output first name if last name is invalid', function () {
        assert.equal('Lawrence', displayName('Lawrence'));
        assert.equal('Lawrence', displayName('Lawrence', ''));
        assert.equal('Lawrence', displayName('Lawrence', {}));
    });

    it('should output last name if first name is invalid', function () {
        assert.equal('Tseng', displayName(null, 'Tseng'));
        assert.equal('Tseng', displayName('', 'Tseng'));
        assert.equal('Tseng', displayName({}, 'Tseng'));
    });

    it('should output empty string if both first and last name are invalid', function () {
        assert.equal('', displayName());
        assert.equal('', displayName({}, ''));
        assert.equal('', displayName('', {}));
        assert.equal('', displayName('', ''));
    });
});
