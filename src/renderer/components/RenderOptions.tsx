import { useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { MenuItem } from 'primereact/menuitem';
import { useDarkMode } from '../hooks/DarkModeContex';
import InventoryIcon from '@mui/icons-material/Inventory';
import SettingsIcon from '@mui/icons-material/Settings';

const RenderOptions = () => {
  const { themeTatailwind } = useDarkMode();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const items: MenuItem[] = [
    { label: 'Trailers', icon: <InventoryIcon className="mr-3" /> },
    { label: 'Settings', icon: <SettingsIcon className="mr-3" /> },
  ];

  return (
    <div className="flex p-3 card">
      <TabMenu
        model={items}
        className={`w-full ${themeTatailwind.secondary.main}`}
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
      />
    </div>
  );
};

export default RenderOptions;
