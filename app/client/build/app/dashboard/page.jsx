import Panel from "@components/dashboard/Panel"
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
                        <Panel />
                        <Panel />
                        <Panel />
                    </div>          
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
                        <Sensor />
                        <div>
                            <Link href="trend" className="dash_btn">
                                View Trends
                            </Link>
                            <Link href="alert" className="dash_btn">
                                Configure Alerts
                            </Link> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Farm