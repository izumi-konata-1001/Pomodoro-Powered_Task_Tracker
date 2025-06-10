import {Outlet, Link } from "react-router-dom";
function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="signup">Sign up</Link>
        <Link to="login">Login</Link>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default App;
