import "reflect-metadata"

class A {
    public static method1() {
    }

    public method2() {
    }
}

const obj = new A;

Reflect.defineMetadata("n", 1, A);
Reflect.defineMetadata("n", 2, A, "method1");
Reflect.defineMetadata("n", 3, obj);
Reflect.defineMetadata("n", 4, A, "method2");

console.log(Reflect.getMetadata("n", A));
console.log(Reflect.getMetadata("n", A, "method1"))
console.log(Reflect.getMetadata("n", obj))
console.log(Reflect.getMetadata("n", obj, "method2"))
