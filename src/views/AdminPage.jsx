import Navbar from "../components/AdminPage/Navbar";
import Users from "../components/AdminPage/Users";
import Posts from "../components/AdminPage/Posts";
import Dashboard from "../components/AdminPage/Dashboard";
import { useState } from "react";

const AdminPage = () => {
  const [option, setOption] = useState("users");

  const renderContent = () => {
    switch (option) {
      case "users":
        return <Users />;
      case "posts":
        return <Posts />;
      case "dashboard":
        return <Dashboard />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Navbar setOption={setOption} />
      <main>{renderContent()}</main>
    </div>
  );
};

export default AdminPage;
