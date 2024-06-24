import { deleteWorkEventFromWorkHistory } from '@/services/firestore'
import React from 'react'

const DeleteWorkEvent = ({ uid, deleteWork, setDeleteWork }) => {
  console.log('work to be deleted:', deleteWork)
  return (
    <dialog
      id="confirm_delete_work_event"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <h3 className="font-semibold text-xl text-error">Confirm Delete</h3>
        <p className="py-4 mt-2">
          Are you sure you want to delete this work event?
        </p>

        <div className="modal-action">
          <button
            onClick={async () => {
              await deleteWorkEventFromWorkHistory(uid, deleteWork)
              setDeleteWork(null)
              document.getElementById('confirm_delete_work_event').close()
            }}
            className="btn btn-error mr-2"
          >
            Delete
          </button>
          <button
            className="btn"
            onClick={() => {
              setDeleteWork({})
              document.getElementById('confirm_delete_work_event').close()
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default DeleteWorkEvent
