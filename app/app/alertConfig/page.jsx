import Name from "@components/dashboard/Name"
import AlertConfigCom from "@components/config/AlertConfig"
import Sidebar from "@components/dashboard/Sidebar"

const AlertConfig = () => {
    return (
        <div> 
            <Sidebar/>      
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    <AlertConfigCom />
                </div>
            </div>
        </div>

    )
}

export default AlertConfig
