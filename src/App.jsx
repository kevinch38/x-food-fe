import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <>
      <Outlet />
      <Sidebar/>
    </>
  );
};

export default App;
