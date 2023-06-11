"use client"
import React, { useState, useEffect } from "react";
import { useAuthContext, AuthContextProvider } from '@/context/AuthContext'
import axios from "axios";

const Panel = () => {
    const [showPanelModal, setShowPanelModal] = useState(false);

    return (
        <>
            <div>
                {/* Main Panel */}
                <div className="mt-4 ml-6 p-4 w-11/12 h-fit border-4 secondary-colour-border">
                    <div className="ml-3">
                        <h2 className="text-center text-lg font-medium secondary-colour-border">Plants</h2>
                        <p className="text-center text-sm font-medium secondary-colour-border text-blue-700" onClick={() => setShowPanelModal(true)}>Edit</p>
                        <p className="text-center tracking-widest secondary-colour-border">Carrots x 20</p>
                    
                    <h2 className="text-center text-lg font-medium secondary-colour-border">Data</h2>
                        <p className="text-center tracking-widest secondary-colour-border">Moisture Level: 95%</p>
                        <p className="text-center tracking-widest secondary-colour-border">Soil pH: 6.5pH</p>
                        <p className="text-center tracking-widest secondary-colour-border">Phosphorus Level: 22ppm</p>
                        <p className="text-center tracking-widest secondary-colour-border">Overall Plant Health: Great</p>
                    </div>
                </div>
            </div>

            {showPanelModal ? (
                <div className="absolute z-50 m-auto left-0 right-0 secondary-colour w-3/12 h-fit p-4"> 
                    <div>
                        <label className="block text-sm font-bold mx-2 text-white pt-4 pb-4">Edit Plant(s) <span className="text-red-500" onClick={() => setShowPanelModal(false)}>X</span></label>
                        <input id="plantName" name="plantName" className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
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

export default Panel