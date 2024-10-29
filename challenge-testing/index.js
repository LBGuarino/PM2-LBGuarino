class CarritoCompra {
    constructor() {
        this.productos = [];
    }

    agregarProducto(producto) {
        this.productos.push(producto)
        return producto;
    }

    calcularTotal() {
        let suma = 0;
        for (const producto of this.productos) {
            suma += producto.price * producto.quantity;
        }

        return suma;
    }

    aplicarDescuento(porcentaje) {
        const total = this.calcularTotal();
        const descuento = (porcentaje / 100) * total;
        const totalConDescuento = total - descuento;
        return totalConDescuento;
    };
};

module.exports = CarritoCompra;