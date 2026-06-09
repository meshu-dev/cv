import { Icon } from '@iconify-icon/react'
import { ProfileSite } from '@/types'

type Props = {
  profileSite: ProfileSite
}

const ProfileIconView = ({ profileSite }: Props) => {
  return (
    <a
      href={profileSite.url}
      target="_blank"
      rel="noopener noreferrer"
      title={profileSite.name}
      aria-label={profileSite.name}
    >
      <Icon icon={profileSite.icon} width="25" height="25" aria-hidden="true" />
    </a>
  )
}

export default ProfileIconView
