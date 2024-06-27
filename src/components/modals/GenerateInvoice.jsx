'use client'

import React, { useState, useEffect } from 'react'
import { generateNewInvoice } from '@/services/invoice'
import { useAppContext } from '@/context'
import { calculateElapsedTime } from '@/utils'

const GenerateInvoice = () => {
  const { state } = useAppContext()
  const { invoiceEvents } = state
  const [lineItems, setLineItems] = useState([])
  const [invoiceData, setInvoiceData] = useState({
    from: 'Sender Company Name',
    to: 'Recipient Company Name',
    logo: 'https://your-logo-url.com',
    currency: 'USD',
    number: 'INV-0001',
    date: '2024-06-19',
    payment_terms: 'Net 30',
    items: [
      {
        name: 'Product 1',
        quantity: 2,
        unit_cost: 50.0,
      },
    ],
    notes: 'Thank you for your business!',
  })
  const [requiredFields, setRequiredFields] = useState({
    from_name: '',
    from_address_line_one: '',
    from_address_line_two: '',
    bill_to_name: '',
    bill_to_address_line_one: '',
    bill_to_address_line_two: '',
  })

  const [optionalFields, setOptionalFields] = useState({
    invoice_number: {
      enabled: false,
      value: '',
    },
    due_date: {
      enabled: false,
      value: '',
    },
    tax: {
      enabled: false,
      value: '',
    },
    notes: {
      enabled: false,
      value: '',
    },
    terms_conditions: {
      enabled: false,
      value: '',
    },
  })

  useEffect(() => {
    console.log('Invoice Events: ', invoiceEvents)
    let items = []
    invoiceEvents.forEach((event) => {
      const { note, startTime, endTime, rate } = event
      items.push({
        name: note,
        quantity: (
          calculateElapsedTime(startTime.toDate(), endTime.toDate())
            .totalSeconds / 3600
        ).toFixed(2),
        unit_cost: rate,
      })
    })
    console.log('line items: ', items)
    setLineItems(items)
  }, [invoiceEvents])

  function handleToggle(event) {
    setOptionalFields((prev) => ({
      ...prev,
      [event.target.name]: {
        ...prev[event.target.name],
        enabled: !prev[event.target.name].enabled,
      },
    }))
  }

  function handleInput(event, type) {
    if (type === 'required') {
      setRequiredFields((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }))
    } else if (type === 'optional') {
      setOptionalFields((prev) => ({
        ...prev,
        [event.target.name]: {
          ...prev[event.target.name],
          value: event.target.value,
        },
      }))
    }
  }

  function handleSubmit() {
    console.log('Required:', requiredFields)
    console.log('Optional:', optionalFields)
    //console.log('Invoice Data:', invoiceData)
    setInvoiceData({
      from: `${requiredFields?.from_name}\n${requiredFields?.from_address_line_one}\n${requiredFields?.from_address_line_two}`,
      to: `${requiredFields?.bill_to_name}\n${requiredFields?.bill_to_address_line_one}\n${requiredFields?.bill_to_address_line_two}`,
      currency: 'usd',
      number: `${optionalFields?.invoice_number?.value}` || null,
      date: new Date().toLocaleDateString(),
      due_date:
        new Date(optionalFields?.due_date?.value)?.toLocaleDateString() || null,
      items: lineItems,
      fields: {
        tax: '%',
      },
      tax: optionalFields?.tax?.value || null,
      notes: optionalFields?.notes?.value || null,
      terms_conditions: optionalFields?.terms_conditions?.value || null,
    })
    console.log('Invoice Data:', invoiceData)
  }

  return (
    <dialog id="generate_invoice" className="modal">
      <form
        onSubmit={() => {
          handleSubmit()
          console.log('Required Fields:', requiredFields)
          console.log('Optional Fields:', optionalFields)
        }}
        className="modal-box lg:min-w-[900px]"
      >
        <h3 className="font-bold text-lg text-primary">Add Invoice Details</h3>
        <div className="flex flex-col lg:flex-row items-start gap-4 w-full my-4">
          <div className="flex flex-col w-full bg-base-300 rounded-lg p-4">
            <h2 className="font-semibold mb-4">Required Fields</h2>
            <div className="p-2 flex flex-col gap-1">
              <span className="label-text">From</span>
              <div className="flex flex-col gap-2">
                <input
                  required
                  type="text"
                  name="from_name"
                  placeholder="Your Name or Business Name"
                  className="input input-bordered w-full bg-base-300"
                  onChange={(e) => handleInput(e, 'required')}
                />
                <input
                  required
                  type="text"
                  name="from_address_line_one"
                  placeholder="Street Address"
                  className="input input-bordered w-full bg-base-300"
                  onChange={(e) => handleInput(e, 'required')}
                />
                <input
                  required
                  type="text"
                  name="from_address_line_two"
                  placeholder="City, State, Zip Code"
                  className="input input-bordered w-full bg-base-300"
                  onChange={(e) => handleInput(e, 'required')}
                />
              </div>
            </div>
            <div className="p-2 flex flex-col gap-1 mt-4">
              <span className="label-text">Bill to</span>
              <div className="flex flex-col gap-2">
                <input
                  required
                  type="text"
                  name="bill_to_name"
                  placeholder="Company Name"
                  className="input input-bordered w-full bg-base-300"
                  onChange={(e) => handleInput(e, 'required')}
                />
                <input
                  required
                  type="text"
                  name="bill_to_address_line_one"
                  placeholder="Street Address"
                  className="input input-bordered w-full bg-base-300"
                  onChange={(e) => handleInput(e, 'required')}
                />
                <input
                  required
                  type="text"
                  name="bill_to_address_line_two"
                  placeholder="City, State, Zip Code"
                  className="input input-bordered w-full bg-base-300"
                  onChange={(e) => handleInput(e, 'required')}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full bg-base-300 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Optional Fields</h3>
            <div className="p-2 flex flex-col gap-1">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Invoice #</span>
                  <input
                    type="checkbox"
                    name="invoice_number"
                    className="toggle toggle-xs"
                    checked={optionalFields?.invoice_number?.enabled}
                    onChange={(e) => handleToggle(e)}
                  />
                </label>
                {optionalFields?.invoice_number?.enabled && (
                  <input
                    type="text"
                    name="invoice_number"
                    className="input input-bordered w-full bg-base-300"
                    onChange={(e) => handleInput(e, 'optional')}
                  />
                )}
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Due Date</span>
                  <input
                    type="checkbox"
                    name="due_date"
                    className="toggle toggle-xs"
                    checked={optionalFields?.due_date?.enabled}
                    onChange={(e) => handleToggle(e)}
                  />
                </label>
                {optionalFields?.due_date?.enabled && (
                  <input
                    type="date"
                    name="due_date"
                    className="input input-bordered w-full bg-base-300"
                    onChange={(e) => handleInput(e, 'optional')}
                  />
                )}
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Tax %</span>
                  <input
                    type="checkbox"
                    name="tax"
                    className="toggle toggle-xs"
                    checked={optionalFields?.tax?.enabled}
                    onChange={(e) => handleToggle(e)}
                  />
                </label>
                {optionalFields?.tax?.enabled && (
                  <input
                    type="number"
                    name="tax"
                    className="input input-bordered w-full bg-base-300"
                    onChange={(e) => handleInput(e, 'optional')}
                  />
                )}
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Notes</span>
                  <input
                    type="checkbox"
                    name="notes"
                    className="toggle toggle-xs"
                    checked={optionalFields?.notes?.enabled}
                    onChange={(e) => handleToggle(e)}
                  />
                </label>
                {optionalFields?.notes?.enabled && (
                  <textarea
                    type="number"
                    name="notes"
                    className="textarea textarea-bordered w-full bg-base-300"
                    onChange={(e) => handleInput(e, 'optional')}
                  ></textarea>
                )}
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Terms & Conditions</span>
                  <input
                    type="checkbox"
                    name="terms_conditions"
                    className="toggle toggle-xs"
                    checked={optionalFields?.terms_conditions?.enabled}
                    onChange={(e) => handleToggle(e)}
                  />
                </label>
                {optionalFields?.terms_conditions?.enabled && (
                  <textarea
                    type="number"
                    name="terms_conditions"
                    className="textarea textarea-bordered w-full bg-base-300"
                    onChange={(e) => handleInput(e, 'optional')}
                  ></textarea>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="ms-auto flex flex-row items-center gap-4 w-fit">
          <button type="submit" className="btn btn-accent">
            Generate Invoice
          </button>
          <button
            onClick={() => document.getElementById('generate_invoice').close()}
            className="btn btn-base-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  )
}

export default GenerateInvoice
