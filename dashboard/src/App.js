import "./App.css";
import React from "react";
import { useContext, useEffect, useState } from "react";
import { AppContextProvider } from "./context/AppContextProvider";
import { UserContext } from "./context/UserContext";
import LoadComponent from "./components/load";
import AdminRouterPage from "./router/AdminRouterPage";

function App() {
  return (
    <AppContextProvider>
      <UserManager />
    </AppContextProvider>
  );
}

export default App;

function UserManager() {
  const { user, setUser } = useContext(UserContext);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 0);
  }, []);

  if (load) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-white">
        <LoadComponent />
      </div>
    );
  } else if (user.role === "admin") {
    return <AdminRouterPage />;
  } else {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-white">
        <h1 className="text-2xl font-bold text-gray-800">
          You do not have access to this application.
        </h1>
      </div>
    );
  }
}
