import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Trash } from "lucide-react";

function EditForm({
  productUpd,
  setProductUpd,
  onUpdate,
  setShowEditForm,
  onDelete,
}) {
  const submitHandler = (event) => {
    event.preventDefault();
    onUpdate(productUpd.id, productUpd);
    setShowEditForm(false);
  };

  return (
    <>
      <Form onSubmit={submitHandler}>
        <h3>Редактирование товара</h3>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Артикул
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              value={productUpd.art}
              onChange={(ev) =>
                setProductUpd({ ...productUpd, art: ev.target.value })
              }
              placeholder="Артикул"
              name="art"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Наименование
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              value={productUpd.name}
              onChange={(ev) =>
                setProductUpd({ ...productUpd, name: ev.target.value })
              }
              placeholder="Наименование"
              name="name"
              autoFocus
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Описание
          </Form.Label>
          <Col sm="10">
            <Form.Control
              as="textarea"
              rows={3}
              type="text"
              value={productUpd.description}
              onChange={(ev) =>
                setProductUpd({ ...productUpd, description: ev.target.value })
              }
              placeholder="Описание"
              name="description"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Ссылка на изображение
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              value={productUpd.image}
              onChange={(ev) =>
                setProductUpd({ ...productUpd, image: ev.target.value })
              }
              placeholder="Ссылка на изображение"
              name="image"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Цена
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              value={productUpd.price}
              onChange={(ev) =>
                setProductUpd({ ...productUpd, price: ev.target.value })
              }
              placeholder="Цена"
              name="price"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Кол-во
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              value={productUpd.quantity}
              onChange={(ev) =>
                setProductUpd({ ...productUpd, quantity: ev.target.value })
              }
              placeholder="Кол-во"
              name="quantity"
            />
          </Col>
        </Form.Group>

        <Row>
          <Col>
            <button
              className="button_edit_form"
              onClick={() => setShowEditForm((prev) => !prev)}
            >
              Скрыть
            </button>
            <button
              className="button_edit_form"
              variant="primary"
              type="submit"
            >
              Сохранить
            </button>
            <button className="button_delete" onClick={onDelete}>
              <Trash />
            </button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default EditForm;
