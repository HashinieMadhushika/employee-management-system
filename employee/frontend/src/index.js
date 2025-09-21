import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import logo from "./Images/logo.jpeg";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Change favicon dynamically
const setFavicon = (faviconUrl) => {
  const link = document.querySelector("link[rel*='icon']") || document.createElement("link");
  link.type = "image/x-icon";
  link.rel = "icon";
  link.href = faviconUrl;
  document.getElementsByTagName("head")[0].appendChild(link);
};

setFavicon(logo);

root.render(<App />);
