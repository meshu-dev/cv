import { Icon } from '@iconify-icon/react'
import { ProfileSite } from '@/types'

type Props = {
  profileSite: ProfileSite
}

const ProfileIconView = ({ profileSite }: Props) => {
  return (
    <a href={profileSite.url} target="_blank" title={profileSite.name}>
      <Icon icon={profileSite.icon}  width="25" height="25" />
    </a>
  )
}

export default ProfileIconView
