const LightPanel = () => {
    // This should take sensor values.
    let isGood;
    isGood = false;
    let status = isGood == true ? "🟢" : "🔴";


    return (
        <div>
            {/* Layer Name */}
            <div className="mt-4 ml-6 p-4 w-11/12 h-fit border-4 secondary-colour-border">
                <h2 className="text-center text-lg font-medium secondary-colour-border">Section One</h2>
            </div>

            {/* Main Panel */}
            <div className="mt-4 ml-6 p-4 w-11/12 h-fit border-4 secondary-colour-border">
                <div className="ml-3">
                <p className="text-center tracking-widest secondary-colour-border">Sensor</p>
                <h2 className="text-center text-lg font-medium secondary-colour-border">Status: {status}</h2>
                </div>
            </div>

            <div className="mt-4 ml-6 p-4 w-11/12 h-fit border-4 secondary-colour-border">
                <div className="ml-3">
                <p className="text-center tracking-widest secondary-colour-border">Sensor</p>
                <h2 className="text-center text-lg font-medium secondary-colour-border">Status: {status}</h2>
                </div>
            </div>
        </div>
    )
}

export default LightPanel