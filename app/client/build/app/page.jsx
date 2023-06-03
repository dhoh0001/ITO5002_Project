import Usecase from '@components/homePage/Usecase';
import Calltoaction from '@components/homePage/Calltoaction';
import Worldwide from '@components/homePage/Worldwide';

const Home = () => {
    return (
        <section className="w-full flex-center flex-col primary-colour">
            <h1 className="head_text text-center">
                VertiGuard
            </h1>
            <h2 className="head_text text-center mt-3">
                <span className="green_gradient">
                    Data Delivered for your Vertical Farm
                </span>
            </h2>
            <Usecase />
            <Worldwide />  
            <Calltoaction />                
        </section>
    )
}

export default Home