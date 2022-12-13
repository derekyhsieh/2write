import React from "react";
import DocumentCard from "./components/DocumentCard";
import HomeHeader from "./components/HomeHeader";
import { Stack } from "@mantine/core";

export default function HomePage() {
  return (
    <Stack>
    <HomeHeader></HomeHeader>
    <DocumentCard></DocumentCard>
    </Stack>
  );
}
