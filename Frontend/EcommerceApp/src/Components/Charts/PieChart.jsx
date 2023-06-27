
import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

import { getCategoryPieChartData, getCategorySalesData } from "../../Api/CategoryApi/categoryApi"
import { NUMBER_OF_PRODUCT_CHART, SALES_CHART } from '../../utils/constants';
import NoDataFound from '../commonComponents/NoDataFound';

const PieChart = (props) => {


    const [pieDataLabels, setPieDataLabels] = React.useState()
    const [pieData, setPieData] = React.useState()
    console.log("PieData", pieData)
    console.log("pieDataLabels", pieDataLabels)
    React.useEffect(() => {
        if (props.title === NUMBER_OF_PRODUCT_CHART) {
            getCategoryPieChartData(setPieDataLabels, setPieData)
        } else if (props.title === SALES_CHART) {
            getCategorySalesData(setPieDataLabels, setPieData)
        }
    }, [])


    const data = {
        labels: pieDataLabels,
        datasets: [
            {
                label: props.title,
                data: pieData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            }
        ],

    };
    const config = {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Chart.js Pie Chart'
                }
            }
        },
    };
    return (
        <>
            {pieData?.length >= 1 && pieData[0] != 0 &&
                <div className='pie-chart-container'>
                    <h4 className='title'>{props.title}</h4>
                    <Pie
                        data={data}
                    />

                </div>
                }
        </>
    )
}

export default PieChart