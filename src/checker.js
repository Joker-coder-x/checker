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
const checker = (() => {
            // ========================================内置常量和IIFE全局对象部分 start================================================ //
            //子规则分割符
            const SPLIT_CHAR = '|';
            //空字符串
            const BLANK_STRING = '';
            //内置修饰符
            const INNER_MODIFIRS = {
                capital: 'capital', //大写
                lowercase: 'lowercase', //小写
                compose: 'compose', //组合
            };
            //内置修饰符对应的msg
            const INNER_MODIFIRS_CONDITION = {
                capital: '.capital修饰符要求检测的值中如果含有英文字母的话必须大写！', //大写
                lowercase: '.lowercase修饰符要求检测的值中如果含有英文字母的话必须小写！', //小写
                compose: '.compose修饰符要求检测的值必须某些类型的值组合起来,必须同时存在所有的类型！ 比如字母、数字组合。必须同时存在字母和数字', //组合
            };
            //可配合.capital、.lowercase、.compose、.contain等修饰符让验证更灵活
            const INNER_RULES = {
                //格式验证类
                'require': handleRequire, //必填
                'number': handleNumber, //验证数字
                'integer': handleInteger, //验证整数
                'float': handleFloat, //验证小数
                'boolean': handleBoolean, //验证布尔值
                'alpha': handleAlpha, //验证字母
                'alphaNum': handleAlphaNum, //验证数字、字母组合
                'alphaDash': handleAlphaDash, //验证数字、字母、下划线、中横线组合
                'chs': handleChs, //验证汉字
                'chsAlpha': handleChsAlpha, //验证汉字、字母组合
                'chsAlphaNum': handleChsAlphaNum, //验证汉字、数字、字母组合
                'chsDash': handleChsDash, //验证汉字、数字、字母、下划线、中横线组合
                'json': handleJSON, //验证JSON
                'email': handleEmail, //验证email
                'date': handleDate, //验证有效日期
                'url': handleURL, //验证url
                'ip': handleIP, //验证IP ipv4和ipv6
                'host': handleHost, //验证域名
                'idcard': handleIdcard, //验证身份证
                'telephone': handleTelephone, //验证座机电话号码
                'phone': handlePhone, //验证手机电话号码
                'postcode': handlePostCode, //验证邮政编码
                //长度和区间验证类
                'max': handleMax, //验证最大长度
                'min': handleMin, //验证最小长度
                'length': handleLength, //验证某个字段长度是否等于某个长度或者在某个区间里
                'in': handleIn, //验证某个字段的值是否在某个范围
                'notIn': handleNotIn, //验证某个字段的值不在某个范围
                'between': handleBetween, //验证某个字段的值是否在某个区间
                'notBetween': handleNotBetween, //验证某个字段的值不在某个范围
                //日期验证
                'before': handleBefore, //验证某个字段的值是否在某个日期之前
                'after': handleAfter, //验证某个字段的值是否在某个日期之后
                'expire': handleExpire, //expire:开始时间,结束时间 验证是否在开始和结束时间这个区间内
                'notExpire': handleNotExpire, //expire:开始时间,结束时间 验证是否不在开始和结束时间这个区间内
                //上传验证
                'file': handleFile, //判断是不是一个文件
                'fileSize': handleFileSize, //fileSize:规定文件的大小区间
                'fileExt': handleFileExt, //规定文件的扩展名
                'fileMime': handleFileMime, //验证上传文件类型
                //字段比较类
                'confirm': handleConfirm, //验证某个字段是否和另外一个字段的值一致
                'different': handleDifferent, //验证某个字段是否和另外一个字段的值不一致
                'eq': handleEq, //验证是否等于某个值
                '=': handleEq, //验证是否等于某个值
                'same': handleEq, //验证是否等于某个值
                'egt': handleEgt, //验证是否大于等于某个值
                '>=': handleEgt, //验证是否大于等于某个值
                'gt': handleGt, //验证是否大于某个值
                '>': handleGt, //验证是否大于某个值
                'elt': handleElt, //验证是否小于等于某个值
                '<=': handleElt, //验证是否大于等于某个值
                'lt': handleLt, //验证是否小于某个值
                '<': handleLt, //验证是否小于某个值
            };
            const INNER_RULES_ERRMSG = {
                //格式验证类
                'require': key => error(key, "为必填字段!"),
                'number': key => error(key, "必须是一个合法的数字(整数或者浮点数),不支持科学计数法方式!"),
                'integer': key => error(key, "必须是一个合法的整数!"),
                'float': key => error(key, "必须是一个合法的浮点数!"),
                'boolean': key => error(key, "必须是一个布尔值(必须是小写字母)!"),
                'alpha': key => error(key, "所有字符必须全部是字母!"),
                'alphaNum': key => error(key, "该字段只能由字母或者数字组成!"),
                'alphaDash': key => error(key, "该字段只能由字母、数字、下划线(_)和中横线(-)组成!"),
                'chs': key => error(key, "所有字符必须是汉字!"),
                'chsAlpha': key => error(key, "该字段只能由汉字、字母组成!"),
                'chsAlphaNum': key => error(key, "该字段只能由汉字、字母、数字组成!"),
                'chsDash': key => error(key, "该字段只能由汉字、字母、数字、下划线(_)和中横线(-)组成!"),
                'json': key => error(key, "必须是有效的JSON字符串!"),
                'email': key => error(key, "邮箱地址格式错误!"),
                'date': key => error(key, "必须是一个有效日期!"),
                'url': key => error(key, "url格式错误!"),
                'ip': key => error(key, "IP格式错误"),
                'host': key => error(key, "域名格式错误!"),
                'idcard': key => error(key, "身份证格式错误"),
                'telephone': key => error(key, "电话号码格式错误"),
                'phone': key => error(key, "手机电话好吗格式错误"),
                'postcode': key => error(key, "邮政编码格式错误"),
                //长度和区间验证类
                'max': key => error(key, "超过了规定的最大长度!"),
                'min': key => error(key, "小于规定的最小长度!"),
                'length': key => error(key, "不在规定字符长度范围之内!"),
                'in': key => error(key, "不在规定选择范围内!"),
                'notIn': key => error(key, "此字段的值在不能选择的范围之内!"),
                'between': key => error(key, "当前字段的值不在规定范围之内!"),
                'notBetween': key => error(key, "当前字段的值不在规定范围之内!"),
                //日期验证
                'before': key => error(key, "检测的日期必须在规定日期之前!"),
                'after': key => error(key, "检测的日期必须在规定日期之后!"),
                'expire': key => error(key, "检测的日期必须在规定日期范围之间!"),
                'notExpire': key => error(key, "检测的日期必须不在规定日期范围之间!"),
                //上传验证
                'file': key => error(key, '不是一个File类型或者类文件类型'),
                'fileSize': key => error(key, '文件大小不在规定范围内'),
                'fileExt': key => error(key, "不允许的文件后缀!"),
                'fileMime': key => error(key, "不允许的文件类型!"),
                //字段比较类
                'confirm': key => error(key, "必须和指定字段的值一致!"),
                'different': key => error(key, "必须和指定字段的值不一致!"),
                'eq': key => error(key, "当前字段的值不等于规定值！"),
                '=': key => error(key, "当前字段的值不等于规定值！"),
                'same': key => error(key, "当前字段的值不等于规定值！"),
                'egt': key => error(key, "当前字段值必须大于等于规定值!"),
                '>=': key => error(key, "当前字段值必须大于等于规定值!"),
                'gt': key => error(key, "当前字段值必须大于规定值!"),
                '>': key => error(key, "当前字段值必须大于规定值!"),
                'elt': key => error(key, "当前字段值必须小于等于规定值!"),
                '<=': key => error(key, "当前字段值必须小于等于规定值!"),
                'lt': key => error(key, "当前字段值必须小于规定值!"),
                '<': key => error(key, "当前字段值必须小于规定值!"),
            };
            //返回资源的结构
            const initReturnResObj = {
                result: true, //验证结果
                errMsg: 'ok', //错误信息
                errField: '', //发生错误的字段
                errRule: '' //验证失败的规则
            };
            //匹配整条规则的正则表达式
            const ruleReg = /([a-zA-Z=\<\>]+){1}((?:\.(?:[a-z])+)+)?(?:\:{1}\s*([\S]+))?/;
            //返回参数类型列表
            const RETURN_TYPE_LIST = ['s', 'm', 'a'];
            // ========================================内置常量和IIFE全局对象部分 end================================================ //



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
            function checker(data, rules, callbcak, returnType = RETURN_TYPE_LIST[0]) {
                let res = returnType === RETURN_TYPE_LIST[0] ? JSON.parse(JSON.stringify(initReturnResObj)) : [];

                if (!Array.isArray(rules)) {
                    throwTypeError('checker的第二个参数必须是一个数组类型！');
                }
                //如果没有定义任何规则，则不需要遍历data直接返回成功状态
                if (rules.length === 0) {
                    return res;
                }
                //如果returnType不是存在的类型 则默认为single
                if (RETURN_TYPE_LIST.indexOf(returnType) === '-1') {
                    returnType = RETURN_TYPE_LIST[0];
                }

                if ((HTMLFormElement && data instanceof HTMLFormElement) || (FormData && data instanceof FormData)) {
                    res = parseFormData(data, rules, callbcak, returnType);
                } else if (isPlainObject(data)) {
                    res = parsePlainObject(data, rules, callbcak, returnType);
                } else {
                    throwError('checker的第一个参数只能说一个纯粹的对象："{}"或者一个form元素或者是一个FormData实例！');
                }

                return res;
            }

            //定义一些宏
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
                        throwError(`["${ruleName}"]已经存在于内置规则中，请换一个标识!`);
                    }

                    INNER_RULES[ruleName] = handler;
                    return true;
                }
                return false;
            }

            // ======================================================主函数部分 end============================================================== //


            // ======================================================rule解析部分 start============================================================== //
            //解析表单数据
            function parseFormData(form, rules, callback, returnType) {
                const formData = form instanceof HTMLFormElement ? new FormData(form) : form,
                    res = JSON.parse(JSON.stringify(initReturnResObj)),
                    errResults = [],
                    results = [],
                    getField = getFieldByData(formData);

                for (const [key, value] of formData.entries()) {
                    const result = handleRule(key, value, rules, getField);
                    //调用callback
                    callback && typeof callback === 'function' && callback(result);

                    if (result.result === false) {
                        errResults.push(result);
                        if (returnType === RETURN_TYPE_LIST[0] && errResults.length === 1) {
                            return result;
                        }
                    }
                    results.push(result);
                }

                return returnType === RETURN_TYPE_LIST[0] ?
                    res :
                    returnType === RETURN_TYPE_LIST[1] ? errResults : results;
            }

            //解析普通对象数据
            function parsePlainObject(data, rules, callback, returnType) {
                const res = JSON.parse(JSON.stringify(initReturnResObj)),
                    errResults = [],
                    results = [],
                    getField = getFieldByData(data);

                for (const key in data) {
                    if (Object.hasOwnProperty.call(data, key)) {
                        let value = data[key];

                        const result = handleRule(key, value, rules, getField);
                        //调用callback
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

                return returnType === RETURN_TYPE_LIST[0] ?
                    res :
                    returnType === RETURN_TYPE_LIST[1] ? errResults : results;

            }

            function findRuleLineByName(name, rules) {
                let r;
                for (let i = 0, l = rules.length; i < l; i++) {
                    r = rules[i];

                    if (r.name.trim() === name.trim()) {
                        return r;
                    }
                }
            }

            function parseModifier(str) {
                const modifiers = str.split('.');

                modifiers.shift();
                return modifiers;
            }

            //解析行内子规则
            function lineRuleTest(rule, value, getField) {
                //子规则
                const childRules = rule.split(SPLIT_CHAR);
                let errChildRule,
                    m = [];

                const result = childRules.every(cr => {
                    //检测修饰符后面有没有带参数
                    const match = cr.match(ruleReg);

                    let arg, //参数
                        modifiers; //修饰符列表

                    if (match) {
                        cr = match[1];
                        modifiers = match[2] === undefined ? [] : parseModifier(match[2]);
                        arg = match[3];
                    }

                    if (INNER_RULES[cr] && typeof INNER_RULES[cr] === 'function') {
                        //有对应的内置规则
                        const handler = INNER_RULES[cr],
                            result = !!handler({
                                val: value,
                                arg: arg,
                                modifiers: modifiers || [],
                                getField: getField,
                                ruleName: cr
                            });



                        //找到第一个不符合的子规则
                        if (errChildRule === undefined && result === false) {
                            errChildRule = cr;
                            //如果有内置修饰符 则获取当前修饰符注释
                            if (modifiers.length > 0) {
                                modifiers.map(item => {
                                    if (INNER_MODIFIRS_CONDITION[item]) {
                                        m.push(INNER_MODIFIRS_CONDITION[item]);
                                    }
                                });
                            }
                        }

                        return result;
                    } else {
                        //没有对应的内置规则
                        throwError(`不存在在该内置规则:["${cr}"]`);
                    }
                });

                return {
                    result: result,
                    errChildRule: errChildRule,
                    modifiers: m
                }
            }

            //解析规则
            function handleRule(key, value, rules, getField) {
                key = key.trim();
                const res = JSON.parse(JSON.stringify(initReturnResObj)),
                    ruleLine = findRuleLineByName(key, rules);

                if (ruleLine === undefined) {
                    //在rules里面没有定义该字段的处理规则 那么就默认不检测这条数据
                    return res;
                }

                if (!has(ruleLine, 'rule')) {
                    //在对象中没有定义rule属性，那么默认忽略这条规则，不检测这条数据
                    return res;
                }

                let rule = ruleLine.rule;
                if (typeof rule === 'string') {
                    rule = rule.trim();
                    if (rule.length > 0) {
                        const result = lineRuleTest(rule, value, getField);
                        if (result.result === false) {
                            //第一条验证失败的规则
                            res.result = false;
                            res.errRule = result.errChildRule;
                            res.errField = key;
                            res.errMsg = ruleLine.errMsg || (INNER_RULES_ERRMSG[result.errChildRule] && (INNER_RULES_ERRMSG[result.errChildRule](key) + printMofifiersReason(result.modifiers))) || `字段["${key}：不符合验证规则"]`;

                            return res;
                        }
                    } else {
                        //rule='' 默认不检测该字段
                    }
                } else if (typeof rule === 'object' && rule instanceof RegExp) {
                    //用户自定义正则表达式
                    if (!rule.test(value)) {
                        //第一条验证失败的规则
                        res.result = false;
                        res.errField = key;
                        res.errMsg = ruleLine.errMsg || `字段["${key}：不符合验证规则"]`;

                        return res;
                    }
                } else {
                    throwTypeError('rule只能是一个String类型或者一个RegExp实例');
                }

                return res;
            };
            // ======================================================rule解析部分 end========================================= //




            // =======================================工具函数 start================================================ //
            function error(name, reason) {
                return `字段["${name}"]：${reason}`;
            };

            function throwError(msg, ruleName) {
                throw new Error(`${ruleName?`["${ruleName}"]`:''}:${msg}!`);
            }

            function throwTypeError(msg,ruleName){
                throw new TypeError(`${ruleName?`["${ruleName}"]`:''}:${msg}!`);
            }

            function throwSyntaxError(msg,ruleName){
                throw new SyntaxError(`${ruleName?`["${ruleName}"]`:''}:${msg}!`)
            }

            //获取文件扩展名
            function getFileExt(file) {
                if (isFile(file)) {
                    const fileName = file.name;
                    return fileName.slice(fileName.lastIndexOf('.'));
                }
            }

            function printMofifiersReason(modifiers) {
                return "\n" + modifiers.join("\n");
            }

            function getFieldByData(data) {
                let $data,
                    isFormData = false;

                if (HTMLFormElement && FormData && data instanceof HTMLFormElement) { //如果data是一个表单元素
                    $data = new FormData(data);
                    isFormData = true;
                } else if (FormData && data instanceof FormData) { //如果data是一个formData实例
                    $data = data;
                    isFormData = true;
                } else if (isPlainObject(data)) { //如果data是一个纯粹的对象
                    $data = data;
                }

                return function(fieldName) {
                    if (typeof fieldName === 'string') {
                        if (isFormData) {
                            const value = $data.get(fieldName);
                            return value === null ? undefined : value;
                        } else {
                            return $data[fieldName];
                        }
                    }
                }
            }
            // =======================================工具函数 end================================================ //





            // ==================================================底层验证函数工具部分 start============================================= //
            //判断对象是否有某个属性 不检测原型链
            function has(obj, prop) {
                return Object.prototype.hasOwnProperty.call(obj, prop);
            }

            //是否存在大写字母
            function hasCapital(v) {
                const reg = /[A-Z]+/;
                return reg.test(v);
            }

            //是否存在小写字母
            function hasLowerCase(v) {
                const reg = /[a-z]+/;
                return reg.test(v);
            }

            //是否存在中文
            function hasChs(v) {
                const reg = /\p{ sc=Han }+/u;
                return reg.test(v);
            }

            //是否是字符串
            function isString(v){
                return typeof v==='string';
            }

            //能否隐式转成String 只有number类型和string类型才能返回true 其他一律false
            function isStringable(v){
                if(isString(v)){
                    return true;
                }else if(typeof v=='number'){
                    return true;
                }else{
                    return false;
                }
            }

            //是否是一个纯粹的对象
            function isPlainObject(obj) {
                return Object.prototype.toString.call(obj) === '[object Object]';
            }

            //是否是一个对象
            function isObject(obj) {
                return obj !== null && typeof obj === 'object';
            }

            //严格检测整数
            function isInteger(v) {
                const reg = /^-?[0-9]+$/;
                return reg.test(v) && !isNaN(Number(v));
            }

            //严格检测浮点数
            function isFloat(v) {
                const reg = /^-?\d+\.\d+$/;
                return reg.test(v) && !isNaN(parseFloat(v));
            }

            //严格检测英文字母
            function isAlpha(v) {
                const reg = /^[a-zA-z]+$/;
                return reg.test(v);
            }

            //严格检测字母+数字组合 必须同时存在字母和数字=>组合范围
            function isAlphaNumCompose(v) {
                const regList = [
                    /[a-zA-Z]+/,
                    /[0-9]+/,
                    /^[a-zA-Z0-9]+$/
                ];
                return regList.every(reg => reg.test(v));
            }

            //严格检测字母+数字组合 包含范围
            function isAlphaNumContain(v) {
                const reg = /^[a-zA-Z0-9]+$/;
                return reg.test(v);
            }

            //验证某个字段的值是否为字母和数字，下划线_及中横线-=>组合范围
            function isAlphaDashCompose(v) {
                const regList = [
                    /[a-zA-Z]+/,
                    /[0-9]+/,
                    /(-|_)+/,
                    /^[a-zA-Z0-9\-_]+$/
                ];
                return regList.every(reg => reg.test(v));
            }

            //验证某个字段的值是否为字母和数字，下划线_及中横线-=>包含范围
            function isAlphaDashContain(v) {
                const reg = /^[a-zA-Z0-9\-_]+$/;
                return reg.test(v);
            }

            //只能是汉字
            function isChs(v) {
                const reg = /^\p{sc=Ha}+$/u;
                return reg.test(v);
            }

            //验证某个字段的值只能是汉字、字母=>组合关系
            function isChsAlphaCompose(v) {
                const regList = [
                    /[a-zA-Z]+/,
                    /\p{sc=Han}+/u,
                    /^[a-zA-Z\p{ sc=Han }]+$/u
                ];
                return regList.every(reg => reg.test(v));
            }

            //验证某个字段的值只能是汉字、字母=>包含关系
            function isChsAlphaContain(v) {
                const reg = /^[a-zA-Z\p{ sc=Han }]+$/u;
                return reg.test(v);
            }

            //验证某个字段的值只能是汉字、字母和数字=>组合关系
            function isChsAlphaNumCompose(v) {
                const regList = [
                    /[a-zA-Z]+/,
                    /[0-9]+/,
                    /\p{sc=Han}+/u,
                    /^[a-zA-Z0-9\p{ sc=Han }]+$/u
                ];
                return regList.every(reg => reg.test(v));
            }

            //验证某个字段的值只能是汉字、字母和数字=>包含关系
            function isChsAlphaNumContain(v) {
                const reg = /^[a-zA-Z0-9\p{ sc=Han }]+$/u;
                return reg.test(v);
            }

            //验证某个字段的值只能是汉字、字母、数字和下划线_及破折号-=>组合模式
            function isChsDashCompose(v) {
                const regList = [
                    /[a-zA-Z]+/,
                    /[0-9]+/,
                    /\p{sc=Han}+/u,
                    /(-|_)+/,
                    /^[a-zA-Z0-9\-_\p{ sc=Han }]+$/u
                ];
                return regList.every(reg => reg.test(v));
            }

            //验证某个字段的值只能是汉字、字母、数字和下划线_及破折号-=>包含模式
            function isChsDashContain(v) {
                const reg = /^[a-zA-Z0-9\-_\p{ sc=Ha n}]+$/u;
                return reg.test(v);
            }

            //是否为有效的JSON字符串
            function isValidJSON(v) {
                try {
                    JSON.parse(v);
                    return true;
                } catch (e){
                    return false;
                }
            }

            //验证是否是有效邮箱
            function isEmail(v) {
                const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                return reg.test(v);
            }

            //验证是否为一个合法的URL
            function isURL(v) {
                //这个url验证的表达式提取自：npm包 async-validator的源码
                const reg = new RegExp('^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$', 'i');
                return reg.test(v);
            }

            //检测ip地址 ipv4/ipv6
            function isIP(v) {
                const reg = /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){6}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^::([\da-fA-F]{1,4}:){0,4}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:):([\da-fA-F]{1,4}:){0,3}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){2}:([\da-fA-F]{1,4}:){0,2}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){3}:([\da-fA-F]{1,4}:){0,1}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){4}:((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}$|^:((:[\da-fA-F]{1,4}){1,6}|:)$|^[\da-fA-F]{1,4}:((:[\da-fA-F]{1,4}){1,5}|:)$|^([\da-fA-F]{1,4}:){2}((:[\da-fA-F]{1,4}){1,4}|:)$|^([\da-fA-F]{1,4}:){3}((:[\da-fA-F]{1,4}){1,3}|:)$|^([\da-fA-F]{1,4}:){4}((:[\da-fA-F]{1,4}){1,2}|:)$|^([\da-fA-F]{1,4}:){5}:([\da-fA-F]{1,4})?$|^([\da-fA-F]{1,4}:){6}:$/;
                return reg.test(v);
            }

            //检测是否是一个合法域名
            function isHost(v) {
                const reg = /^[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?$/;
                return reg.test(v);
            }

            //身份证号(15位、18位数字)，最后一位是校验位，可能为数字或字符X
            function isIdcard(v) {
                const reg = /^(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)$/;
                return reg.test(v);
            }

            //座机电话号码
            function isTelephoneNumber(v) {
                const reg = /^\d{3}-\d{8}|\d{4}-\d{7}$/;
                return reg.test(v);
            }

            //中国邮政编码
            function isPostCode(v) {
                const reg = /^[1-9]\d{5}(?!\d)$/;
                return reg.test(v);
            }

            //手机电话号码
            function isPhone(v) {
                const reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
                return reg.test(v);
            }

            //检测是否是合法日期
            function isvalidDate(v) {
                return new Date(v).toString() === 'Invalid Date' ? false : true;
            }

            //检测是否是一个文件 或者类文件对象
            function isFile(v) {
                if (File && v instanceof File) {
                    return true;
                } else if (isObject(v) && has(v, 'name') && has(v, 'size') && has(v, 'type')) {
                    return true;
                } else {
                    return false;
                }
            }
            // ==================================================底层验证函数工具部分 end============================================= //





            // ================================================= 解析内置规则的处理函数部分 start  ======================================= //
            //检测参数中的区间语法=>xxx.xx:m,n
            function checkIntervalSyntax(arg, ruleName) {
                //区间语法检测的正则表达式
                const intervalReg = /^\s*([^\s\,]+\s*(\,\s*[^\s\,]+)?)+\s*$/;
                if (!intervalReg.test(arg)) {
                    throwSyntaxError('区间或者范围规则语法错误!区间语法规则为:n,n,n.... or n',ruleName);
                }
            }

            function autoCapitalOrLowercase(val, modifiers) {
                const isCapital = modifiers.indexOf(INNER_MODIFIRS.capital) !== -1,
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

            function handleRequire({ val }) {
                return val ||val.length > 0|| val.toString().length > 0;
            }

            function handleNumber({ val }) {
                if(val===BLANK_STRING) return true;
                return isInteger(val) || isFloat(val)
            }

            function handleInteger({ val }) {
                if(val===BLANK_STRING) return true;
                return isInteger(val);
            }

            function handleFloat({ val }) {
                if(val===BLANK_STRING) return true;
                return isFloat(val);
            }

            function handleBoolean({ val }) {
                if(val===BLANK_STRING) return true;
                if(typeof val==='boolean'){
                    return true;
                }else if(typeof val==='string'){
                    return (val==='true'||val==='false')?true:false;
                }else{
                    return false;
                }
            }

            function handleChs({ val }) {
                if(val===BLANK_STRING) return true;
                return isChs(val);
            }

            function handleJSON({ val }) {
                if(val===BLANK_STRING) return true;
                return isValidJSON(val);
            }

            function handleEmail({ val }) {
                if(val===BLANK_STRING) return true;
                return isEmail(val);
            }

            function handleDate({val}){
                if(val===BLANK_STRING) return true;
                return isvalidDate(val);
            }

            function handleURL({ val }) {
                if(val===BLANK_STRING) return true;
                return isURL(val);
            }

            function handleIP({ val }) {
                if(val===BLANK_STRING) return true;
                return isIP(val);
            }

            function handleHost({ val }) {
                if(val===BLANK_STRING) return true;
                return isHost(val);
            }

            function handleIdcard({ val }) {
                if(val===BLANK_STRING) return true;
                return isIdcard(val);
            }

            function handleTelephone({ val }) {
                if(val===BLANK_STRING) return true;
                return isTelephoneNumber(val);
            }

            function handlePhone({ val }) {
                if(val===BLANK_STRING) return true;
                return isPhone(val);
            }

            function handlePostCode({ val }) {
                if(val===BLANK_STRING) return true;
                return isPostCode(val);
            }

            function handleMax({ val, arg,ruleName }) {
                if(!isInteger(arg)&&!isFloat(arg)){
                    throwTypeError('参数必须是个number',ruleName);
                }
                if(val===BLANK_STRING) return true;

                if(isObject(val)){
                    if(Array.isArray(val)){
                        return val.length<=arg;
                    }else if(isFile(val)){
                        return val.size<=arg;
                    }else{
                        throwTypeError('检测的字段类型必须是number、string、array、File、类File类型中的一种',ruleName);
                    }
                }else{
                    if(typeof val==='number'&&!isNaN(val)){
                        return val<=arg;
                    }else if(isString(val)){
                        return val.length<=arg;
                    }else{
                        throwTypeError('检测的字段类型必须是number、string、array、File、类File类型中的一种',ruleName);
                    }
                }
            }

            function handleMin({ val, arg,ruleName }) {
                if(!isInteger(arg)&&!isFloat(arg)){
                    throwTypeError('参数必须是个number',ruleName);
                }
                if(val===BLANK_STRING) return true;

                if(isObject(val)){
                    if(Array.isArray(val)){
                        return val.length>=arg;
                    }else if(isFile(val)){
                        return val.size>=arg;
                    }else{
                        throwTypeError('检测的字段类型必须是number、string、array、File、类File类型中的一种',ruleName);
                    }
                }else{
                    if(typeof val==='number'&&!isNaN(val)){
                        return val>=arg;
                    }else if(isString(val)){
                        return val.length>=arg;
                    }else{
                        throwTypeError('检测的字段类型必须是number、string、array、File、类File类型中的一种',ruleName);
                    }
                }
            }

            function handleAlpha({ val, modifiers ,ruleName}) {
                if(!isString(val)){
                    throwTypeError('检测的值必须是个string',ruleName);
                }

                if(val===BLANK_STRING) return true;

                return modifiers.length === 0 ?
                    isAlpha(val) :
                    isAlpha(val) && autoCapitalOrLowercase(val, modifiers);
            }

            function handleAlphaNum({ val, modifiers ,ruleName}) {
                if(!isStringable(val)){
                    throwTypeError('检测的值必须是个string或者number',ruleName);
                }

                if(val===BLANK_STRING) return true;

                if (modifiers.length === 0) {
                    //没有任何修饰符
                    return isAlphaNumContain(val);
                } else {
                    const isCompose = modifiers.indexOf(INNER_MODIFIRS.compose) !== -1;

                    return isCompose ?
                        isAlphaNumCompose(val) && autoCapitalOrLowercase(val, modifiers) :
                        isAlphaNumContain(val) && autoCapitalOrLowercase(val, modifiers);
                }
            }

            function handleAlphaDash({ val, modifiers,ruleName }) {
                if(!isStringable(val)){
                    throwTypeError('检测的值必须是个string或者number',ruleName);
                }

                if(val===BLANK_STRING) return true;

                if (modifiers.length === 0) {
                    return isAlphaDashContain(val);
                } else {
                    const isCompose = modifiers.indexOf(INNER_MODIFIRS.compose) !== -1;

                    return isCompose ?
                        isAlphaDashCompose(val) && autoCapitalOrLowercase(val, modifiers) :
                        isAlphaDashContain(val) && autoCapitalOrLowercase(val, modifiers);
                }
            }

            function handleChsAlpha({ val, modifiers,ruleName }) {
                if(!isStringable(val)){
                    throwTypeError('检测的值必须是个string或者number',ruleName);
                }

                if(val===BLANK_STRING) return true;

                if (modifiers.length === 0) {
                    return isChsAlphaContain(val);
                } else {
                    const isCompose = modifiers.indexOf(INNER_MODIFIRS.compose) !== -1;

                    return isCompose ?
                        isChsAlphaCompose(val) && autoCapitalOrLowercase(val, modifiers) :
                        isChsAlphaContain(val) && autoCapitalOrLowercase(val, modifiers);
                }
            }

            function handleChsAlphaNum({ val, modifiers,ruleName }) {
                if(!isStringable(val)){
                    throwTypeError('检测的值必须是个string或者number',ruleName);
                }

                if(val===BLANK_STRING) return true;

                if (modifiers.length === 0) {
                    return isChsAlphaNumContain(val);
                } else {
                    const isCompose = modifiers.indexOf(INNER_MODIFIRS.compose) !== -1;

                    return isCompose ?
                        isChsAlphaNumCompose(val) && autoCapitalOrLowercase(val, modifiers) :
                        isChsAlphaNumContain(val) && autoCapitalOrLowercase(val, modifiers);
                }
            }

            function handleChsDash({ val, modifiers,ruleName }) {
                if(!isStringable(val)){
                    throwTypeError('检测的值必须是个string或者number',ruleName);
                }

                if(val===BLANK_STRING) return true;

                if (modifiers.length === 0) {
                    return isChsDashContain(val);
                } else {
                    const isCompose = modifiers.indexOf(INNER_MODIFIRS.compose) !== -1;

                    return isCompose ?
                        isChsDashCompose(val) && autoCapitalOrLowercase(val, modifiers) :
                        isChsDashContain(val) && autoCapitalOrLowercase(val, modifiers);
                }
            }

            function handleLength({ val, arg,ruleName }) {
                checkIntervalSyntax(arg, ruleName);

                let options = [];
                options = arg.split(',').map(o => o.trim());

                if (!options.every(o => isInteger(o) && parseInt(o) >= 0)) {
                    throwTypeError('参数必须是正整数',ruleName);
                }
                
                if (options.length === 1) {
                    if(val===BLANK_STRING) return true;
                    return val.length === parseInt(options[0]);
                } else if (options.length === 2) {
                    const max = Math.max(...options),
                        min = Math.min(...options);
                    if(val===BLANK_STRING) return true;
                    return val.length >= min && val.length <= max;
                } else {
                    throwTypeError('参数只有两种方式！比如："min,max" or "n"',ruleName);
                }
            }

            function handleIn({ val, arg ,ruleName}) {
                checkIntervalSyntax(arg, ruleName);

                if(val===BLANK_STRING) return true;

                let options = [];
                options = arg.split(',').map(o => o.trim());

                return options.indexOf(val) !== -1;
            }

            function handleNotIn(opts) {
                return !handleIn(opts);
            }

            function handleBetween({ val, arg,ruleName }) {
                checkIntervalSyntax(arg, ruleName);
                val = parseFloat(val);
                let options = [];

                options = arg.split(',').map(o => o.trim());

                if (!options.every(o => isInteger(o) || isFloat(o))) {
                    throwTypeError('参数必须是number',ruleName);
                }

                if (options.length !== 2) {
                    throwTypeError('参数必须存在一个开始区间和结束区间且只能为数字！比如：min,max',ruleName);
                } else {
                    if(val===BLANK_STRING) return true;

                    const max = Math.max(...options),
                        min = Math.min(...options);


                    return val >= min && val <= max;
                }
            }

            function handleNotBetween(opts) {
                return !handleBetween(opts);
            }

            function handleEq({ val, arg,ruleName }) {
                if(!isStringable(val)){
                    throwTypeError('检测的值必须是个string或者number',ruleName);
                }
                if(val===BLANK_STRING) return true;

                if (isInteger(arg) || isFloat(arg)) {
                    return parseFloat(val)  ===  parseFloat(arg); 
                } else {
                    return val === arg;
                }
            }

            function handleEgt({ val, arg,ruleName }) {
                if(!isStringable(val)){
                    throwTypeError('检测的值必须是个string或者number',ruleName);
                }
                if (isInteger(arg) || isFloat(arg)) {
                    if(val===BLANK_STRING) return true;

                    return parseFloat(val)  >=  parseFloat(arg); 
                } else {
                    throwTypeError('参数只能是一个number',ruleName);
                }
            }

            function handleGt({ val, arg,ruleName }) {
                if(!isStringable(val)){
                    throwTypeError('检测的值必须是个string或者number',ruleName);
                }
                if (isInteger(arg) || isFloat(arg)) {
                    if(val===BLANK_STRING) return true;

                    return parseFloat(val)  >  parseFloat(arg); 
                } else {
                    throwTypeError('参数只能是一个number',ruleName);
                }
            }

            function handleElt({ val, arg,ruleName }) {
                if(!isStringable(val)){
                    throwTypeError('检测的值必须是个string或者number',ruleName);
                }
                if (isInteger(arg) || isFloat(arg)) {
                    if(val===BLANK_STRING) return true;

                    return parseFloat(val)  <=  parseFloat(arg); 
                } else {
                    throwTypeError('参数只能是一个number',ruleName);
                }
            }

            function handleLt({ val, arg ,ruleName}) {
                if(!isStringable(val)){
                    throwTypeError('检测的值必须是个string或者number',ruleName);
                }
                if (isInteger(arg) || isFloat(arg)) {
                    if(val===BLANK_STRING) return true;

                    return val < parseFloat(arg);
                } else {
                    throwTypeError('参数只能是一个number',ruleName);
                }
            }

            function handleBefore({ val, arg,ruleName }) {
                if (!isvalidDate(val)) {
                    throwTypeError('检测的字段值必须是一个合法日期',ruleName);
                }
                if (!isvalidDate(arg)) {
                    throwTypeError('参数必须是一个合法的日期',ruleName);
                }
                if(val===BLANK_STRING) return true;

                return new Date(val).getTime() <= new Date(arg).getTime();
            }

            function handleAfter({ val, arg,ruleName }) {
                if (!isvalidDate(val)) {
                    throwTypeError('检测的字段值必须是一个合法日期',ruleName);
                }
                if (!isvalidDate(arg)) {
                    throwTypeError('参数必须是一个合法的日期',ruleName);
                }

                if(val===BLANK_STRING) return true;

                return new Date(val).getTime() >= new Date(arg).getTime();
            }

            function handleExpire({ val, arg,ruleName }) {
                checkIntervalSyntax(arg, ruleName);

                if (!isvalidDate(val)) {
                    throwTypeError('检测的字段值必须是一个合法日期',ruleName);
                }
                const d = new Date(val).getTime();

                let options = arg.split(',').map(o => o.trim());

                if (!options.every(o => isvalidDate(o))) {
                    throwTypeError('区间里面的参数必须是一个合法的日期',ruleName);
                }

                if (options.length !== 2) {
                    throwTypeError('必须存在一个开始区间和结束区间且只能为一个合法日期！比如：2015-01-01,2021-01-01',ruleName);
                } else {
                    if(val===BLANK_STRING) return true;

                    const max = Math.max(new Date(options[0]).getTime(), new Date(options[1]).getTime()),
                        min = Math.min(new Date(options[0]).getTime(), new Date(options[1]).getTime());

                    return d >= min && d <= max;
                }
            }

            function handleNotExpire(opts) {
                return !handleExpire(opts);
            }

            function handleFile({val}){
                return isFile(val);
            }

            function handleFileSize({ val, arg,ruleName }) {
                checkIntervalSyntax(arg, ruleName);
                if (!isFile(val)) {
                    throwTypeError('只能检测的值只能是一个File对象或者一个类文件对象拥有[name,size,type]等属性的对象!',ruleName);
                }

                const size = val.size;
                let options = [];

                options = arg.split(',').map(o => o.trim());

                if (!options.every(o => isInteger(o) || isFloat(o) && o >= 0)) {
                    throwError('fileSize规则的参数必须是number，且必须>=0!',fileName);
                }

                if (options.length === 1) {
                    if(val===BLANK_STRING) return true;

                    return size >= 0 && size <= options[0];
                } else if (options.length === 2) {
                    if(val===BLANK_STRING) return true;

                    const max = Math.max(...options),
                        min = Math.min(...options);

                    return size >= min && size <= max;
                } else {
                    throwError('必须存在一个最小值(可省略 默认为0)和最大值且只能为一个合法的数字类型！比如：m,n or max',fileName);
                }
            }

            function handleFileExt({ val, arg,ruleName }) {
                if (!isFile(val)) {
                    throwError('只能检测的值只能是一个File对象或者一个类文件对象拥有[name,size,type]等属性的对象',ruleName);
                }

                if(val===BLANK_STRING) return true;

                const ext = getFileExt(val).slice(1);
                return handleIn({
                    val: ext,
                    arg: arg
                });
            }

            function handleFileMime({ val, arg,ruleName }) {
                if (!isFile(val)) {
                    throwError('只能检测的值只能是一个File对象或者一个类文件对象拥有[name,size,type]等属性的对象',ruleName);
                }

                if(val===BLANK_STRING) return true;

                const type = val.type;
                return handleIn({
                    val: type,
                    arg: arg
                });
            }

            function handleConfirm({ val, arg, getField,ruleName }) {
                if (arg === undefined) {
                    throwSyntaxError('必须拥有一个已存在的字段名为参数!',ruleName);
                }

                arg = arg.trim();
                const value = getField(arg);
                if (value === undefined) {
                    throwError(`["${arg}"]未在data中定义的字段!`,ruleName);
                }
                
                if(val===BLANK_STRING) return true;

                return value === val;
            }

            function handleDifferent(opts) {
                return !handleConfirm(opts);
            }
            // ========================================= 解析内置规则的处理函数部分 end  ======================================= //





            // =================================================== 导出接口 ========================================================= //
            return checker;
})();





//if ES6 Module
//export default checker;