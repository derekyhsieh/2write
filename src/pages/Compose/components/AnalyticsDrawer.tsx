import React, { FC, SetStateAction } from 'react'
import { CustomDrawer } from './CustomDrawer';
import { Text } from '@mantine/core';

interface SettingsDrawerProps {
    setOpened: React.Dispatch<SetStateAction<string>>,
    opened: string, 
}

const AnalyticsDrawer: FC<SettingsDrawerProps> = ({ setOpened, opened }) => {



    return (
      <CustomDrawer setOpened={setOpened} opened={opened == "analytics"}>
        <Text>Hello Analytics Drawer</Text>
       </CustomDrawer>
    )
  }
  

export default AnalyticsDrawer;