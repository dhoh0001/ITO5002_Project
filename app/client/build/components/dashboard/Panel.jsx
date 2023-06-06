const Panel = () => {
    return (
        <div>
            {/* Layer Name */}
            <div className="mt-4 ml-6 p-4 w-11/12 h-fit border-4 secondary-colour-border">
                <h2 className="text-center text-lg font-medium secondary-colour-border">Section One</h2>
            </div>

            {/* Main Panel */}
            <div className="mt-4 ml-6 p-4 w-11/12 h-fit border-4 secondary-colour-border">
                <div className="ml-3">
                    <h2 className="text-center text-lg font-medium secondary-colour-border">Plants</h2>
                    <p className="text-center tracking-widest secondary-colour-border">Carrots x 20</p>
                
                <h2 className="text-center text-lg font-medium secondary-colour-border">Data</h2>
                    <p className="text-center tracking-widest secondary-colour-border">Moisture Level: 95%</p>
                    <p className="text-center tracking-widest secondary-colour-border">Soil pH: 6.5pH</p>
                    <p className="text-center tracking-widest secondary-colour-border">Phosphorus Level: 22ppm</p>
                    <p className="text-center tracking-widest secondary-colour-border">Overall Plant Health: Great</p>
                </div>

            </div>
        </div>
    )
}

export default Panel