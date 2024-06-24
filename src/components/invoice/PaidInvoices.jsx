import React from 'react'
import { MdFileDownload } from 'react-icons/md'

const invoices = [
  {
    invoice_number: '',
    date: '',
    bill_to: '',
    total_amount: '',
    file_url: '',
    status: 'paid',
  },
]
const PaidInvoices = () => {
  return (
    <div className="flex flex-col w-full bg-base-100 h-96 rounded-lg p-6">
      <div className="flex flex-row w-full justify-between">
        <h2 className="text-lg font-semibold text-accent">Paid Invoices</h2>
        <summary className="btn">Sort By</summary>
      </div>
      <table className="table table-zebra mt-2">
        {/* head */}
        <thead>
          <tr>
            <th>Invoice #</th>
            <th>Date</th>
            <th>Bill To</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>File Download</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <td>4323</td>
            <td>05/20/2024</td>
            <td>BitBasel</td>
            <td>$1079.00</td>
            <td className='text-accent'>Paid</td>
            <td>
              <p className="btn btn-ghost">
                <MdFileDownload className="text-lg" />
                Download
              </p>
            </td>
            <td className="scrollbar-hide overflow-x-scroll max-w-40">...</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default PaidInvoices
