import Panel from "@components/dashboard/Panel"
import Sensor from "@components/dashboard/Sensor"
import Name from "@components/dashboard/Name"
import Link from 'next/link';

const Farm = () => {
    return (
        <section className="pt-4 w-full lg:h-[calc(100vh-58px)] md:h-fit primary-colour">  
            <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 w-2/3">
                <Name />
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 w-2/3">
                <Panel />
                <Panel />
                <Panel />
            </div>          
            <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 w-2/3">
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
        </section>
    )
}

export default Farm