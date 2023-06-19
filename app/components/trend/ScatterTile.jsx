import { useAuthContext, AuthContextProvider } from '@/context/AuthContext'
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
import { Scatter } from 'react-chartjs-2'

Chartjs.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

const Trend = (props) => {
    const { user } = useAuthContext();
    const [logData, setLogData] = useState({});
    const { logDataArray } = props
    
    // Config for Scatter Chart
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Log Output',
                data: [],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgb(53, 162, 235, 0.4)'
            }
        ]
    });

    const [chartOptions, setChartOptions] = useState({
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: "Log Output"
            }
        },
        maintainAspectRatio: true,
        responsive: true
    });

    useEffect(() => {
        if (logDataArray && logDataArray.length > 0) {
            const names = logDataArray.map((x) => x.name);
            const values = logDataArray.map((x) => x.value);
            
            setChartData((prevChartData) => ({
                ...prevChartData,
                labels: names,
                datasets: [
                    {
                        ...prevChartData.datasets[0],
                        data: values
                    }
                ]
            }));
        }
    }, [logDataArray]);

    return (
        <div className='mt-4 ml-6 p-4 border-4 secondary-colour-border'>
            <Scatter data={chartData} options={chartOptions} />
        </div>
    )
}

export default Trend