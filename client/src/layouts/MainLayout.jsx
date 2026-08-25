import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="main-layout">
      {/* Navbar and Sidebar will go here in a later sprint */}
      <main>
        <Outlet />
      </main>
      {/* Footer will go here in a later sprint */}
    </div>
  );
};

export default MainLayout;