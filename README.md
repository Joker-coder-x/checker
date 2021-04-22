# checker
一个单独的js验证库
#  1.1 为什么要单独写一个js验证模块？
> 对于传统的表单验证或者一些其他的验证场景，我们只能老老实实的以一个一个编写对应的检测逻辑代码去检测一些数据是否符合规则。聪明的老哥们可能会把所有有关验证的方法或者函数都抽离到一个js文件中，但是 ，在每个需要验证的验证逻辑的js文件中我们还是需要把所有用到的检测方法导入进来，然后一遍又一遍的重写验证逻辑和验证流程...。这个过程不可谓不繁琐和无趣。
> 这个时候把所有验证逻辑和流程全部封装到一个模块中，我们只需要关注验证的结果而不需要关心验证过程从而达到关注点分离和代码的复用性，当然市面上也有很多UI框架提供了验证对象，但是毕竟和框架耦合在一起要是换一个框架怎么办？这个时候单独的一个验证模块的优势、便利性和必要性就展现出来了。

# 1.2 设计灵感
>该验证模块在使用方式设计的时候借鉴了ThinkPHP的验证模块的内置规则规范和vue指令的结构。


# 1.3 使用方式：
>这里你大可不比关注一些语法细节，只需要关注使用的大概流程就行，具体语法细节那些在后面会做详细介绍。
#### 1.3.1 通过\<script\>标签本地或者网络引入
```html
<script src="xxx/checker.js"></script>
<script>
	 //要检测的数据对象
	 	const data = {
        name: 'mike',
        age: 18,
        hobby: '睡觉'
    }
	//rules一个包含一系列规则的数组
    const rules = [{
        name: 'name',//name对应data当中的字段名
        rule: 'alphaDash|require|max:8' //rule对应的规则
    }, {
        name: 'age',
        rule: 'between:10,20|require',
    }, {
        name: 'hobby',
        rule: 'in:吃饭,睡觉'
    }];

    const res = checker(data, rules);//返回一个检测资源对象
    if (!res.result) { //检测资源对象中有一个result属性表示检测的结构
        console.error(res.errMsg) //检测资源对象中有一个errMsg属性表示发生错误的原因
    } else {
        console.log('验证通过');
    }
</script>
```
#### 1.3.2 使用ES6 Module导入
```javascript
	import checker from 'xxx/checker.js';
	//要检测的数据对象
	const data = {
        name: 'mike',
        age: 18,
        hobby: '睡觉'
    }
	//rules一个包含一系列规则的数组
    const rules = [{
        name: 'name',//name对应data当中的字段名
        rule: 'alphaDash|require|max:8' //rule对应的规则
    }, {
        name: 'age',
        rule: 'between:10,20|require',
    }, {
        name: 'hobby',
        rule: 'in:吃饭,睡觉'
    }];

    const res = checker(data, rules);//返回一个检测资源对象
    if (!res.result) { //检测资源对象中有一个result属性表示检测的结构
        console.error(res.errMsg) //检测资源对象中有一个errMsg属性表示发生错误的原因
    } else {
        console.log('验证通过');
    }
```
-----
# 2.1 使用语法：
-----
## checker(data,rules,callback,returnType);
## 参数：
 - **data**	
   	> - **Object **、**HTMLFormElement**实例或者**FormData**实例  【必填】。
   		需要检测的数据对象只能是一个纯粹的对象 **"{}"**、一个**form**元素或者一个**FormData**的实例，如果传入一个其他类型则会抛出一个Error。
  -	**rules**	
   	> **Array** 【必填】。
   		一个包含规则对象的数组，如果是一个空数组那么checker函数会立刻返回一个检测成功资源对象，而不会去进行任何检测。
   		> **rules**数组中规则对象的结构规范:
   		>  - **name**
   		 **String** 该属性定义了该规则对象作用于data当中的字段名。【必填】
   		不要重复定义name相同规则对象，checker永远只会找数组当中最先定义的那一个。如果未定义name属性那么该规则对象则会被忽略，不会起作用。
   		>	- **rule**  
   		**String**或者**RegExp**实例，如果为其他类型则抛出一个TypeError。【必填】
   		该属性定义了规则检测的具体行为，如果未定义name属性那么该规则对象则会被忽略，不会起作用。如果rule等于一个空字符串那么该规则也不会起作用，默认认为是检测成功。
   		 >	- **errMsg**
   		 **String** 【可选】
   		 该属性定义了该规则检测失败时的错误信息，如果未定义该属性则采用内部失败的错误信息。
  -  **callback**
   		>**Function** 	【可选】 。
   		 每次检测完成一个字段之后会调用的回调函数，这个函数会接收一个检测资源对象作为参数。如果callback不是一个**Function**类型那么就会忽略它。
   	-	**returnType** 
   		> **String**。【可选】。 可选值包括:[**s**、**m**、**a**]，如果为其他值则默认为**s**，默认值为**s**。
   		**s** => single ，返回第一个检测失败或者所有字段均检测成功的资源对象，如果发生检测失败函数将立刻返回，后面的字段不会执行检测。
   		**m** => multiple， 返回所有检测失败字段资源对象数组【Array】，只包含检测失败的字段的资源对象，会等所有字段检测完成后返回。
   		**a** => all， 返回所有检测字段的资源对象数组【Array】，无论检测成功还是失败，会等所有字段检测完成后返回。
## 返回值:
 2. 一个**resObj**或者包含了多个**resObj**对象的数组，根据传入的returnType参数决定。
##### **resObj对象结构:**
> -  **result** ，一个**Boolean**值
	表示验证结果，
> -  **errMsg**，一个**String**
	表示错误信息，result为true时为 "**ok**"，result为false时为检测失败的原因。
> -  **errField** ，一个**String**
    表示发生错误的字段名
> -  **errRule**，一个**String**
    表示验证失败的规则名
# 2.2 规则对象中的rule的语法
## 2.2.1 rule的结构:
>-  **一条规则可由一条或多条子规则构成，多条子规则之间通过字符中杠分割(|)。**
>- **一条子规则可由规则名+一个或多个修饰符+零个或者一个参数构成。**
>- **修饰符描述了子规则的行为偏好，修饰符必须处于参数标识符（:）或者（|）之前，子规则名之后。如果处于参数标识符（:）之后则会被解析器解析成参数。**
>-  **处在参数修饰符（:）之后子规则分隔符（|）之前的均会被解析器解析成参数，参数字符串中不能出现（|）,出现了则会当成子规则分隔符。**。
>- **多条子规则之间的解析顺序是从左到右的。所以检测结构也是从左到右层叠的。**
>-  **参数中的区间语法, a,b,c,d,... | a,b | a 在一些需要用到区间的规则中会被解析。区间或者范围通过英文字符逗号分割(,)，如果编写错误则会抛出一个TypeError。**

```javascript
	const rule="子规则名.修饰符1.修饰2.修饰符n:参数|子规则2|子规则3"；
```
## 2.2.2 内置修饰符表：
| 修饰符 |作用  |
|--|--|
| .capital |如果字段中存在英文字母那么必须全部大写  |
| .lowercase |如果字段中存在英文字母那么必须全部小写  |
| .compose |如果子规则为多种字符组合那么字段中每一种字符都必须存在至少一个  |
> **注意：修饰符均在指定规则下才能生效!**
### 2.2.2.1 .capital示例
```javascript
	const data = {
        name: 'mike'
    };
    const rules = [{
        name: 'name',
        rule: 'alpha.capital'//检测的字段如果存在字母则必须全部大写
    }];

    const res = checker(data, rules);
    console.log(res);
```
下面是输出结果:
![输出结果](https://img-blog.csdnimg.cn/20210421202554812.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDMzNzkyMg==,size_16,color_FFFFFF,t_70#pic_center)
### 2.2.2.2 .lowercase示例
```javascript
	 const data = {
        name: 'Test'
    };
    const rules = [{
        name: 'name',
        rule: 'alpha.lowercase'
    }];

    const res = checker(data, rules);
    console.log(res);
```
下面是输出结果:
![输出结果](https://img-blog.csdnimg.cn/20210421203132719.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDMzNzkyMg==,size_16,color_FFFFFF,t_70#pic_center)
### 2.2.2.3 .lowercase和.capital同时存在的情况下大小写字母都可以存在 示例

```javascript
  	const data = {
        name: 'Test'
    };
    const rules = [{
        name: 'name',
        rule: 'alpha.lowercase.capital'
    }];

    const res = checker(data, rules);
    console.log(res);
```
下面是输出结果:
![输出结果](https://img-blog.csdnimg.cn/20210421203625479.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDMzNzkyMg==,size_16,color_FFFFFF,t_70#pic_center)
### 2.2.2.4 .compose示例
#### 2.2.2.4.1 加.compose修饰符之前
```javascript
     name: 'Test'
    };
    const rules = [{
        name: 'name',
        //alphaDash:检测数字、字母、下划线、中横线组合，不能含有其他字符
        rule: 'alphaDash'//默认情况下为包含关系，只要是数字、字母、下划线、中横线中的一种就行
    }];

    const res = checker(data, rules);
    console.log(res);
```
![输出结果](https://img-blog.csdnimg.cn/20210421204158161.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDMzNzkyMg==,size_16,color_FFFFFF,t_70#pic_center)
#### 2.2.2.4.2  加了.compose修饰符之后
```javascript
	 const data = {
        name: 'Test'
    };
    const rules = [{
        name: 'name',
        rule: 'alphaDash.compose'
    }];

    const res = checker(data, rules);
    console.log(res);
```
![输出结果](https://img-blog.csdnimg.cn/20210421204336206.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDMzNzkyMg==,size_16,color_FFFFFF,t_70#pic_center)
#### 2.2.2.4.3  加了.compose修饰符之后的正确写法
```javascript
	 const data = {
        name: 'Test1-' //同时存在了字母、数字和下划线或者中横线
    };
    const rules = [{
        name: 'name',
        rule: 'alphaDash.compose'
    }];

    const res = checker(data, rules);
    console.log(res);
```
![输出结果](https://img-blog.csdnimg.cn/20210421204648914.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDMzNzkyMg==,size_16,color_FFFFFF,t_70#pic_center)
> **再次提醒：修饰符均在指定规则下才能生效!，在不支持的规则下使用会被忽略！**

### 2.2.2.5 一条规则的解析流程图
![一条规则的解析流程图](https://img-blog.csdnimg.cn/20210422112340907.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDMzNzkyMg==,size_16,color_FFFFFF,t_70#pic_center)


## 2.2.3 内置子规则表:
| 子规则名 | 作用 |参数|可用修饰符|
|--|--|--|--|
| require |必填项  |无 |无|
| number |严格匹配数字(整数和小数)(不能含有任何其他非数字字符除了(-))   |无 |无|
| integer |严格匹配整数(不能含有任何其他非数字字符除了(-))  |无 |无|
| float |严格匹配小数(不能含有任何其他非数字字符除了(-))   |无 |无|
| boolean |检测是否是一个布尔值  |无 |无|
| alpha |检测英文字母，不能含有其他字符  |无 |[.capital,.lowercase]|
| alphaNum |检测数字、字母组合，不能含有其他字符  |无 |[.capital,.lowercase,.compose]|
| alphaDash |检测数字、字母、下划线、中横线组合，不能含有其他字符  |无 |[.capital,.lowercase,.compose]|
| chs |检测汉字，不能含有其他字符  |无 |无|
| chsAlpha |检测汉字、字母组合，不能含有其他字符  |无 |[.capital,.lowercase,.compose]|
| chsAlphaNum |检测汉字、数字、字母组合，不能含有其他字符  |无 |[.capital,.lowercase,.compose]|
| chsDash |检测汉字、数字、字母、下划线、中横线组合，不能含有其他字符  |无 |[.capital,.lowercase,.compose]|
| json |检测是否是一个json字符串  |无 |无|
| email |检测是否是一个合法邮箱  |无 |无|
| date |检测是否是一个合法日期  |无 |无|
| url |检测是否是一个合法URL  |无 |无|
| ip |检测是否是一个合法IP(ipv和ipv6)  |无 |无|
| host |检测是否是一个合法域名  |无 |无|
| idcard |身份证号(15位、18位数字)，最后一位是校验位，可能为数字或字符X|无 |无|
| telephone |检测是否是一个合法座机电话(3-8)/(4-7)  |无 |无|
| phone |检测是否是一个合法手机号码  |无 |无|
| postcode |检测是否是一个合法中国邮政编码 |无 |无|
| max |检测字符串的最大长度  |integer |无|
| min |检测字符串的最小长度  |integer |无|
| length |检测字符串的是否等于某个长度或者长度是否在某个区间范围内  |integer or min,max |无|
| in |检测字段的值是否在某个范围之内  |a,b,c... |无|
| notIn |检测字段的值是否在不某个范围之内  |a,b,c... |无|
| between |检测字段的值是否在某个区间之内  |number1,number2 |无|
| notBetween |检测字段的值是否不在某个区间之内  |number1,number2 |无|
| before |检测字段的值是否在某个日期之前  |一个合法日期|无|
| after |检测字段的值是否在某个日期之后  |一个合法日期|无|
| expire |检测字段的值是否在某个日期范围之间  |date1,date2|无|
| notExpire |检测字段的值是否不在某个日期范围之间  |date1,date2|无|
| file |检测是否是一个文件或者类文件 |无|无|
| fileSize |检测文件的大小是否在指定区间范围之内  |size1,size2 or maxSize|无|
| fileExt |检测文件的后缀名是否在指定范围之内  |txt,png,jpg...|无|
| fileMime |检测文件的类型是否在指定范围之内  |text/plain,text/html...|无|
| confirm |检测该字段是否和另外一个字段的值一致  |String|无|
| different |检测该字段是否和另外一个字段的值不一致  |String|无|
| eq,=,same |检测该字段是否等于某个值 |string or number|无|
| egt,>=|检测该字段是否大于等于某个值 |number|无|
| gt,>|检测该字段是否大于某个值 |number|无|
| elt,<=|检测该字段是否小于等于某个值 |number|无|
| lt,<|检测该字段是否小于某个值 |number|无|
## 2.2.4 内置规则用法
### 2.2.4.1 格式验证类
>**require**
验证某个字段必填，例如：
```javascript
	const data = {
        name: 'test'
    };
    const rules = [{
        name: 'name',
        rule: 'require'
    }];

    const res = checker(data, rules);
    console.log(res.result);//true
```
>**number**
验证某个字段的值是否为数字(除了(-)之外不能包含其他字符)，例如：

```javascript
	 const data = {
        name: "test", //false
        name2:"123", //true
        name3:"25a", //false
        name4:"-25.5" //true
    };
    const rules = [
        {
            name: "name",
            rule: "number"
        },
        {
            name:"name2",
            rule:"number"
        },
        {
            name:"name3",
            rule:"number"
        },
        {
            name:"name4",
            rule:"number"
        },
    ];

    const res = checker(data, rules,null, checker.A);
```
>**integer**
验证某个字段的值是否为整数（不能带有小数和其他字符），例如：
```javascript
	 const data = {
        name: "123", //true
        name2:"123.3", //false
        name3:"25a", //false
        name4:"-25" //true
    };
    const rules = [
        {
            name: "name",
            rule: "integer"
        },
        {
            name:"name2",
            rule:"integer"
        },
        {
            name:"name3",
            rule:"integer"
        },
        {
            name:"name4",
            rule:"integer"
        },
    ];

    const res = checker(data, rules,null, checker.A);
```
>**float**
验证某个字段的值是否为浮点数或者小数(必须带有小数)，例如：
```javascript
	 const data = {
        name: "123",//false
        name2:"123.3",//true
        name3:"25a",//false
        name4:"-25"//false
    };
    const rules = [
        {
            name: "name",
            rule: "float"
        },
        {
            name:"name2",
            rule:"float"
        },
        {
            name:"name3",
            rule:"float"
        },
        {
            name:"name4",
            rule:"float"
        },
    ];
   
    const res = checker(data, rules,null, checker.A);
```
>**boolean**
验证某个字段的值是否为布尔值 布尔值的true和false 或者字符串类型的true和false均可，例如：
```javascript
	const data = {
        open1:false,//true
        open2:true, //true
        open3:"false", //true
        open4:"true", //true
        open5:"false2",//false
        open6:0,//false
        open7:1//false
    };
    const rules = [
        {
            name: "open1",
            rule: "boolean"
        },
        {
            name: "open2",
            rule: "boolean"
        },
        {
            name: "open3",
            rule: "boolean"
        },
        {
            name: "open4",
            rule: "boolean"
        },
        {
            name: "open5",
            rule: "boolean"
        },
        {
            name: "open6",
            rule: "boolean"
        },
        {
            name: "open7",
            rule: "boolean"
        },
    ];
   
    const res = checker(data, rules,null, checker.A);
```

>email
验证某个字段的值是否为email地址，例如：
```javascript
	 const data = {
        me:"3014375877@qq.com",//true
        you:"3014375877@qq"//false
    };
    const rules = [
        {
            name: "me",
            rule: "email"
        },
        {
            name: "you",
            rule: "email"
        }
    ];
   
    const res = checker(data, rules,null, checker.A);
```
>**date**
验证某个字段是否为有效日期,会在内部对日期值转成Date对象进行判断。
```javascript
	const data = {
        date1:new Date().getTime(),//true
        date2:"2021-04-21",//true
        date3:'test '//false
    };
    const rules = [
        {
            name: "date1",
            rule: "date"
        },
        {
            name: "date2",
            rule: "date"
        },
        {
            name: "date3",
            rule: "date"
        }
    ];
   
    const res = checker(data, rules,null, checker.A);
```


>**alpha**
验证某个字段的值是否为纯字母（可使用 .capita l和 .lowercase 修饰符），例如：
```javascript
	const data = {
       name1:"test",//true
       name2:"test2"//false
    };
    const rules = [
        {
            name: "name1",
            rule: "alpha"
        },
        {
            name: "name2",
            rule: "alpha"
        }
    ];
    const res = checker(data, rules,null, checker.A);
```
>**alphaNum**
验证某个字段的值是否为字母和数字组成（可使用 .capita 、 .lowercase 和 .compose 修饰符），例如：
```javascript
	const data = {
       name1:"test",//true
       name2:"test2",//true
       name3:"test$"//false
    };
    const rules = [
        {
            name: "name1",
            rule: "alphaNum"
        },
        {
            name: "name2",
            rule: "alphaNum"
        },
        {
            name:"name3",
            rule: "alphaNum"
        }
    ];
   
    const res = checker(data, rules,null, checker.A);
```
>**alphaDash**
验证某个字段的值是否为字母和数字，下划线_及破折号-组成（可使用 .capita 、 .lowercase 和 .compose 修饰符），例如：
```javascript
	const data = {
       name1:"test",//true
       name2:"test2",//true
       name3:"test2_-",//true
       name4:"test$"//false
    };
    const rules = [
        {
            name: "name1",
            rule: "alphaDash"
        },
        {
            name: "name2",
            rule: "alphaDash"
        },
        {
            name:"name3",
            rule: "alphaDash"
        },
        {
            name:"name4",
            rule: "alphaDash"
        }
    ];
   
    const res = checker(data, rules,null, checker.A);
```
>**chs**
验证某个字段的值只能是汉字，例如：
```javascript
	  const data = {
       name1:"test",//false
       name2:"test2",//false
       name3:"你好test2_-",//false
       name4:"你好"//true
    };
    const rules = [
        {
            name: "name1",
            rule: "chs"
        },
        {
            name: "name2",
            rule: "chs"
        },
        {
            name:"name3",
            rule: "chs"
        },
        {
            name:"name4",
            rule: "chs"
        }
    ];
   
    const res = checker(data, rules,null, checker.A);
```
>**chsAlpha**
验证某个字段的值只能是汉字、字母（可使用 .capita 、 .lowercase 和 .compose 修饰符），例如：
```javascript
	 const data = {
       name1:"你好test",//true
       name2:"你好test2",//false
       name3:"你好test2_-",//false
       name4:"你好"//true
    };
    const rules = [
        {
            name: "name1",
            rule: "chsAlpha"
        },
        {
            name: "name2",
            rule: "chsAlpha"
        },
        {
            name:"name3",
            rule: "chsAlpha"
        },
        {
            name:"name4",
            rule: "chsAlpha"
        }
    ];
   
    const res = checker(data, rules,null, checker.A);
```
>**chsAlphaNum**
验证某个字段的值只能是汉字、字母和数字（可使用 .capita 、 .lowercase 和 .compose 修饰符），例如：
```javascript
	 const data = {
       name1:"你好test",//true
       name2:"你好test2",//true
       name3:"你好test2_-",//false
       name4:"你好"//true
    };
    const rules = [
        {
            name: "name1",
            rule: "chsAlphaNum"
        },
        {
            name: "name2",
            rule: "chsAlphaNum"
        },
        {
            name:"name3",
            rule: "chsAlphaNum"
        },
        {
            name:"name4",
            rule: "chsAlphaNum"
        }
    ];
   
    const res = checker(data, rules,null, checker.A);
```
>**chsDash**
验证某个字段的值只能是汉字、字母、数字和下划线_及破折号-（可使用 .capita 、 .lowercase 和 .compose 修饰符），例如：
```javascript
	const data = {
       name1:"你好test",//true
       name2:"你好test2",//true
       name3:"你好test2_-",//true
       name4:"你好"//true
    };
    const rules = [
        {
            name: "name1",
            rule: "chsDash"
        },
        {
            name: "name2",
            rule: "chsDash"
        },
        {
            name:"name3",
            rule: "chsDash"
        },
        {
            name:"name4",
            rule: "chsDash"
        }
    ];
   
    const res = checker(data, rules,null, checker.A);
```
>**url**
验证某个字段的值是否为合法的URL地址（ 这个url验证的表达式提取自：npm包 async-validator的源码），例如：
```javascript
	 const data = {
       link1:"https://www.kancloud.cn/manual/thinkphp5/129356",//true
       link2:"hpt://sacsac/"//false
    };
    const rules = [
        {
            name: "link1",
            rule: "url"
        },
        {
            name: "link2",
            rule: "url"
        }
    ];
   
    const res = checker(data, rules,null, checker.A);
```
ip
验证某个字段的值是否为合法的IP地址，支持验证ipv4和ipv6格式的IP地址。例如：
```javascript
	 const data = {
       adress1:"192.168.0.1",//true
       adress2:"352.saa.25.1"//false
    };
    const rules = [
        {
            name: "adress1",
            rule: "ip"
        },
        {
            name: "adress2",
            rule: "ip"
        }
    ];
   
    const res = checker(data, rules,null, checker.A);
```
### 2.2.4.2 长度和区间验证类
> **in**
验证某个字段的值是否在某个范围，例如：
```javascript
	 const data = {
      hobby1:"睡觉",//false
      hobby2:"吃饭"//true
    };
    const rules = [
        {
            name: "hobby1",
            rule: "in:跑步,吃饭"
        },
        {
            name: "hobby2",
            rule: "in:跑步,吃饭"
        }
    ];
   
    const res = checker(data, rules,null, checker.A);
```
>**notIn**
验证某个字段的值不在某个范围，例如：
```javascript
	const data = {
      hobby1:"睡觉",//true
      hobby2:"吃饭"//false
    };
    const rules = [
        {
            name: "hobby1",
            rule: "notIn:跑步,吃饭"
        },
        {
            name: "hobby2",
            rule: "notIn:跑步,吃饭"
        }
    ];
   
    const res = checker(data, rules,null, checker.A);
```
>**between**
验证某个字段的值是否在某个区间，例如：
```javascript
	const data = {
     age1:18,//true
     age2:25//false
    };
    const rules = [
        {
            name: "age1",
            rule: "between:12,22"
        },
        {
            name: "age2",
            rule: "between:12,22"
        }
    ];
   
    const res = checker(data, rules,null, checker.A);
```
>**notBetween**
验证某个字段的值不在某个范围，例如：
```javascript
	 const data = {
     age1:18,//false
     age2:25//true
    };
    const rules = [
        {
            name: "age1",
            rule: "notBetween:12,22"
        },
        {
            name: "age2",
            rule: "notBetween:12,22"
        }
    ];
   
    const res = checker(data, rules,null, checker.A);
```
>**length:num1,num2**
>如果验证的数据是数组，则判断数组的长度。
>验证某个字段的值的长度是否在某个范围，例如：

```javascript
 const data = {
        test1:"hello",//false
        test2:"you"//true
    };
    const rules = [
        {
            name: "test1",
            rule: "length:1,3"
        },
        {
            name: "test2",
            rule: "length:1,3"
        }
    ];
   
    const res = checker(data, rules,null, checker.A);
```
>或者指定长度 **length:n**
>如果验证的数据是数组，则判断数组的长度。
```javascript
	 const data = {
        test1:"hello",//true
        test2:"you"//false
    };
    const rules = [
        {
            name: "test1",
            rule: "length:5"
        },
        {
            name: "test2",
            rule: "length:5"
        }
    ];
   
    const res = checker(data, rules,null, checker.A);
```
>**max:number**
验证某个字段的值的最大长度
如果验证的数据是一个数字,则判断数字的值。
如果验证的数据是数组，则判断数组的长度。
如果验证的数据是File对象或者类文件对象(拥有size、type、name属性的对象)，则判断文件的大小。
**检测的字段类型必须是Number、String、Array、File、类File类型中的一种，如果是其他类型则会抛出一个TypeError。**
例如：
```javascript
	 const data = {
        test1:"hello",//true
        test2:[1,2,3,4,5],//true
        test3:2,//true
        test4:6,//false
    };
    const rules = [
        {
            name: "test1",
            rule: "max:5"
        },
        {
            name: "test2",
            rule: "max:5"
        },
        {
            name:"test3",
            rule:"max:5"
        },
        {
            name:"test4",
            rule:"max:5"
        }
    ];
   
    const res = checker(data, rules,null, checker.A);
```
>**min:number**
验证某个字段的值的最小长度
如果验证的数据是一个数字,则判断数字的值。
如果验证的数据是数组，则判断数组的长度。
如果验证的数据是File对象或者类文件对象(拥有size、type、name属性的对象)，则判断文件的大小。
**检测的字段类型必须是Number、String、Array、File、类File类型中的一种，如果是其他类型则会抛出一个TypeError。** 例如：
```javascript
	const data = {
        test1:"hell",//false
        test2:[1,2,3,4],//false
        test3:2,//false
        test4:6,//ftrue
    };
    const rules = [
        {
            name: "test1",
            rule: "min:5"
        },
        {
            name: "test2",
            rule: "min:5"
        },
        {
            name:"test3",
            rule:"min:5"
        },
        {
            name:"test4",
            rule:"min:5"
        },
    ];
   
    const res = checker(data, rules,null, checker.A);
```
>**after**:合法日期
验证某个字段的值是否在某个日期之后，例如：
```javascript
	const data = {
       date1:"2021-04-21",//true
       date2:"2020/01/01"//false
    };
    const rules = [
        {
            name: "date1",
            rule: "after:2021/01/01"
        },
        {
            name: "date2",
            rule: "after:2021/01/01"
        },
    ];
   
    const res = checker(data, rules,null, checker.A);
```
>**before**:合法日期
验证某个字段的值是否在某个日期之前，例如：
```javascript
	const data = {
       date1:"2021-04-21",//false
       date2:"2020/01/01"//true
    };
    const rules = [
        {
            name: "date1",
            rule: "before:2021/01/01"
        },
        {
            name: "date2",
            rule: "before:2021/01/01"
        },
    ];
   
    const res = checker(data, rules,null, checker.A);
```
>**expire**:开始日期,结束日期
验证当前字段是否在某个有效日期之内，例如：
```javascript
	const data = {
       date1:"2021-04-21",//false
       date2:"2020/01/01"//true
    };
    const rules = [
        {
            name: "date1",
            rule: "expire:2020/01/01,2021/01/01"
        },
        {
            name: "date2",
            rule: "expire:2020/01/01,2021/01/01"
        },
    ];
   
    const res = checker(data, rules,null, checker.A);
```
>**notExpire**:开始日期,结束日期
验证当前字段不在某个有效日期之内，例如：
```javascript
	 const data = {
       date1:"2021-04-21",//true
       date2:"2020/01/01"//false
    };
    const rules = [
        {
            name: "date1",
            rule: "notExpire:2020/01/01,2021/01/01"
        },
        {
            name: "date2",
            rule: "notExpire:2020/01/01,2021/01/01"
        },
    ];
   
    const res = checker(data, rules,null, checker.A);
```
### 2.2.4.3 字段比较类
>**confirm**
验证某个字段是否和另外一个字段的值一致，另一个字段必须要在data中存在，否则将会抛出一个Error。例如：
```javascript
	 const data = {
       pass1:"123456",//true
       rePass1:"123456",//true
       rePass2:"123"//false
    };
    const rules = [
        {
            name: "pass1",
            rule: "max:10"
        },
        {
            name: "rePass1",
            rule: "confirm:pass1"
        },
        {
            name: "rePass2",
            rule: "confirm:pass1"
        },
    ];
   
    const res = checker(data, rules,null, checker.A);
```
>**different**
验证某个字段是否和另外一个字段的值不一致，另一个字段必须要在data中存在，否则将会抛出一个Error。例如：
```javascript
	const data = {
       pass1:"123456",//true
       rePass1:"123456",//false
       rePass2:"123"//true
    };
    const rules = [
        {
            name: "pass1",
            rule: "max:10"
        },
        {
            name: "rePass1",
            rule: "different:pass1"
        },
        {
            name: "rePass2",
            rule: "different:pass1"
        },
    ];
   
    const res = checker(data, rules,null, checker.A);
```
> **eq 或者 = 或者 same**
> 验证是否等于某个值，检测的值必须是个string或者number，否则会抛出一个TypeError。例如：
```javascript
	 const data = {
      age1:18,//true
      age2:15,//false
      name1:"mike",//true
      name2:"jhon"//false
    };
    const rules = [
        {
            name: "age1",
            rule: "=:18"
        },
        {
            name: "age2",
            rule: "=:18"
        },
        {
            name: "name1",
            rule: "=:mike"
        },
        {
            name: "name2",
            rule: "=:mike"
        },
    ];
   
    const res = checker(data, rules,null, checker.A);
```
> **egt 或者 >=**
 验证是否大于等于某个值，检测的值必须是个string或者number，参数必须是个number，否则会抛出一个TypeError。例如：
```javascript
	const data = {
      age1:24,//true
      age2:15,//false
    };
    const rules = [
        {
            name: "age1",
            rule: ">=:18"
        },
        {
            name: "age2",
            rule: ">=:18"
        }
    ];
   
    const res = checker(data, rules,null, checker.A);
```
>**gt 或者 >**
 验证是否大于某个值，检测的值必须是个string或者number，参数必须是个number，否则会抛出一个TypeError。例如：
```javascript
	const data = {
      age1:24,//true
      age2:15,//false
    };
    const rules = [
        {
            name: "age1",
            rule: ">:18"
        },
        {
            name: "age2",
            rule: ">:18"
        }
    ];
   
    const res = checker(data, rules,null, checker.A);
```
>**elt 或者 <=**
 验证是否小于等于某个值，检测的值必须是个string或者number，参数必须是个number，否则会抛出一个TypeError。例如：
```javascript
	const data = {
      age1:19,//false
      age2:15,//true
    };
    const rules = [
        {
            name: "age1",
            rule: "<=:18"
        },
        {
            name: "age2",
            rule: "<=:18"
        }
    ];
   
    const res = checker(data, rules,null, checker.A);
```
>**lt 或者 <**
 验证是否小于某个值，检测的值必须是个string或者number，参数必须是个number，否则会抛出一个TypeError。例如：
```javascript
	const data = {
      age1:19,//false
      age2:15,//true
    };
    const rules = [
        {
            name: "age1",
            rule: "<:18"
        },
        {
            name: "age2",
            rule: "<:18"
        }
    ];
   
    const res = checker(data, rules,null, checker.A);
```
### 2.2.4.4 自定义正则表达式验证
```javascript
	 const data = {
        test1:"abcd",//true
        test2:"ab"//false
    };
    const reg=/[a-z]{3,5}/;
    const rules = [
        {
            name: "test1",
            rule: reg
        },
        {
            name: "test2",
            rule: reg
        }
    ];
   
    const res = checker(data, rules,null, checker.A);
```

### 2.2.4.5 文件上传类
>**file** =>rule:'file'
验证是否是一个上传文件

>**fileExt**:允许的文件后缀 => rule: 'fileExt:ext1,ext2,ext3...'
验证上传文件后缀

>**fileMime**:允许的文件类型=>rule:'type1,type2,type3...'
验证上传文件类型

>**fileSize**:允许的文件字节大小=>rule:'fileSize:maxSize' 或者 rule:'fileSize:minSize,maxSize'
>不推荐采用这个规则，推荐采用max或者min规则来限定文件大小
```javascript
  rule:'fileSize:1024|fileExt:png,jpg,jpeg,txt|fileMime:text/plain,text/html,image/png,/image/jpeg'
```
# 2.3 自定义规则
-----
## checker.defineRule(ruleName, handler);
## 参数：
 - **ruleName**	
   	> - **String** 【必填】。
   		需要检测的数据对象只能是一个String，如果传入一个其他类型则会抛出一个TypeError。
   		规则名必须是唯一的，不能跟内置规则名重复，否则会抛出一个Erro。r
  -	**handler**	
   	> **Function** 【必填】。
   		规则的处理函数 接受一个options参数，在解析到该规则时会被调用，如果handler不是一个Function类型则会抛出一个TypeError。
   		> **handler**的参数options对象的结构规范:
   		>  - **val**
   		 **any** ，要检测的字段的值。
   		>	- **arg**  
   		**String**，规则表达式中的参数。
   		 >	- **modifiers**
   		 **Array** ， 规则表达式中的修饰符
   		  >	- **ruleName**
   		 **String** ，当前调用处理函数的规则名字
   		  >	- **getField** 
   		 **Function** ， 根据data中的字段名获取data中的某个字段值 不存在返回undefined。
   	> - **handler的返回值规范:**
   	**注意：handler须返回一个布尔值表示检测成功还是失败，返回其他一切类型都会被转换成对应的布尔值！**
## 返回值:
 - 一个**Boolean**值，**true**表示添加成功，**false**表示添加失败。
 
 > **注意：添加成功之后该规则就会被缓存成内置规则，只在该check存在的生命周期内有效!**
 

 

### 示例
```javascript
	const data = {
        test1:"abcd",//true
        test2:"ab"//false
    };

    checker.defineRule('test ',({val})=>{
        return /[a-z]{3,5}/.test(val);
    });

    const rules = [
        {
            name: "test1",
            rule: 'test '
        },
        {
            name: "test2",
            rule: 'test '
        }
    ];
   
    const res = checker(data, rules,null, checker.A);
```
# 3.1 checker的静态属性和静态方法
```javascript
	
    //静态属性
    checker.S;  //对应checker参数中的returnType 返回单个值
    checker.M;  //对应checker参数中的returnType 返回多个错误数组
    checker.A; //对应checker参数中的returnType  返回所有检测结果数组

    //静态方法 均返回一个布尔值 true表示检测成功 false表示失败
    //检测一个对象上有没有某个属性，只会检测对象自身而不会检测原型链，对应Object.hasOwnProperty方法
    checker.has(obj,prop) ;
    //是否含有大写字母
    checker.hasCapital(v);
     //是否含有小写字母
    checker.hasLowerCase(v);
     //是否含含有文件
    checker.hasChs(v);
    //是否是string类型
    checker.isString(v);
    //能否隐式转成String 只有number类型和string类型才能返回true 其他一律false
    checker.isStringable(v);
    //检测是否是一个对象
    checker.isObject(v);
    //是否是一个纯粹的对象 {} 其他像Array、RegExp等等等都会返回false
    checker.isPlainObject(v);
    //严格检测整数
    checker.isInteger(v);
     //严格检测浮点数
    checker.isFloat(v);
    //严格检测英文字母
    checker.isAlpha(v);
     //严格检测字母+数字组合 包含范围
    checker.isAlphaNumContain(v);
    //严格检测字母+数字组合 必须同时存在字母和数字=>组合范围
    checker.isAlphaNumCompose(v);
    //验证某个字段的值是否为字母和数字，下划线_及中横线-=>包含范围
    checker.isAlphaDashContain(v);
    //验证某个字段的值是否为字母和数字，下划线_及中横线-=>组合范围
    checker.isAlphaDashCompose(v);
    //只能是汉字
    checker.isChs(v);
    //验证某个字段的值只能是汉字、字母=>包含关系
    checker.isChsAlphaContain(v);
    //验证某个字段的值只能是汉字、字母=>组合关系
    checker.isChsAlphaCompose(v);
     //验证某个字段的值只能是汉字、字母和数字=>包含关系
    checker.isChsAlphaNumContain(v);
    //验证某个字段的值只能是汉字、字母和数字=>组合关系
    checker.isChsAlphaNumCompose(v);
    //验证某个字段的值只能是汉字、字母、数字和下划线_及破折号-=>包含模式
    checker.isChsDashContain(v);
    //验证某个字段的值只能是汉字、字母、数字和下划线_及破折号-=>组合模式
    checker.isChsDashCompose(v);
    //是否为有效的JSON字符串
    checker.isValidJSON(v);
    //验证是否是有效日期
    checker.isValidDate(v);
    //验证是否是有效邮箱
    checker.isEmail(v);
     //检测ip地址 ipv4/ipv6
    checker.isIP(v);
    //验证是否为一个合法的域名
    checker.isHost(v);
    //验证是否为一个合法的URL
    checker.isURL(v);
    //身份证号(15位、18位数字)，最后一位是校验位，可能为数字或字符X
    checker.isIdcard(v);
    //座机电话号码
    checker.isTelephoneNumber(v);
     //手机电话号码
    checker.isPhone(v);
     //中国邮政编码
    checker.isPostCode(v);
    //检测是否是一个文件 或者类文件对象 含有(size、type、name属性的对象)
    checker.isFile(v);
```
# 3.2 结束语:
>文档就写这些，这个库暂未经过严格的测试、商用请慎重！！！
>可能会有一些隐藏的小Bug如果发现可以添加我(qq：3014375877)告诉我，我即时修改！！
