import { ActionIcon, Flex, Group, Stack, TextInput } from "@mantine/core"
import { useState } from "react"
import { IconChevronLeft, IconUser } from "@tabler/icons"
import { useNavigate } from "react-router-dom"

export default function DocumentHeader() {
    const [documentTitle, setDocumentTitle] = useState("Document #2")
    const navigate = useNavigate()

    const navigateToHome = () => {
        navigate("/")
    }

        

    return (
        <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
          width: "100%"
        }}
      >
        <Group position="apart" style={{width: "100vw"}}>
            <Group>
                <ActionIcon onClick={navigateToHome} variant="light" size="lg">
                    <IconChevronLeft size={22} />
                </ActionIcon>
                <TextInput
                    value={documentTitle}
                    onChange={(event) => setDocumentTitle(event.currentTarget.value)}
                    placeholder="Essay Title"
                    variant="default"
                    size="lg"
                />
            </Group>
            <ActionIcon variant="light" radius="xl" size="xl" color="blue">
                <IconUser />
            </ActionIcon>
        </Group>
        </div>
    )
}
