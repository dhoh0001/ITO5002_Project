import Name from "@components/dashboard/Name"
import AlertConfigCom from "@components/config/AlertConfig"

const AlertConfig = () => {
    return (
        <section className="pt-4 w-full lg:h-[calc(100vh-58px)] md:h-fit primary-colour">
            <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 w-2/3">
                <AlertConfigCom />
            </div>
        </section>
    )
}


export default AlertConfig