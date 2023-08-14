import { useState } from 'react';
import defaultUser from '../static/img/defaultUser.svg';
import { Image } from 'primereact/image';
import { useDarkMode } from '../hooks/DarkModeContex';
import ListProfiles from './ListProfiles';
import { Typography } from '@mui/material';
import { Profile } from 'renderer/types/SaveGameTypes';

interface renderProfile {
  profile: Profile;
}

const SelectProfile = () => {
  const { themeTatailwind } = useDarkMode();

  const [Profile, setProfile] = useState<renderProfile | null>(null);

  const renderProfile = (userProfile: renderProfile) => {
    return (
      <div className="flex flex-row p-3">
        <div className="p-3">
          <Image
            src={
              userProfile.profile.avatar
                ? `data:image/png;base64, ${userProfile.profile.avatar}`
                : defaultUser
            }
            alt={
              userProfile.profile.name ? userProfile.profile.name : 'Not found'
            }
            width="70"
          />
        </div>
        <div className="flex p-3 items-center align-items-center">
          <Typography color={themeTatailwind.primary.color} variant="h5">
            {userProfile.profile.name ? userProfile.profile.name : 'Not found'}
          </Typography>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col-reverse w-full items-center">
      <div
        className={`flex flex-col ${themeTatailwind.secondary.main} max-w-lg w-full items-center rounded-lg border-2 border-transparent ${themeTatailwind.primary.border_color} shadow-2xl gap-3 m-4 p-4`}
      >
        <Typography
          variant="h5"
          className="flex justify-center"
          color={themeTatailwind.primary.color}
        >
          Select Profile
        </Typography>
        {Profile ? renderProfile(Profile) : <></>}
        <ListProfiles setProfile={setProfile} />
      </div>
    </div>
  );
};

export default SelectProfile;
