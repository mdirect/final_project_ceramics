import React from "react";

export default function CartPage({ user }) {
  return (
    <>
      <div className="main_greeting">
        <div className="main_text">
          <h2>
            Добро пожаловать
            {user.status === "logged" ? `, ${user.data?.name}!` : `!`}
          </h2>
        </div>
      </div>
    </>
  );
}
