"use client"
import React, { useState, useEffect } from "react";
import { useAuthContext, AuthContextProvider } from '@/context/AuthContext'
import axios from "axios";

const LightPanel = () => {
    
    const [showLightPanelModal, setShowLightPanelModal] = useState(false);

    // This should take sensor values.
    // Need to play around with this when API passes data
    let isGood;
    isGood = false;
    let status = isGood == true ? "🟢" : "🔴";


    return (
        <>
            <div>
                {/* Main Panel */}
                <div className="mt-4 ml-6 p-4 w-11/12 h-fit border-4 secondary-colour-border">
                    <div className="ml-3">
                    <p className="text-center tracking-widest secondary-colour-border">Sensor</p>
                    <p className="text-center text-sm font-medium secondary-colour-border text-blue-700" onClick={() => setShowLightPanelModal(true)}>Edit</p>
                    <h2 className="text-center text-lg font-medium secondary-colour-border">Status: {status}</h2>
                    </div>
                </div>
            </div>

            {showLightPanelModal ? (
                <div className="absolute z-50 m-auto left-0 right-0 secondary-colour w-3/12 h-fit p-4"> 
                    <div>
                        <label className="block text-sm font-bold mx-2 text-white pt-4 pb-4">Edit Sensor <span className="text-red-500" onClick={() => setShowLightPanelModal(false)}>X</span></label>
                        <input id="farmName" name="farmName" className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                        <div className="pt-4">
                           <button className="black_btn mx-2 mb-2" type="submit">Submit</button>
                        </div>
                        <div>
                           <button className="red_btn mx-2 mb-2" type="delete">Delete</button>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
        
    )
}

export default LightPanel