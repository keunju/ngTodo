// shallow copy
// var obj = { a: 1 };
// var copy = obj;
// obj.a = 2;
// console.log(obj);
// console.log(copy);

// deep copy
var obj = { a: 1 };
// Object.assign(target, ...Source); //소스가 여러개 올수있다. target 에 모두 합침
var copy = Object.assign({}, obj);
obj.a = 2;
console.log(obj);
console.log(copy);
