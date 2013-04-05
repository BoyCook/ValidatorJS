/**
 * @name            >= jquery.validator
 * @description     >= An HTML input validator
 * @vcs             >= git
 * @website         >= https://github.com/BoyCook/JSLibs
 * @since           >= 2010-07-01
 * @copyright       >= Copyright (c) 2010 CCCS Ltd. http://craigcook.co.uk
 * @author          >= Craig Cook
 * @requires        >= jQuery 1.4.2           http://jquery.com
 */

(function($) {
    var validator = new Validator();
    var methods = {
        validateAsync: function(elements, validCallBack) {
            $(elements).each(function() {
                methods.clearValidation('#' + this.id);

                var cnt = 0;
                var toValidate = $('#' + this.id + ' .required, #' + this.id + ' [class*=validate]');
                var validateEach = function(isValid, index) {
                    var element = toValidate[index];
                    methods.checkElementAsync(isValid, element, function(isValid, elemValid, element) {
                        if (!elemValid) {
                            var rule = methods.getRuleForElement(element);
                            methods.invalidate(element, rule);
                        }

                        //Do next
                        if (cnt < (toValidate.length - 1)) {
                            cnt++;
                            validateEach(isValid, cnt);
                        } else {
                            //At the end do the passed in callback
                            if (isValid && validCallBack) {
                                validCallBack();
                            }
                        }
                    });
                };
                validateEach(true, 0);
            });
        },
        checkElementAsync: function(isValid, element, callBack) {
            var rule = methods.getRuleForElement(element);
            //If there's no value and it's not required then there's no need to check
            if ($(element).hasClass('required') || (element.value != undefined && element.value.length > 0)) {
                methods.checkAsync(isValid, element, rule, callBack);
            } else {
                callBack(isValid, true, element);
            }
        },
        checkAsync: function(isValid, element, rule, callBack) {
            if (rule.pattern) {
                var elementValid = validator.matchValue(element.value, rule.pattern);
                if (!elementValid) {
                    isValid = false;
                }
                if (callBack) {
                    callBack(isValid, elementValid, element);
                }
            } else if (rule.func) {
                //Function must call callBack(isValid, elementValid, element);
                rule.func(isValid, element, callBack);
            }
        },
        validate: function(elements) {
            var isValid = true;
            elements.each(function() {
                methods.clearValidation('#' + this.id);
                $('#' + this.id + ' .required, #' + this.id + ' [class*=validate]').each(function() {
                    if (!methods.checkElement(this)) { //One false is invalid
                        isValid = false;
                    }
                });
            });
            return isValid;
        },
        checkElement: function(element) {
            var rule = methods.getRuleForElement(element);
            var isValid = true;
            //If there's no value and it's not required then there's no need to check
            if ($(element).hasClass('required') || (element.value != undefined && element.value.length > 0)) {
                if (!methods.check(element.value, rule)) {
                    isValid = false;
                    methods.invalidate(element, rule);
                }
            }
            return isValid;
        },
        check: function(value, rule) {
            if (rule.pattern) {
                return validator.matchValue(value, rule.pattern);
            } else if (rule.func) {
                return rule.func(value);
            } else {
                return true;
            }
        },
        getRuleForElement: function(elem) {
            var cssClass = 'required';
            var classes = this.getClasses(elem.className.split('\n'));
            for (var i = 0; i < classes.length; i++) {
                if (classes[i].indexOf('validate-') > -1) {
                    cssClass = classes[i];
                }
            }
            return validator.getRule(cssClass);
        },
        getClasses: function(classNames) {
            var classes = [];
            for (var i = 0, len = classNames.length; i < len; i++) {
                classes = classes.concat(this.getClassesFromClass(classNames[i].split(' ')));
            }
            return classes;
        },
        getClassesFromClass: function(classNames) {
            var classes = [];
            for (var i = 0, len = classNames.length; i < len; i++) {
                var clazz = classNames[i];
                if (clazz.trim() != '') {
                    classes.push(clazz);
                }
            }
            return classes;
        },
        invalidate: function(element, rule) {
            var label = $("<label for=\"" + element.id + "\" generated=\"true\" class=\"" + rule.errorClass + "\">" + rule.errorMessage + "</label>");
            $(element).addClass(rule.inputErrorClass);
            var divParents = $(element).parents('div');
            if (divParents.length > 0) {
                var tabId = $(element).parents('div')[0].id;
                $(divParents[1]).find('a[href="#' + tabId + '"] span').addClass('error');
            }
            label.insertAfter(element);
        },
        clearValidation: function(id) {
            $(id + ' label.error').remove();
            $(id + ' span.error').removeClass('error');
            $(id + ' input.error').removeClass('error');
            $(id + ' textarea.error').removeClass('error');
        },
        addRules: function(rules) {
            return validator.addRules(rules)
        }
    };

    $.fn.validate = function(method) {
        if (methods[method]) {
            var args = Array.prototype.slice.call(arguments, 1);
            if (this.length > 0) {
                this.each(function() {
                    var args1 = ['#' + this.id];
                    var funcArgs = Array.prototype.concat.call(args1, args);
                    return methods[method].apply(this, funcArgs);
                });
            } else {
                return methods[method].apply(this, args);
            }
        } else if (typeof method === 'object' || ! method) {
            return methods.validate(this);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.validate');
        }
    };
})(jQuery);
