import { Outlet } from "react-router-dom"
import { Navbar } from "../components/NavBar"

export const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-grow p-4">
        <Outlet />
      </div>
    </div>
  );
};