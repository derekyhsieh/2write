import React, { FC, SetStateAction, useState, useContext, useEffect } from 'react'
import { CustomDrawer } from './CustomDrawer';
import { LoginContext } from '../../../context/DocContext';
import { Text, Textarea, Stack, Center, Title } from '@mantine/core';
import { useDebounce } from 'use-debounce';
import { saveEssay, saveEssayPrompt } from '../../../services/FirestoreHelpers';
import { UserAuth } from '../../../context/AuthContext';
import { useSearchParams } from 'react-router-dom';

interface EssayDataDrawerProps {
  setOpened: React.Dispatch<SetStateAction<string>>,
  opened: string,
}

const EssayDataDrawer: FC<EssayDataDrawerProps> = ({ setOpened, opened }) => {

  // @ts-ignore
  const { localDocData, setLocalDocData } = useContext(LoginContext)
  const [searchParams, setSearchParams] = useSearchParams();

  const {user} = UserAuth()

  const [essayPrompt, setEssayPrompt] = useState("")



  useEffect(() => {


    setEssayPrompt(localDocData.essayPrompt)

  }, [opened])

  const handleChange = (prompt) => {

    setEssayPrompt(prompt)

    let newState = localDocData

    newState.essayPrompt = prompt
    setLocalDocData(newState)
  }

  

  return (
    <CustomDrawer setOpened={setOpened} opened={opened == "data"}>

      <Stack mx={30}>
        <Center>
          <Title>Essay Data</Title>
        </Center>

        <Textarea
          value={essayPrompt}
          placeholder="What is the best way to cook pasta?"
          autosize
          label="Essay Prompt"
        
          onChange={event => {
            saveEssayPrompt(user.uid, searchParams.get("essayId"), event.currentTarget.value)
            setEssayPrompt(event.currentTarget.value)
          }
          }
        />

      </Stack>
    </CustomDrawer>
  )
}


export default EssayDataDrawer;