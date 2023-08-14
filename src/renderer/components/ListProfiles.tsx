import { useState, useEffect, useRef } from 'react';
import {
  Dropdown,
  DropdownChangeEvent,
  DropdownProps,
} from 'primereact/dropdown';
import { Profile } from 'renderer/types/SaveGameTypes';

const ListProfiles = () => {
  const loaded = useRef(false);
  const [selectedCountry, setSelectedCountry] = useState<Profile | null>(null);
  const [ProfilesList, setProfilesList] = useState<Array<Profile>>([]);

  const loadDirectory = async () => {
    const prof = await window.electron.readProfileNames.readProfileNames(
      'readProfileNames'
    );
    setProfilesList(prof);
  };

  useEffect(() => {
    if (!loaded.current) {
      loaded.current = true;
      loadDirectory();
      return;
    }
  }, []);

  const selectedCountryTemplate = (option: Profile, props: DropdownProps) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <img
            alt={option.name}
            src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
            className={`mr-2 flag flag-${option.name.toLowerCase()}`}
            style={{ width: '18px' }}
          />
          <div>{option.name}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  const countryOptionTemplate = (option: Profile) => {
    return (
      <div className="flex align-items-center">
        <img
          alt={option.name}
          src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
          className={`mr-2 flag flag-${option.name.toLowerCase()}`}
          style={{ width: '18px' }}
        />
        <div>{option.name}</div>
      </div>
    );
  };

  return (
    <div className="flex justify-content-center">
      <Dropdown
        value={selectedCountry}
        onChange={(e: DropdownChangeEvent) => setSelectedCountry(e.value)}
        options={ProfilesList}
        optionLabel="name"
        placeholder="Select Profile"
        filter
        valueTemplate={selectedCountryTemplate}
        itemTemplate={countryOptionTemplate}
        className="w-full md:w-14rem"
      />
    </div>
  );
};
export default ListProfiles;
