import { Outlet, Link} from "react-router-dom"
import Home from "../components/main/Home"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <br />
        <Link to="/signup">Signup</Link>
        <br />
        <Link to="/login">login</Link>
      </nav>
      <br/>
      <Outlet />
    </div>
  )
}

export default App;
