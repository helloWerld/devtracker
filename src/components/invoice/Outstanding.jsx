'use client'

import React, { useState, useEffect } from 'react'
import { useAppContext } from '@/context'
import { calculateElapsedTime, calculateIncome } from '../../utils'

const Outstanding = () => {
  const { state } = useAppContext()
  const { userData } = state
  const [showIncome, setShowIncome] = useState(false)
  const [totals, setTotals] = useState({})

  useEffect(() => {
    if (userData.workHistory.length > 0) {
      let lifetimeHours = 0
      let lifetimeIncome = 0
      let invoicedHours = 0
      let invoicedIncome = 0
      let unpaidHours = 0
      let unpaidIncome = 0
      userData.workHistory.forEach((workEvent) => {
        if (workEvent.status === 'unpaid') {
          const workTimeInSeconds = calculateElapsedTime(
            workEvent.startTime.toDate(),
            workEvent.endTime.toDate(),
          ).totalSeconds
          unpaidHours += workTimeInSeconds / 3600
          unpaidIncome += Number(
            calculateIncome(workTimeInSeconds, workEvent.rate),
          )
        } else if (workEvent.status === 'invoiced') {
          const workTimeInSeconds = calculateElapsedTime(
            workEvent.startTime.toDate(),
            workEvent.endTime.toDate(),
          ).totalSeconds
          invoicedHours += workTimeInSeconds / 3600
          invoicedIncome += Number(
            calculateIncome(workTimeInSeconds, workEvent.rate),
          )
        } else if (workEvent.status === 'paid') {
          const workTimeInSeconds = calculateElapsedTime(
            workEvent.startTime.toDate(),
            workEvent.endTime.toDate(),
          ).totalSeconds
          console.log(workEvent.rate)
          lifetimeHours += workTimeInSeconds / 3600
          lifetimeIncome += Number(
            calculateIncome(workTimeInSeconds, workEvent.rate),
          )
        }
      })
      setTotals((prev) => ({
        ...prev,
        lifetimeHours,
        lifetimeIncome,
        invoicedHours,
        invoicedIncome,
        unpaidHours,
        unpaidIncome,
      }))
    }
  }, [userData])

  return (
    <div className="flex flex-col md:flex-row gap-6 text-center">
      <div
        onClick={() => setShowIncome((prev) => !prev)}
        className="stat flex flex-col gap-2 p-6 bg-base-100 rounded-lg grow cursor-pointer"
      >
        <div className="stat-title text-success font-semibold">
          Lifetime Paid
        </div>
        <div className="stat stat-value p-0">
          {!showIncome
            ? `${totals?.lifetimeHours?.toFixed(1)} hours`
            : `$ ${totals?.lifetimeIncome?.toFixed(2)}`}
        </div>
      </div>
      <div
        onClick={() => setShowIncome((prev) => !prev)}
        className="stat flex flex-col gap-2 p-6 bg-base-100 rounded-lg grow cursor-pointer"
      >
        <div className="stat-title text-warning font-semibold">
          Currently Invoiced
        </div>
        <div className="stat stat-value p-0">
          {!showIncome
            ? `${totals?.invoicedHours?.toFixed(1)} hours`
            : `$ ${totals?.invoicedIncome?.toFixed(2)}`}
        </div>
      </div>
      <div
        onClick={() => setShowIncome((prev) => !prev)}
        className="stat flex flex-col gap-2 p-6 bg-base-100 rounded-lg grow cursor-pointer"
      >
        <div className="stat-title text-error font-semibold">
          Currently Unpaid
        </div>
        <div className="stat stat-value p-0">
          {!showIncome
            ? `${totals?.unpaidHours?.toFixed(1)} hours`
            : `$ ${totals?.unpaidIncome?.toFixed(2)}`}
        </div>
      </div>
    </div>
  )
}

export default Outstanding
