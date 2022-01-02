// Symbol() -> Um identificador único
const uniqueId = Symbol('Hello');
const uniqueId2 = Symbol('Hello');

console.log(uniqueId === uniqueId2); // false

// - Criando propriedade oculta em um objeto
let obj = {
  [uniqueId]: 'Hello',
};

console.log(Object.keys(obj)); // retorna []
console.log(Object.getOwnPropertySymbols(obj)); // retorna [Symbol]

// Well known symbols
// - Symbol.iterator (principal para compreensão de Generators)
// - Symbol.split
// - Symbol.toStringTag

let arr = [1, 2, 3, 4];
let iterator = arr[Symbol.iterator]();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next()); // done: true = iterável totalmente percorrido

// - Iteração usando a estrutura de repetição while
while (iterator) {
  let { value, done } = iterator.next()

  if (done) {
    break
  }

  console.log(value)
}

// Com a implementação do ES6 em diante a sintaxe da iteração fica mais limpa
let str = 'Lorem Ipsum Dolor Sit Amet'

for (item of str) {
  console.log(item)
}

for (item of arr) {
  console.log(item)
}

// Implementando uma função iteradora em um objeto
let objIterator = {
  values: [1, 2, 3, 4, 5],
  [Symbol.iterator]() {
    let i = -1

    return {
      next: () => {
        i++

        return {
          value: this.values[i],
          done: i >= this.values.length
        }
      }
    }
  }
}

const it = objIterator[Symbol.iterator]()
console.log(it.next())

// Agora que o objeto é um iterável pode ser usado o laço for of
for (let value of objIterator) {
  console.log(value)
}

// e criar um novo Array utilizando o operador Spread
const newArr = [...objIterator]
console.log(newArr)

// Generators

function* sayHello() { // O * transforma a função em geradora
  console.log('Hello')
  yield 1// Adiciona pausa no código controlando o fluxo de execução da função
  
  console.log('From')
  const value = yield 2 // atribuindo valor ao objeto retornado
  
  console.log('Function')
  yield 3

  console.log(value)
}

const fnGenerator = sayHello()
console.log(fnGenerator.next())
console.log(fnGenerator.next())
console.log(fnGenerator.next('and Outside'))
console.log(fnGenerator.next())

// Refatorando o objeto iterador
let objIt = {
  values: [1, 2, 3, 4, 5],
  *[Symbol.iterator]() {
    for (let i = 0; i < this.values.length; i++) {
      yield this.values[i] // Pausa a execução e retorna o valor atual
    }
  }
}

let counter = objIt[Symbol.iterator]()

// - Percorrendo item a item manualmente
console.log(counter.next())
console.log(counter.next())
console.log(counter.next())
console.log(counter.next())
console.log(counter.next())

// - Usando o laço for
let index = 1

for (let value of objIt) {
  console.log(`${index}ª execução => ${value}`)  
  index += 1
}

let objToArr = [...objIt]
console.log(objToArr)
