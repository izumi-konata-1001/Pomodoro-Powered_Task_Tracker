import { Outlet, Link} from "react-router-dom"

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
