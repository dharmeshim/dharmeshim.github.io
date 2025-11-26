import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { ProfilePage } from "./screens/Page";
import { Loader } from "./components/shared";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000); // 3 seconds
    return () => clearTimeout(timer);
  }, []);

  return loading ? <Loader /> : <ProfilePage />;
}

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
