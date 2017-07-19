//工具方法
/**
 * 反转字符串
 * @param  {[type]} str 原字符串
 * @return {[type]}     反转字符串
 */
function reverseString(str){
  return str.split('').reverse().join('');
}
//工具方法

/**
 * 第一章 核心功能简介
 * 1. 使用简单的mustache语法绑定数据--文本插值
 * @type {Vue}
 */
var v1 = new Vue({
  el: '#app1',
  data: {
    message: 'lice!'
  }
});

v1.message = 'change!';

/**
 * 2. 使用简单的指令(v-bind)绑定指令属性和数据
 * @type {Vue}
 */
var v2 = new Vue({
  el: "#app2",
  data: {
    message: '悬停信息'
  }
});

v2.message = "wow, fantastic baby.";

/**
 * 3.1 使用v-if条件指令
 * @type {Vue}
 */
var v3 = new Vue({
  el: "#app3",
  data: {
    seen: false
  }
});

v3.seen = true;

/**
 * 3.2 使用v-for循环指令绑定数组与节点
 * @type {Vue}
 */
var v4 = new Vue({
  el: "#app4",
  data: {
    todos: [
      { text: 'text1'},
      { text: 'text2'},
      { text: 'text3'}
    ]
  }
});

v4.todos.push({text: 'Dio'});

/**
 * 3.3 使用@click(全拼为v-on:click)来进行方法的绑定
 * @type {Vue}
 */
var v5 = new Vue({
  el: "#app5",
  data: {
    message: 'this is content.'
  },
  methods: {
    reverse: function(){
      this.message = reverseString(this.message);
    }
  }
});

//重新绑定会有问题
v5.reverse = function(){
  v5.message = reverseString(v5.message);
};

/**
 * 3.4 使用v-model进行input和数据的双向!绑定。
 * @type {Vue}
 */
var v6 = new Vue({
  el: '#app6',
  data: {
    message: 'init value'
  }
});

/**
 * 4.1 使用Vue.component实现组件化--一定记得要创建对应的Vue实例
 * @type {String}
 */
Vue.component('todo-item', {
  template: '<li>todo</li>'
});

var v7 = new Vue({
  el: '#app7'
});

/**
 * 4.2 使用Vue.component和v-bind实现组件化(用props属性来进行层级之间的数据传输)
 * @type {Array}
 */
Vue.component('shopping-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
});

//id的意义不甚明了
var v8 = new Vue({
  el: '#app8',
  data: {
    shoppingList: [
      { id:0, text: '黄瓜'},
      { id:1, text: '鱼'},
      { id:2, text: '肉'}
    ]
  }
});

/**
 * 第二章 Vue实例
 *
 * 每个Vue实例会代理其data对象中的所有属性，代理的属性皆为响应性的，如果有后面新加的属性则不会有响应性，推测初始化Vue对象的时候会去双向绑定。
 * 由于访问属性会自动代理，所以有了$前缀代表非代理属性，如$data。
 */

/**
 * 使用$watch函数设置数据监听
 * @type {Vue}
 */
var v9 = new Vue({
  el: '#app9',
  data: {
    message: '$watch应用'
  },
  methods: {
    changeVal: function(){
      this.message = reverseString(this.message);
    }
  }
});

//注意，如果按钮是变字符串为固定值的话，只会在第一次alert，推测和组建服用有关，这让我想到了模板模式。
//注意不要用箭头函数，this指向会出错
v9.$watch('message', function(newVal, oldVal){
  alert(oldVal + ' => ' + newVal);
});

/**
 * 2.1 生命周期:概念上同android，组件的自定义逻辑全部分布在这些“钩子”函数中。同理，如果reverseMessage中设置this.message为固定值的话，updated函数只在第一次点击按钮的时候触发。
 * 2.1.1 可以用$mount(el)函数手动挂载节点。
 */
var v10 = new Vue({

  data: {
    message: 'origin data'
  },
  methods: {
    reverseMessage: function(){
      this.message = reverseString(this.message);
    }
  },
  created: function(){
    //alert('created() executed');
  },
  updated: function(){
    alert('updated() executed Data changes to ' + this.message);
  }
});

v10.$mount('#app10');

/**
 * 第三章 模板语法--可以理解为vue绑定的语法糖
 * 3.1 插值
 *  3.1.1 文本插值:mustache语法--{{ xxx }}
 *    这段'mustache'会被替代为vue对象的xxx属性并且绑定。
 *    可以在标签中用v-once来执行一次性插值，这样不会进行绑定，数据变了插值不会变。这个标签中所有插值都会被影响。
 */

/**
 * 3.1.2 纯html插值--v-html标签
 * 使用v-html标签指定vue属性，并在vue的data中定义该属性，就可以将该属性值作为html渲染到当前节点。
 * 注意这种方式很危险，可能造成xss攻击，如果想实现节点嵌套请使用组件化，好100倍。
 * @type {Vue}
 */
var v11 = new Vue({
  el: '#app11',
  data: {
    message: 'this is message.',
    rawHtml: '<p>this is raw</p>.{{ message }} is not identified.'
  }
});

/**
 * 3.1.3 属性插值--v-bind:xx(缩写为:xx)
 * 理论上所有html标签属性都可以进行v-bind绑定，多用于class和style的绑定，推荐class绑定，这里不想写css文件所以用了style绑定。style用法为`{xxx: xxx, xxx:xxx}`，基本上是照常写，最后在vue对象的data中定义需要的属性，v-bind时会自动替换。
 * 由于class绑定太常用了，vue还提供了一些语法糖。如[classA, classB],[isA?classA:classB]等，很好用。
 * @type {Vue}
 */
var v12 = new Vue({
  el: '#app12',
  data: {
    message: 'v-bind绑定style练习',
    textColor: 'red'
  }
});

/**
 * 3.1.4 Javascript表达式
 * 以上所有插值都可以用js表达式写，js引擎会先翻译一遍。但是有个条件是js表达式只能是一个表达式!不能写多句，如果有if语句也请用三元表达式。
 * @type {Vue}
 */
var v13 = new Vue({
  el: '#app13',
  data: {
    ok: false
  }
});

/**
 * 3.2 指令包括参数(:xx)，修饰符(.xx接在参数后面)，修饰符在v-on和v-model中最为常用
 */

/**
 * 3.3 过滤器
 * 使用过滤器时html格式为"message | lowerCase"，第一个message绑定数据，后面的lowerCase绑定方法，可以多段'|xx'方法写法如下，记得return啊！
 * 另外这种写法只存在与2.1.0版本之后的mustache语法和v-bind表达式中。
 * 过滤器的设计目的是基本的文本转换，如果涉及到了数据的变动，请使用后面的计算属性。
 * 由于过滤器时js函数，所以可以在表达式中加入参数哦～如{{message | func('arg1', arg2)}}，arg1作为字符串当做第二个参数传入，arg2经过数据绑定之后当做第三个参数传入。
 * @type {Vue}
 */
var v14 = new Vue({
  el: '#app14',
  data: {
    message: 'CAPCASE',
    rawId: '12 3 4 5'
  },
  filters: {
    lowerCase: function(val){
      return val.toLowerCase();
    },
    formatId: function(val){
      return val.split(' ').join('');
    },
  }
});

/**
 * 第四章 计算属性
 * 4.1 计算属性 vs 方法
 * 分别使用计算属性({{ computedMessage }})和方法({{ methodMessage() }})两种方式实现数据的处理，就实现效果来说是一样的，但有一些微妙的不同:
 * - 计算属性是带缓存的，这意味着在运行中只要相关依赖属性(message)没有改变，多次访问计算属性是会复用的，是定值。
 * - 方法每次改动数据都会重新计算结果，即不带缓存。
 * 两种方式各有优劣，酌情使用。比如如果计算属性中`return Date.now()`，改动数据是不会更新的!这时就要用方法才合理。
 *
 * 计算属性以声明的方式建立了依赖关系，本质是个方法，vue会将其转换为getter，并自动与相关属性!进行绑定，相关属性变化计算属性也会跟着变。这与$watch的作用很相近，在后面会说到。
 * @type {Vue}
 */
var v15 = new Vue({
  el: '#app15',
  data: {
    message: 'origin'
  },
  computed: {
    computedMessage: function(){
      return reverseString(this.message);
    },
    computedDate: function(){
      return Date.now();
    }
  },
  methods: {
    reverseMessage: function(){
      this.message = reverseString(this.message);
    },
    methodMessage: function(){
      return reverseString(this.message);
    },
    methodDate: function(){
      return Date.now();
    }
  }
});

/**
 * 4.2 计算属性 vs $watch
 * 通过计算属性和$watch都可以实现对数据的监听，两种写法融合如下，就写法上来看watch实现数据监听缺失要多谢一些冗余代码。计算属性更加简介明了。
 * > 如果有同名的data中的属性和计算属性，会优先取data中的属性。
 * @type {Vue}
 */
var v16 = new Vue({
  el: '#app16',
  data: {
    firstName: 'Foo',
    lastName: 'bar',
    fullname: 'Foo Bar'
  },
  watch: {
    firstName: function(val){
      this.fullname = val + ' ' + this.lastName;
    },
    lastName: function(val){
      this.fullname = this.firstName + ' ' + val;
    }
  },
  computed: {
    computedFullname: function(){
      return this.firstName + ' ' + this.lastName;
    }
  },
  methods: {
    reverseFirstName: function(){
      this.firstName = reverseString(this.firstName);
    },
    reverseLastName: function(){
      this.lastName = reverseString(this.lastName);
    }
  }
});

/**
 * 4.3 为计算属性添加setter
 * 如果直接声明计算属性相当于为计算属性添加了getter方法，我们也可以手动添加setter方法，一个钩子，在设置计算属性的时候会调用，这时候如果手动修改fullName的值，则会调用setter方法。利用这个原理我们实现了属性与计算属性之间的双向绑定。
 * > 经过一系列的实验，推测如果不手动设置setter方法vue对象创建之后，计算属性会被设置为不可写，手动设置计算属性将会被静默(不报错也不操作，这里不是设置了之后又被getter方法覆盖，而是根本不执行getter方法)。
 * @type {Vue}
 */
var v17 = new Vue({
  el: '#app17',
  data: {
    firstName: 'Jackie',
    lastName: 'Chan'
  },
  computed: {
    fullName: {
      get: function(){
        return this.firstName + ' ' + this.lastName;
      },
      set: function(val){
        let nameGroup = val.split(' ');
        this.firstName = nameGroup[0];
        this.lastName = nameGroup[1];
      }
    }
  },
  methods: {
    reverseFirstName: function(){
      this.firstName = reverseString(this.firstName);
    },
    reverseLastName: function(){
      this.lastName = reverseString(this.lastName);
    },
    reverseFullName: function(){
      this.fullName = reverseString(this.fullName);
      //swap first name and last name
      this.fullName = this.fullName.split(' ').reverse().join(' ');
    },
  }
});

/**
 * 4.4 watch的作用
 * 上面说了很多，将watch贬低的一无是处，但watch也是肯定有用的。如下所示，在完成一些异步耗时操作的时候，使用watch来做就很好。watch可以配合_.debounce来设置中间状态，使用axios来进行ajax调用也是官方推荐的。
 * 如果是使用计算属性就无法设置中间态，用户体验差。
 *
 * watch有两种添加方式，一种是在初始化时如下，另一种是用`vm.$watch('xx',function(val){..})`添加。
 *
 * > 一个老生常谈的问题-多层function嵌套中的this绑定问题，这个问题可以靠ES6中的箭头函数完美解决(ES6之前是使用that=this的hack技巧)。
 * @type {Vue}
 */
var v18 = new Vue({
  el: '#app18',
  data: {
    question: '',
    answer: 'come on!'
  },
  watch: {
    question: function(newQuestion){
      this.answer = 'waiting for your input..';
      this.ask();
    }
  },
  methods: {
    ask: _.debounce(function(){
        if(this.question.indexOf('?')===-1){
          this.answer = 'your question should contain a "?"';
        }else{
          this.answer = 'thinking...';
          axios.get('https://yesno.wtf/api')
          .then((response)=>{
            this.answer = response.data.answer;
          }).catch((error)=>{
            this.answer = "I'm missing!" + error;
          })
        }
    },500)
  }
});

/**
 * 第五章 Class与Style绑定
 * 由于style和class的v-bind绑定极为常用，所以vue为之提供了一些语法糖。
 *
 * 5.1 Class绑定五大'糖'
 * class绑定有如下几种方法:
 *
 * :class=
 * 1. "{primaryColor: isPrimaryColor, boldFont: isBold}"
 * 冒号前为css类选择器名，冒号后为data内的boolean变量。
 * 2. "classObject"
 * classObject可以声明在data中，返回一个对象。也可以声明在计算变量中，这种方式极其常用，十分灵活。
 * 3. "[primaryColor, boldFont]"
 * 输入一个数组，每一项都要在data中声明，值为类选择器名。
 * 4. "[isPrimaryColor?primaryColor:'',boldFont]"
 * 同3，多了个data中的boolean变量做三元表达式。
 * 5. "[{primaryColor: isPrimaryColor}, boldFont]"
 * 1和3可以混用，方法同上。
 *
 * > 当使用Vue.component声明组件的时候，声明的template中如果有class属性同样可以和自定义标签内的class,:class叠加。即组件的class属性，自定义标签的class属性和:class属性三者叠加。
 * @type {Vue}
 */
var v19 = new Vue({
  el: '#app19',
  data: {
    isPrimaryColor: true,
    isBold: true,
    primaryColor: 'primaryColor',
    boldFont: 'boldFont'
    /**classObject: {
      isPrimaryColor: true,
      isBold: true
    }**/
  },
  computed: {
    classObject: function(){
      return {
        primaryColor: this.isPrimaryColor && this.isBold === false,
        boldFont: this.isBold && this.isPrimaryColor === false
      };
    }
  }
});

/**
 * 5.2 style的v-bind语法糖
 * style绑定的语法糖有四种:
 *
 * :style=
 * 1. "{color: primaryColor, fontSize: fontSize}"
 * 冒号前为css属性，冒号后为data中声明的变量，注意size要加px哟。
 * 2. "styleObject"
 * 类似class，这个对象可以使data属性也可以是计算属性。
 * 3. "[styleObject1, styleObject2]"
 * 这种数组的写法代表两个对象属性的叠加。
 * 4. "[isPrimaryColor?styleObject1:'',styleObject2]"
 * 同样在数组表达中也可以用三元表达式，不过个人认为这样写成计算属性更好。
 *
 * > 使用:style绑定css属性时，vue会自动添加必要的前缀，方便。在2.3.0版本之后可以用`{xx:['xxx','yyy','zzz']}`来传入多个属性选项，vue会根据浏览器支持情况选择，浏览器兼容!很好。
 *
 * @type {Vue}
 */
var v20 = new Vue({
  el: '#app20',
  data: {
    isPrimaryColor: true,
    primaryColor: 'red',
    fontSize: '20px',
    styleObject: {
      color: 'blue',
      'font-size': '20px'
    }
  },
  computed: {
    styleObject1: function(){
      return {
        color: this.isPrimaryColor?'blue':'red',
      };
    },
    styleObject2: function(){
      return {
        fontSize: '20px',
      };
    }
  }
});

/**
 * 第六章 条件渲染
 * 6.1.1 v-if基本用法
 * 用法为`v-if='xx'`，在vue对象data中设置xx，同样也可以在计算属性中设置，不过计算属性设计初衷是为了复杂的计算并且会自动绑定计算中使用的属性，这个要注意。如果时简单的计算可以直接写在表达式中，和插值+js表达式规则相似。
 *
 * 同样也有`v-else`和`v-else-if`(2.1.0新增)，这两个用法和普通的循环语句一样，很好记。
 *
 * @type {Vue}
 */
var v21 = new Vue({
  el: '#app21',
  data: {
    hasTitle: true,
    calResult: 0.1
  },
  computed: {
    hasContent: function(){
      //复杂的计算过程
      return this.calResult > 0.5;
    }
  }
});

/**
 * 6.1.2 v-if+template
 * 可以用template+v-if实现多个节点同时(不)显示，具体用法为`<template v-if="seen">多个节点</template>`
 */

/**
 * 6.2 tag属性`key`的作用
 * 由于Vue追求高效所以尽量复用节点，如果两种状态切换可以复用节点vue就会复用，导致一个数据遗留的问题，比如两个input复用，其中的数据就会保留下来，为了避免这种情况，可以在不想复用的节点中加入key属性来指明节点名，这样节点就有了唯一性，就不会被复用了。
 *
 * @type {Vue}
 */
v22 = new Vue({
  el: '#app22',
  data: {
    loginWay: 'username'
  },
  methods: {
    changeWay: function(){
      this.loginWay = this.loginWay === 'username'?'email':'username';
    }
  }
});

/**
 * 6.3 v-if与v-show对比
 * v-if和v-show都可以做到条件隐藏的效果，但是他俩实现上很不一样:
 * - v-if是惰性的，开始只渲染该显示的节点，之后做切换时在适当的销毁重建节点。
 * - v-show本质是在一开始就不管显不显示都渲染上，之后做切换时只改变css中的display属性达到切换的效果。
 *
 * 总的来说:v-if切换开销大，v-show初始化开销大，运行时改变多用v-if，改变少就用v-show。
 */
