import React, { FC, SetStateAction } from 'react'
import { CustomDrawer } from './CustomDrawer';
import { Text } from '@mantine/core';

interface EssayDataDrawerProps {
    setOpened: React.Dispatch<SetStateAction<string>>,
    opened: string, 
}

const EssayDataDrawer: FC<EssayDataDrawerProps> = ({ setOpened, opened }) => {



    return (
      <CustomDrawer setOpened={setOpened} opened={opened == "data"}>
        <Text>Hello Essay Data Drawer</Text>
       </CustomDrawer>
    )
  }
  

export default EssayDataDrawer;