'use client'

import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { useAppContext } from '@/context'

// Register the necessary components from Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const options = {
  responsive: true,
  scales: {
    x: {
      categoryPercentage: 0.6,
      barPercentage: 0.6, // Adjust this as needed to get the desired bar width
    },
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: function (context) {
          let label = context.dataset.label || ''
          if (label) {
            label += ': '
          }
          if (context.dataset.label === ' Income Earned') {
            label += '$' + context.raw.toFixed(2)
          } else {
            label += context.raw.toFixed(2)
          }
          return label
        },
      },
    },
  },
}

const Report = () => {
  const { state } = useAppContext()
  const { userData } = state
  const [hoursWorkedData, setHoursWorkedData] = useState([])
  const [incomeEarnedData, setIncomeEarnedData] = useState([])
  const [labels, setLabels] = useState([])

  useEffect(() => {
    const getLast7Days = () => {
      const dates = []
      for (let i = 6; i >= 0; i--) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        dates.push(date)
      }
      return dates
    }

    const formatDate = (date) => {
      const month = date.getMonth() + 1 // months are zero indexed
      const day = date.getDate()
      return `${month}/${day}`
    }

    const dates = getLast7Days()
    const hoursWorked = Array(7).fill(0)
    const incomeEarned = Array(7).fill(0)

    userData?.workHistory?.forEach((entry) => {
      const { startTime, endTime, rate } = entry
      const start = startTime.toDate()
      const end = endTime.toDate()
      const hours = (end - start) / (1000 * 60 * 60)

      dates.forEach((date, index) => {
        if (start.toDateString() === date.toDateString()) {
          hoursWorked[index] = parseFloat(
            (hoursWorked[index] + hours).toFixed(2),
          )
          incomeEarned[index] = parseFloat(
            (incomeEarned[index] + hours * rate).toFixed(2),
          )
        }
      })
    })

    setLabels(dates.map((date) => formatDate(date)))
    setHoursWorkedData(hoursWorked)
    setIncomeEarnedData(incomeEarned)
  }, [userData?.workHistory])

  const data = {
    labels: labels,
    datasets: [
      {
        label: ' Hours Worked',
        data: hoursWorkedData,
        backgroundColor: '#ffbe00',
        borderColor: '#ffbe00',
        borderWidth: 1,
        barThickness: 20,
      },
      {
        label: ' Income Earned',
        data: incomeEarnedData,
        backgroundColor: '#00cdb8',
        borderColor: '#00cdb8',
        borderWidth: 1,
        barThickness: 20,
      },
    ],
  }

  return (
    <div className="flex flex-col bg-base-100 p-8 rounded-lg w-full lg:w-1/2 min-h-96">
      <h2 className="text-lg font-semibold">Recent Activity</h2>
      <Bar data={data} options={options} className="my-auto" />
    </div>
  )
}

export default Report
