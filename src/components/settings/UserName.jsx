'use client'

import React from 'react'
import { useAppContext } from '@/context'

const UserName = () => {
  const { state } = useAppContext()
  const { user, userData } = state
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-6xl font-bold">
        {userData?.settings?.username || 'Username'}
      </h2>
      <h3 className="text-lg font-thin">{user?.email}</h3>
      <div className="flex flex-col mt-2">
        <p>
          Account Created:{' '}
          {new Date(
            Number(user?.reloadUserInfo?.createdAt),
          ).toLocaleDateString()}
        </p>
        <p>
          Last Login:{' '}
          {new Date(
            Number(user?.reloadUserInfo?.lastLoginAt),
          )?.toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}

export default UserName

// user.reloadUserInfo.createdAt lastLoginAt
