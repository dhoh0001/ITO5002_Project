import Name from "@components/dashboard/Name"
import FarmConfigCom from "@components/config/FarmConfig"
import Sidebar from "@components/dashboard/Sidebar"

const FarmConfig = () => {
    return (
        <div> 
            <Sidebar/>      
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                <FarmConfigCom />
                </div>
            </div>
        </div>
    )
}


export default FarmConfig
