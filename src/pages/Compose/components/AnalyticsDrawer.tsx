import React, { FC, SetStateAction, useEffect, useState } from 'react'
import { CustomDrawer } from './CustomDrawer';
import { Center, Divider, Stack, Text, Title, Space } from '@mantine/core';

interface AnalyticsDrawerProps {
  setOpened: React.Dispatch<SetStateAction<string>>,
  opened: string,
  editor: any
}


const AnalyticsDrawer: FC<AnalyticsDrawerProps> = ({ setOpened, opened, editor }) => {


  function removeCapitalizedParentheses(str) {
    let result = '';
    let inParentheses = false;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === '(') {
        if (str[i + 1] === str[i + 1].toUpperCase()) {
          inParentheses = true;
        } else {
          result += str[i];
        }
      } else if (str[i] === ')') {
        if (inParentheses) {
          inParentheses = false;
        } else {
          result += str[i];
        }
      } else if (!inParentheses) {
        result += str[i];
      }
    }
    return result;
  }

  function removePeriods(arr) {
    return arr.filter((str: string) => str !== '.')
  }
  

  const [wordCount, setWordCount] = useState("")
  const [charCount, setCharCount] = useState("")
  const [citationWordCount, setCitationWordCount] = useState(0) // word count without citations 

  useEffect(() => {

    // console.log(editor.state.doc.textContent)
    if (opened === "analytics") {

      const textContent = editor.editor.view.state.doc.textContent

      setWordCount(removePeriods(textContent.split(" ")).length)
      setCharCount(textContent.length)

      setCitationWordCount(removePeriods(removeCapitalizedParentheses(textContent).split(" ")).length)



    }

  }, [opened])


  return (
    <CustomDrawer setOpened={setOpened} opened={opened == "analytics"}>


      <Stack mx={30}>
        <Center>
          <Title>Analytics</Title>
        </Center>
        <Divider size="md" label="Word Count" labelPosition="center" styles={{ label: { fontSize: "15px" } }} />

        <Center>
          <Text>{wordCount}</Text>
        </Center>

        <Space h="sm" />

        <Divider size="md" label="Character Count" labelPosition="center" styles={{ label: { fontSize: "15px" } }} />

        <Center>
          <Text>{charCount}</Text>
        </Center>

        <Space h="sm" />

        <Divider size="md" label="Word Count w/o Citation" labelPosition="center" styles={{ label: { fontSize: "15px" } }} />

        <Center>
          <Text>{citationWordCount}</Text>
        </Center>

      </Stack>
    </CustomDrawer>
  )
}


export default AnalyticsDrawer;