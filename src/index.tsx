import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ProfilePage } from "./screens/Page";

function App() {
  return <ProfilePage />;
}

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
