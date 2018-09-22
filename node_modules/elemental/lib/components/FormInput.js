'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var blacklist = require('blacklist');
var classNames = require('classnames');

module.exports = React.createClass({
	displayName: 'FormInput',
	propTypes: {
		autoFocus: React.PropTypes.bool,
		className: React.PropTypes.string,
		disabled: React.PropTypes.bool,
		href: React.PropTypes.string,
		id: React.PropTypes.string,
		multiline: React.PropTypes.bool,
		name: React.PropTypes.string,
		noedit: React.PropTypes.bool,
		onChange: React.PropTypes.func,
		size: React.PropTypes.oneOf(['lg', 'sm', 'xs']),
		type: React.PropTypes.string,
		value: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string])
	},

	getDefaultProps: function getDefaultProps() {
		return {
			type: 'text'
		};
	},

	componentDidMount: function componentDidMount() {
		if (this.props.autoFocus) {
			this.focus();
		}
	},

	focus: function focus() {
		this.refs.input.focus();
	},

	render: function render() {
		var _props = this.props;
		var noedit = _props.noedit;
		var multiline = _props.multiline;
		var size = _props.size;
		var className = _props.className;

		var rest = _objectWithoutProperties(_props, ['noedit', 'multiline', 'size', 'className']);

		// classes
		var newClassName = classNames({
			'FormInput-noedit': noedit,
			'FormInput-noedit--multiline': noedit && multiline,
			'FormInput': !noedit
		}, size ? 'FormInput--' + size : null, className);
		var props = _extends({}, rest, { className: newClassName, ref: 'input' });
		var Element = 'input';
		if (noedit && this.props.href) {
			Element = 'a';
			props.type = null;
			props.children = props.children || props.value;
		} else if (noedit) {
			Element = 'div';
			props.type = null;
			props.children = props.children || props.value;
		} else if (multiline) {
			Element = 'textarea';
		}

		return React.createElement(Element, props);
	}
});