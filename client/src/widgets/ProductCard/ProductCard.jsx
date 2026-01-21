import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Trash, SquarePen, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import EditForm from "../../features/EditForm/EditForm";

export default function ProductCard({ user, product, onUpdate, onDelete }) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [productUpd, setProductUpd] = useState(product);

  return (
    <>
      <Col sm={4}>
        {showEditForm ? (
          <EditForm
            setShowEditForm={setShowEditForm}
            onUpdate={onUpdate}
            productUpd={productUpd}
            setProductUpd={setProductUpd}
            onDelete={onDelete}
          />
        ) : (
          ""
        )}
        <Card className="product_card">
          <Link to={`/product/${product.id}`}>
            <Card.Img
              alt="image"
              src={product.image || "./product_icon.png"}
            ></Card.Img>
          </Link>
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
                  <button className="button_delete" onClick={onDelete}>
                    <Trash />
                  </button>
                </Col>
              </Row>
            ) : (
              ``
            )}
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}
