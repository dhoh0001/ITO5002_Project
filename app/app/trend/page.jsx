import Name from "@components/dashboard/Name"
import BarTile from "@components/trend/BarTile"
import ScatterTile from "@components/trend/ScatterTile"
import LineTile from "@components/trend/LineTile"

const Trend = () => {
    return (
        <section className="pt-4 w-full lg:h-[calc(100vh-58px)] md:h-fit primary-colour">  
            <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 w-2/3">
                <Name />
            </div>
            <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 w-2/3">
                <BarTile />
                <ScatterTile />
                <LineTile />
            </div>          
            <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 w-2/3">

            </div>
        </section>
    )
}

export default Trend