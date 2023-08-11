import { useState } from 'react';
import defaultUser from '../static/img/defaultUser.svg';
import { Image } from 'primereact/image';
import { Card } from 'primereact/card';

interface userPorfile {
  profileName: string | null;
  saveName: string | null;
  profileImage: string | null;
}

const SelectProfile = () => {
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
            width="100"
          />
        </div>
        <div className="p-3">
          <h1>{Profile.profileName ? Profile.profileName : 'Not found'}</h1>
          <h3>{Profile.saveName ? Profile.saveName : 'Not found'}</h3>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Card className="flex p-3 justify-center" title="Select your profile">
        {Profile ? renderProfile() : <></>}
      </Card>
    </div>
  );
};

export default SelectProfile;
