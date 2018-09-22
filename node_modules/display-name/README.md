displayName.js
==============

Make correct first name/last name combination among differerent languages
-------------------------------------------------------------------------

### Motivation

Chinese differs from English in combining first name and last name (family name),
where last name is put in front of first name in Chinese.
This small utility function helps eliminating the difference by making the correct combination.
It is done by using a regular expression to detect the unicode range of first name and last name.
Moreover, Japanese and Korean is treated identically with Chinese as well (i.e. CJK characters).

The regular expression to detect CJK characters is generated from [Unicode range RegExp generator](http://apps.timwhitlock.info/js/regex).

### Constraints

`displayName.js` does not deal with middle names,
so feel free to modify the code to fit your needs.

### Installation

For Node.js:

```
npm install display-name
```

For frontend:

```html
<script type="text/javascript" src="displayName.min.js"></script>
```

### Usage and Examples

```js

// In node.js/AMD/CommonJS
var displayName = require('display-name');

// In browser
var displayName = window.displayName;

var redComet = {
    first: 'Char',
    last: 'Aznable'
};

redComet.full = displayName(redComet.first, redComet.last);
// redComet.full = 'Char Aznable'

var uruz7 = {
    first: 'そうすけ',
    last: 'さがら'
};

uruz7.full = displayName(uruz7.first, uruz7.last);
// uruz7.full = 'さがらそうすけ'

var author = {
    familyName: '曾',
    name: '台綸'
};

author.full = displayName(author.name, author.familyName);
// author.full = '曾台綸'

```

### Build

```
npm install
npm run build
```

### License

[MIT License](https://opensource.org/licenses/MIT)
