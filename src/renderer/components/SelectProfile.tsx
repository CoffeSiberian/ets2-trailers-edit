import { useState } from 'react';
import defaultUser from '../static/img/defaultUser.svg';
import { Image } from 'primereact/image';
import { useDarkMode } from '../hooks/DarkModeContex';
import ListProfiles from './ListProfiles';
import { Typography } from '@mui/material';

interface userPorfile {
  profileName: string | null;
  saveName: string | null;
  profileImage: string | null;
}

const SelectProfile = () => {
  const { themeTatailwind } = useDarkMode();

  const [Profile, setProfile] = useState<userPorfile>({
    profileName: null,
    saveName: null,
    profileImage: null,
  });

  const renderProfile = () => {
    return (
      <div className="flex flex-row p-3">
        <div className="p-3">
          <Image
            src={Profile.profileImage ? Profile.profileImage : defaultUser}
            alt={Profile.profileName ? Profile.profileName : 'Not found'}
            width="70"
          />
        </div>
        <div className="p-3">
          <Typography
            className="flex justify-center"
            color={themeTatailwind.primary.color}
          >
            {Profile.profileName ? Profile.profileName : 'Not found'}
          </Typography>
          <Typography
            className="flex justify-center"
            color={themeTatailwind.primary.color}
          >
            {Profile.saveName ? Profile.saveName : 'Not found'}
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
        {Profile ? renderProfile() : <></>}
        <ListProfiles />
      </div>
    </div>
  );
};

export default SelectProfile;
