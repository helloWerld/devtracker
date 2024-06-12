import React, { useState } from 'react'
import { useAppContext } from '@/context'
import { addEmployerToEmployersList } from '@/services/firestore'

const NewEmployerModal = ({ step }) => {
  const { state, setState } = useAppContext()
  const { user } = state
  const [newEmployer, setNewEmployer] = useState({
    id: '',
    name: '',
    defaultRate: 0,
  })
  return (
    <dialog id="add_employer" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-semibold text-xl text-primary">
          Add a New Employer
        </h3>

        <p className="py-4 mt-2">Employer Name:</p>
        <input
          type="text"
          className="input input-bordered w-full"
          value={newEmployer?.name}
          onChange={(e) =>
            setNewEmployer((prev) => ({
              ...prev,
              name: e.target.value,
              id: new Date().toISOString(),
            }))
          }
        />
        <p className="py-4 mt-2">Default Pay Rate:</p>
        <label className="input input-bordered flex gap-1 items-center w-fit">
          $
          <input
            type="number"
            disabled={step > 3}
            className="w-20"
            placeholder="--"
            value={newEmployer?.defaultRate?.toFixed(0)}
            onChange={(e) =>
              setNewEmployer((prev) => ({
                ...prev,
                defaultRate: Number(e.target.value),
              }))
            }
          />
          / hour
        </label>
        <div className="modal-action">
          {/* if there is a button in form, it will close the modal */}
          <button
            disabled={
              newEmployer?.name?.length === 0 || newEmployer?.defaultRate <= 0
            }
            onClick={() => {
              addEmployerToEmployersList(user.uid, newEmployer)
              setState((prev) => ({
                ...prev,
                employer: newEmployer,
                rate: newEmployer?.defaultRate,
              }))
              setNewEmployer({
                id: '',
                name: '',
                defaultRate: 0,
              })
              document.getElementById('add_employer').close()
              document
                .getElementById('new_employer_dropdown')
                .removeAttribute('open')
            }}
            className="btn btn-success mr-2"
          >
            Save
          </button>
          <button
            className="btn"
            onClick={() => {
              setNewEmployer({ id: '', name: '', defaultRate: 0 })
              document.getElementById('add_employer').close()
            }}
          >
            Discard
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default NewEmployerModal
