import { saveWorkEventToWorkHistory } from "@/services/firestore";
import React, { useState, useEffect } from "react";
import { useAppContext } from "../../../context";

const ManualEntry = () => {
  const { state } = useAppContext();
  const { user, userData } = state;
  const [workEvent, setWorkEvent] = useState({
    employer: {
      id: Date.now(),
      name: "",
      defaultRate: 0,
    },
    rate: 0,
    startTime: new Date(),
    endTime: new Date(),
    note: "",
    status: "unpaid",
  });

  const save = async () => {
    console.log("work history", workEvent);
    try {
      const response = await saveWorkEventToWorkHistory(user.uid, workEvent);
      if (response.isError) {
        console.log("Error:", response.error);
      } else {
        document.getElementById("kaching").play();
        document.getElementById("manual_entry").close();
      }
    } catch (error) {
      console.log("Error saving work event!", error);
    }
    //reset();
  };

  const handleChange = (selection, value) => {
    console.log("handle change", selection, value);
    if (selection === "startTime" || selection === "endTime") {
      setWorkEvent((prev) => ({ ...prev, [selection]: new Date(value) }));
    } else {
      setWorkEvent((prev) => ({ ...prev, [selection]: value }));
    }
  };

  const formatDateToLocal = (date) => {
    const offset = date.getTimezoneOffset();
    return new Date(date.getTime() - offset * 60 * 1000)
      .toISOString()
      .slice(0, 16);
  };

  const parseDateFromInput = (dateString) => new Date(dateString);

  return (
    <dialog id="manual_entry" className="modal  modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-primary">
          Manually Enter a Work Event
        </h3>
        <p className="mt-4 mb-1">Choose Employer</p>
        <details id="manual_entry_choose_employer" className="dropdown">
          <summary className="btn">
            {workEvent?.employer?.name || "Click Here To Select"}
          </summary>
          <ul className="shadow menu dropdown-content z-[1] bg-base-300 rounded-box w-52 mt-2">
            {userData?.employersList?.map((employer) => (
              <li
                onClick={() => {
                  handleChange("employer", employer);
                  handleChange("rate", employer?.defaultRate);
                  document
                    .getElementById("manual_entry_choose_employer")
                    .removeAttribute("open");
                }}
                key={employer?.name}
                className="cursor-pointer hover:bg-base-100 rounded-lg p-2"
              >
                {employer?.name}
              </li>
            ))}
          </ul>
        </details>
        <p className="mt-4 mb-1">Set Pay Rate</p>
        <label className="input input-bordered max-w-52 flex items-center gap-2">
          $
          <input
            type="number"
            className="w-40"
            value={workEvent?.rate}
            onChange={(e) => handleChange("rate", e.target.value)}
          />
        </label>
        <p className="mt-4 mb-1">Start Time</p>
        <input
          type="datetime-local"
          className="input input-bordered w-full max-w-xs"
          value={
            workEvent?.startTime ? formatDateToLocal(workEvent.startTime) : ""
          }
          onChange={(e) =>
            handleChange("startTime", parseDateFromInput(e.target.value))
          }
        />
        <p className="mt-4 mb-1">End Time</p>
        <input
          type="datetime-local"
          className="input input-bordered w-full max-w-xs"
          value={workEvent?.endTime ? formatDateToLocal(workEvent.endTime) : ""}
          onChange={(e) =>
            handleChange("endTime", parseDateFromInput(e.target.value))
          }
        />
        <p className="mt-4 mb-1">Note</p>
        <textarea
          className="textarea textarea-bordered w-full"
          maxLength="100"
          value={workEvent?.note}
          onChange={(e) => handleChange("note", e.target.value)}
        ></textarea>

        <div className="modal-action">
          <button onClick={save} className="btn btn-success">
            Save
          </button>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Discard</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ManualEntry;
