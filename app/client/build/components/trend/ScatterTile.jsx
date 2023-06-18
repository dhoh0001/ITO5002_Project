"use client"
import { useAuthContext, AuthContextProvider } from '@/context/AuthContext'
import axios from "axios";
import { 
        Chart as Chartjs,
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    } from 'chart.js/auto'
import { useEffect, useState } from "react"
import { Bar, Line, Scatter, Bubble } from 'react-chartjs-2'

Chartjs.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

const Trend = () => {
    const { user } = useAuthContext();
    const [logData, setLogData] = useState({});
    

    // useEffect(() => {
    //     console.log("this is triggered from Scatter", logData);
    // }, [logData]);

    const [chartData, setChartData] = useState({
        datasets: []
    })

    const [chartOptions, setChartOptions] = useState({})

    useEffect(() => {
        setChartData({
            labels: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
            datasets: [
                {
                    label: 'Oxygen Levels vs Soil Moisture Levels',
                    data: [{
                        x: -10,
                        y: 0
                      }, {
                        x: 0,
                        y: 10
                      }, {
                        x: 10,
                        y: 5
                      }, {
                        x: 0.5,
                        y: 5.5
                      }],
                    borderColor: 'rgb(53, 162, 235',
                    backgroundColor: 'rgb(53, 162, 235, 0.4'
                }
            ]
        })

        setChartOptions({
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: "Oxygen Levels vs Soil Moisture Levels"
                }
            },
            maintainAspectRatio: true,
            responsive: true
        })
    }, [])

    return (
        <div className='mt-4 ml-6 p-4 border-4 secondary-colour-border'>
            <Scatter data={chartData} options={chartOptions} />
        </div>
    )
}

export default Trend
