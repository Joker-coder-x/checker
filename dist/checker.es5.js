function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true;
        _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true,
        didErr = false,
        err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next();
            normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true;
            err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/***
 * @packageName checker
 * @description checker是一个不需要耦合第三方框架或者模块的单独的验证模块。关注点分离，让用户不需要关心验证流程只需要关注验证结果!
 * @author 稀饭
 * @eamil 3014375877@qq.com
 * @qq 3014375877
 * @date 2021/04/21
 * @version 1.0.0
 * @copyright 稀饭
 */
var checker = function() {
    // ========================================内置常量和IIFE全局对象部分 start================================================ //
    //子规则分割符
    var SPLIT_CHAR = '|'; //空字符串

    var BLANK_STRING = ''; //内置修饰符

    var INNER_MODIFIRS = {
        capital: 'capital',
        //大写
        lowercase: 'lowercase',
        //小写
        compose: 'compose' //组合

    }; //内置修饰符对应的msg

    var INNER_MODIFIRS_CONDITION = {
        capital: '.capital修饰符要求检测的值中如果含有英文字母的话必须大写！',
        //大写
        lowercase: '.lowercase修饰符要求检测的值中如果含有英文字母的话必须小写！',
        //小写
        compose: '.compose修饰符要求检测的值必须某些类型的值组合起来,必须同时存在所有的类型！ 比如字母、数字组合。必须同时存在字母和数字' //组合

    }; //可配合.capital、.lowercase、.compose、.contain等修饰符让验证更灵活

    var INNER_RULES = {
        //格式验证类
        'require': handleRequire,
        //必填
        'number': handleNumber,
        //验证数字
        'integer': handleInteger,
        //验证整数
        'float': handleFloat,
        //验证小数
        'boolean': handleBoolean,
        //验证布尔值
        'alpha': handleAlpha,
        //验证字母
        'alphaNum': handleAlphaNum,
        //验证数字、字母组合
        'alphaDash': handleAlphaDash,
        //验证数字、字母、下划线、中横线组合
        'chs': handleChs,
        //验证汉字
        'chsAlpha': handleChsAlpha,
        //验证汉字、字母组合
        'chsAlphaNum': handleChsAlphaNum,
        //验证汉字、数字、字母组合
        'chsDash': handleChsDash,
        //验证汉字、数字、字母、下划线、中横线组合
        'json': handleJSON,
        //验证JSON
        'email': handleEmail,
        //验证email
        'date': handleDate,
        //验证有效日期
        'url': handleURL,
        //验证url
        'ip': handleIP,
        //验证IP ipv4和ipv6
        'host': handleHost,
        //验证域名
        'idcard': handleIdcard,
        //验证身份证
        'telephone': handleTelephone,
        //验证座机电话号码
        'phone': handlePhone,
        //验证手机电话号码
        'postcode': handlePostCode,
        //验证邮政编码
        //长度和区间验证类
        'max': handleMax,
        //验证最大长度
        'min': handleMin,
        //验证最小长度
        'length': handleLength,
        //验证某个字段长度是否等于某个长度或者在某个区间里
        'in': handleIn,
        //验证某个字段的值是否在某个范围
        'notIn': handleNotIn,
        //验证某个字段的值不在某个范围
        'between': handleBetween,
        //验证某个字段的值是否在某个区间
        'notBetween': handleNotBetween,
        //验证某个字段的值不在某个范围
        //日期验证
        'before': handleBefore,
        //验证某个字段的值是否在某个日期之前
        'after': handleAfter,
        //验证某个字段的值是否在某个日期之后
        'expire': handleExpire,
        //expire:开始时间,结束时间 验证是否在开始和结束时间这个区间内
        'notExpire': handleNotExpire,
        //expire:开始时间,结束时间 验证是否不在开始和结束时间这个区间内
        //上传验证
        'file': handleFile,
        //判断是不是一个文件
        'fileSize': handleFileSize,
        //fileSize:规定文件的大小区间
        'fileExt': handleFileExt,
        //规定文件的扩展名
        'fileMime': handleFileMime,
        //验证上传文件类型
        //字段比较类
        'confirm': handleConfirm,
        //验证某个字段是否和另外一个字段的值一致
        'different': handleDifferent,
        //验证某个字段是否和另外一个字段的值不一致
        'eq': handleEq,
        //验证是否等于某个值
        '=': handleEq,
        //验证是否等于某个值
        'same': handleEq,
        //验证是否等于某个值
        'egt': handleEgt,
        //验证是否大于等于某个值
        '>=': handleEgt,
        //验证是否大于等于某个值
        'gt': handleGt,
        //验证是否大于某个值
        '>': handleGt,
        //验证是否大于某个值
        'elt': handleElt,
        //验证是否小于等于某个值
        '<=': handleElt,
        //验证是否大于等于某个值
        'lt': handleLt,
        //验证是否小于某个值
        '<': handleLt //验证是否小于某个值

    };
    var INNER_RULES_ERRMSG = {
        //格式验证类
        'require': function require(key) {
            return error(key, "为必填字段!");
        },
        'number': function number(key) {
            return error(key, "必须是一个合法的数字(整数或者浮点数),不支持科学计数法方式!");
        },
        'integer': function integer(key) {
            return error(key, "必须是一个合法的整数!");
        },
        'float': function float(key) {
            return error(key, "必须是一个合法的浮点数!");
        },
        'boolean': function boolean(key) {
            return error(key, "必须是一个布尔值(必须是小写字母)!");
        },
        'alpha': function alpha(key) {
            return error(key, "所有字符必须全部是字母!");
        },
        'alphaNum': function alphaNum(key) {
            return error(key, "该字段只能由字母或者数字组成!");
        },
        'alphaDash': function alphaDash(key) {
            return error(key, "该字段只能由字母、数字、下划线(_)和中横线(-)组成!");
        },
        'chs': function chs(key) {
            return error(key, "所有字符必须是汉字!");
        },
        'chsAlpha': function chsAlpha(key) {
            return error(key, "该字段只能由汉字、字母组成!");
        },
        'chsAlphaNum': function chsAlphaNum(key) {
            return error(key, "该字段只能由汉字、字母、数字组成!");
        },
        'chsDash': function chsDash(key) {
            return error(key, "该字段只能由汉字、字母、数字、下划线(_)和中横线(-)组成!");
        },
        'json': function json(key) {
            return error(key, "必须是有效的JSON字符串!");
        },
        'email': function email(key) {
            return error(key, "邮箱地址格式错误!");
        },
        'date': function date(key) {
            return error(key, "必须是一个有效日期!");
        },
        'url': function url(key) {
            return error(key, "url格式错误!");
        },
        'ip': function ip(key) {
            return error(key, "IP格式错误");
        },
        'host': function host(key) {
            return error(key, "域名格式错误!");
        },
        'idcard': function idcard(key) {
            return error(key, "身份证格式错误");
        },
        'telephone': function telephone(key) {
            return error(key, "电话号码格式错误");
        },
        'phone': function phone(key) {
            return error(key, "手机电话好吗格式错误");
        },
        'postcode': function postcode(key) {
            return error(key, "邮政编码格式错误");
        },
        //长度和区间验证类
        'max': function max(key) {
            return error(key, "超过了规定的最大长度!");
        },
        'min': function min(key) {
            return error(key, "小于规定的最小长度!");
        },
        'length': function length(key) {
            return error(key, "不在规定字符长度范围之内!");
        },
        'in': function _in(key) {
            return error(key, "不在规定选择范围内!");
        },
        'notIn': function notIn(key) {
            return error(key, "此字段的值在不能选择的范围之内!");
        },
        'between': function between(key) {
            return error(key, "当前字段的值不在规定范围之内!");
        },
        'notBetween': function notBetween(key) {
            return error(key, "当前字段的值不在规定范围之内!");
        },
        //日期验证
        'before': function before(key) {
            return error(key, "检测的日期必须在规定日期之前!");
        },
        'after': function after(key) {
            return error(key, "检测的日期必须在规定日期之后!");
        },
        'expire': function expire(key) {
            return error(key, "检测的日期必须在规定日期范围之间!");
        },
        'notExpire': function notExpire(key) {
            return error(key, "检测的日期必须不在规定日期范围之间!");
        },
        //上传验证
        'file': function file(key) {
            return error(key, '不是一个File类型或者类文件类型');
        },
        'fileSize': function fileSize(key) {
            return error(key, '文件大小不在规定范围内');
        },
        'fileExt': function fileExt(key) {
            return error(key, "不允许的文件后缀!");
        },
        'fileMime': function fileMime(key) {
            return error(key, "不允许的文件类型!");
        },
        //字段比较类
        'confirm': function confirm(key) {
            return error(key, "必须和指定字段的值一致!");
        },
        'different': function different(key) {
            return error(key, "必须和指定字段的值不一致!");
        },
        'eq': function eq(key) {
            return error(key, "当前字段的值不等于规定值！");
        },
        '=': function _(key) {
            return error(key, "当前字段的值不等于规定值！");
        },
        'same': function same(key) {
            return error(key, "当前字段的值不等于规定值！");
        },
        'egt': function egt(key) {
            return error(key, "当前字段值必须大于等于规定值!");
        },
        '>=': function _(key) {
            return error(key, "当前字段值必须大于等于规定值!");
        },
        'gt': function gt(key) {
            return error(key, "当前字段值必须大于规定值!");
        },
        '>': function _(key) {
            return error(key, "当前字段值必须大于规定值!");
        },
        'elt': function elt(key) {
            return error(key, "当前字段值必须小于等于规定值!");
        },
        '<=': function _(key) {
            return error(key, "当前字段值必须小于等于规定值!");
        },
        'lt': function lt(key) {
            return error(key, "当前字段值必须小于规定值!");
        },
        '<': function _(key) {
            return error(key, "当前字段值必须小于规定值!");
        }
    }; //返回资源的结构

    var initReturnResObj = {
        result: true,
        //验证结果
        errMsg: 'ok',
        //错误信息
        errField: '',
        //发生错误的字段
        errRule: '' //验证失败的规则

    }; //匹配整条规则的正则表达式

    var ruleReg = /([a-zA-Z=\<\>]+){1}((?:\.(?:[a-z])+)+)?(?:\:{1}\s*([\S]+))?/; //返回参数类型列表

    var RETURN_TYPE_LIST = ['s', 'm', 'a']; // ========================================内置常量和IIFE全局对象部分 end================================================ //
    // =========================================主函数部分 start================================================ //

    /**
     * @todo  验证函数
     * @param {Object|HTMLFormElement|FormData} data 要检测的数据对象
     * @param {Array} rules 包含规则的数组
     * @param {Function} callbcak 每个字段检测完成之后执行的回调函数
     * @param {String} returnType 返回值的类型 s=>single=>返回一个要么表示失败要么表示成功
     *                                        m=>multiple=>返回一个包含所有检测错误规则的的数组
     *                                        a=>all=>返回所有的检测结果
     * @returns {Object|Array} 返回值的结构 
                            result: true, //验证结果 Boolean
                            errMsg: 'ok', //错误信息 String
                            errField: '', //发生错误的字段 String
                            errRule: ''// errMsg在result为true的情况下为ok，result为false的情况下为检测失败的原因 String
        * @throws {TypeError} 在解析表达式失败或者用户传入的参数错误是会抛出一个类型错误，并且带有提示信息。
        */

    function checker(data, rules, callbcak) {
        var returnType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : RETURN_TYPE_LIST[0];
        var res = returnType === RETURN_TYPE_LIST[0] ? JSON.parse(JSON.stringify(initReturnResObj)) : [];

        if (!Array.isArray(rules)) {
            throwTypeError('checker的第二个参数必须是一个数组类型！');
        } //如果没有定义任何规则，则不需要遍历data直接返回成功状态


        if (rules.length === 0) {
            return res;
        } //如果returnType不是存在的类型 则默认为single


        if (RETURN_TYPE_LIST.indexOf(returnType) === '-1') {
            returnType = RETURN_TYPE_LIST[0];
        }

        if (HTMLFormElement && data instanceof HTMLFormElement || FormData && data instanceof FormData) {
            res = parseFormData(data, rules, callbcak, returnType);
        } else if (isPlainObject(data)) {
            res = parsePlainObject(data, rules, callbcak, returnType);
        } else {
            throwError('checker的第一个参数只能说一个纯粹的对象："{}"或者一个form元素或者是一个FormData实例！');
        }

        return res;
    } //定义一些宏


    checker.S = RETURN_TYPE_LIST[0]; //single

    checker.M = RETURN_TYPE_LIST[1]; //multiple

    checker.A = RETURN_TYPE_LIST[2]; //all
    //定义静态方法

    checker.has = has;
    checker.hasCapital = hasCapital;
    checker.hasLowerCase = hasLowerCase;
    checker.hasChs = hasChs;
    checker.isString = isString;
    checker.isStringable = isStringable;
    checker.isObject = isObject;
    checker.isPlainObject = isPlainObject;
    checker.isInteger = isInteger;
    checker.isFloat = isFloat;
    checker.isAlpha = isAlpha;
    checker.isAlphaNumContain = isAlphaNumContain;
    checker.isAlphaNumCompose = isAlphaNumCompose;
    checker.isAlphaDashContain = isAlphaDashContain;
    checker.isAlphaDashCompose = isAlphaDashCompose;
    checker.isChs = isChs;
    checker.isChsAlphaContain = isChsAlphaContain;
    checker.isChsAlphaCompose = isChsAlphaCompose;
    checker.isChsAlphaNumContain = isChsAlphaNumContain;
    checker.isChsAlphaNumCompose = isChsAlphaNumCompose;
    checker.isChsDashContain = isChsDashContain;
    checker.isChsDashCompose = isChsDashCompose;
    checker.isValidJSON = isValidJSON;
    checker.isValidDate = isvalidDate;
    checker.isEmail = isEmail;
    checker.isIP = isIP;
    checker.isHost = isHost;
    checker.isIdcard = isIdcard;
    checker.isURL = isURL;
    checker.isTelephoneNumber = isTelephoneNumber;
    checker.isPhone = isPhone;
    checker.isPostCode = isPostCode;
    checker.isFile = isFile;
    /**
     * @todo 定义扩展规则
     * @param {String} ruleName  规则的名字
     * @param {Function} handler 规则的处理函数 接受一个options参数
     *    -options参数的结构
     *         - val {*} 要检测的值
     *         - arg {String} 规则表达式中的参数
     *         - modifiers {Array} 规则表达式中的修饰符
     *         - getField  {Function} 获取data中的某个字段 不存在返回undefined
     *         - ruleName  {String} 当前调用处理函数的规则名字
     * @returns {Boolean} true表示添加成功 false表示添加失败
     */

    checker.defineRule = function(ruleName, handler) {
        if (typeof ruleName !== 'string') {
            throwTypeError('defineRule的第一个参数只能是String');
        }

        if (typeof handler !== 'function') {
            throwTypeError('defineRule的第二个参数只能是Function');
        }

        ruleName = ruleName.trim();

        if (ruleName.length) {
            if (INNER_RULES[ruleName]) {
                throwError("[\"".concat(ruleName, "\"]\u5DF2\u7ECF\u5B58\u5728\u4E8E\u5185\u7F6E\u89C4\u5219\u4E2D\uFF0C\u8BF7\u6362\u4E00\u4E2A\u6807\u8BC6!"));
            }

            INNER_RULES[ruleName] = handler;
            return true;
        }

        return false;
    }; // ======================================================主函数部分 end============================================================== //
    // ======================================================rule解析部分 start============================================================== //
    //解析表单数据


    function parseFormData(form, rules, callback, returnType) {
        var formData = form instanceof HTMLFormElement ? new FormData(form) : form,
            res = JSON.parse(JSON.stringify(initReturnResObj)),
            errResults = [],
            results = [],
            getField = getFieldByData(formData);

        var _iterator = _createForOfIteratorHelper(formData.entries()),
            _step;

        try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var _step$value = _slicedToArray(_step.value, 2),
                    key = _step$value[0],
                    value = _step$value[1];

                var result = handleRule(key, value, rules, getField); //调用callback

                callback && typeof callback === 'function' && callback(result);

                if (result.result === false) {
                    errResults.push(result);

                    if (returnType === RETURN_TYPE_LIST[0] && errResults.length === 1) {
                        return result;
                    }
                }

                results.push(result);
            }
        } catch (err) {
            _iterator.e(err);
        } finally {
            _iterator.f();
        }

        return returnType === RETURN_TYPE_LIST[0] ? res : returnType === RETURN_TYPE_LIST[1] ? errResults : results;
    } //解析普通对象数据


    function parsePlainObject(data, rules, callback, returnType) {
        var res = JSON.parse(JSON.stringify(initReturnResObj)),
            errResults = [],
            results = [],
            getField = getFieldByData(data);

        for (var key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
                var value = data[key];
                var result = handleRule(key, value, rules, getField); //调用callback

                callback && typeof callback === 'function' && callback(result);

                if (result.result === false) {
                    errResults.push(result);

                    if (returnType === RETURN_TYPE_LIST[0] && errResults.length === 1) {
                        return result;
                    }
                }

                results.push(result);
            }
        }

        return returnType === RETURN_TYPE_LIST[0] ? res : returnType === RETURN_TYPE_LIST[1] ? errResults : results;
    }

    function findRuleLineByName(name, rules) {
        var r;

        for (var i = 0, l = rules.length; i < l; i++) {
            r = rules[i];

            if (r.name.trim() === name.trim()) {
                return r;
            }
        }
    }

    function parseModifier(str) {
        var modifiers = str.split('.');
        modifiers.shift();
        return modifiers;
    } //解析行内子规则


    function lineRuleTest(rule, value, getField) {
        //子规则
        var childRules = rule.split(SPLIT_CHAR);
        var errChildRule,
            m = [];
        var result = childRules.every(function(cr) {
            //检测修饰符后面有没有带参数
            var match = cr.match(ruleReg);
            var arg, //参数
                modifiers; //修饰符列表

            if (match) {
                cr = match[1];
                modifiers = match[2] === undefined ? [] : parseModifier(match[2]);
                arg = match[3];
            }

            if (INNER_RULES[cr] && typeof INNER_RULES[cr] === 'function') {
                //有对应的内置规则
                var handler = INNER_RULES[cr],
                    _result = !!handler({
                        val: value,
                        arg: arg,
                        modifiers: modifiers || [],
                        getField: getField,
                        ruleName: cr
                    }); //找到第一个不符合的子规则


                if (errChildRule === undefined && _result === false) {
                    errChildRule = cr; //如果有内置修饰符 则获取当前修饰符注释

                    if (modifiers.length > 0) {
                        modifiers.map(function(item) {
                            if (INNER_MODIFIRS_CONDITION[item]) {
                                m.push(INNER_MODIFIRS_CONDITION[item]);
                            }
                        });
                    }
                }

                return _result;
            } else {
                //没有对应的内置规则
                throwError("\u4E0D\u5B58\u5728\u5728\u8BE5\u5185\u7F6E\u89C4\u5219:[\"".concat(cr, "\"]"));
            }
        });
        return {
            result: result,
            errChildRule: errChildRule,
            modifiers: m
        };
    } //解析规则


    function handleRule(key, value, rules, getField) {
        key = key.trim();
        var res = JSON.parse(JSON.stringify(initReturnResObj)),
            ruleLine = findRuleLineByName(key, rules);

        if (ruleLine === undefined) {
            //在rules里面没有定义该字段的处理规则 那么就默认不检测这条数据
            return res;
        }

        if (!has(ruleLine, 'rule')) {
            //在对象中没有定义rule属性，那么默认忽略这条规则，不检测这条数据
            return res;
        }

        var rule = ruleLine.rule;

        if (typeof rule === 'string') {
            rule = rule.trim();

            if (rule.length > 0) {
                var result = lineRuleTest(rule, value, getField);

                if (result.result === false) {
                    //第一条验证失败的规则
                    res.result = false;
                    res.errRule = result.errChildRule;
                    res.errField = key;
                    res.errMsg = ruleLine.errMsg || INNER_RULES_ERRMSG[result.errChildRule] && INNER_RULES_ERRMSG[result.errChildRule](key) + printMofifiersReason(result.modifiers) || "\u5B57\u6BB5[\"".concat(key, "\uFF1A\u4E0D\u7B26\u5408\u9A8C\u8BC1\u89C4\u5219\"]");
                    return res;
                }
            } else { //rule='' 默认不检测该字段
            }
        } else if (_typeof(rule) === 'object' && rule instanceof RegExp) {
            //用户自定义正则表达式
            if (!rule.test(value)) {
                //第一条验证失败的规则
                res.result = false;
                res.errField = key;
                res.errMsg = ruleLine.errMsg || "\u5B57\u6BB5[\"".concat(key, "\uFF1A\u4E0D\u7B26\u5408\u9A8C\u8BC1\u89C4\u5219\"]");
                return res;
            }
        } else {
            throwTypeError('rule只能是一个String类型或者一个RegExp实例');
        }

        return res;
    }

    ; // ======================================================rule解析部分 end========================================= //
    // =======================================工具函数 start================================================ //

    function error(name, reason) {
        return "\u5B57\u6BB5[\"".concat(name, "\"]\uFF1A").concat(reason);
    }

    ;

    function throwError(msg, ruleName) {
        throw new Error("".concat(ruleName ? "[\"".concat(ruleName, "\"]") : '', ":").concat(msg, "!"));
    }

    function throwTypeError(msg, ruleName) {
        throw new TypeError("".concat(ruleName ? "[\"".concat(ruleName, "\"]") : '', ":").concat(msg, "!"));
    }

    function throwSyntaxError(msg, ruleName) {
        throw new SyntaxError("".concat(ruleName ? "[\"".concat(ruleName, "\"]") : '', ":").concat(msg, "!"));
    } //获取文件扩展名


    function getFileExt(file) {
        if (isFile(file)) {
            var _fileName = file.name;
            return _fileName.slice(_fileName.lastIndexOf('.'));
        }
    }

    function printMofifiersReason(modifiers) {
        return "\n" + modifiers.join("\n");
    }

    function getFieldByData(data) {
        var $data,
            isFormData = false;

        if (HTMLFormElement && FormData && data instanceof HTMLFormElement) {
            //如果data是一个表单元素
            $data = new FormData(data);
            isFormData = true;
        } else if (FormData && data instanceof FormData) {
            //如果data是一个formData实例
            $data = data;
            isFormData = true;
        } else if (isPlainObject(data)) {
            //如果data是一个纯粹的对象
            $data = data;
        }

        return function(fieldName) {
            if (typeof fieldName === 'string') {
                if (isFormData) {
                    var value = $data.get(fieldName);
                    return value === null ? undefined : value;
                } else {
                    return $data[fieldName];
                }
            }
        };
    } // =======================================工具函数 end================================================ //
    // ==================================================底层验证函数工具部分 start============================================= //
    //判断对象是否有某个属性 不检测原型链


    function has(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
    } //是否存在大写字母


    function hasCapital(v) {
        var reg = /[A-Z]+/;
        return reg.test(v);
    } //是否存在小写字母


    function hasLowerCase(v) {
        var reg = /[a-z]+/;
        return reg.test(v);
    } //是否存在中文


    function hasChs(v) {
        var reg = /(?:[\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u3005\u3007\u3021-\u3029\u3038-\u303B\u3400-\u4DBF\u4E00-\u9FFC\uF900-\uFA6D\uFA70-\uFAD9]|\uD81B[\uDFF0\uDFF1]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDD\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])+/;
        return reg.test(v);
    } //是否是字符串


    function isString(v) {
        return typeof v === 'string';
    } //能否隐式转成String 只有number类型和string类型才能返回true 其他一律false


    function isStringable(v) {
        if (isString(v)) {
            return true;
        } else if (typeof v == 'number') {
            return true;
        } else {
            return false;
        }
    } //是否是一个纯粹的对象


    function isPlainObject(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    } //是否是一个对象


    function isObject(obj) {
        return obj !== null && _typeof(obj) === 'object';
    } //严格检测整数


    function isInteger(v) {
        var reg = /^-?[0-9]+$/;
        return reg.test(v) && !isNaN(Number(v));
    } //严格检测浮点数


    function isFloat(v) {
        var reg = /^-?\d+\.\d+$/;
        return reg.test(v) && !isNaN(parseFloat(v));
    } //严格检测英文字母


    function isAlpha(v) {
        var reg = /^[a-zA-z]+$/;
        return reg.test(v);
    } //严格检测字母+数字组合 必须同时存在字母和数字=>组合范围


    function isAlphaNumCompose(v) {
        var regList = [/[a-zA-Z]+/, /[0-9]+/, /^[a-zA-Z0-9]+$/];
        return regList.every(function(reg) {
            return reg.test(v);
        });
    } //严格检测字母+数字组合 包含范围


    function isAlphaNumContain(v) {
        var reg = /^[a-zA-Z0-9]+$/;
        return reg.test(v);
    } //验证某个字段的值是否为字母和数字，下划线_及中横线-=>组合范围


    function isAlphaDashCompose(v) {
        var regList = [/[a-zA-Z]+/, /[0-9]+/, /(-|_)+/, /^[a-zA-Z0-9\-_]+$/];
        return regList.every(function(reg) {
            return reg.test(v);
        });
    } //验证某个字段的值是否为字母和数字，下划线_及中横线-=>包含范围


    function isAlphaDashContain(v) {
        var reg = /^[a-zA-Z0-9\-_]+$/;
        return reg.test(v);
    } //只能是汉字


    function isChs(v) {
        var reg = /^(?:[\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u3005\u3007\u3021-\u3029\u3038-\u303B\u3400-\u4DBF\u4E00-\u9FFC\uF900-\uFA6D\uFA70-\uFAD9]|\uD81B[\uDFF0\uDFF1]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDD\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])+$/;
        return reg.test(v);
    } //验证某个字段的值只能是汉字、字母=>组合关系


    function isChsAlphaCompose(v) {
        var regList = [/[a-zA-Z]+/, /(?:[\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u3005\u3007\u3021-\u3029\u3038-\u303B\u3400-\u4DBF\u4E00-\u9FFC\uF900-\uFA6D\uFA70-\uFAD9]|\uD81B[\uDFF0\uDFF1]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDD\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])+/, /^(?:[A-Za-z\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u3005\u3007\u3021-\u3029\u3038-\u303B\u3400-\u4DBF\u4E00-\u9FFC\uF900-\uFA6D\uFA70-\uFAD9]|\uD81B[\uDFF0\uDFF1]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDD\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])+$/];
        return regList.every(function(reg) {
            return reg.test(v);
        });
    } //验证某个字段的值只能是汉字、字母=>包含关系


    function isChsAlphaContain(v) {
        var reg = /^(?:[A-Za-z\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u3005\u3007\u3021-\u3029\u3038-\u303B\u3400-\u4DBF\u4E00-\u9FFC\uF900-\uFA6D\uFA70-\uFAD9]|\uD81B[\uDFF0\uDFF1]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDD\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])+$/;
        return reg.test(v);
    } //验证某个字段的值只能是汉字、字母和数字=>组合关系


    function isChsAlphaNumCompose(v) {
        var regList = [/[a-zA-Z]+/, /[0-9]+/, /(?:[\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u3005\u3007\u3021-\u3029\u3038-\u303B\u3400-\u4DBF\u4E00-\u9FFC\uF900-\uFA6D\uFA70-\uFAD9]|\uD81B[\uDFF0\uDFF1]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDD\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])+/, /^(?:[0-9A-Za-z\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u3005\u3007\u3021-\u3029\u3038-\u303B\u3400-\u4DBF\u4E00-\u9FFC\uF900-\uFA6D\uFA70-\uFAD9]|\uD81B[\uDFF0\uDFF1]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDD\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])+$/];
        return regList.every(function(reg) {
            return reg.test(v);
        });
    } //验证某个字段的值只能是汉字、字母和数字=>包含关系


    function isChsAlphaNumContain(v) {
        var reg = /^(?:[0-9A-Za-z\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u3005\u3007\u3021-\u3029\u3038-\u303B\u3400-\u4DBF\u4E00-\u9FFC\uF900-\uFA6D\uFA70-\uFAD9]|\uD81B[\uDFF0\uDFF1]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDD\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])+$/;
        return reg.test(v);
    } //验证某个字段的值只能是汉字、字母、数字和下划线_及破折号-=>组合模式


    function isChsDashCompose(v) {
        var regList = [/[a-zA-Z]+/, /[0-9]+/, /(?:[\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u3005\u3007\u3021-\u3029\u3038-\u303B\u3400-\u4DBF\u4E00-\u9FFC\uF900-\uFA6D\uFA70-\uFAD9]|\uD81B[\uDFF0\uDFF1]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDD\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])+/, /(-|_)+/, /^(?:[\x2D0-9A-Z_a-z\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u3005\u3007\u3021-\u3029\u3038-\u303B\u3400-\u4DBF\u4E00-\u9FFC\uF900-\uFA6D\uFA70-\uFAD9]|\uD81B[\uDFF0\uDFF1]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDD\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])+$/];
        return regList.every(function(reg) {
            return reg.test(v);
        });
    } //验证某个字段的值只能是汉字、字母、数字和下划线_及破折号-=>包含模式


    function isChsDashContain(v) {
        var reg = /^(?:[\x2D0-9A-Z_a-z\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u3005\u3007\u3021-\u3029\u3038-\u303B\u3400-\u4DBF\u4E00-\u9FFC\uF900-\uFA6D\uFA70-\uFAD9]|\uD81B[\uDFF0\uDFF1]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDD\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])+$/;
        return reg.test(v);
    } //是否为有效的JSON字符串


    function isValidJSON(v) {
        try {
            JSON.parse(v);
            return true;
        } catch (_unused) {
            return false;
        }
    } //验证是否是有效邮箱


    function isEmail(v) {
        var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        return reg.test(v);
    } //验证是否为一个合法的URL


    function isURL(v) {
        //这个url验证的表达式提取自：npm包 async-validator的源码
        var reg = new RegExp("^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$", 'i');
        return reg.test(v);
    } //检测ip地址 ipv4/ipv6


    function isIP(v) {
        var reg = /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){6}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^::([\da-fA-F]{1,4}:){0,4}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:):([\da-fA-F]{1,4}:){0,3}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){2}:([\da-fA-F]{1,4}:){0,2}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){3}:([\da-fA-F]{1,4}:){0,1}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){4}:((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}$|^:((:[\da-fA-F]{1,4}){1,6}|:)$|^[\da-fA-F]{1,4}:((:[\da-fA-F]{1,4}){1,5}|:)$|^([\da-fA-F]{1,4}:){2}((:[\da-fA-F]{1,4}){1,4}|:)$|^([\da-fA-F]{1,4}:){3}((:[\da-fA-F]{1,4}){1,3}|:)$|^([\da-fA-F]{1,4}:){4}((:[\da-fA-F]{1,4}){1,2}|:)$|^([\da-fA-F]{1,4}:){5}:([\da-fA-F]{1,4})?$|^([\da-fA-F]{1,4}:){6}:$/;
        return reg.test(v);
    } //检测是否是一个合法域名


    function isHost(v) {
        var reg = /^[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?$/;
        return reg.test(v);
    } //身份证号(15位、18位数字)，最后一位是校验位，可能为数字或字符X


    function isIdcard(v) {
        var reg = /^(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)$/;
        return reg.test(v);
    } //座机电话号码


    function isTelephoneNumber(v) {
        var reg = /^\d{3}-\d{8}|\d{4}-\d{7}$/;
        return reg.test(v);
    } //中国邮政编码


    function isPostCode(v) {
        var reg = /^[1-9]\d{5}(?!\d)$/;
        return reg.test(v);
    } //手机电话号码


    function isPhone(v) {
        var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        return reg.test(v);
    } //检测是否是合法日期


    function isvalidDate(v) {
        return new Date(v).toString() === 'Invalid Date' ? false : true;
    } //检测是否是一个文件 或者类文件对象


    function isFile(v) {
        if (File && v instanceof File) {
            return true;
        } else if (isObject(v) && has(v, 'name') && has(v, 'size') && has(v, 'type')) {
            return true;
        } else {
            return false;
        }
    } // ==================================================底层验证函数工具部分 end============================================= //
    // ================================================= 解析内置规则的处理函数部分 start  ======================================= //
    //检测参数中的区间语法=>xxx.xx:m,n


    function checkIntervalSyntax(arg, ruleName) {
        //区间语法检测的正则表达式
        var intervalReg = /^\s*([^\s\,]+\s*(\,\s*[^\s\,]+)?)+\s*$/;

        if (!intervalReg.test(arg)) {
            throwSyntaxError('区间或者范围规则语法错误!区间语法规则为:n,n,n.... or n', ruleName);
        }
    }

    function autoCapitalOrLowercase(val, modifiers) {
        var isCapital = modifiers.indexOf(INNER_MODIFIRS.capital) !== -1,
            isLowercase = modifiers.indexOf(INNER_MODIFIRS.lowercase) !== -1;

        if (isCapital && isLowercase) {
            return hasCapital(val) || hasLowerCase(val);
        } else if (isCapital) {
            return !hasLowerCase(val);
        } else if (isLowercase) {
            return !hasCapital(val);
        } else {
            return hasCapital(val) || hasLowerCase(val);
        }
    }

    function handleRequire(_ref) {
        var val = _ref.val;
        return val || val.length > 0 || val.toString().length > 0;
    }

    function handleNumber(_ref2) {
        var val = _ref2.val;
        if (val === BLANK_STRING) return true;
        return isInteger(val) || isFloat(val);
    }

    function handleInteger(_ref3) {
        var val = _ref3.val;
        if (val === BLANK_STRING) return true;
        return isInteger(val);
    }

    function handleFloat(_ref4) {
        var val = _ref4.val;
        if (val === BLANK_STRING) return true;
        return isFloat(val);
    }

    function handleBoolean(_ref5) {
        var val = _ref5.val;
        if (val === BLANK_STRING) return true;

        if (typeof val === 'boolean') {
            return true;
        } else if (typeof val === 'string') {
            return val === 'true' || val === 'false' ? true : false;
        } else {
            return false;
        }
    }

    function handleChs(_ref6) {
        var val = _ref6.val;
        if (val === BLANK_STRING) return true;
        return isChs(val);
    }

    function handleJSON(_ref7) {
        var val = _ref7.val;
        if (val === BLANK_STRING) return true;
        return isValidJSON(val);
    }

    function handleEmail(_ref8) {
        var val = _ref8.val;
        if (val === BLANK_STRING) return true;
        return isEmail(val);
    }

    function handleDate(_ref9) {
        var val = _ref9.val;
        if (val === BLANK_STRING) return true;
        return isvalidDate(val);
    }

    function handleURL(_ref10) {
        var val = _ref10.val;
        if (val === BLANK_STRING) return true;
        return isURL(val);
    }

    function handleIP(_ref11) {
        var val = _ref11.val;
        if (val === BLANK_STRING) return true;
        return isIP(val);
    }

    function handleHost(_ref12) {
        var val = _ref12.val;
        if (val === BLANK_STRING) return true;
        return isHost(val);
    }

    function handleIdcard(_ref13) {
        var val = _ref13.val;
        if (val === BLANK_STRING) return true;
        return isIdcard(val);
    }

    function handleTelephone(_ref14) {
        var val = _ref14.val;
        if (val === BLANK_STRING) return true;
        return isTelephoneNumber(val);
    }

    function handlePhone(_ref15) {
        var val = _ref15.val;
        if (val === BLANK_STRING) return true;
        return isPhone(val);
    }

    function handlePostCode(_ref16) {
        var val = _ref16.val;
        if (val === BLANK_STRING) return true;
        return isPostCode(val);
    }

    function handleMax(_ref17) {
        var val = _ref17.val,
            arg = _ref17.arg,
            ruleName = _ref17.ruleName;

        if (!isInteger(arg) && !isFloat(arg)) {
            throwTypeError('参数必须是个number', ruleName);
        }

        if (val === BLANK_STRING) return true;

        if (isObject(val)) {
            if (Array.isArray(val)) {
                return val.length <= arg;
            } else if (isFile(val)) {
                return val.size <= arg;
            } else {
                throwTypeError('检测的字段类型必须是number、string、array、File、类File类型中的一种', ruleName);
            }
        } else {
            if (typeof val === 'number' && !isNaN(val)) {
                return val <= arg;
            } else if (isString(val)) {
                return val.length <= arg;
            } else {
                throwTypeError('检测的字段类型必须是number、string、array、File、类File类型中的一种', ruleName);
            }
        }
    }

    function handleMin(_ref18) {
        var val = _ref18.val,
            arg = _ref18.arg,
            ruleName = _ref18.ruleName;

        if (!isInteger(arg) && !isFloat(arg)) {
            throwTypeError('参数必须是个number', ruleName);
        }

        if (val === BLANK_STRING) return true;

        if (isObject(val)) {
            if (Array.isArray(val)) {
                return val.length >= arg;
            } else if (isFile(val)) {
                return val.size >= arg;
            } else {
                throwTypeError('检测的字段类型必须是number、string、array、File、类File类型中的一种', ruleName);
            }
        } else {
            if (typeof val === 'number' && !isNaN(val)) {
                return val >= arg;
            } else if (isString(val)) {
                return val.length >= arg;
            } else {
                throwTypeError('检测的字段类型必须是number、string、array、File、类File类型中的一种', ruleName);
            }
        }
    }

    function handleAlpha(_ref19) {
        var val = _ref19.val,
            modifiers = _ref19.modifiers,
            ruleName = _ref19.ruleName;

        if (!isString(val)) {
            throwTypeError('检测的值必须是个string', ruleName);
        }

        if (val === BLANK_STRING) return true;
        return modifiers.length === 0 ? isAlpha(val) : isAlpha(val) && autoCapitalOrLowercase(val, modifiers);
    }

    function handleAlphaNum(_ref20) {
        var val = _ref20.val,
            modifiers = _ref20.modifiers,
            ruleName = _ref20.ruleName;

        if (!isStringable(val)) {
            throwTypeError('检测的值必须是个string或者number', ruleName);
        }

        if (val === BLANK_STRING) return true;

        if (modifiers.length === 0) {
            //没有任何修饰符
            return isAlphaNumContain(val);
        } else {
            var isCompose = modifiers.indexOf(INNER_MODIFIRS.compose) !== -1;
            return isCompose ? isAlphaNumCompose(val) && autoCapitalOrLowercase(val, modifiers) : isAlphaNumContain(val) && autoCapitalOrLowercase(val, modifiers);
        }
    }

    function handleAlphaDash(_ref21) {
        var val = _ref21.val,
            modifiers = _ref21.modifiers,
            ruleName = _ref21.ruleName;

        if (!isStringable(val)) {
            throwTypeError('检测的值必须是个string或者number', ruleName);
        }

        if (val === BLANK_STRING) return true;

        if (modifiers.length === 0) {
            return isAlphaDashContain(val);
        } else {
            var isCompose = modifiers.indexOf(INNER_MODIFIRS.compose) !== -1;
            return isCompose ? isAlphaDashCompose(val) && autoCapitalOrLowercase(val, modifiers) : isAlphaDashContain(val) && autoCapitalOrLowercase(val, modifiers);
        }
    }

    function handleChsAlpha(_ref22) {
        var val = _ref22.val,
            modifiers = _ref22.modifiers,
            ruleName = _ref22.ruleName;

        if (!isStringable(val)) {
            throwTypeError('检测的值必须是个string或者number', ruleName);
        }

        if (val === BLANK_STRING) return true;

        if (modifiers.length === 0) {
            return isChsAlphaContain(val);
        } else {
            var isCompose = modifiers.indexOf(INNER_MODIFIRS.compose) !== -1;
            return isCompose ? isChsAlphaCompose(val) && autoCapitalOrLowercase(val, modifiers) : isChsAlphaContain(val) && autoCapitalOrLowercase(val, modifiers);
        }
    }

    function handleChsAlphaNum(_ref23) {
        var val = _ref23.val,
            modifiers = _ref23.modifiers,
            ruleName = _ref23.ruleName;

        if (!isStringable(val)) {
            throwTypeError('检测的值必须是个string或者number', ruleName);
        }

        if (val === BLANK_STRING) return true;

        if (modifiers.length === 0) {
            return isChsAlphaNumContain(val);
        } else {
            var isCompose = modifiers.indexOf(INNER_MODIFIRS.compose) !== -1;
            return isCompose ? isChsAlphaNumCompose(val) && autoCapitalOrLowercase(val, modifiers) : isChsAlphaNumContain(val) && autoCapitalOrLowercase(val, modifiers);
        }
    }

    function handleChsDash(_ref24) {
        var val = _ref24.val,
            modifiers = _ref24.modifiers,
            ruleName = _ref24.ruleName;

        if (!isStringable(val)) {
            throwTypeError('检测的值必须是个string或者number', ruleName);
        }

        if (val === BLANK_STRING) return true;

        if (modifiers.length === 0) {
            return isChsDashContain(val);
        } else {
            var isCompose = modifiers.indexOf(INNER_MODIFIRS.compose) !== -1;
            return isCompose ? isChsDashCompose(val) && autoCapitalOrLowercase(val, modifiers) : isChsDashContain(val) && autoCapitalOrLowercase(val, modifiers);
        }
    }

    function handleLength(_ref25) {
        var val = _ref25.val,
            arg = _ref25.arg,
            ruleName = _ref25.ruleName;
        checkIntervalSyntax(arg, ruleName);
        var options = [];
        options = arg.split(',').map(function(o) {
            return o.trim();
        });

        if (!options.every(function(o) {
                return isInteger(o) && parseInt(o) >= 0;
            })) {
            throwTypeError('参数必须是正整数', ruleName);
        }

        if (options.length === 1) {
            if (val === BLANK_STRING) return true;
            return val.length === parseInt(options[0]);
        } else if (options.length === 2) {
            var max = Math.max.apply(Math, _toConsumableArray(options)),
                min = Math.min.apply(Math, _toConsumableArray(options));
            if (val === BLANK_STRING) return true;
            return val.length >= min && val.length <= max;
        } else {
            throwTypeError('参数只有两种方式！比如："min,max" or "n"', ruleName);
        }
    }

    function handleIn(_ref26) {
        var val = _ref26.val,
            arg = _ref26.arg,
            ruleName = _ref26.ruleName;
        checkIntervalSyntax(arg, ruleName);
        if (val === BLANK_STRING) return true;
        var options = [];
        options = arg.split(',').map(function(o) {
            return o.trim();
        });
        return options.indexOf(val) !== -1;
    }

    function handleNotIn(opts) {
        return !handleIn(opts);
    }

    function handleBetween(_ref27) {
        var val = _ref27.val,
            arg = _ref27.arg,
            ruleName = _ref27.ruleName;
        checkIntervalSyntax(arg, ruleName);
        val = parseFloat(val);
        var options = [];
        options = arg.split(',').map(function(o) {
            return o.trim();
        });

        if (!options.every(function(o) {
                return isInteger(o) || isFloat(o);
            })) {
            throwTypeError('参数必须是number', ruleName);
        }

        if (options.length !== 2) {
            throwTypeError('参数必须存在一个开始区间和结束区间且只能为数字！比如：min,max', ruleName);
        } else {
            if (val === BLANK_STRING) return true;
            var max = Math.max.apply(Math, _toConsumableArray(options)),
                min = Math.min.apply(Math, _toConsumableArray(options));
            return val >= min && val <= max;
        }
    }

    function handleNotBetween(opts) {
        return !handleBetween(opts);
    }

    function handleEq(_ref28) {
        var val = _ref28.val,
            arg = _ref28.arg,
            ruleName = _ref28.ruleName;

        if (!isStringable(val)) {
            throwTypeError('检测的值必须是个string或者number', ruleName);
        }

        if (val === BLANK_STRING) return true;

        if (isInteger(arg) || isFloat(arg)) {
            return parseFloat(val) === parseFloat(arg);
        } else {
            return val === arg;
        }
    }

    function handleEgt(_ref29) {
        var val = _ref29.val,
            arg = _ref29.arg,
            ruleName = _ref29.ruleName;

        if (!isStringable(val)) {
            throwTypeError('检测的值必须是个string或者number', ruleName);
        }

        if (isInteger(arg) || isFloat(arg)) {
            if (val === BLANK_STRING) return true;
            return parseFloat(val) >= parseFloat(arg);
        } else {
            throwTypeError('参数只能是一个number', ruleName);
        }
    }

    function handleGt(_ref30) {
        var val = _ref30.val,
            arg = _ref30.arg,
            ruleName = _ref30.ruleName;

        if (!isStringable(val)) {
            throwTypeError('检测的值必须是个string或者number', ruleName);
        }

        if (isInteger(arg) || isFloat(arg)) {
            if (val === BLANK_STRING) return true;
            return parseFloat(val) > parseFloat(arg);
        } else {
            throwTypeError('参数只能是一个number', ruleName);
        }
    }

    function handleElt(_ref31) {
        var val = _ref31.val,
            arg = _ref31.arg,
            ruleName = _ref31.ruleName;

        if (!isStringable(val)) {
            throwTypeError('检测的值必须是个string或者number', ruleName);
        }

        if (isInteger(arg) || isFloat(arg)) {
            if (val === BLANK_STRING) return true;
            return parseFloat(val) <= parseFloat(arg);
        } else {
            throwTypeError('参数只能是一个number', ruleName);
        }
    }

    function handleLt(_ref32) {
        var val = _ref32.val,
            arg = _ref32.arg,
            ruleName = _ref32.ruleName;

        if (!isStringable(val)) {
            throwTypeError('检测的值必须是个string或者number', ruleName);
        }

        if (isInteger(arg) || isFloat(arg)) {
            if (val === BLANK_STRING) return true;
            return val < parseFloat(arg);
        } else {
            throwTypeError('参数只能是一个number', ruleName);
        }
    }

    function handleBefore(_ref33) {
        var val = _ref33.val,
            arg = _ref33.arg,
            ruleName = _ref33.ruleName;

        if (!isvalidDate(val)) {
            throwTypeError('检测的字段值必须是一个合法日期', ruleName);
        }

        if (!isvalidDate(arg)) {
            throwTypeError('参数必须是一个合法的日期', ruleName);
        }

        if (val === BLANK_STRING) return true;
        return new Date(val).getTime() <= new Date(arg).getTime();
    }

    function handleAfter(_ref34) {
        var val = _ref34.val,
            arg = _ref34.arg,
            ruleName = _ref34.ruleName;

        if (!isvalidDate(val)) {
            throwTypeError('检测的字段值必须是一个合法日期', ruleName);
        }

        if (!isvalidDate(arg)) {
            throwTypeError('参数必须是一个合法的日期', ruleName);
        }

        if (val === BLANK_STRING) return true;
        return new Date(val).getTime() >= new Date(arg).getTime();
    }

    function handleExpire(_ref35) {
        var val = _ref35.val,
            arg = _ref35.arg,
            ruleName = _ref35.ruleName;
        checkIntervalSyntax(arg, ruleName);

        if (!isvalidDate(val)) {
            throwTypeError('检测的字段值必须是一个合法日期', ruleName);
        }

        var d = new Date(val).getTime();
        var options = arg.split(',').map(function(o) {
            return o.trim();
        });

        if (!options.every(function(o) {
                return isvalidDate(o);
            })) {
            throwTypeError('区间里面的参数必须是一个合法的日期', ruleName);
        }

        if (options.length !== 2) {
            throwTypeError('必须存在一个开始区间和结束区间且只能为一个合法日期！比如：2015-01-01,2021-01-01', ruleName);
        } else {
            if (val === BLANK_STRING) return true;
            var max = Math.max(new Date(options[0]).getTime(), new Date(options[1]).getTime()),
                min = Math.min(new Date(options[0]).getTime(), new Date(options[1]).getTime());
            return d >= min && d <= max;
        }
    }

    function handleNotExpire(opts) {
        return !handleExpire(opts);
    }

    function handleFile(_ref36) {
        var val = _ref36.val;
        return isFile(val);
    }

    function handleFileSize(_ref37) {
        var val = _ref37.val,
            arg = _ref37.arg,
            ruleName = _ref37.ruleName;
        checkIntervalSyntax(arg, ruleName);

        if (!isFile(val)) {
            throwTypeError('只能检测的值只能是一个File对象或者一个类文件对象拥有[name,size,type]等属性的对象!', ruleName);
        }

        var size = val.size;
        var options = [];
        options = arg.split(',').map(function(o) {
            return o.trim();
        });

        if (!options.every(function(o) {
                return isInteger(o) || isFloat(o) && o >= 0;
            })) {
            throwError('fileSize规则的参数必须是number，且必须>=0!', fileName);
        }

        if (options.length === 1) {
            if (val === BLANK_STRING) return true;
            return size >= 0 && size <= options[0];
        } else if (options.length === 2) {
            if (val === BLANK_STRING) return true;
            var max = Math.max.apply(Math, _toConsumableArray(options)),
                min = Math.min.apply(Math, _toConsumableArray(options));
            return size >= min && size <= max;
        } else {
            throwError('必须存在一个最小值(可省略 默认为0)和最大值且只能为一个合法的数字类型！比如：m,n or max', fileName);
        }
    }

    function handleFileExt(_ref38) {
        var val = _ref38.val,
            arg = _ref38.arg,
            ruleName = _ref38.ruleName;

        if (!isFile(val)) {
            throwError('只能检测的值只能是一个File对象或者一个类文件对象拥有[name,size,type]等属性的对象', ruleName);
        }

        if (val === BLANK_STRING) return true;
        var ext = getFileExt(val).slice(1);
        return handleIn({
            val: ext,
            arg: arg
        });
    }

    function handleFileMime(_ref39) {
        var val = _ref39.val,
            arg = _ref39.arg,
            ruleName = _ref39.ruleName;

        if (!isFile(val)) {
            throwError('只能检测的值只能是一个File对象或者一个类文件对象拥有[name,size,type]等属性的对象', ruleName);
        }

        if (val === BLANK_STRING) return true;
        var type = val.type;
        return handleIn({
            val: type,
            arg: arg
        });
    }

    function handleConfirm(_ref40) {
        var val = _ref40.val,
            arg = _ref40.arg,
            getField = _ref40.getField,
            ruleName = _ref40.ruleName;

        if (arg === undefined) {
            throwSyntaxError('必须拥有一个已存在的字段名为参数!', ruleName);
        }

        arg = arg.trim();
        var value = getField(arg);

        if (value === undefined) {
            throwError("[\"".concat(arg, "\"]\u672A\u5728data\u4E2D\u5B9A\u4E49\u7684\u5B57\u6BB5!"), ruleName);
        }

        if (val === BLANK_STRING) return true;
        return value === val;
    }

    function handleDifferent(opts) {
        return !handleConfirm(opts);
    } // ========================================= 解析内置规则的处理函数部分 end  ======================================= //
    // =================================================== 导出接口 ========================================================= //


    return checker;
}(); //if ES6 Module
//export default checker;