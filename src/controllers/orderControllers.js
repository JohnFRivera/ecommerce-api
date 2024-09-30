import Order from "../models/Order.js"; // Importa el modelo Order
import Product from "../models/Product.js"; // Importa el modelo Product si es necesario

// Crear un nuevo pedido
export const createOrder = async (req, res) => {
  try {
    const { user, products, total } = req.body;

    // Verificar si los productos existen
    for (let item of products) {
      const productExists = await Product.findById(item.product);
      if (!productExists) {
        return res.status(404).json({ message: `Producto con id ${item.product} no encontrado` });
      }
    }

    const order = new Order({
      user,
      products,
      total
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el pedido", error });
  }
};

// Obtener todos los pedidos
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user").populate("products.product");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los pedidos", error });
  }
};

// Obtener un pedido por ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user").populate("products.product");
    if (!order) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el pedido", error });
  }
};

// Actualizar un pedido
export const updateOrder = async (req, res) => {
  try {
    const { products, total } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }

    // Actualiza los campos permitidos
    order.products = products || order.products;
    order.total = total || order.total;

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el pedido", error });
  }
};

// Eliminar un pedido
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }

    await order.remove();
    res.status(200).json({ message: "Pedido eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el pedido", error });
  }
};
