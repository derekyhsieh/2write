import { ActionIcon, Group, TextInput, Button, Tooltip, Portal } from "@mantine/core";
import { useState, useEffect } from "react";
import { IconChevronLeft } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";
import { saveTitle, loadEssay } from "../../../services/FirestoreHelpers";
import { useSearchParams } from "react-router-dom";
import useWindowSize from "../../../hooks/useWindowSize";

export default function DocumentHeader({ localDocData, editor }) {
	const [documentTitle, setDocumentTitle] = useState("Untitled Document");
	const { user, logOut } = UserAuth();
	const [searchParams, setSearchParams] = useSearchParams();
	const [titleFocus, setTitleFocus] = useState(false);
	const windowSize = useWindowSize();

	const navigate = useNavigate();

	const navigateToHome = () => {
		navigate("/");
	};

	useEffect(() => {
		loadEssay(user.uid, searchParams.get("essayId")).then((doc) => {
			setDocumentTitle(doc.title ?? "Untitled Document");
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
							saveTitle(
								user.uid,
								searchParams.get("essayId"),
								event.currentTarget.value
							);
						}}
						placeholder="Essay Title"
						pl={titleFocus ? 0 : 11}
						variant={titleFocus ? "default" : "unstyled"}
						onFocus={() => {
							setTitleFocus(true);
						}}
						onBlur={() => {
							setTitleFocus(false);
						}}
						styles={{ root: { width: windowSize.width * 0.45 } }}
					/>
				</Group>
			</Group>
		</div>
	);
}
