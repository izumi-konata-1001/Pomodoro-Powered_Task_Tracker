import Header from "../../components/common/Header";
import { Outlet } from "react-router-dom";
function Tasks(){
    return(
        <div>
            <Header />
            <h1>tasks& issues page</h1>
            <Outlet />
        </div>
    )
}

export default Tasks;