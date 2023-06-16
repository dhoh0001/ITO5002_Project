import Name from "@components/dashboard/Name"
import SensorConfigCom from "@components/config/SensorConfig"

const SensorConfig = () => {
    return (
        <section className="pt-4 w-full lg:h-[calc(100vh-58px)] md:h-fit primary-colour">
            <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 w-2/3">
                <SensorConfigCom />
            </div>
        </section>
    )
}


export default SensorConfig
