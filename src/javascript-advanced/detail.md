# JavaScript 高阶技巧

介绍了 10 个高级 JavaScript 技巧，包括解构赋值、Currying、防抖与节流、记忆化、代理对象、生成器、控制台使用、结构化克隆、自执行函数和标记模板字符串，旨在提高开发效率和代码质量。
用这些不太为人知的 JavaScript 技巧提升你的编程技能。

JavaScript 是一种功能强大的语言，拥有许多隐藏的功能，可以使你的开发过程更高效，代码更整洁。以下是 10 个你可能不知道的高级 JavaScript 技巧，可以显著提升你的编程能力。

## 1、解构赋值的别名

解构赋值允许你从数组或对象的属性中提取值并将其分配给不同的变量。别名允许你在这一过程中重命名变量，这对于处理来自外部来源如 API 的数据时特别有用。

用例：当从 API 获取数据时，为提高代码可读性和可维护性，给属性提供更具意义的名称。

```
const apiResponse = {
first_name: 'John',
user_age: 30,
address: {
city: 'New York',
zip: '10001'
}
};
const {
first_name: firstName,
user_age: age,
address: {
city: hometown,
zip: postalCode
}
} = apiResponse;
console.log(firstName); // John
console.log(age); // 30
console.log(hometown); // New York
console.log(postalCode); // 10001
```

使用原因：它有助于使变量名更直观性、易于理解，从而提高代码的可读性和维护性。通过使用别名，可以避免名称冲突，并增强代码的清晰度，使处理复杂数据结构变得更容易。

## 2、Currying

柯里化是一种将接受多个参数的函数转换为一系列仅接受一个参数的函数的过程。这项技术可以帮助创建更灵活且可重用的函数，尤其是在函数式编程中特别有用。

用例：创建可重用和可配置的函数以应用折扣。无需为不同的折扣百分比编写单独的函数，可以创建一个柯里化的函数。

```
const applyDiscount = (discount) => (price) => price - (price \* discount / 100);
const tenPercentOff = applyDiscount(10);
const twentyPercentOff = applyDiscount(20);

console.log(tenPercentOff(100)); // 90
console.log(twentyPercentOff(100)); // 80

const applyTax = (taxRate) => (price) => price + (price \* taxRate / 100);
const applyTenPercentTax = applyTax(10);

console.log(applyTenPercentTax(100)); // 110
console.log(applyTenPercentTax(twentyPercentOff(100))); // 88
```

使用原因：它可以让你在函数中预设参数，从而使代码更加模块化和可组合。这可以大大地简化创建高度可重用的实用函数的过程，使代码库更加整洁且易于维护。柯里化特别适用于在函数需要部分应用或以不同配置重复使用的场景。

## 3、防抖与节流

防抖和节流是控制函数执行频率的技术。它们特别适用于优化事件处理程序，防止过度函数调用，从而降低性能。

防抖
防抖确保函数在上次调用后经过一定时间才再次被调用。这在某些场景下很有用，比如搜索输入框，在用户停止输入之前，你不想触发 API 调用。

用例：优化搜索输入框以减少 API 调用次数。这可以防止服务器过载，并通过仅在用户完成输入后才启动搜索来改善用户体验。

```
function debounce(func, delay) {
let timeoutId;
return function(...args) {
clearTimeout(timeoutId);
timeoutId = setTimeout(() => func.apply(this, args), delay);
};
}

const search = debounce((query) => {
console.log(`Searching for ${query}`);
// Imagine an API call here
}, 300);

document.getElementById('searchInput').addEventListener('input', (event) => {
search(event.target.value);
});
```

使用原因：通过确保只有在用户停止执行触发动作后才调用函数，减少了不必要的函数调用，从而提高了性能和用户体验。这对于涉及网络请求或复杂计算的操作尤其有用。

节流
限流确保在指定的时间段内函数至多被调用一次。这对于像滚动事件这样的场景非常有用，你可以限制函数调用的频率。

用例：优化滚动事件处理以提高性能。这可以防止浏览器因事件调用过多而过载，确保更平滑、更响应式的交互。

```
function throttle(func, interval) {
let lastCall = 0;
return function(...args) {
const now = Date.now();
if (now - lastCall >= interval) {
lastCall = now;
func.apply(this, args);
}
};
}

const handleScroll = throttle(() => {
console.log('Scrolled');
// Imagine complex calculations or DOM updates here
}, 300);

window.addEventListener('scroll', handleScroll);
```

使用原因：通过确保函数在受控的间隔内被调用，以防止性能问题，减轻浏览器负载，并提供更好的用户体验。节流特别适用于频繁触发的事件监听器，如滚动或缩放事件。

# 4、记忆化

memoization 是一种优化技术，涉及缓存昂贵函数调用的结果，并在相同的输入再次出现时返回缓存的结果。这可以显著提高具有大量计算的函数的性能，特别是那些频繁以相同参数调用的函数。

用例：改进递归函数，如斐波那契计算的性能。如果没有采用记忆化技术，每次调用斐波那契函数都会重复计算相同的值多次，导致时间复杂度呈指数级增长。

const memoize = (fn) => {
const cache = {};
return (...args) => {
const key = JSON.stringify(args);
if (!cache[key]) {
cache[key] = fn(...args);
}
return cache[key];
};
};

const fibonacci = memoize((n) => {
if (n <= 1) return n;
return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(40)); // 102334155
使用原因：避免重复计算，显著提高具有重复输入的函数的性能。记忆化可以将低效、重复的计算转换为可管理的线性时间的操作，使其成为优化性能密集型任务的关键技术。

## 5、代理对象

代理对象允许你为另一个对象创建代理，从而能够拦截并重新定义基本操作，如属性查找、赋值、枚举、函数调用等。这为向对象添加自定义行为提供了一种强大的方式。

用例：对对象属性访问和赋值进行验证和日志记录。例如，可以强制类型约束并记录访问尝试，从而提供更好的控制和调试能力。

const user = {
name: 'John',
age: 30
};

const handler = {
get: (target, prop) => {
console.log(`Getting ${prop}`);
return target[prop];
},
set: (target, prop, value) => {
if (prop === 'age' && typeof value !== 'number') {
throw new TypeError('Age must be a number');
}
console.log(`Setting ${prop} to ${value}`);
target[prop] = value;
return true;
}
};

const proxyUser = new Proxy(user, handler);
console.log(proxyUser.name); // Getting name, John
proxyUser.age = 35; // Setting age to 35
// proxyUser.age = '35'; // Throws TypeError
使用原因：允许对对象操作进行自定义行为，例如验证、日志记录等，从而增强对对象操作的控制。代理还可以用于实现复杂逻辑，如访问控制和数据绑定。这使得它们成为管理并扩展对象行为的灵活工具。

6、生成器
生成器是一种可以退出并随后重新进入的函数，可以在重新进入时保持其上下文和变量绑定。它们对于实现迭代器和以同步方式处理异步任务非常有用。

用例：实现自定义对象遍历的迭代器。生成器提供了一种简单的方法来定义自定义迭代行为，使得更容易遍历复杂的数据结构。

function\* objectEntries(obj) {
for (let key of Object.keys(obj)) {
yield [key, obj[key]];
}
}

const user = { name: 'John', age: 30, city: 'New York' };

for (let [key, value] of objectEntries(user)) {
console.log(`${key}: ${value}`);
}
// name: John
// age: 30
// city: New York
使用原因：提供了一个强大的工具来实现自定义迭代器，并简化了异步工作流。生成器使处理复杂的迭代逻辑和异步过程更加容易，从而导致更易于阅读和维护的代码。还可以使用生成器来更直接、更线性地管理异步操作，例如使用 co 等库。

7、善用控制台
用例：改进对复杂对象的日志记录以进行调试。类似于 console.table 、 console.group 和 console.time 这样的控制台方法可以提供更结构化和信息丰富的调试信息。

// Basic logging
console.log('Simple log');
console.error('This is an error');
console.warn('This is a warning');

// Logging tabular data
const users = [
{ name: 'John', age: 30, city: 'New York' },
{ name: 'Jane', age: 25, city: 'San Francisco' },
];
console.table(users);

// Grouping logs
console.group('User Details');
console.log('User 1: John');
console.log('User 2: Jane');
console.groupEnd();

// Timing code execution
console.time('Timer');
for (let i = 0; i < 1000000; i++) {
// Some heavy computation
}
console.timeEnd('Timer');
使用原因：增强了调试信息的可见性和组织性，使诊断和解决问题更加容易。正确使用控制台方法可以显著提高你的调试过程的效率，提供清晰、有组织和详细的日志。

8、结构化克隆
使用新的 structuredClone 深度克隆对象。与传统的浅复制不同，结构化克隆会创建对象的深层复制，确保嵌套的对象也被复制。这种方法避免了 JSON.parse(JSON.stringify(obj)) 的限制，后者无法处理某些数据类型，如函数， undefined 和循环引用。

用例：创建复杂对象的深拷贝。当你需要为不应修改原始数据的操作复制对象时非常有用。

const obj = {
a: 1,
b: { c: 2 },
date: new Date(),
arr: [1, 2, 3],
nestedArr: [{ d: 4 }]
};
const clonedObj = structuredClone(obj);

console.log(clonedObj);
// { a: 1, b: { c: 2 }, date: 2023-06-08T00:00:00.000Z, arr: [1, 2, 3], nestedArr: [{ d: 4 }] }
console.log(clonedObj === obj); // false
console.log(clonedObj.b === obj.b); // false
console.log(clonedObj.date === obj.date); // false
console.log(clonedObj.arr === obj.arr); // false
console.log(clonedObj.nestedArr[0] === obj.nestedArr[0]); // false
使用原因：提供了一种内置的、高效的方法来执行对象的深度克隆，避免了手动深复制实现的陷阱和复杂性。这种方法比替代方案如 JSON.parse(JSON.stringify(obj)) 更可靠，且能更好地处理复杂的数据结构。

9、自执行函数
自调用函数，也称为立即执行函数表达式（IIFE），在创建后会自动执行。它们用于封装代码以避免污染全局作用域，这对于保持代码清洁和模块化至关重要。

用例：封装代码以避免污染全局作用域。此技术在较旧的 JavaScript 环境中特别有用，当时没有块作用域（let 和 const），或者在需要立即执行初始化逻辑的场景中。

(function() {
const privateVar = 'This is private';
console.log('Self-invoking function runs immediately');
// Initialization code here
})();

// Private variables are not accessible from outside
// console.log(privateVar); // ReferenceError: privateVar is not defined
使用原因：有助于保持代码清洁，避免使用全局变量，并在全局作用域外执行初始化代码而不会留下痕迹。这种方法可以在较大的代码库中防止冲突，确保功能的更好封装，提高代码可维护性并避免副作用。

10、标记模版字符串
标记模板字面量允许你自定义模板字面量的处理方式。它们对于创建专门的模板非常有用，例如用于国际化、清理 HTML 或生成动态 SQL 查询。

用例：在 HTML 模板中清理用户输入以防止 XSS 攻击。此技术确保用户生成的内容安全地插入 DOM 中，而不执行任何恶意脚本。

function sanitize(strings, ...values) {
return strings.reduce((result, string, i) => {
let value = values[i - 1];
if (typeof value === 'string') {
value = value.replace(/&/g, '&amp;')
.replace(/</g, '&lt;')
.replace(/>/g, '&gt;')
.replace(/"/g, '&quot;')
.replace(/'/g, '&#39;');
}
return result + value + string;
});
}

const userInput = '<script>alert("xss")</script>';
const message = sanitize`User input: ${userInput}`;
console.log(message); // User input: &lt;script&gt;alert("xss")&lt;/script&gt;
使用原因：提供了一种强大的机制来控制和自定义模板字面量的输出，使模板创建更加安全和灵活。标记模板字面量可用于强制执行安全性、格式化字符串和生成动态内容，从而增强代码的健壮性和灵活性。

结论
JavaScript 是一种功能丰富、能够帮助您编写更干净、更高效代码的语言。通过将这些高级技巧融入到您的编程实践中，您可以提高生产力并增强代码的可读性。从使用别名的解构到柯里化、防抖、节流等，这些技巧可以使您的代码更干净、更高效。祝您编程愉快！

关于本文
作者：@bhavik prajapati

原文：https://medium.com/@bjprajapati381/10-advanced-javascript-tricks-you-dont-know-f1929e40703d

```

```
