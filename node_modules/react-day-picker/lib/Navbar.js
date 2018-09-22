'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavbarPropTypes = undefined;
exports.default = Navbar;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buttonBaseClass = 'DayPicker-NavButton DayPicker-NavButton';

function Navbar(_ref) {
  var className = _ref.className;
  var showPreviousButton = _ref.showPreviousButton;
  var showNextButton = _ref.showNextButton;
  var onPreviousClick = _ref.onPreviousClick;
  var onNextClick = _ref.onNextClick;
  var dir = _ref.dir;

  var previousClickHandler = dir === 'rtl' ? onNextClick : onPreviousClick;
  var nextClickHandler = dir === 'rtl' ? onPreviousClick : onNextClick;

  var previousButton = showPreviousButton && _react2.default.createElement('span', {
    role: 'button',
    key: 'previous',
    className: buttonBaseClass + '--prev',
    onClick: function onClick() {
      return previousClickHandler();
    }
  });

  var nextButton = showNextButton && _react2.default.createElement('span', {
    role: 'button',
    key: 'right',
    className: buttonBaseClass + '--next',
    onClick: function onClick() {
      return nextClickHandler();
    }
  });

  return _react2.default.createElement(
    'div',
    { className: className },
    dir === 'rtl' ? [nextButton, previousButton] : [previousButton, nextButton]
  );
}

var NavbarPropTypes = exports.NavbarPropTypes = {
  className: _react.PropTypes.string,
  showPreviousButton: _react.PropTypes.bool,
  showNextButton: _react.PropTypes.bool,
  onPreviousClick: _react.PropTypes.func,
  onNextClick: _react.PropTypes.func,
  dir: _react.PropTypes.string
};

Navbar.propTypes = NavbarPropTypes;

Navbar.defaultProps = {
  className: 'DayPicker-NavBar',
  dir: 'ltr',
  showPreviousButton: true,
  showNextButton: true
};
//# sourceMappingURL=Navbar.js.map