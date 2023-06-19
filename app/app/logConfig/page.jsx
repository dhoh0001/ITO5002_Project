import Name from "@components/dashboard/Name"
import LogConfigCom from "@components/config/LogConfig"
import Sidebar from "@components/dashboard/Sidebar"

const LogConfig = () => {
    return (
        <div> 
        <Sidebar/>      
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                <LogConfigCom />
                </div>
            </div>
        </div> 
    )
}


export default LogConfig
