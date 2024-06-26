'use client'

import React, { useState } from 'react'
import { useAppContext } from '../../context'
import { calculateElapsedTime, calculateIncome } from '../../utils'
import { FaArrowDown, FaCaretDown, FaTrashAlt } from 'react-icons/fa'
import { deleteWorkEventFromWorkHistory } from '@/services/firestore'
import { usePathname } from 'next/navigation'

const WorkHistory = () => {
  const pathname = usePathname()
  const { state, setState } = useAppContext()
  const { userData, manualEntry } = state
  const [sort, setSort] = useState('date-desc')

  const sortedWorkHistory = () => {
    switch (sort) {
      case 'date-desc':
        return userData?.workHistory.sort((a, b) => b.startTime - a.startTime)
      case 'date-asc':
        return userData?.workHistory.sort((a, b) => a.startTime - b.startTime)
      case 'employer-desc':
        return userData?.workHistory.sort((a, b) =>
          a.employer.name.localeCompare(b.employer.name),
        )
      case 'employer-asc':
        return userData?.workHistory.sort((a, b) =>
          b.employer.name.localeCompare(a.employer.name),
        )
      case 'income-desc':
        return userData?.workHistory.sort(
          (a, b) =>
            calculateIncome(
              calculateElapsedTime(a.startTime.toDate(), a.endTime.toDate())
                .totalSeconds,
              a.rate,
            ) -
            calculateIncome(
              calculateElapsedTime(b.startTime.toDate(), b.endTime.toDate())
                .totalSeconds,
              b.rate,
            ),
        )
      case 'income-asc':
        return userData?.workHistory.sort(
          (a, b) =>
            calculateIncome(
              calculateElapsedTime(b.startTime.toDate(), b.endTime.toDate())
                .totalSeconds,
              b.rate,
            ) -
            calculateIncome(
              calculateElapsedTime(a.startTime.toDate(), a.endTime.toDate())
                .totalSeconds,
              a.rate,
            ),
        )
      case 'hours-desc':
        return userData?.workHistory.sort(
          (a, b) =>
            hoursWorked(a.endTime, a.startTime) -
            hoursWorked(b.endTime, b.startTime),
        )
      case 'hours-asc':
        return userData?.workHistory.sort(
          (a, b) =>
            hoursWorked(b.endTime, b.startTime) -
            hoursWorked(a.endTime, a.startTime),
        )
      case 'rate-desc':
        return userData?.workHistory.sort((a, b) => a.rate - b.rate)
      case 'rate-asc':
        return userData?.workHistory.sort((a, b) => b.rate - a.rate)
      default:
        return userData?.workHistory
    }
  }

  function hoursWorked(end, start) {
    return end - start
  }

  return (
    <div className="overflow-x-auto bg-base-100 p-6 rounded-lg min-h-80">
      <div className="flex flex-row w-full items-center justify-between">
        <h2 className="text-lg font-semibold">Work History</h2>
        <div className="flex flex-row items-center">
          {pathname === '/tracker' && (
            <button
              className="btn"
              onClick={() =>
                document.getElementById('manual_entry').showModal()
              }
            >
              + Manual Entry
            </button>
          )}
          <details id="sort_dropdown" className="dropdown dropdown-end">
            <summary className="m-1 btn">Sort By</summary>
            <ul className="p-2 shadow menu dropdown-content bg-base-300 rounded-box w-52 z-20">
              <li
                onClick={() => {
                  if (sort === 'date-desc') {
                    setSort('date-asc')
                  } else {
                    setSort('date-desc')
                  }
                  document
                    .getElementById('sort_dropdown')
                    .removeAttribute('open')
                }}
              >
                <a className="flex flex-row items-center justify-between">
                  Date
                  {sort.includes('date') && (
                    <FaArrowDown
                      className={sort.includes('asc') && 'rotate-180'}
                    />
                  )}
                </a>
              </li>
              <li
                onClick={() => {
                  if (sort === 'employer-desc') {
                    setSort('employer-asc')
                  } else {
                    setSort('employer-desc')
                  }
                  document
                    .getElementById('sort_dropdown')
                    .removeAttribute('open')
                }}
              >
                <a className="flex flex-row items-center justify-between">
                  Employer{' '}
                  {sort.includes('employer') && (
                    <FaArrowDown
                      className={sort.includes('asc') && 'rotate-180'}
                    />
                  )}
                </a>
              </li>
              <li
                onClick={() => {
                  if (sort === 'income-desc') {
                    setSort('income-asc')
                  } else {
                    setSort('income-desc')
                  }
                  document
                    .getElementById('sort_dropdown')
                    .removeAttribute('open')
                }}
              >
                <a className="flex flex-row items-center justify-between">
                  Income{' '}
                  {sort.includes('income') && (
                    <FaArrowDown
                      className={sort.includes('asc') && 'rotate-180'}
                    />
                  )}
                </a>
              </li>
              <li
                onClick={() => {
                  if (sort === 'hours-desc') {
                    setSort('hours-asc')
                  } else {
                    setSort('hours-desc')
                  }
                  document
                    .getElementById('sort_dropdown')
                    .removeAttribute('open')
                }}
              >
                <a className="flex flex-row items-center justify-between">
                  Hours Worked{' '}
                  {sort.includes('hours') && (
                    <FaArrowDown
                      className={sort.includes('asc') && 'rotate-180'}
                    />
                  )}
                </a>
              </li>
              <li
                onClick={() => {
                  if (sort === 'rate-desc') {
                    setSort('rate-asc')
                  } else {
                    setSort('rate-desc')
                  }
                  document
                    .getElementById('sort_dropdown')
                    .removeAttribute('open')
                }}
              >
                <a className="flex flex-row items-center justify-between">
                  Pay Rate{' '}
                  {sort.includes('rate') && (
                    <FaArrowDown
                      className={sort.includes('asc') && 'rotate-180'}
                    />
                  )}
                </a>
              </li>
            </ul>
          </details>
        </div>
      </div>
      <table className="table table-zebra mt-2">
        {/* head */}
        <thead>
          <tr>
            {manualEntry && <th></th>}
            <th>Date</th>
            <th>Employer</th>
            <th>Rate</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Hours Worked</th>
            <th>Notes</th>
            <th>Income Earned</th>
            <th>Status</th>
            {pathname === '/tracker' && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {sortedWorkHistory()?.map((work) => (
            <tr key={work?.startTime?.toMillis()}>
              {manualEntry && work.status === 'unpaid' ? (
                <th>
                  <input
                    onChange={(e) => {
                      if (e.target.checked) {
                        setState((prev) => ({
                          ...prev,
                          invoiceEvents: [...prev.invoiceEvents, work],
                        }))
                      } else {
                        setState((prev) => ({
                          ...prev,
                          invoiceEvents: prev.invoiceEvents.filter(
                            (event) => event != work,
                          ),
                        }))
                      }
                    }}
                    type="checkbox"
                    className="checkbox"
                  />
                </th>
              ) : manualEntry ? (
                <th></th>
              ) : (
                <></>
              )}
              <td>{work?.startTime?.toDate()?.toLocaleDateString()}</td>
              <td>{work?.employer?.name}</td>
              <td>${work?.rate} / hr</td>
              <td>{work?.startTime?.toDate()?.toLocaleTimeString()}</td>
              <td>{work?.endTime?.toDate()?.toLocaleTimeString()}</td>
              <td>
                {(
                  (work?.endTime?.toDate() - work?.startTime?.toDate()) /
                  3600 /
                  1000
                ).toFixed(3)}{' '}
              </td>
              <td className="scrollbar-hide overflow-x-scroll max-w-40">
                <p className="line-clamp-1 hover:line-clamp-none">
                  {work.note}
                </p>
              </td>
              <td className="text-accent font-semibold">
                ${' '}
                {calculateIncome(
                  calculateElapsedTime(
                    work?.startTime?.toDate(),
                    work?.endTime?.toDate(),
                  ).totalSeconds,
                  work.rate,
                )}
              </td>
              <td
                className={`${
                  work?.status === 'unpaid'
                    ? 'text-error'
                    : work?.status === 'invoiced'
                      ? 'text-warning'
                      : work?.status === 'paid'
                        ? 'text-success'
                        : ''
                }`}
              >
                {work?.status}
              </td>
              {pathname === '/tracker' && (
                <td>
                  <div
                    className="flex items-center justify-center hover:bg-error hover:text-base-100 rounded-md w-5 h-5 -mr-2 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation()
                      console.log('delete work event')
                      deleteWorkEventFromWorkHistory(state.user.uid, work)
                    }}
                  >
                    <FaTrashAlt />
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default WorkHistory
