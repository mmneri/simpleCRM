//"use strict";

import React from 'react';
import Select from 'react-select';

const AsyncSelectInput = React.createClass({
    // list out our required and optional properties for this class
    propTypes: {
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        value: React.PropTypes.string.isRequired,
        //defaultOption: React.PropTypes.string.isRequired,
        getOptions: React.PropTypes.func.isRequired,
        onChange: React.PropTypes.func.isRequired,
        valueKey: React.PropTypes.string.isRequired,
        labelKey: React.PropTypes.string.isRequired,
        error: React.PropTypes.string
    },


    onChangeHandler(event) {
        console.log("onChangeHandler event ", event);
        this.props.onChange({
            target: {
                name: this.props.name,
                value: event
            }
        });
    },

    getOptions1(input, callback) {
        setTimeout(function () {
            callback(null, {
                options: [
                    { _id: '1', name: 'One' },
                    { _id: '2', name: 'Two' }
                ],
                // CAREFUL! Only set this to true when there are no more options,
                // or more specific queries will not be sent to the server.
                complete: true
            });
        }, 500);
    },

    getOptions(input, callback) {
        input = input.toLowerCase();

        var options = CONTRIBUTORS.filter(i => {
            return i.github.substr(0, input.length) === input;
        });

        var data = {
            options: [
                { _id: '1', name: 'One' },
                { _id: '2', name: 'Two' }
            ],
            // CAREFUL! Only set this to true when there are no more options,
            // or more specific queries will not be sent to the server.
            complete: true
        };

        setTimeout(function () {
            callback(null, data);
        }, 500);
    },


    render() {
        console.log("render", this.props)
        // This is for bootstrap, we want to wrap our label and textbox in a 'form-group'
        // class, and also to add 'has-error' (which gives us a red outline) if the data is in error
        var wrapperClass = 'form-group';
        if (this.props.error && this.props.error.length > 0) {
            wrapperClass += " " + 'has-error';
        }

        return (
            <div className={wrapperClass}>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <div className="field">
                    <Select.Async
                        name={this.props.name}
                        value={this.props.value}
                        loadOptions={this.getOptions}
                        onChange={this.onChangeHandler}
                        valueKey={this.props.valueKey}
                        labelKey={this.props.labelKey}
                    />
                    <div className="input">
                        {this.props.error}
                    </div>
                </div>
            </div>

        );
    }
});

export default AsyncSelectInput;