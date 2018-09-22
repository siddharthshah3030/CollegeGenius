(function () {

    /*
    * CJK Regex generated from http://apps.timwhitlock.info/js/regex
    */
    var CJKRegex = /[⺀-\u2efe\u3000-〾\u3040-ゞ゠-ヾ㇀-\u31eeㇰ-ㇾ㈀-㋾㌀-㏾㐀-\u4dbe一-\u9ffe豈-\ufafe︰-﹎]|[\ud840-\ud868\ud86a-\ud86c][\udc00-\udfff]|\ud82c[\udc00-\udcfe]|\ud869[\udc00-\udede\udf00-\udfff]|\ud86d[\udc00-\udf3e\udf40-\udfff]|\ud86e[\udc00-\udc1e]|\ud87e[\udc00-\ude1e]/;

    /*
    * check whether the value is a non-empty string.
    * @function
    * @param {string} val
    * @returns {boolean}
    */
    var isValidString = function (val) {
        return ('string' === typeof val) && val.length;
    };

    /*
    * Normalize display name for both Chinese and English names.
    * @function
    * @param {string} firstName
    * @param {string} lastName
    * @returns {string}
    */
    var displayName = function (firstName, lastName) {

        var isFirstNameValid = isValidString(firstName),
            isLastNameValid = isValidString(lastName);
        if (isFirstNameValid) {
            if (!isLastNameValid) {
                return firstName;
            }
        } else {
            if (isLastNameValid) {
                return lastName;
            } else {
                return '';
            }
        }

        var endOfFirstNameIsCJK = CJKRegex.test(firstName[firstName.length - 1]),
            beginOfLastNameIsCJK = CJKRegex.test(lastName[0]);

        if (endOfFirstNameIsCJK) {
            if (beginOfLastNameIsCJK) {
                return lastName + firstName;
            } else {
                return firstName + lastName;
            }
        } else {
            if (beginOfLastNameIsCJK) {
                return lastName + firstName;
            } else {
                return firstName + ' ' + lastName;
            }
        }
    };

    var root = this;
    if ('undefined' !== typeof exports) {
        if ('undefined' !== typeof module && module.exports) {
            exports = module.exports = displayName;
        }
    } else {
        root.displayName = displayName;
    }

}());
