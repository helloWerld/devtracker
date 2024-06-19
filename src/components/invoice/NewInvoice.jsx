'use client'

import React, { useState, useEffect } from 'react'
import { MdOutlineCheckBox, MdOutlineWorkOutline } from 'react-icons/md'
import { RxReset } from 'react-icons/rx'
import { useAppContext } from '@/context'
import { calculateElapsedTime, calculateIncome } from '@/utils'
import GenerateInvoice from '../tracker/modals/GenerateInvoice'

const NewInvoice = () => {
  const { state, setState } = useAppContext()
  const { invoiceEvents, userData } = state
  const [invoiceHours, setInvoiceHours] = useState(0)
  const [invoiceIncome, setInvoiceIncome] = useState(0)

  useEffect(() => {
    setState((prev) => ({ ...prev, invoiceEvents: [], manualEntry: false }))
  }, [])

  useEffect(() => {
    if (invoiceEvents.length > 0) {
      let hours = 0
      let income = 0
      invoiceEvents.forEach((event) => {
        hours += Number(
          (event?.endTime?.toDate() - event?.startTime?.toDate()) / 3600000,
        )
        income += Number(
          calculateIncome(
            calculateElapsedTime(
              event?.startTime?.toDate(),
              event?.endTime?.toDate(),
            ).totalSeconds,
            event.rate,
          ),
        )
      })
      setInvoiceHours(hours.toFixed(2))
      setInvoiceIncome(income.toFixed(2))
    } else {
      setInvoiceHours(0)
      setInvoiceIncome(0)
    }
  }, [invoiceEvents])

  function filterUnpaidWorkEventsByEmployer(employer) {
    const filteredEmployers = userData.workHistory.filter(
      (event) => event.employer.name === employer && event.status === 'unpaid',
    )
    setState((prev) => ({
      ...prev,
      invoiceEvents: filteredEmployers,
      manualEntry: false,
    }))
  }

  return (
    <div className="flex flex-row flex-nowrap gap-4">
      <div className="flex flex-col w-fit rounded-lg bg-base-100 h-fit p-6">
        <div className="flex flex-row items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Generate a New Invoice</h2>
          <div className="tooltip cursor-pointer" data-tip="Reset Invoice">
            <RxReset
              onClick={() =>
                setState((prev) => ({
                  ...prev,
                  invoiceEvents: [],
                }))
              }
              className="text-lg active:scale-90"
            />
          </div>
        </div>
        <div className="flex flex-row items-center gap-4">
          <details id="employer_list" className="dropdown">
            <summary className="btn">
              <MdOutlineWorkOutline className="text-lg" />
              By Employer
            </summary>
            <ul className="p-2 shadow menu dropdown-content z-[20] bg-base-300 rounded-box w-52 mt-2">
              {userData?.employersList?.map((employer) => (
                <li
                  onClick={() => {
                    filterUnpaidWorkEventsByEmployer(employer.name)
                    document
                      .getElementById('employer_list')
                      .removeAttribute('open')
                  }}
                >
                  <a>{employer?.name}</a>
                </li>
              ))}
            </ul>
          </details>
          <button
            onClick={() =>
              setState((prev) => ({
                ...prev,
                invoiceEvents: [],
                manualEntry: true,
              }))
            }
            className="btn"
          >
            <MdOutlineCheckBox className="text-lg" />
            Manual Selection
          </button>
        </div>
        {invoiceEvents.length > 0 && (
          <>
            <div className="divider"></div>
            <button
              onClick={() =>
                document.getElementById('generate_invoice').showModal()
              }
              className="btn btn-accent w-full"
            >
              Generate Invoice
            </button>
            <GenerateInvoice />
          </>
        )}
      </div>
      {invoiceEvents.length > 0 && (
        <div className="flex flex-col grow rounded-lg bg-base-100 p-6">
          <h3 className="font-semibold">Included In This Invoice</h3>
          <div className="overflow-x-auto mt-4 mb-6">
            <table className="table table-xs">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Employer</th>
                  <th>Rate</th>
                  <th>Hours Worked</th>
                  <th>Income Earned</th>
                  <th>Notes</th>
                  <th>Status</th>
                </tr>
              </thead>
              {invoiceEvents.map((event) => (
                <tbody>
                  <tr key={event?.startTime?.toMillis()}>
                    <td>{event?.startTime?.toDate()?.toLocaleDateString()}</td>
                    <td>{event?.employer?.name}</td>
                    <td>${event?.rate} / hr</td>
                    <td>
                      {' '}
                      {(
                        (event?.endTime?.toDate() -
                          event?.startTime?.toDate()) /
                        3600 /
                        1000
                      ).toFixed(3)}{' '}
                    </td>
                    <td>
                      {' '}
                      ${' '}
                      {calculateIncome(
                        calculateElapsedTime(
                          event?.startTime?.toDate(),
                          event?.endTime?.toDate(),
                        ).totalSeconds,
                        event.rate,
                      )}
                    </td>
                    <td>
                      <p className="max-w-40 line-clamp-1">{event?.note}</p>
                    </td>
                    <td
                      className={`${
                        event?.status === 'unpaid'
                          ? 'text-error'
                          : event?.status === 'invoiced'
                            ? 'text-warning'
                            : event?.status === 'paid'
                              ? 'text-success'
                              : ''
                      }`}
                    >
                      {event?.status}
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
          <div className="stats bg-base-300 w-fit ms-auto mt-auto p-0">
            <div className="stat px-10 flex flex-row items-center">
              <div className="stat-title">Invoice Hours</div>
              <div className="stat-value text-xl">{invoiceHours}</div>
            </div>
            <div className="stat px-10 flex flex-row items-center">
              <div className="stat-title">Invoice Income</div>
              <div className="stat-value text-xl">${invoiceIncome}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NewInvoice
