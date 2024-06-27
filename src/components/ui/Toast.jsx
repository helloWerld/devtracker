'use client'

import React, { useEffect } from 'react'
import { useAppContext } from '@/context'
import { MdClose } from 'react-icons/md'

const Toast = () => {
  const { state, setState } = useAppContext()
  const { toasts } = state

  // const toasts = [
  //   {
  //     id: Date.now(),
  //     message: 'This is the message.',
  //     style: 'info',
  //     autoclose: true,
  //   },
  // ]

  useEffect(() => {
    if (toasts.filter((toast) => toast.autoclose === true).length > 0) {
      const toastFilter = setTimeout(() => {
        setState((prev) => ({
          ...prev,
          toasts: toasts.filter((toast) => toast.autoclose === false),
        }))
      }, 5000)
      return () => clearTimeout(toastFilter)
    }
  }, [toasts])

  function closeToast(id) {
    setState((prev) => ({
      ...prev,
      toasts: toasts.filter((toast) => toast.id != id),
    }))
  }

  return (
    <div className="toast toast-bottom toast-end">
      {toasts.map((toast) => (
        <div id={toast?.id} className={`alert alert-${toast?.style} relative`}>
          {!toast.autoclose && (
            <button
              onClick={() => closeToast(toast?.id)}
              className="flex items-center justify-center rounded-full size-6 absolute -top-2 -right-2 bg-neutral-content text-neutral hover:scale-105 active:scale-100"
            >
              <MdClose />
            </button>
          )}

          <span>{toast?.message}</span>
        </div>
      ))}
    </div>
  )
}

export default Toast
