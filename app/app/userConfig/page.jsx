import Name from "@components/dashboard/Name"
import UserConfigCom from "@components/config/UserConfig"
import Sidebar from "@components/dashboard/Sidebar"

const UserConfig = () => {
    return (
        <div> 
            <Sidebar/>      
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                <UserConfigCom />
                </div>
            </div>
        </div>
    )
}


export default UserConfig
