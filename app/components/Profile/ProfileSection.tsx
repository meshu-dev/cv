import ProfileIconView from './ProfileIconView'
import { Profile } from '@/types'

type Props = {
  profile: Profile
}

const ProfileSection = ({ profile }: Props) => {
  if (!profile) {
    return null
  }

  const iconElements: React.ReactElement[] = []

  if (profile.sites) {
    for (const site of profile.sites) {
      console.log('profile.sites', profile.sites)
      iconElements.push(
        <ProfileIconView key={site.name} profileSite={site} />
      );
    }
  }

  return (
    <section id="profile">
      <div id="profile-info">
        <h1>{profile.details.fullname}</h1>
        <p>{profile.details.intro}</p>
        <p><span>Location:&nbsp;</span>{profile.details.location}</p>
        <div id="profile-links">
          {iconElements}
        </div>
      </div>
    </section>
  );
};

export default ProfileSection
