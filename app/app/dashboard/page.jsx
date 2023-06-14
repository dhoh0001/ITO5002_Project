import Panel from "@components/dashboard/Panel"
import LightPanel from "@components/dashboard/LightPanel"
import Sensor from "@components/dashboard/Sensor"
import Name from "@components/dashboard/Name"
import Sidebar from "@components/dashboard/Sidebar"
import Link from 'next/link';

const Farm = () => {

    return ( 
        <div> 
            <Sidebar />      
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
                        <Name />
                    </div>
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
                        <LightPanel />
                    </div>          
                </div>
            </div>
        </div>
    )
}

export default Farm
