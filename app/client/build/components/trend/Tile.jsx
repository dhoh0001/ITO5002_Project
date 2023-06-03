"use client"

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
    const [chartData, setChartData] = useState({
        datasets: []
    })

    const [chartOptions, setChartOptions] = useState({})

    useEffect(() => {
        setChartData({
            labels: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
            datasets: [
                {
                    label: 'Plant Levels',
                    data: [15234, 124382, 19245, 16243, 28356, 14235, 31000],
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
                    text: "Plant Levels"
                }
            },
            maintainAspectRatio: true,
            responsive: true
        })
    }, [])

    return (
        <div className='mt-4 ml-6 p-4 border-4 secondary-colour-border'>
            <Bar data={chartData} options={chartOptions} />
        </div>
    )
}

export default Trend