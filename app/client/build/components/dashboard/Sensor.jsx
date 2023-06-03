const Sensor = () => {
    return (
        <div>
            {/* Main Panel */}
            <div className="mt-4 ml-6 p-4 w-11/12 h-fit border-4 secondary-colour-border">
                <div className="ml-3">
                    <h2 className="text-center text-lg font-medium secondary-colour-border">Sensor(s)</h2>
                
                    <p className="text-center tracking-widest secondary-colour-border">Water Control: Online</p>
                    <p className="text-center tracking-widest secondary-colour-border">Probes: Online</p>
                    <p className="text-center tracking-widest secondary-colour-border">Single Depth: Online</p>
                </div>
            </div>
        </div>
    )
}

export default Sensor