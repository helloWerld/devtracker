'use client'

import React, { useEffect } from 'react'
import { useAppContext } from '@/context'
import { auth, db } from '@/services/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import userImage from '../../../public/user.png'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logOutUser } from '@/services/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import CreateAccount from '../account/CreateAccount'
import LogIn from '../account/LogIn'
import logo from '../../../public/logo.png'

const themes = [
  'dark',
  'light',
  'bumblebee',
  'corporate',
  'synthwave',
  'cyberpunk',
  'halloween',
  'forest',
  'lofi',
  'fantasy',
  'wireframe',
  'black',
  'dracula',
  'autumn',
  'acid',
  'night',
  'coffee',
  'winter',
  'nord',
  'sunset',
]

const NavBar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { state, setState } = useAppContext()
  const { user, userData } = state

  useEffect(() => {
    // This will unsubscribe from auth changes
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setState((prev) => ({ ...prev, user: user }))
        // Listen to changes in user data
        const unsubscribeData = onSnapshot(
          doc(db, 'users', user.uid),
          (doc) => {
            if (doc.exists()) {
              setState((prev) => ({ ...prev, userData: doc.data() }))
            } else {
              // Handle the case where there is no user data document
              setState((prev) => ({ ...prev, userData: null }))
            }
          },
          (error) => {
            console.error('Error fetching user data:', error)
          },
        )

        // Clean up the data subscription when the user logs out
        return () => unsubscribeData()
      } else {
        //router.push('/')
        setState((prev) => ({
          ...prev,
          user: null,
          userData: null,
          employer: null,
          rate: null,
          startTime: null,
          endTime: null,
          note: null,
        }))
      }
    })

    // Clean up the auth subscription on component unmount
    return () => unsubscribeAuth()
  }, [auth.user])

  function closeDropdown() {
    document.getElementById('menu_dropdown')?.removeAttribute('open')
    document.getElementById('theme_controller')?.removeAttribute('open')
  }

  return (
    <div className="flex flex-row w-full items-center justify-between navbar bg-accent shadow-lg shadow-accent/20">
      <CreateAccount />
      <LogIn />
      <div className="flex flex-row w-fit">
        <Link
          href="/"
          className="flex items-center btn btn-ghost font-semibold text-xl text-base-100"
        >
          <img src={logo.src} alt="devTracker logo" className="w-10 h-10" />
          devTracker
        </Link>
        {/* <p>{pathname}</p> */}
      </div>
      <div className="flex flex-row items-center gap-1 me-2">
        <label className="swap swap-rotate me-2 text-base-100">
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" className="theme-controller" value="light" />

          {/* sun icon */}
          <svg
            className="swap-off h-8 w-8 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* moon icon */}
          <svg
            className="swap-on h-8 w-8 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
        {!user && (
          <button
            className="btn btn-base-300 text-white"
            onClick={() => document.getElementById('log_in').showModal()}
          >
            Sign In
          </button>
        )}
        {user && (
          <details id="menu_dropdown" className="dropdown dropdown-end">
            <summary className="m-1 btn btn-circle overflow-clip hover:shadow-lg hover:shadow-primary/50">
              <img
                alt="User Icon"
                src={userData?.photoURL || user?.photoURL || userImage.src}
              />
            </summary>
            <ul className="p-2 shadow-xl shadow-white/10 menu dropdown-content bg-base-100 rounded-box w-80  mt-4 border border-accent z-20">
              <p className="font-semibold my-2 bg-gradient-to-br from-primary to-accent from-10% to-90% text-transparent bg-clip-text uppercase mx-auto">
                {user?.email}
              </p>

              {pathname != '/tracker' && (
                <li onClick={() => closeDropdown()}>
                  <Link href="/tracker" className="justify-between">
                    Tracker
                  </Link>
                </li>
              )}
              {pathname != '/invoice' && (
                <li onClick={() => closeDropdown()}>
                  <Link href="/invoice" className="justify-between">
                    Generate Invoice
                    <div className="badge badge-primary">Premium</div>
                  </Link>
                </li>
              )}
              {pathname != '/settings' && (
                <li onClick={() => closeDropdown()}>
                  <Link href="/settings" className="justify-between">
                    Settings
                  </Link>
                </li>
              )}
              <li onClick={() => closeDropdown()}>
                <button onClick={() => logOutUser()}>Logout</button>
              </li>
            </ul>
          </details>
        )}
        {/* <details id="theme_controller" className="dropdown dropdown-end">
          <summary className="m-1 btn btn-ghost">
            {' '}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current text-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
          </summary>
          <ul className="p-2 mt-4 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            <p className="px-3 py-2 font-semibold text-primary">
              Theme Controller
            </p>
            {themes?.map((theme) => (
              <li key={theme}>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start capitalize"
                  aria-label={theme}
                  value={theme}
                  onClick={() => closeDropdown()}
                />
              </li>
            ))}
          </ul>
        </details> */}
      </div>
    </div>
  )
}

export default NavBar
