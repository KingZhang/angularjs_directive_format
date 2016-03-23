define(['angular', 'directiveModule'],
    function(angular, directiveModule) {

        /**
         * inherit function
         * @param {Function} superClass 
         * @param {Function} subClass 
         */
        function inherit(superClass, subClass) {
            var proto = subClass.prototype;
            var F = function() {};
            F.prototype = superClass.prototype;
            subClass.prototype = new F();
            for (var k in proto) {
                subClass.prototype[k] = proto[k];
            }

            subClass.prototype.constructor = subClass;
            subClass.prototype.superClass = superClass;
        }

        function ValueFormatStrategy(value, dataType, formatPattern) {
            this.value = this.getValue(value);
            this.dataType = dataType;
            this.formatPattern = formatPattern;
        }

        ValueFormatStrategy.regist = function(dataType, fun) {
            if (this[dataType]) {
                return false;
            }
            this[dataType] = fun;
        }

        ValueFormatStrategy.get = function(dataType) {
            return ValueFormatStrategy[dataType] || ValueFormatStrategy;
        }

        ValueFormatStrategy.prototype.getValue = function(value) {
            return value;
        }

        ValueFormatStrategy.prototype.format = function(dataType, formatPattern) {
            var value = this.value,
                result = value;


            return result;
        }

        /**
         * validate data
         * @return {boolean} 
         */
        ValueFormatStrategy.prototype.valuesValidate = function() {
            return true;
        }

        /**
         * init formatter
         * For new dataType formatter, need to add corresponse dataType construct function, then add DATATYPES in this function
         * @return {[type]}  [description]
         */
        function initFormatter() {
            /**
             * The support format data type
             * @type {object}
             */
            var CONST = {
                DATATYPES: {
                    integer: IntegerFormat,
                    date: DateFormat
                }
            }
            var dataTypes = CONST.DATATYPES,
                constructor = "";

            // regist formatter, and inherit the default format strategy class
            for (var dataType in dataTypes) {
                if (dataTypes.hasOwnProperty(dataType)) {
                    constructor = dataTypes[dataType];
                    ValueFormatStrategy.regist(dataType, constructor)
                    inherit(ValueFormatStrategy, constructor);
                }
            }
        }

        initFormatter();

        function IntegerFormat() {
            ValueFormatStrategy.apply(this, Array.prototype.slice.call(arguments, 0));
        }

        IntegerFormat.prototype.getValue = function (value) {
            return value  * 1;
        }

        IntegerFormat.prototype.valuesValidate = function() {
            return this.value === this.value ;
        }

        function DateFormat() {
            ValueFormatStrategy.apply(this, Array.prototype.slice.call(arguments, 0));
        }

        DateFormat.prototype.getValue = function(value) {
            if (angular.isString(value)) {
                value = Date.parse(value);
            } else if (angular.isDate(value)) {
                value = value.getTime();
            } else {
                value = value * 1;
            }
            return value;
        }

        DateFormat.prototype.valuesValidate = function() {
            return this.value === this.value ;
        }

        function formatDirective() {
            return {
                require: '?ngModel',
                link: function(scope, element, attrs, ngModel) {
                    var dataType = attrs.dataType || "integer",
                        formatPattern = attrs.formatPattern,
                        value = attrs.value,
                        returnValue = value,
                        FormatHandler = ValueFormatStrategy.get(dataType),
                        formatHandler = new FormatHandler(value, dataType, formatPattern);

                        returnValue = formatHandler.format();

                        element.html(returnValue);

                }
            }
        }

        directiveModule.directive('ngFormat', formatDirective);

    }
);