import {Outlet, Link} from 'react-router-dom';
function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <br />
        <Link to="/signup">Signup</Link>
      </nav>
      <Outlet />
    </div>
  )
}

export default App
