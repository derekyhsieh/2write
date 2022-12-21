import React from "react";
import { Button, Center } from "@mantine/core";
import { IconDatabase } from "@tabler/icons";

export default function LandingPage() {
	return (
    <Center style={{ width: "100%", height: 800 }}>
			<Button
				leftIcon={<IconDatabase />}
				variant="outline"
				onClick={async () => {
					const response = await fetch("/api/outline/", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ prompt: "Nikola Tesla" }),
					});
          console.log(response)
				}}
			>
				Test API req
			</Button>
      </Center>
	);
}
