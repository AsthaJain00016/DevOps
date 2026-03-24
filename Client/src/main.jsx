import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Enquiry from "./Enquiry.jsx";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Enquiry></Enquiry>
  </StrictMode>,
);
