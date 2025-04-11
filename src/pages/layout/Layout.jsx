import Sidebar from "../../components/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <div className="flex-grow-1 overflow-auto ">{children}</div>
    </div>
  );
};

export default Layout;
