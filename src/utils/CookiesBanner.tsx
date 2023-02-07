import { Button, Paper, Text, Group, CloseButton, Portal } from "@mantine/core";

export function CookiesBanner() {
	return (
		<Paper withBorder p="lg" radius="md" shadow="md">
			<Group position="apart" mb="xs">
				<Text size="md" weight={500}>
					Allow cookies
				</Text>
			</Group>
			<Group position="apart" mt="xs">
      <Text color="dimmed" size="xs">
				This website uses cookies to enhance the user experience.
			</Text>
				<Button variant="outline" size="xs">
					I understand
				</Button>
			</Group>
		</Paper>
	);
}
