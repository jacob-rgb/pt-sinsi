import ReactDOM from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import App from "./App.tsx";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import 'primereact/resources/primereact.css';
import "./index.css";
import { StateProvider } from "./state/state.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <PrimeReactProvider>
    <StateProvider>
      <App />
    </StateProvider>
  </PrimeReactProvider>
  // </React.StrictMode>,
);
