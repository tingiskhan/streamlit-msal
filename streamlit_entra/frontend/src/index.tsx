// frontend/src/index.tsx
import React from "react";
import ReactDOM from "react-dom";
import MsalComponent from "./MsalComponent.tsx";

console.log("bootstrapping MSAL msal_button…");

const container = document.getElementById("root");
if (!container) {
  console.error("#root container not found in index.html");
} else {
  ReactDOM.render(
    <React.StrictMode>
      <MsalComponent />
    </React.StrictMode>,
    container
  );
}
