import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router";
import UserApi from "../../entities/user/api/UserApi";
import { LogOut } from "lucide-react";
import { Button } from "react-bootstrap";

function Navigation({ user, setUser }) {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await UserApi.logout();
      setUser({ status: "guest", data: null });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar>
      <Container>
        <Col sm={4}>
          <img
            style={{ width: "100px", margin: "5px" }}
            alt="Product_logo"
            src="/skelet.png"
          />
          My Product
        </Col>
        <Col sm={2}></Col>
        <Col sm={8}>
          <Navbar.Brand href="/">Главная</Navbar.Brand>
          {user?.data?.name ? (
            <Navbar.Brand href="/cart">Корзина</Navbar.Brand>
          ) : (
            ``
          )}
          {user?.data?.name && user.data.role === "seller" ? (
            <Navbar.Brand href="/addproduct">Добавить товар</Navbar.Brand>
          ) : (
            ``
          )}
          {user?.data?.name ? (
            <Navbar.Text>
              Вы вошли как:{" "}
              <Navbar.Brand href="/account">{user?.data?.name}</Navbar.Brand>
              <button className="logout_button" onClick={logoutHandler}>
                <LogOut />
              </button>
            </Navbar.Text>
          ) : (
            <Navbar.Brand href="/registery">Войти/Регистрация</Navbar.Brand>
          )}
          <Navbar.Toggle />
        </Col>
      </Container>
    </Navbar>
  );
}

export default Navigation;
