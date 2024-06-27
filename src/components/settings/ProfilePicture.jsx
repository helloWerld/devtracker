'use client'

import React from 'react'
import { useAppContext } from '@/context'
import { MdEdit } from 'react-icons/md'

export const ProfilePicture = () => {
  const { state } = useAppContext()
  const { user, userData } = state
  return (
    <div className="flex flex-col w-fit gap-2">
      <div className="avatar">
        <div className="w-60 rounded">
          <img
            src={
              userData?.photoURL ||
              user?.photoURL ||
              'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
            }
          />
        </div>
      </div>
      <label className="btn btn-ghost" htmlFor="profile_picture_input">
        <MdEdit />
        Edit Profile Image
      </label>
      <input type="file" id="profile_picture_input" className="hidden" />
    </div>
  )
}
