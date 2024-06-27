import { ProfilePicture } from '@/components/settings/ProfilePicture'
import UserName from '@/components/settings/UserName'
import React from 'react'

const Settings = () => {
  return (
    <div className="flex gap-4 max-w-screen-xl min-h-screen py-8 px-4 flex-col mx-auto relative">
      <div className="flex flex-col sm:flex-row gap-8">
        <ProfilePicture />
        <UserName />
      </div>
    </div>
  )
}

export default Settings
