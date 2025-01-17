import { User } from '@/types/Authstate'
import React from 'react'


interface ProfileInfoProps {
  user: User
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ user }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoItem label="Roles" value={user.roles.join(", ")} />
        <InfoItem label="Account Status" value={user.isActive ? "Active" : "Inactive"} />
        <InfoItem label="Verified" value={user.isVerified ? "Yes" : "No"} />
        <InfoItem label="Last Login" value={new Date(user.lastLogin).toLocaleString()} />
        <InfoItem label="Account Created" value={new Date(user.createdAt).toLocaleDateString()} />
        <InfoItem label="Last Updated" value={new Date(user.updatedAt).toLocaleDateString()} />
      </div>
    </div>
  )
}

const InfoItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-sm font-medium text-muted-foreground">{label}</span>
    <span className="text-sm">{value}</span>
  </div>
)

