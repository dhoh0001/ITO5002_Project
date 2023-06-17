import Name from "@components/dashboard/Name"
import FarmConfigCom from "@components/config/FarmConfig"
import Sidebar from "@components/dashboard/Sidebar"

const FarmConfig = () => {
    return (
        <div> 
            <Sidebar />      
            <section className="pt-4 w-full lg:h-[calc(100vh-58px)] md:h-fit primary-colour">
                <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 w-2/3">
                    <FarmConfigCom />
                </div>
            </section>
        </div>
    )
}


export default FarmConfig
