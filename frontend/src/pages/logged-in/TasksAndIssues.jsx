import Header from "../../components/common/Header";
import { Outlet } from "react-router-dom";
function Tasks(){
    return(
    <div className="bg-brand-dark min-h-screen">
      <Header />
      <div className="w-4/5 bg-brand-light bg-opacity-90 mx-auto min-h-screen px-6 py-10 rounded">
        <h1 className="text-3xl font-bold text-center text-brand-dark mb-6">Tasks & Issues</h1>
        <Outlet />
      </div>
    </div>
    )
}

export default Tasks;