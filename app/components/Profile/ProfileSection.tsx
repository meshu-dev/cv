import ProfileIconView from './ProfileIconView'
import { Profile } from '@/types'

type Props = {
  profile: Profile
}

const ProfileSection = ({ profile }: Props) => {
  if (!profile) {
    return null
  }

  return (
    <section id="profile">
      <div id="profile-info">
        <h1>{profile.fullname}</h1>
        <p>{profile.intro}</p>
        <p><span>Location:&nbsp;</span>{profile.location}</p>
        <div id="profile-links">
          {profile.sites?.map((site) => (
            <ProfileIconView key={site.name} profileSite={site} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProfileSection
