import React, { FC, SetStateAction } from 'react'
import { CustomDrawer } from './CustomDrawer';
import { Button, Text } from '@mantine/core';

interface SettingsDrawerProps {
    setOpened: React.Dispatch<SetStateAction<string>>,
    opened: string,
}

const SettingsDrawer: FC<SettingsDrawerProps> = ({ setOpened, opened }) => {



  return (
    <CustomDrawer setOpened={setOpened} opened={opened == "settings"}>
        <Button>Turn on vim</Button>
     </CustomDrawer>
  )
}

export default SettingsDrawer;