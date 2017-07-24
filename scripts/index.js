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

/**
 * 第七章 列表渲染
 * 7.1 基础语法
 * 列表的渲染主要靠`v-for`，值为特殊语法:`item in items`的形式，items为数组名，item为每个值，item可以写为(item,index),index为下标。也可以用of代替in，更好一点。
 *
 * 同样可以用template来做一组节点的循环，同v-if。
 **/

/**
 * 7.2 object属性循环
 * v-for还可以用来循环对象属性，用起来基本和循环列表相同，唯一的不同就是对象循环可以提供最多三个参数(当然也可以2个1个):`(value,key,index) in obj`
 *
 * @type {Vue}
 */
var v23 = new Vue({
  el: '#app23',
  data: {
    obj: {
      name: '2b',
      type: '2e'
    }
  }
});

/**
 * 7.3 整数迭代
 * 只迭代整数也是可以的，如`n in 10`，n会从1到10循环。
**/

/**
 * 7.4 组件+v-for
 * vue为了减少父组件与子组件的耦合，隔离了父子组件的作用域。用props这个属性来传递变量，打开一个变量的通道，减少耦合。？？？
 *
 * 有的DOM元素限制子元素的类型，不能直接用自定义组件，这时候用is来解决问题，如下。
 *
 * > 注意data中要循环的是数组，用[]才对。
 *   凡是名字中带-的属性名，都要加引号。
 * @type {String}
**/
Vue.component('list-item', {
  template: '<li>{{ item.text }}<button @click="$emit(\'remove\')">X</button></li>',
  props: ['item']
});

var v24 = new Vue({
  el: '#app24',
  data: {
    inputValue: '',
    shoppingList: [
      { text: 'mouse'},
      { text: 'keyboard'},
      { text: 'graphic card'}
    ]
  },
  methods: {
    insertItem: function(){
      this.shoppingList.push({text: this.inputValue});
      //加入后清空
      this.inputValue = '';
    }
  }
});

/**
 * 7.5 v-for和key
 * Vue会在列表数据项顺序改变的时候单纯复用控件并改变顺序，注意其中的内容顺序是不会变得，只是换了个组件顺序，这通常不是我们想要的。如果不想复用的话请用:key绑定key属性使每一项的key是唯一值。这样在换组件顺序的时候内容也会跟着组件走。如果追求高性能而且不会造成bug的话还是可以故意不加key的。
 *
 * > key属性不止用在v-for中，本质是控制控件复用与否的一种机制。
**/
var v25 = new Vue({
  el: '#app25',
  data: {
    itemList: [
      {text:'A', id:0},
      {text:'B', id:1},
      {text:'C', id:2}
    ]
  },
  methods: {
    popAndShift: function(){
      let item = this.itemList.pop();
      this.itemList.unshift(item);
    }
  }
});

/**
 *  7.6 数组方法监听
 *  一些数组方法是直接改变数组本身的，这些方法也会触发视图更新，他们是:`push(),pop(),shift(),unshift(),splice(),sort(),reverse()`
 *
 * 另一些方法并不会改变原数组数据，我们一般会这么用:`xx=xx.filter(...)`，看起来开销很大，但vue对这种赋值有优化，所以也是很高效的，不用担心。
 *
 * 特例:`vm.items[indexOfItem]=newValue`和`vm.items.length = newLength`这两个数组操作并不会触发视图更新，谨记。可用set()和splice()代替。
 */

/**
 * 7.7 v-for表达式的写法
 * `n in xxx`，xxx也可以是计算属性或方法，这在处理数据比较复杂的时候很有用。
 *
 * @type {Vue}
 */
var v26 = new Vue({
  el: '#app26',
  data: {
    numbers: [0,1,2,3,4,5,6,7,8,9,10]
  },
  computed: {
    evenNumbers: function(){
      return this.numbers.filter((val)=>{
        return val % 2 === 1;
      })
    }
  },
  methods: {
    even: function(numberArr){
      return numberArr.filter((val)=>{
        return val % 2 === 1;
      });
    }
  }
});

/**
 * 第八章 事件处理
 */

/**
 * 8.1 基本用法
 * 事件绑定基本用法很简单:`v-on:xxx.xxx=""`(简写@xxx.xxx="")，值一般是一个方法名，在methods中定义，或者如果足够简单可以直接把js语句写在值中，如`="count+=1"`。
 * 如果使用方法名的形式:
 * 1. 可以直接写个名字如`say`，在调用方法的时候会自动加一个event参数代表DOM事件，在定义的时候可以+event参数。
 * 2. 可以用js表达式的形式，如`say(xxx)`。在定义方法的时候也可以对应加入参数。也可以手动传入event，格式为`say(...,$event)`，同样在定义方法的时候对应写。
**/
var v27 = new Vue({
  el: '#app27',
  data: {
    count: 0,
    step: 0
  },
  methods: {
    addCounter: function(event){
      alert(event.toString());
      this.count += 1;
    },
    addStep: function(event){
      alert(event.toString());
      this.count += Number(this.step);
    }
  }
});

/**
 * 8.2 事件修饰符
 * 在DOM体系中，我们可以用event.preventDefault()或event.stopPropagation()等一系列方法来控制时间。？？？几种的意思？？？vue提倡methods中只有纯粹的数据逻辑，所以这种控制事件的方法Vue提供了方法可以写在html中，分别是`.stop`，`.prevent`,`.capture`,`self`,`once`。用法如`@click.stop.prevent`可以串联，但是执行方法是按照书写顺序来的。
 *
 * > `.once`属性在2.1.4版本后可以添加到自定义组件上。
 */

/**
 * 8.3 键盘/鼠标事件设置
 * 形如`@keyup.alt.67`，我们可以在后面串联按键以绑定事件到快捷键上，一些常用的按键如.alt.shift.enter.ctrl.space.esc.tab.up.down.right.left.delete都是默认的简写，可以直接使用，其他的键对应的是大写的ascii码，可以自由组合。@keyup可以是@click一类的。(推测控件要获得焦点才能响应事件，所以多用input控件。)
 *
 * > Vue追求在methods中关注数据逻辑而不是DOM事件，所以将这些方法的绑定都写在html中。
 * @type {Vue}
 */
var v28 = new Vue({
  el: '#app28',
  data: {
    count: 0
  },
  methods: {
    addOne: function(){
      this.count += 1;
    }
  }
});

/**
 * > 可以用此方式自定义按键简写。
 * @type {Number}
 */
Vue.config.keyCodes.f1 = 112;

/**
 * 第九章:表单控件绑定
 * 尽管有些神奇，但 v-model 本质上不过是语法糖，它负责监听用户的输入事件以更新数据，并特别处理一些极端的例子。
 *
 * 9.1 各控件的绑定
 *
 * > label标签的for属性值指向某个input元素的id，当点击label的时候会触发该input元素。
 * > 绑定单个复选框和多个复选框的差别在于data中的数据是字符串还是数组。
 * > 凡是带选项标签option的，默认value就是文本本身，如无需求可以省略。
 * > 下拉选择框写一个未选择项设置为disable是推荐的写法。
 * > 永远不要忘了v-bind，这个绑定方式是vue里通用的动态绑定属性的方式，当然在各种表单控件中也可以使用。
 * > option的value是可以绑定对象的，不光是可以绑定值。
 * > 复选框还有:true-value='a',:false-value='b'的用法。即选中时和未选中时的value可以改变。
 */
var v29 = new Vue({
  el: '#app29',
  data: {
    textData: '',
    multilineTextData: '',
    checkboxArr: [],
    radioboxData: '',
    choiceListResult: '',
    multipleListResult: [],
    loopSelected: '',
    options: [
      { title:'西城', value:'XiCheng'},
      { title:'东城', value:'DongCheng'},
      { title:'朝阳', value:'ChaoYang'}
    ]
  }
});
/**
 * 9.2 v-model修饰符
 *
 * 语法糖，可以简便的加入一些特殊功能:
 * .lazy:转换为在change实践中而不是input事件中更新，即在回车的时候更新data。
 * .number:自动将用户的输入转换为number。
 * .trim:自动过滤用户输入，去掉首尾的空格。
 *
 * @type {Array}
 */
var v30 = new Vue({
  el: '#app30',
  data: {
    msgLazy: '',
    msgNumber: 0,
    msgTrim: ''
  }
});
/**
 * 第十章:组件
 * 组件是Vue的核心功能，它提供了很强的扩展性，将页面分割成一个个组件，清晰数据流，降低页面元素之间的耦合性。
 */

/**
 * 10.1 基本语法
 * 10.1.1 全局声明
 * 如下为全局声明自定义组件的方式，注册要在建立Vue对象之前。
 *
 * > 之前也提到过父子组件之间的作用域是不相通的，如果子组件想用父组件的属性，请用props在子组件中声明变量名，并在子组件标签内用v-bind语法绑定声明的变量，这样就把父组件内的属性传进来了，之后想怎么用都可以了。
 *
 * > 用props传入的属性是单项绑定的，改变父组件的这个变量，子组件会更新，反之不会。这是为了防止在子组件内误操作改变父组件数据。
 *
 * @type {Array}
 */
Vue.component('my-component', {
  props: ['message'],
  template: '<p>{{ message }}</p>'
});

/**
 * 10.1.2 局部声明
 * 如下方式可以局部声明自定义组件，这样只有在此Vue对象范围内才可以使用，其他同全局声明。
 * @type {Object}
 */
var Child = {
  props: ['message'],
  template: '<p>{{ message }}</p>'
};

var v31 = new Vue({
  el: '#app31',
  data: {
    message: 'component message',
  },
  components: {
    'local-component': Child
  }
});

/**
 * 10.2 is的使用
 * 见app24。另外在有些字符串模板中:
 * 1. <script type="text/x-template">
 * 2. JavaScript 内联模版字符串
 * 3. .vue 组件
 * 是不需要用is的，没有子标签限制。所以尽量使用这些字符串模板来避免is。
 *
 * > 字符串模板的含义是通过template属性生成的模板。
 * > 使用绑定的意义是可以方便的动态改值，但是直接使用属性赋值也是可以的!当然如果想传入非string类型的值也要用绑定，值会被解析为js表达式。
 */

/**
 * 10.3 props中的属性名格式转换
 * 由于在进行props绑定的时候:myMessage会全部转换为小写，所以请转换为my-message，这样在传到自定义组件的名字会转换为myMessage，不然无法传入正确的名字。自定义组件内还是正常使用，毫无影响。
 *
 * > 字符串模板不能用短横杠形式，所以催生出了这种特殊转换。
 *
 * > 记住一条规律:props和字符串模板中使用驼峰命名法，在v-bind:xxx中让xxx使用段横杠的表达形式，会自动转换成正确的。
 *
 * > 在使用props传值的时候，如果是`xx="1"`则会直接传入字符串'1'，要想传入数字1要用`:xx="1"`，这样引号内的内容会被当做js表达式来计算。
 *
 * @type {Object}
 */
var Child = {
  props: ['myMessage'],
  template: '<p>{{ myMessage }}</p>'
};

var v32 = new Vue({
  el: "#app32",
  data: {
    message: 'bravo!'
  },
  components: {
    child: Child
  }
});

/**
 * 10.4 自定义组件中的data
 * 要注意的是组件中的data必定是个函数而不是对象，如果是对象的话会导致所有相同的组件本质都公用一个data，只是不同的引用而已，到时候就一荣俱荣一损俱损了。
 *
 * 深入探讨一下，其实这是由于js的原型链模型导致的，我们定义一个组件的时候相当于初始化了一个prototype对象。
 * 不同于传统的面向对象语言，js中new对象的时候实际是并不会拷贝属性，而是在访问的时候通过原型链模型向上寻找。所以说如果这里data如果定义的是一个对象，那么我们在后面使用自定义组件的时候，所创建的组件对象中的data就只是一个指向原型对象data的引用，如果对其更改，就相当于将原型中的data更改了，以至于所有的组件对象都被更改了，这样是不可取的。
 * 在传统js程序中，如果我们不想所有对象公用一个属性，通常会:
 * ```javascript
 * xx.prototype.data = function(){
 *  return { a:0, b:1};
 * }
 * ```
 * 如何，语法上是不是很相似。
 *
 * @type {Object}
 */
var myComponent = {
  template: '<button @click="counter+=1">{{ counter }}</button>',
  data: function(){
    return { counter:0 };
  }
}

var v33 = new Vue({
  el: '#app33',
  components: {
    'my-component': myComponent
  },
});

/**
 * 10.5 单项数据流
 * 在Vue中不做特殊处理的话是单项数据流，即改变父组件数据子组件跟着变，反之不成立，这样利于程序健壮性。所以在子组件中一定不要改变props本身的值，特别是props为一个对象的时候！最佳的做法就是要用什么变量的话酌情用data或computed变量拷贝出来使用，保证操作的都是拷贝的对象不会影响原来的props即可。
 *
 * @type {Object}
 */
var parentChild = {
  props: ['initCount'],
  template: '<button @click="count+=1;">{{ count }}mod 3={{ modThree}}</button>',
  data: function(){
    return {
      count: this.initCount
    };
  },
  computed: {
    modThree: function(){
      return this.count % 3;
    }
  }
}

var v34 = new Vue({
  el: '#app34',
  data: {
    initCount: 3
  },
  components: {
    'parent-child': parentChild
  }
});

/**
 * 10.6 props过滤机制
 * props可以自行过滤，如下，所有填写类型的地方都可以换为String,Number,Object,Boolean,Array,Symbol,Function这7种。
 * @type {Vue}
 */
var v35 = new Vue({
  el: '#app35',
  data: {
    message: 'v35 message'
  },
  components: {
    'my-component': {
      props: {
        propA: String,//限定类型 注意首字母大写
        propB: [String,Number],//限定多种类型
        propC: {//限定类型+设定默认值
          type: String,
          default: 'default'
        },
        propD: {//限定类型+设置必须设置
          type: String,
          required: true
        },
        propE: {//限定类型+设定默认值(函数的方式 适合复杂数据逻辑)
          type: String,
          default: function(){
            return reverseString('PropE');
          }
        },
        propF: {//自定义过滤方法`return false`时抛出警告(但也只是警告)
          validator: function(val){
            return val.length > 3;
          }
        }
      },
      template: '<p>\
      propA: {{ propA }}<br>\
      propB: {{ propB }}<br>\
      propC: {{ propC }}<br>\
      propD: {{ propD }}<br>\
      propE: {{ propE }}<br>\
      propF: {{ propF }}<br>\
      </p>'
    }
  }
});

/**
 * > 子组件的class和style属性是经过优化的，使用时会自动融合父组件的对应属性，而其他属性则有可能被覆盖，要注意！
 */

/**
 * 10.7 父子组件之间的通信
 * 一句话概括就是`props down,events up`:父到子用props，子到父用抛出事件。虽然很不准确，但可以简单理解为`$on=>addEventListener`，`$emit=>dispatchEvent`。一个例子如下:
 *
 * > 要注意的是，这样做之后父子之间就完全解耦了。子组件干自己的事，最后用$emit抛出一个increment事件，然后在外面用@increment定义截取increment事件之后的操作。父子分离，可喜可贺。
 *
 * ？？？绑定原生事件？？？
 * @type {Object}
 */
var CounterComponent = {
  template: '<button @click="increase">{{ count }}</button>',
  data: function(){
    return {
      count: 0
    }
  },
  methods: {
    increase: function(){
      this.count += 1;
      this.$emit('increment');
    }
  }
}

var v36 = new Vue({
  el: '#app36',
  data: {
    totalCount: 0
  },
  methods: {
    increaseTotal: function(){
      this.totalCount += 1;
    }
  },
  components: {
    'my-component': CounterComponent
  }
});

/**
 * 10.8 sync关键字的复活
 * 曾经有个关键字叫做sync，它提供了父子控件之间数据的双向绑定，但是这不符合我们单向绑定的优良特性。所以就被废弃了。2.3.0版本之后，对其进行了优化使其复生了，现在的sync是一个语法糖，在变异的时候会被扩展:
 * `<x :xx.sync="xxx"></x>`=>`<x :xx="xxx" @update:xx="val=> xx = val"></x>`即增加了一个监听，在子组件内只要使用$emit('update:xx', 新值)即可更新父组件，这样方便理解又可以在双向绑定的时候凸显出来，易查错。
 *
 * @type {Vue}
 */
var v37 = new Vue({
  el: '#app37',
  data: {
    count: 0
  },
  components: {
    comp: {
      props: ['initCount'],
      template: '<button @click="increase">{{ count }}</button>',
      methods: {
        increase: function(){
          this.count += 1;
          this.$emit('update:initCount', this.count);
        }
      },
      data: function(){
        return { count: this.initCount };
      }
    }
  },
});

/**
 * 10.9 自定义事件的表单组件
 * 在表单中常常使用的`v-model`其实是一个语法糖，会自动转换:
 * <input v-model="xx">=><input :value="xx" @input="xx=$event.target.value">
 * 所以不用v-model的话一样可以用:value+@input的形式来实现。由此我们就可以通过更改input事件自定义输入之后的动作。
 * 要实现v-model，必须要:接受一个value属性+再有新值的时候触发input事件。
 *
 * > 我们会发现即使要再加上十个自定义组件标签也不用更改自定义组件中的内容，只需要在根Vue对象添加对应数据并通过`v-model`绑定到自定义组件上即可。这就是组件的魅力。
 *
 * @type {Vue}
 */
var v38 = new Vue({
  el: '#app38',
  data: {
    price: 0,
    tax: 0,
    shipping: 0,
    discount: 0
  },
  computed: {
    totalCost: function(){
      return this.price+this.tax+this.shipping-this.discount;
    }
  },
  components: {
    'cash-comp': {
      template: '\
        <span>\
          $\
          <input \
            ref="input" \
            :value="value" \
            @input="updateValue($event.target.value)">\
        </span>',
      props: ['value'],
      methods: {
        updateValue: function(value){
          // 使用emit抛出事件
          if(this.checkValue(value)){
            this.$emit('input', Number(value));
          }
        },
        checkValue: function(value){
          //这里做数据的规则判断
          return true;
        }
      }
    },
  }
});

/**
 * 10.10 value冲突
 * 在一些组件中，value是有别的用途的，想自定义v-model的话也要用value属性，这就重复了!可以用model属性来解决问题。使用方式为`model:{prop?: xx, event?: xxx}`这样的话即使使用v-model，之后也会被转换为::`xx:绑定值 @xxx:绑定方法`相当于为input和value换了个名字，这样再使用value就不会重复啦~
 *
 */

/**
 * 10.11 Bus消息总线
 * 非父子组件之间很难通信，一般用一个中间的消息总线(一个空的vue对象)，然后在其中用$on和$emit来监听和触发事件。但是这样一来如果事件中要改变内部的data就麻烦了。简单场景可以用消息总线，复杂之后一定使用vuex等框架。
 *
 * @type {Vue}
 */
//消息总线
var bus = new Vue();

var v39 = new Vue({
  el: '#app39',
  components: {
    'old-brother': {
      template: '<button @click="addYoung">{{ count }}</button>',
      data: function(){
        return {count: 0};
      },
      created: function(){
        bus.$on('addOld', (num)=>{
          this.count += num;
        });
      },
      methods: {
        addYoung: function(){
          bus.$emit('addYoung', 1);
        }
      }
    },
    'young-brother': {
      template: '<button @click="addOld">{{ count }}</button>',
      data: function(){
        return {count:0};
      },
      created: function(){
        bus.$on('addYoung', (num)=>{
          this.count += num;
        });
      },
      methods: {
        addOld: function(){
          bus.$emit('addOld', 1);
        }
      }
    }
  }
});
