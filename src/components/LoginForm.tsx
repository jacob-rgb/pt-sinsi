import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../models/user.model";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { StateContext } from "../state/state";

const LoginForm = () => {
  const { login } = useContext(StateContext);

  const [email, setEmail] = useState("ceo@gmail.com");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleCorrectLogin = (user: IUser): void => {
    login(user);
    navigate("/home");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email === import.meta.env.VITE_CEO_EMAIL && password === import.meta.env.VITE_CEO_PASSWORD) {
      handleCorrectLogin({ email, password });
    } else {
      return window.alert("Credenciales incorrectas");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-column gap-2">
      <div className="form-fields flex flex-column gap-5 mb-4">
        <span className="p-float-label">
          <InputText
            id="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="username">Usuario</label>
        </span>

        <span className="p-float-label">
          <InputText
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Contraseña</label>
        </span>
      </div>

      <Button label="Iniciar sesión" severity="info" type="submit" />
    </form>
  );
};

export default LoginForm;
