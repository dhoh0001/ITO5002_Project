"use client"
import React, { useState, useEffect } from "react";
import { useAuthContext, AuthContextProvider } from '@/context/AuthContext'
import axios from "axios";

const LightPanel = () => {
    
    const [showLightPanelModal, setShowLightPanelModal] = useState(false);

    const INITIAL_STATE = [
          { logId: 0, name: '', farmId: 1 }
    ]

    const capitalize = (word) => {
          return word[0].toUpperCase() + word.slice(1)
    }
    
    const [users, setUsers] = useState(INITIAL_STATE)

    const renderHeader = () => {
            return <tr>
                  {Object.keys(INITIAL_STATE[0]).map(key => <th id="key">{capitalize(key)}</th>)}
            </tr>
              }

    // This should take sensor values.
    // Need to play around with this when API passes data
    const stat = (val) => {
        let isGood;
        isGood = false;
        let status = isGood == true ? "🟢" : "🔴";

        if(val == 1)
            return 'xxx';

        return status;
    }

    const API_HOST = "http://ec2-3-26-101-210.ap-southeast-2.compute.amazonaws.com";

    const INVENTORY_API_URL = `${API_HOST}/log`;

    const [data, setData] = useState([]);

    useEffect(() => {
                fetchInventory();
            }, []);

    const fetchInventory = () => {
                fetch(`${INVENTORY_API_URL}`)
                    .then(res => res.json())
                    .then(json => setData(json));
            }

    return (
        <>
                <div style={{ margin: '50px' }}>
                    <table>
                        <thead>
                      {renderHeader()}
                        </thead>
                        <tbody>
                        {
                            data.map( (item)  => (
                                                  <tr key={item.logId} >
                                                      <td style={{ padding: '10px', border: '1px solid black' }}>{item.logId}</td>
                                                      <td style={{ padding: '10px', border: '1px solid black' }}>{item.name}</td>
                                                      <td style={{ padding: '10px', border: '1px solid black' }}>{stat(item.farmId)}</td>
                                                    </tr>
                                                    ))
                        }
                        </tbody>
                    </table>
                </div>
                        </>
    )
}

export default LightPanel
