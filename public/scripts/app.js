'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndecisionApp = function (_React$Component) {
    _inherits(IndecisionApp, _React$Component);

    function IndecisionApp(props) {
        _classCallCheck(this, IndecisionApp);

        var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

        _this.handleDeleteOption = _this.handleDeleteOption.bind(_this);
        _this.handlePick = _this.handlePick.bind(_this);
        _this.handleAddoption = _this.handleAddoption.bind(_this);
        _this.handleDeleteOptions = _this.handleDeleteOptions.bind(_this);
        _this.state = {
            option: props.option
        };
        return _this;
    }

    _createClass(IndecisionApp, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            try {
                var json = localStorage.getItem('option');
                var option = JSON.parse(json);
                if (option) {
                    this.setState(function () {
                        return { option: option };
                    });
                }
            } catch (e) {}
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (prevState.option.length !== this.state.option.length) {
                var json = JSON.stringify(this.state.option);
                localStorage.setItem('option', json);
                console.log("update");
            }
        }
    }, {
        key: 'handleDeleteOption',
        value: function handleDeleteOption() {
            this.setState(function () {
                return { option: [] };
            });
            // this.setState(()=>{
            //     return{
            //         option:[]
            //     };
            // });
        }
    }, {
        key: 'handleDeleteOptions',
        value: function handleDeleteOptions(optionTwo) {
            this.setState(function (prevState) {
                return {
                    option: prevState.option.filter(function (options) {
                        return optionTwo !== options;
                    })
                };
            });
        }
    }, {
        key: 'handlePick',
        value: function handlePick() {
            var randomNum = Math.floor(Math.random() * this.state.option.length);
            var option = this.state.option[randomNum];
            alert(option);
        }
    }, {
        key: 'handleAddoption',
        value: function handleAddoption(options) {
            if (!options) {
                return 'Error add some item';
            } else if (this.state.option.indexOf(options) > -1) {
                return 'Item already presents';
            }
            // this.setState((prevState)=>{option:prevState.option.concat(options)});
            this.setState(function (prevState) {
                return {
                    option: prevState.option.concat(options)
                };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var subTitle = "Put your life in the hands of computer";
            return React.createElement(
                'div',
                null,
                React.createElement(Header, { subTitle: subTitle }),
                React.createElement(Action, { hasOption: this.state.option.length > 0, handlePick: this.handlePick }),
                React.createElement(Options, { handleDeleteOptions: this.handleDeleteOptions, handleDeleteOption: this.handleDeleteOption, options: this.state.option }),
                React.createElement(AddOption, { handleAddoption: this.handleAddoption })
            );
        }
    }]);

    return IndecisionApp;
}(React.Component);

IndecisionApp.defaultProps = {
    option: []
};

var Header = function Header(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            props.title
        ),
        props.subTitle && React.createElement(
            'h2',
            null,
            props.subTitle
        )
    );
};

Header.defaultProps = {
    title: "Indecision"
};

var Action = function Action(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            { disabled: !props.hasOption, onClick: props.handlePick, className: 'btn btn-primary' },
            'What should I do'
        )
    );
};

var Options = function Options(props) {
    return React.createElement(
        'div',
        null,
        props.options === 0 && React.createElement(
            'p',
            { className: 'text-muted' },
            'Add some item then started'
        ),
        React.createElement(
            'button',
            { className: 'btn btn-primary mt-2', onClick: props.handleDeleteOption },
            'Remove All'
        ),
        props.options.map(function (option) {
            return React.createElement(Option, { handleDeleteOptions: props.handleDeleteOptions, key: option, optionText: option });
        })
    );
};

var Option = function Option(props) {
    return React.createElement(
        'div',
        { className: 'mt-2' },
        React.createElement(
            'p',
            null,
            props.optionText,
            React.createElement(
                'button',
                {
                    className: 'btn btn-secondary btn-sm',
                    onClick: function onClick(e) {
                        props.handleDeleteOptions(props.optionText);
                    } },
                'Remove'
            )
        )
    );
};

var AddOption = function (_React$Component2) {
    _inherits(AddOption, _React$Component2);

    function AddOption(props) {
        _classCallCheck(this, AddOption);

        var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

        _this2.handleAddoption = _this2.handleAddoption.bind(_this2);
        _this2.state = {
            error: undefined
        };
        return _this2;
    }

    _createClass(AddOption, [{
        key: 'handleAddoption',
        value: function handleAddoption(e) {
            e.preventDefault();
            //trim() remove the spaces and inner spaces
            var options = e.target.elements.option.value.trim();
            var error = this.props.handleAddoption(options);
            this.setState(function () {
                return {
                    error: error
                };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                this.state.error && React.createElement(
                    'p',
                    { className: 'text-error' },
                    this.state.error
                ),
                React.createElement(
                    'form',
                    { onSubmit: this.handleAddoption },
                    React.createElement('input', { type: 'text', name: 'option' }),
                    React.createElement(
                        'button',
                        { className: 'btn btn-primary' },
                        'Add Option'
                    )
                )
            );
        }
    }]);

    return AddOption;
}(React.Component);

ReactDOM.render(React.createElement(IndecisionApp, null), document.getElementById('app'));
