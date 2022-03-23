import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (    
    <>
      <nav>
        <ul>
          <br>
        <li>
            <Link to="Calculator">Calculator</Link>
          </li>
          </br>
          <li>
            <Link to="/Inventory">Inventory</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  )
};

export default Layout;