# Randomkey

Lightweight node.js lib for generating random strings.

You can specify the length and character set to use.

If you specify length as an array `[min, max]` a number in the range will be
used.

The character set defaults to:

```
0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz
```

Several character sets are provided as properties of the function:

* `default`: `0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz`
* `upper`: `ABCDEFGHIJKLMNOPQRSTUVWXTZ`
* `lower`: `abcdefghijklmnopqrstuvwxtz`
* `alphanumeric`: `0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ`
* `numbers`: `0123456789`
* `safe`: `2346789ABCDEFGHJKLMNPRTUVWXTZ`

## Usage

```
npm install --save randomkey
```

### randomkey(len, chars)

```
var rk = require('randomkey');

// generate a 10 character key using the default character set
var key = rk(10);

// generate a 6 character key using only the characters `a`, `b` and `c`
var abc = rk(10, 'abc');

// generate a 16 character key using the "safe" character set:
var safe = rk(16, rk.safe);

// generate a key between 5 and 10 characters long with the default characters:
var variableLength = rk([5,10]);
