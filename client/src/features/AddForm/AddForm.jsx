import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axiosInstance from "../../shared/lib/axiosInstance";
import { Navigate, useNavigate } from "react-router";
import ProductValidate from "../../entities/product/api/ProductValidate";

function AddForm({ user }) {
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    try {
      event.preventDefault();
      const formData = Object.fromEntries(new FormData(event.target));
      const { isValid, error } = ProductValidate.validateData(formData);

      if (!isValid) return alert(error);
      const newProduct = {
        name: formData.name,
        description: formData.description,
        art: formData.art,
        image: formData.image,
        price: formData.price,
        quantity: formData.quantity,
        userId: user.data.id,
      };
      const response = await axiosInstance.post("/api/products", newProduct);

      if (response.status === 201) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(user);

  return (
    <>
      {user?.data?.role === "seller" ? (
        <Form onSubmit={submitHandler}>
          <h1>Добавление товара</h1>
          <Form.Group as={Row} className="mb-3">
            <Col>
              <Form.Control
                type="text"
                placeholder="Артикул"
                name="art"
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Col>
              <Form.Control
                type="text"
                placeholder="Наименование"
                name="name"
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Col>
              <Form.Control
                as="textarea"
                rows={3}
                type="text"
                placeholder="Описание"
                name="description"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Col>
              <Form.Control
                type="text"
                placeholder="Ссылка на изображение"
                name="image"
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Col sm={6}>
              <Form.Control
                type="number"
                placeholder="Цена"
                name="price"
                required
              />
            </Col>
            <Col sm={6}>
              <Form.Control
                type="number"
                placeholder="Кол-во"
                name="quantity"
                required
              />
            </Col>
          </Form.Group>

          <Button variant="primary" type="submit">
            Добавить
          </Button>
        </Form>
      ) : (
        ``
      )}
    </>
  );
}

export default AddForm;
