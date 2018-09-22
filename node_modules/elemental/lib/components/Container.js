'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

function Container(_ref) {
	var children = _ref.children;
	var clearfix = _ref.clearfix;
	var gutter = _ref.gutter;
	var maxWidth = _ref.maxWidth;
	var style = _ref.style;

	var props = _objectWithoutProperties(_ref, ['children', 'clearfix', 'gutter', 'maxWidth', 'style']);

	var styles = {
		clearfix: {
			clear: 'both',
			display: 'table'
		},
		container: {
			marginLeft: 'auto',
			marginRight: 'auto',
			maxWidth: maxWidth,
			paddingLeft: gutter,
			paddingRight: gutter
		}
	};
	props.style = _extends({}, styles.container, style);

	return _react2['default'].createElement(
		'div',
		props,
		clearfix && _react2['default'].createElement('span', { style: styles.clearfix }),
		children,
		clearfix && _react2['default'].createElement('span', { style: styles.clearfix })
	);
};

Container.propTypes = {
	clearfix: _react.PropTypes.bool,
	gutter: _react.PropTypes.number,
	maxWidth: _react.PropTypes.number
};
Container.defaultProps = {
	gutter: _constants2['default'].width.gutter,
	maxWidth: _constants2['default'].width.container
};

module.exports = Container;