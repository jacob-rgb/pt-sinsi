import { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import bcrypt from "bcryptjs";
import { ProgressSpinner } from "primereact/progressspinner";
import LoginPage from "./pages/LoginPage";
import { PrivateRoutes } from "./components/PrivateRoutes";
import HomePage from "./pages/HomePage";
import "./App.css";
import { IUser } from "./models/user.model";
import { StateContext } from "./state/state";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { login } = useContext(StateContext);

  useEffect(() => {
    const userString = window.sessionStorage.getItem("_xuser");
    if (userString) {
      const user: IUser = JSON.parse(userString);
      const isCeoEmail = user.email === import.meta.env.VITE_CEO_EMAIL;
      const isCeoPasswd = bcrypt.compareSync(
        import.meta.env.VITE_CEO_PASSWORD,
        user.password
      );
      if (isCeoEmail && isCeoPasswd) {
        user.password = import.meta.env.VITE_CEO_PASSWORD;
        login(user);
      }
    }
    setIsLoaded(true);
  }, []);

  return isLoaded ? (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/home"
          element={
            <PrivateRoutes>
              <HomePage />
            </PrivateRoutes>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  ) : (
    <ProgressSpinner />
  );
}

export default App;
