const CarritoCompra = require("../index");

describe("La clase CarritoCompra", () => {
   
    it("Debe inicializarse con un array vacio", () => {
        const carrito = new CarritoCompra();
        expect(Array.isArray(carrito.productos)).toBe(true);
        expect(carrito.productos.length).toBe(0);
    });

    it("Cuenta con un metodo para recibir un objeto como producto y agregarlo al carrito", () => {
        const carrito = new CarritoCompra();
        const producto = {name: 'Camiseta', price: 2, quantity: 2};
        expect(carrito.agregarProducto(producto)).toBeDefined();
        expect(carrito.productos.length).toBe(1);
    });

    it("Cuenta con un metodo que calcule el total del carrito en base a la suma de todos sus items", () => {
        const carrito = new CarritoCompra();
        expect(carrito.calcularTotal()).toBeDefined();
        expect(carrito.agregarProducto({name:'Remera', price: 10, quantity: 3}));
        expect(carrito.agregarProducto({name:'Pullover', price: 50, quantity: 2}));
        expect(carrito.agregarProducto({name:'Jean', price: 40, quantity: 1}));
        expect(carrito.calcularTotal()).toBe(170);
    });

    it("Cuenta con un metodo que aplique un descuento especificado al total de la compra y devuelva el valor", () => {
        const carrito = new CarritoCompra();

        carrito.agregarProducto({ name: 'Remera', price: 10, quantity: 3 });
        expect(carrito.aplicarDescuento(20)).toBe(24); 

        carrito.productos = []; 
        carrito.agregarProducto({ name: 'Publicar', price: 20, quantity: 3 });
        expect(carrito.aplicarDescuento(10)).toBe(54); 

        carrito.productos = []; 
        carrito.agregarProducto({ name: 'Tshirt', price: 40, quantity: 2 });
        expect(carrito.aplicarDescuento(30)).toBe(56); 
    });
});


