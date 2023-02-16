import React, { FC, SetStateAction } from 'react'
import { CustomDrawer } from './CustomDrawer';

interface SettingsDrawerProps {
    setOpened: React.Dispatch<SetStateAction<string>>,
    opened: string,
}

const SettingsDrawer: FC<SettingsDrawerProps> = ({ setOpened, opened }) => {



  return (
    <CustomDrawer setOpened={setOpened} opened={opened == "settings"}>
     </CustomDrawer>
  )
}

export default SettingsDrawer;