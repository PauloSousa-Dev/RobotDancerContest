import { createRoot } from "react-dom/client";
import { Home } from "./Pages/Home";
import "./reset.css";
import "./index.css";

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<Home />);
