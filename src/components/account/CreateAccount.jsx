'use client'

import React, { useEffect, useState } from 'react'
import { useAppContext } from '@/context'
import { signUpWithEmailAndPassword } from '@/services/auth'
import { usePathname } from 'next/navigation'

const CreateAccount = () => {
  const { state, setState } = useAppContext()
  const { user } = state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const pathname = usePathname()

  useEffect(() => {
    if (!user && pathname != '/') {
      document.getElementById('sign_up').showModal()
    } else if (user) {
      document.getElementById('sign_up').close()
    }
  }, [user])

  function validate() {
    setErrorMessage('')
    console.log('length', email.length)
    if (email.length <= 0) {
      setErrorMessage('Please enter an email address.')
      return false
    }

    const validEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(
      email,
    )

    if (!validEmail) {
      setErrorMessage('Invalid email address format.')
      return false
    }

    if (password != confirmPassword) {
      setErrorMessage('Passwords do not match.')
      return false
    }
    // Check if the password has at least 8 characters
    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters.')
      return false
    }

    // Regular expressions to check for upper and lower case letters, numbers, and symbols
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSymbol = /[\W_]/.test(password) // This checks for any non-word character and underscore

    // Return true only if all conditions are met
    if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSymbol) {
      setErrorMessage(
        'Password must contain upper case letters, lower case letters, numbers, and special characters.',
      )
      return false
    }

    return true
  }

  const createAccount = async () => {
    const isValidEmailAndPassword = validate()
    if (isValidEmailAndPassword) {
      const response = await signUpWithEmailAndPassword(email, password)
      if (response.isError) {
        setErrorMessage(response.error)
        resetForm()
        return
      } else if (!response.isError) {
        console.log('sign up successful!')
        document.getElementById('sign_up').close()
        resetForm()
        return
      } else {
        setErrorMessage('Unknown error.')
        resetForm()
        return
      }
    }
  }

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setErrorMessage('')
  }

  return (
    <dialog id="sign_up" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Create Account</h3>
        {errorMessage && (
          <p className="text-error mt-2 border rounded-lg border-error p-2 text-sm">
            Error: {errorMessage}
          </p>
        )}
        <div className="flex flex-col gap-4 my-6">
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="•••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {password && (
            <>
              <p className="-mb-4 text-sm">Confirm Your Password:</p>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  className="grow"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </label>
            </>
          )}
          <button className="btn btn-secondary" onClick={() => createAccount()}>
            Create Account
          </button>
        </div>
        <p className="text-center">
          Already have an account?{' '}
          <span
            className="hover:underline cursor-pointer"
            onClick={() => {
              document.getElementById('log_in').showModal()
              document.getElementById('sign_up').close()
            }}
          >
            Sign In
          </span>
        </p>
      </div>
    </dialog>
  )
}

export default CreateAccount
