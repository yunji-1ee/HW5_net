import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // 메인 컴포넌트(App.js)를 가져옵니다.

const root = ReactDOM.createRoot(document.getElementById("root")); // HTML의 root 요소에 렌더링
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
