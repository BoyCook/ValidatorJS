function Validator() {
    this.rules = [
        {
            checkClass: 'required',
            errorClass: 'error',
            inputErrorClass: 'error',
            errorMessage: 'This field is required',
            pattern: '.'
        },
        {
            checkClass: 'validate-name',
            errorClass: 'error',
            inputErrorClass: 'error',
            errorMessage: 'Name must contain letter, numbers, and hyphens only. Leading/trailing spaces and non-displayable characters not allowed.',
            pattern: "^[a-zA-Z0-9-_]+$"
        },
        {
            checkClass: 'validate-displayname',
            errorClass: 'error',
            inputErrorClass: 'error',
            errorMessage: "Display name must not contain special characters",
            pattern: "^[\\d\\w\\s\\(\\)\\[\\]\\*\\.\\!\\:\\;\\-\\~\\+\\=\\@\\?\\#',äöüÄÖÜ\-]*$"
        },
        {
            checkClass: 'validate-dd',
            errorClass: 'error',
            inputErrorClass: 'error',
            errorMessage: 'You must select a value',
            pattern: '^((?!-1).)*$'
        },
        {
            checkClass: 'validate-version',
            errorClass: 'error',
            inputErrorClass: 'error',
            errorMessage: 'Version must be in the correct format e.g. v1.0.0.0',
            pattern: "^([v]{1,})([0-9]+)(\\.{1,}[\\d]+)(\\.{1,}[\\d]+)(\\.{1,}[\\d]+)$"
        },
        {
            checkClass: 'validate-ein',
            errorClass: 'error',
            inputErrorClass: 'error',
            errorMessage: 'EIN must be nine numbers',
            pattern: "^[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$"
        },
        {
            checkClass: 'validate-email',
            errorClass: 'error',
            inputErrorClass: 'error',
            errorMessage: 'You must enter a real email',
            pattern: "^((([a-zA-Z]|\\d|[!#\\$%&'\\*\\+\\-\\/=\\?\\^_`{\\|}~]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])+(\\.([a-zA-Z]|\\d|[!#\\$%&'\\*\\+\\-\\/=\\?\\^_`{\\|}~]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])+)*)|((\\x22)((((\\x20|\\x09)*(\\x0d\\x0a))?(\\x20|\\x09)+)?(([\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x7f]|\\x21|[\\x23-\\x5b]|[\\x5d-\\x7e]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(\\\\([\\x01-\\x09\\x0b\\x0c\\x0d-\\x7f]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]))))*(((\\x20|\\x09)*(\\x0d\\x0a))?(\\x20|\\x09)+)?(\\x22)))@((([a-zA-Z]|\\d|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(([a-zA-Z]|\\d|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])([a-zA-Z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])*([a-zA-Z]|\\d|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])))\\.)+(([a-zA-Z]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(([a-zA-Z]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])([a-zA-Z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])*([a-zA-Z]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])))\\.?$"
        },
        {
            checkClass: 'validate-url',
            errorClass: 'error',
            inputErrorClass: 'error',
            errorMessage: 'You must enter a real URL',
            pattern: "^(https?|ftp):\\/\\/(((([a-zA-Z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(%[\\da-f]{2})|[!\\$&'\\(\\)\\*\\+,;=]|:)*@)?(((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]))|((([a-zA-Z]|\\d|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(([a-zA-Z]|\\d|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])([a-zA-Z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])*([a-zA-Z]|\\d|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])))\\.)+(([a-zA-Z]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(([a-zA-Z]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])([a-zA-Z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])*([a-zA-Z]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])))\\.?)(:\\d*)?)(\\/((([a-zA-Z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(%[\\da-f]{2})|[!\\$&'\\(\\)\\*\\+,;=]|:|@)+(\\/(([a-zA-Z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(%[\\da-f]{2})|[!\\$&'\\(\\)\\*\\+,;=]|:|@)*)*)?)?(\\?((([a-zA-Z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(%[\\da-f]{2})|[!\\$&'\\(\\)\\*\\+,;=]|:|@)|[\\uE000-\\uF8FF]|\\/|\\?)*)?(\\#((([a-zA-Z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(%[\\da-f]{2})|[!\\$&'\\(\\)\\*\\+,;=]|:|@)|\\/|\\?)*)?$"
        }
    ];
}

Validator.prototype.validate = function (value, ruleName) {
    var rule = this.getRule(ruleName);
    return this.check(value, rule);
};

Validator.prototype.check = function (value, rule) {
    if (rule.pattern) {
        return this.matchValue(value, rule.pattern);
    } else if (rule.func) {
        return rule.func(value);
    } else {
        return true;
    }
};

Validator.prototype.matchValue = function (value, pattern) {
    //Will fail on no match || no value
    return !(value === undefined || value.length === 0 || typeof value.match(pattern) === "undefined" || value.match(pattern) === null);
};

Validator.prototype.getRule = function (name) {
    for (var i = 0, len = this.rules.length; i < len; i++) {
        var rule = this.rules[i];
        if (rule.checkClass === name) {
            return rule;
        }
    }
    return undefined;
};

Validator.prototype.getRules = function () {
    return this.rules;
};

Validator.prototype.addRules = function (optional) {
    this.rules = Array.prototype.concat.call(this.rules, optional);
    return this.rules;
};

if (!(typeof exports === "undefined")) {
    exports.Validator = Validator;
}
