'use client'

import NewInvoice from '@/components/invoice/NewInvoice'
import Outstanding from '@/components/invoice/Outstanding'
import WorkHistory from '@/components/tracker/WorkHistory'
import React, { useState } from 'react'

const Invoice = () => {
  const [selection, setSelection] = useState('')
  return (
    <div className="flex gap-6 max-w-screen-2xl min-h-screen pt-8 flex-col mx-auto relative">
      <Outstanding />
      <div className="join join-vertical lg:join-horizontal mx-auto">
        <button
          className={`${selection === 'new' && 'btn-accent'} btn join-item active`}
          onClick={() => setSelection('new')}
        >
          New Invoice
        </button>
        <button
          className={`${selection === 'pending' && 'btn-accent'} btn join-item active`}
          onClick={() => setSelection('pending')}
        >
          View Pending
        </button>
        <button
          className={`${selection === 'paid' && 'btn-accent'} btn join-item active`}
          onClick={() => setSelection('paid')}
        >
          View Paid
        </button>
      </div>
      {selection === 'new' && <NewInvoice />}
      <WorkHistory />
    </div>
  )
}

export default Invoice
