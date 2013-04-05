# About

A JavaScript validator for DOM elements with a jQuery wrapper

# Description

There are two key parts:
* Core library to do the validation
* jQuery wrapper to get DOM values and update with result

# jQuery plugin usage

    $('#element').validate();
    $('#element').validate('validateAsync');
    $('#element').validate('clearValidation');

# Core usage
    var validator = new Vailidator();
    validator.validate('some value', 'rule name');

# Examples

See demo/validator.html
