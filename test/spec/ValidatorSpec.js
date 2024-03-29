var should = require('should');

var Validator = require('../../index.js');

describe('Validator', function () {

    var validator;

    before(function () {
        validator = new Validator();
    });

    it('should validate required correctly', function () {
        checkValidation('some value', 'required', true);
        checkValidation('', 'required', false);
    });

    it('should validate name correctly', function () {
        checkValidation('SomeName', 'validate-name', true);
        checkValidation('somename', 'validate-name', true);
        checkValidation('some-name', 'validate-name', true);
        checkValidation('some&name', 'validate-name', false);
        checkValidation('some%name', 'validate-name', false);
        checkValidation('some*name', 'validate-name', false);
        checkValidation('some name', 'validate-name', false);
    });

    it('should validate display name correctly', function () {
        checkValidation('SomeName', 'validate-displayname', true);
        checkValidation('somename', 'validate-displayname', true);
        checkValidation('some-name', 'validate-displayname', true);
        checkValidation('some_name', 'validate-displayname', true);
        checkValidation('some~name', 'validate-displayname', true);
        checkValidation('some*name', 'validate-displayname', true);
        checkValidation('some name', 'validate-displayname', true);
        checkValidation('some(name)', 'validate-displayname', true);
        checkValidation('some[name]', 'validate-displayname', true);
        checkValidation('some,name', 'validate-displayname', true);
        checkValidation('some.name', 'validate-displayname', true);
        checkValidation('some+name', 'validate-displayname', true);
        checkValidation('some=name', 'validate-displayname', true);
        checkValidation('some@name', 'validate-displayname', true);
        checkValidation('some?name', 'validate-displayname', true);
        checkValidation('some#name', 'validate-displayname', true);
        checkValidation('some:name', 'validate-displayname', true);
        checkValidation('some;name', 'validate-displayname', true);
        checkValidation('some!name', 'validate-displayname', true);
        checkValidation('1Some! name -_~*(),.+=@?#:;', 'validate-displayname', true);

        checkValidation('some{}name', 'validate-displayname', false);
        checkValidation('some|name', 'validate-displayname', false);
        checkValidation('some&name', 'validate-displayname', false);
        checkValidation('some%name', 'validate-displayname', false);
        checkValidation('some<>name', 'validate-displayname', false);
        checkValidation('some¬name', 'validate-displayname', false);
        checkValidation('some`name', 'validate-displayname', false);
        checkValidation('some/name', 'validate-displayname', false);
        checkValidation('some\\name', 'validate-displayname', false);
        checkValidation('some"name', 'validate-displayname', false);
        checkValidation('some£name', 'validate-displayname', false);
        checkValidation('some$name', 'validate-displayname', false);
        checkValidation('some^name', 'validate-displayname', false);
        checkValidation("Some{} name|&%¬`/\\\"£$^<>", 'validate-displayname', false);
    });

    it('should validate-dd correctly', function () {
        checkValidation('some value', 'validate-dd', true);
        checkValidation(undefined, 'validate-dd', false);
        checkValidation('', 'validate-dd', false);
        checkValidation('-1', 'validate-dd', false);
    });

    it('should validate-version correctly', function () {
        checkValidation('v1.0.0.0', 'validate-version', true);
        checkValidation('v12.10.11.09', 'validate-version', true);
        checkValidation('v1.0.0', 'validate-version', false);
    });

    it('should validate-ein correctly', function () {
        checkValidation('702242036', 'validate-ein', true);
        checkValidation('7022420366', 'validate-ein', false);
        checkValidation('70224203', 'validate-ein', false);
        checkValidation('', 'validate-ein', false);
    });

    it('should validate-email correctly', function () {
        checkValidation('craig.cook@cook.com', 'validate-email', true);
        checkValidation('craig@cook.com', 'validate-email', true);
        checkValidation('@cook.com', 'validate-email', false);
        checkValidation('craig@', 'validate-email', false);
        checkValidation('', 'validate-email', false);
    });

    it('should validate-url correctly', function () {
        checkValidation('http://www.craigcook.co.uk', 'validate-url', true);
        checkValidation('http://craigcook.co.uk', 'validate-url', true);
        checkValidation('www.craigcook.co.uk', 'validate-url', false);
        checkValidation('craigcook.co.uk', 'validate-url', false);
        checkValidation('', 'validate-url', false);
    });

    it('should get rule correctly', function () {
        var rule = validator.getRule('validate-dd');
        should.exist(rule);
        rule.errorMessage.should.eql('You must select a value');
    });

    it('should get all rules correctly', function () {
        var rules = validator.getRules();
        should.exist(rules);
        rules.should.have.length(8);
    });

    it('should add rules correctly', function () {
        var originalRules = validator.getRules();
        originalRules.should.have.length(8);

        var newRules = [
            {
                checkClass: 'bob',
                errorClass: 'error',
                inputErrorClass: 'error',
                errorMessage: 'You must enter bob',
                pattern: '^bob$'
            },
            {
                checkClass: 'dave',
                errorClass: 'error',
                inputErrorClass: 'error',
                errorMessage: 'You must enter dave',
                pattern: '^dave$'
            }
        ];

        var addedRules = validator.addRules(newRules);
        var rules = validator.getRules();
        addedRules.should.have.length(10);
        rules.should.have.length(10);

        checkValidation('craigcook.co.uk', 'bob', false);
        checkValidation('bob', 'bob', true);

        checkValidation('craigcook.co.uk', 'dave', false);
        checkValidation('dave', 'dave', true);
    });

    it('should validate via functions correctly', function () {
        var newRules = [
            {
                checkClass: 'foobar',
                errorClass: 'error',
                inputErrorClass: 'error',
                errorMessage: 'You must enter foobar',
                func: function (val) {
                    return val == 'foobar';
                }
            }
        ];
        var addedRules = validator.addRules(newRules);
        var rules = validator.getRules();
        addedRules.should.have.length(11);
        rules.should.have.length(11);

        checkValidation('craigcook.co.uk', 'foobar', false);
        checkValidation('foobar', 'foobar', true);
    });

    function checkValidation(value, ruleName, expected) {
        var result = validator.validate(value, ruleName);
        if (expected) {
            result.should.be.true;
        } else {
            result.should.be.false;
        }
    }
});


