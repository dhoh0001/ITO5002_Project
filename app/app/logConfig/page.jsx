import Name from "@components/dashboard/Name"
import LogConfigCom from "@components/config/LogConfig"
import Sidebar from "@components/dashboard/Sidebar"

const LogConfig = () => {
    return (
        <div> 
            <Sidebar />      
            <section className="pt-4 w-full lg:h-[calc(100vh-58px)] md:h-fit primary-colour">
                <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 w-2/3">
                    <LogConfigCom />
                </div>
            </section>
        </div>
    )
}


export default LogConfig
