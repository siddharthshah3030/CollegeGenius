'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Caption;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PropTypes = require('./PropTypes');

var _PropTypes2 = _interopRequireDefault(_PropTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Caption(_ref) {
  var date = _ref.date;
  var locale = _ref.locale;
  var localeUtils = _ref.localeUtils;
  var onClick = _ref.onClick;

  return _react2.default.createElement(
    'div',
    { className: 'DayPicker-Caption', onClick: onClick, role: 'heading' },
    localeUtils.formatMonthTitle(date, locale)
  );
}

Caption.propTypes = {
  date: _react.PropTypes.instanceOf(Date),
  locale: _react.PropTypes.string,
  localeUtils: _PropTypes2.default.localeUtils,
  onClick: _react.PropTypes.func
};
//# sourceMappingURL=Caption.js.map