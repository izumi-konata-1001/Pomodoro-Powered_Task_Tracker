import Header from "../components/common/Header";
import Content from '../components/home/Content'

function Home(){
    return(
        <div className="bg-brand-dark min-h-screen">
            <Header />
            <Content />
        </div>
    )
}

export default Home;