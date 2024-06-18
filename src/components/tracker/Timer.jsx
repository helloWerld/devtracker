'use client'

import React, { useState, useEffect } from 'react'
import { useAppContext } from '../../context'
import { calculateElapsedTime, calculateIncome } from '../../utils'

const Timer = () => {
  const { state } = useAppContext()
  const { rate, employer, startTime, endTime } = state

  const [elapsedTime, setElapsedTime] = useState({})
  const [income, setIncome] = useState(0)

  useEffect(() => {
    const updateTimer = () => {
      const currentTime = new Date()
      const elapsedTime = calculateElapsedTime(startTime, currentTime)
      const currentIncome = calculateIncome(elapsedTime?.totalSeconds, rate)
      setElapsedTime(elapsedTime)
      setIncome(currentIncome)
    }

    let intervalId

    if (startTime != null && endTime == null) {
      intervalId = setInterval(updateTimer, 1000)
      updateTimer() // Initial call to avoid waiting 1 second for the first update
    } else if (startTime != null && endTime != null) {
      updateTimer()
    }

    return () => clearInterval(intervalId)
  }, [startTime, endTime, rate])

  return (
    <>
      {startTime && !endTime ? (
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between bg-warning text-base-300 p-8 rounded-lg w-full">
          <div className="flex flex-row items-center justify text-sm md:text-base lg:text-xl gap-8">
            <div className="flex flex-col lg:flex-row text-center lg:text-start">
              <p className="font-semibold">Employer: </p>{' '}
              <p>{employer?.name}</p>
            </div>
            <div className="flex flex-col lg:flex-row text-center lg:text-start">
              <p className="font-semibold">Pay Rate: </p> <p>${rate} / hour</p>
            </div>
            <div className="flex flex-col lg:flex-row text-center lg:text-start">
              <p className="font-semibold">Income: </p>
              <p>$ {income}</p>
            </div>
          </div>
          <div className="flex gap-5 text-center">
            <div className="countdown-container">
              <span className="countdown font-mono text-5xl">
                <span style={{ '--value': elapsedTime.hours || 0 }}></span>
              </span>
              hours
            </div>
            <div className="countdown-container">
              <span className="countdown font-mono text-5xl">
                <span style={{ '--value': elapsedTime.minutes || 0 }}></span>
              </span>
              min
            </div>
            <div className="countdown-container">
              <span className="countdown font-mono text-5xl">
                <span style={{ '--value': elapsedTime.seconds || 0 }}></span>
              </span>
              sec
            </div>
          </div>
        </div>
      ) : startTime && endTime ? (
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between bg-accent text-base-300 p-8 rounded-lg w-full mt-2">
          <div className="flex flex-row items-center justify text-sm md:text-base lg:text-xl gap-8">
            <p>
              <span className="font-semibold">Employer:</span> {employer?.name}
            </p>
            <p>
              <span className="font-semibold">Pay Rate:</span> ${rate} / hour
            </p>
            <p>
              <span className="font-semibold">Income:</span> $
              <span>{income}</span>
            </p>
          </div>
          <div className="flex gap-5">
            <div className="countdown-container">
              <span className="countdown font-mono text-5xl">
                <span style={{ '--value': elapsedTime.hours || 0 }}></span>
              </span>
              hours
            </div>
            <div className="countdown-container">
              <span className="countdown font-mono text-5xl">
                <span style={{ '--value': elapsedTime.minutes || 0 }}></span>
              </span>
              min
            </div>
            <div className="countdown-container">
              <span className="countdown font-mono text-5xl">
                <span style={{ '--value': elapsedTime.seconds || 0 }}></span>
              </span>
              sec
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default Timer
