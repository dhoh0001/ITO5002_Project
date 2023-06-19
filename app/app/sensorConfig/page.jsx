import Name from "@components/dashboard/Name"
import SensorConfigCom from "@components/config/SensorConfig"
import Sidebar from "@components/dashboard/Sidebar"

const SensorConfig = () => {
    return (
        <div> 
            <Sidebar/>      
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                <SensorConfigCom />
                </div>
            </div>
        </div> 
    )
}


export default SensorConfig
