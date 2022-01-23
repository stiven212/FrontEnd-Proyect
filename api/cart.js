import api from "./api";
import { message } from "antd";
import { size, includes, remove } from "lodash";

export function getProductsCart() {
  const cart = localStorage.getItem("cart");

  if (!cart) {
    return null;
  } else {
    const products = cart.split(",");
    return products;
  }
}

export function addProductCart(product) {
  const cart = getProductsCart();

  if (!cart) {
    localStorage.setItem("cart", product),
      message.success("producto añadido al carrito");
  } else {
    const productFound = includes(cart, product.toString());
    if (productFound) {
      message.warn("Este producto ya esta en el carrito");
    } else {
      cart.push(product);

      localStorage.setItem("cart", cart);
      message.success("Producto añadido correctamente");
    }
  }
}

export function countProductsCart() {
  const cart = getProductsCart();

  if (!cart) {
    return 0;
  } else {
    return size(cart);
  }
}

export function removeProductCart(producto) {
  const cart = getProductsCart();
  remove(cart, (item) => {
    return item === producto.toString();
  });

  if (size(cart) > 0) {
    localStorage.setItem("cart", cart);
  } else {
    localStorage.removeItem("cart");
  }
}

export function removeAllProductsCart() {
  localStorage.removeItem("cart");
}
