'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Month;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PropTypes = require('./PropTypes');

var _PropTypes2 = _interopRequireDefault(_PropTypes);

var _Weekdays = require('./Weekdays');

var _Weekdays2 = _interopRequireDefault(_Weekdays);

var _Helpers = require('./Helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Month(_ref) {
  var month = _ref.month;
  var locale = _ref.locale;
  var localeUtils = _ref.localeUtils;
  var captionElement = _ref.captionElement;
  var onCaptionClick = _ref.onCaptionClick;
  var children = _ref.children;
  var firstDayOfWeek = _ref.firstDayOfWeek;
  var className = _ref.className;
  var wrapperClassName = _ref.wrapperClassName;
  var weekClassName = _ref.weekClassName;
  var weekdayComponent = _ref.weekdayComponent;
  var weekdayElement = _ref.weekdayElement;
  var fixedWeeks = _ref.fixedWeeks;

  var captionProps = {
    date: month,
    localeUtils: localeUtils,
    locale: locale,
    onClick: onCaptionClick ? function (e) {
      return onCaptionClick(e, month);
    } : undefined
  };
  var weeks = (0, _Helpers.getWeekArray)(month, firstDayOfWeek, fixedWeeks);
  return _react2.default.createElement(
    'div',
    { className: className },
    _react2.default.cloneElement(captionElement, captionProps),
    _react2.default.createElement(_Weekdays2.default, {
      locale: locale,
      localeUtils: localeUtils,
      weekdayComponent: weekdayComponent,
      weekdayElement: weekdayElement
    }),
    _react2.default.createElement(
      'div',
      { className: wrapperClassName, role: 'grid' },
      weeks.map(function (week, j) {
        return _react2.default.createElement(
          'div',
          { key: j, className: weekClassName, role: 'gridcell' },
          week.map(function (day) {
            return children(day, month);
          })
        );
      })
    )
  );
}

Month.propTypes = {
  month: _react.PropTypes.instanceOf(Date).isRequired,
  captionElement: _react.PropTypes.node.isRequired,
  firstDayOfWeek: _react.PropTypes.number.isRequired,
  locale: _react.PropTypes.string.isRequired,
  localeUtils: _PropTypes2.default.localeUtils.isRequired,
  onCaptionClick: _react.PropTypes.func,
  children: _react.PropTypes.func.isRequired,
  className: _react.PropTypes.string,
  wrapperClassName: _react.PropTypes.string,
  weekClassName: _react.PropTypes.string,
  weekdayComponent: _react.PropTypes.func,
  weekdayElement: _react.PropTypes.element,
  fixedWeeks: _react.PropTypes.bool
};
//# sourceMappingURL=Month.js.map