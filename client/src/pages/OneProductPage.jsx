import React, { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Trash, SquarePen } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import axiosInstance from "../shared/lib/axiosInstance";
import ProductValidate from "../entities/product/api/ProductValidate";
import EditForm from "../features/EditForm/EditForm";

export default function OneProductPage({ user }) {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    art: "",
    image: "",
    price: "",
    quantity: "",
  });
  const [showEditForm, setShowEditForm] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const { productId } = params;

  async function getProduct() {
    try {
      const data = await axiosInstance(`/api/products/${productId}`);

      setProduct(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getProduct();
  }, []);

  const updateHandler = async (event) => {
    event.preventDefault();
    try {
      const dataForApi = Object.fromEntries(new FormData(event.target));

      const { isValid, error } = ProductValidate.validateData(dataForApi);

      if (!isValid) return alert(error);
      const response = await axiosInstance.put(
        `/api/product/${productId}`,
        dataForApi
      );
      if (response.status === 200) {
        setProduct(response.data);
        setShowEditForm(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async () => {
    try {
      const response = await axiosInstance.delete(`/api/products/${productId}`);
      console.log(response);
      if (response.status === 204) navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Row>
        <Col sm={1}>
          <Button onClick={() => navigate(-1)}>Назад</Button>
        </Col>
        <Col sm={11}> </Col>
      </Row>
      <Row>
        <Card className="product_card" style={{ width: "80vw" }}>
          {showEditForm ? (
            <EditForm
              setShowEditForm={setShowEditForm}
              productUpd={product}
              setProductUpd={setProduct}
              onUpdate={updateHandler}
              onDelete={deleteHandler}
            />
          ) : (
            ``
          )}
          <Card.Img
            style={{ maxWidth: "250px" }}
            alt={product.name}
            src={product?.image || "./skelet_icon.png"}
          ></Card.Img>
          <Card.Body>
            <Row>
              <Col sm={6}>
                <Card.Text>{product.art}</Card.Text>
              </Col>
              <Col sm={6}>
                <Card.Title>{product.name}</Card.Title>
              </Col>
            </Row>
            <Row>
              <Col sm={4}>
                <Card.Text>{product.price} ₽</Card.Text>
              </Col>
              <Col sm={8}>
                <Card.Subtitle>{product.description}</Card.Subtitle>
              </Col>
            </Row>
            {user?.data?.id === product.userId && !showEditForm ? (
              <Row>
                <Col sm={7}></Col>
                <Col sm={5}>
                  <button
                    className="button_edit"
                    onClick={() => setShowEditForm((prev) => !prev)}
                  >
                    <SquarePen />
                  </button>
                  <button className="button_delete" onClick={deleteHandler}>
                    <Trash />
                  </button>
                </Col>
              </Row>
            ) : (
              ``
            )}
          </Card.Body>
        </Card>
      </Row>
    </>
  );
}
