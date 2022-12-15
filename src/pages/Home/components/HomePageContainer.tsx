import { Stack } from '@mantine/core';
import DocumentCard from "./DocumentCard";
import HomeHeader from "./HomeHeader";

export default function HomePageContainer() {
  return (
    <Stack spacing={0}>
			<HomeHeader />
			<DocumentCard />
		</Stack>
  );
}