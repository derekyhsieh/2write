import { ActionIcon, Flex, Group, Stack, TextInput } from "@mantine/core";
import { useState, useEffect } from "react";
import { IconChevronLeft, IconUser } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";
import { saveTitle, loadEssay } from "../../../services/FirestoreHelpers";
import { useSearchParams } from "react-router-dom";

export default function DocumentHeader({ localDocData }) {
	const [documentTitle, setDocumentTitle] = useState("");
	const { user } = UserAuth();
    const [searchParams, setSearchParams] = useSearchParams();

	const navigate = useNavigate();

	const navigateToHome = () => {
		navigate("/");
	};

    useEffect(() => {
        loadEssay(user.uid, searchParams.get("essayId")).then((doc) => {
            setDocumentTitle(doc.title ? doc.title : "Document ".concat(searchParams.get("placeholder")));
        });
    }, []);

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				height: "100%",
				width: "100%",
			}}
		>
			<Group position="apart" style={{ width: "100vw" }}>
				<Group>
					<ActionIcon onClick={navigateToHome} variant="light" size="lg">
						<IconChevronLeft size={22} />
					</ActionIcon>
					<TextInput
						value={documentTitle}
						onChange={(event) => {
							setDocumentTitle(event.currentTarget.value);
							saveTitle(user.uid, searchParams.get("essayId"), event.currentTarget.value);
						}}
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
	);
}
