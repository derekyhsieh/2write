import { ActionIcon, Flex, Group, Stack, TextInput } from "@mantine/core"
import { useState } from "react"
import { IconChevronLeft, IconUser } from "@tabler/icons"

export default function DocumentHeader() {
    const [documentTitle, setDocumentTitle] = useState("Document #2")

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
                <ActionIcon variant="light" size="md">
                    <IconChevronLeft size={18} />
                </ActionIcon>
                <TextInput
                    styles={{ root: { fontWeight: "bold", width: "80%"} }}
                    value={documentTitle}
                    onChange={(event) => setDocumentTitle(event.currentTarget.value)}
                    placeholder="Essay Title"
                    variant="filled"
                    size="md"
                />
            </Group>
            <ActionIcon variant="light" radius="xl" size="xl" color="blue">
                <IconUser />
            </ActionIcon>
        </Group>
        </div>
    )
}
