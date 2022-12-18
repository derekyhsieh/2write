import React, { FC, SetStateAction } from 'react'
import { CustomDrawer } from './CustomDrawer';
import { Text } from '@mantine/core';

interface TodoDrawerProps {
    setOpened: React.Dispatch<SetStateAction<string>>,
    opened: string, 
}

const TodoDrawer: FC<TodoDrawerProps> = ({ setOpened, opened }) => {



    return (
      <CustomDrawer setOpened={setOpened} opened={opened == "todos"}>
        <Text>Hello Todo Drawer</Text>
       </CustomDrawer>
    )
  }
  

export default TodoDrawer;