import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axiosInstance from "../shared/lib/axiosInstance";
import ProductCard from "../widgets/ProductCard/ProductCard";

export default function MainPage({ user }) {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    try {
      const { data } = await axiosInstance(`/api/products/instock`);

      if (data) setProducts(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  const updateHandler = async (id, updateProduct) => {
    try {
      const response = await axiosInstance.put(`/api/products/${id}`, {
        name: updateProduct.name,
        description: updateProduct.description,
        art: updateProduct.art,
        image: updateProduct.image,
        price: updateProduct.price,
        quantity: updateProduct.quantity,
      });

      setProducts((prev) =>
        prev.map((el) => (el.id === id ? response.data : el))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deleteHandler = async (id) => {
    try {
      await axiosInstance.delete(`/api/products/${id}`);
      setProducts(products.filter((el) => el.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {products.length === 0 ? (
        "Сейчас нет доступных к покупке товаров, ждем новой поставки..."
      ) : (
        <Row>
          <h3>Наши товары</h3>

          {products.map((obj) => (
            <ProductCard
              key={obj.id}
              product={obj}
              user={user}
              onDelete={() => deleteHandler(obj.id)}
              onUpdate={updateHandler}
            />
          ))}
        </Row>
      )}
    </>
  );
}
