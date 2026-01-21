import React, { useEffect, useState } from "react";
import { SquarePlus, X } from "lucide-react";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import AddForm from "../features/AddForm/AddForm";
import ProductCard from "../widgets/ProductCard/ProductCard";
import axiosInstance from "../shared/lib/axiosInstance";
import Loader from "../shared/hocs/Loader";

export default function ProductPage({ user }) {
  const [products, setProducts] = useState([]);
  const [addForm, showAddForm] = useState(false);

  async function getProducts() {
    try {
      const { data } = await axiosInstance(`/api/products`);

      if (data) setProducts(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const targetData = event.target;
      const dataForApi = Object.fromEntries(new FormData(targetData));
      const newProduct = {
        name: dataForApi.name,
        description: dataForApi.description,
        status: dataForApi.status,
      };

      if (!dataForApi.name || !dataForApi.description || !dataForApi.status)
        return alert("Заполните все поля");
      const response = await axiosInstance.post("/api/products", newProduct);

      if (response.status === 201) {
        setProducts((prev) => [response.data, ...prev]);
        targetData.reset();
      }
      showAddForm((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const updateHandler = async (id, updateProduct) => {
    try {
      const response = await axiosInstance.put(`/api/products/${id}`, {
        name: updateProduct.name,
        description: updateProduct.description,
        status: updateProduct.status,
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
      <Loader isLoading={!user.data?.id}>
        <Row>
          {products.length === 0
            ? "Здесь еще нет товаров, но ты можешь их добавить..."
            : products.map((obj) => (
                <ProductCard
                  key={obj.id}
                  product={obj}
                  onDelete={() => deleteHandler(obj.id)}
                  onUpdate={updateHandler}
                  user={user}
                />
              ))}
          {user.status !== "guest" ? (
            <Card>
              <button
                className="button_add_form"
                onClick={() => showAddForm((prev) => !prev)}
              >
                {addForm ? <X /> : <SquarePlus />}
              </button>
              {addForm ? <AddForm submitHandler={submitHandler} /> : ``}
            </Card>
          ) : (
            ``
          )}
        </Row>
      </Loader>
    </>
  );
}
