import React from "react";
import styles from "./SignUpForm.module.css";
import UserValidate from "../../entities/user/api/UserValidate";
import UserApi from "../../entities/user/api/UserApi";
import { useNavigate } from "react-router";
import { setAccessToken } from "../../shared/lib/axiosInstance";
import { AtSign, CircleUserRound, Lock, LockKeyhole } from "lucide-react";

function SignUpForm({ setUser }) {
  const navigate = useNavigate();

  const signUpHandler = async (event) => {
    try {
      event.preventDefault();
      const formData = Object.fromEntries(new FormData(event.target));
      const { isValid, error } = UserValidate.validateSignUpData(formData);

      if (!isValid) return alert(error);
      const res = await UserApi.signup(formData);

      if (res.status !== 201) alert("Что-то пошло не так!");
      navigate(`/`);
      setUser({ status: "logged", data: res.data.user });
      setAccessToken(res.data.accessToken);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={signUpHandler}>
        <div className={styles.inputGroup}>
          <div className={styles.inputLabel}>
            <CircleUserRound />
          </div>
          <input
            className={styles.input}
            name="name"
            type="text"
            placeholder="Введите имя"
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.inputLabel}>
            <AtSign />
          </div>
          <input
            className={styles.input}
            name="email"
            type="email"
            placeholder="Введите e-mail"
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.inputLabel}>
            <Lock />
          </div>
          <input
            className={styles.input}
            name="password"
            type="password"
            placeholder="Введите пароль"
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.inputLabel}>
            <LockKeyhole />
          </div>
          <input
            className={styles.input}
            name="confirmPassword"
            type="password"
            placeholder="Повторите пароль"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.inputLabel}>Роль</div>
          <select className={styles.input} name="role">
            <option value="buyer">Покупатель</option>
            <option value="seller">Продавец</option>
          </select>
        </div>

        <button type="submit" className={styles.submitButton}>
          Подтвердить
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
