import { createStyles, Image } from "@mantine/core";
import { Carousel, Embla } from "@mantine/carousel";
import {
	useRef,
	useState,
	useEffect,
	useCallback,
	useLayoutEffect,
} from "react";

const useStyles = createStyles((theme, _params, getRef) => ({
	price: {
		color: theme.colorScheme === "dark" ? theme.white : theme.black,
	},

	carousel: {
		"&:hover": {
			[`& .${getRef("carouselControls")}`]: {
				opacity: 1,
			},
		},
	},

	carouselControls: {
		ref: getRef("carouselControls"),
		transition: "opacity 150ms ease",
		opacity: 0,
	},

	carouselIndicator: {
		width: 4,
		height: 4,
		backgroundColor: "black",
		transition: "width 250ms ease",

		"&[data-active]": {
			width: 16,
		},
	},
}));

export function CollegeCarousel() {
	const { classes } = useStyles();
	const [embla, setEmbla] = useState<Embla | null>(null);

	useEffect(() => {
		const interval = setInterval(() => {
			if (!embla) return;

			// Start scrolling slowly
			const engine = embla.internalEngine();
			engine.scrollBody.useSpeed(0.03);
			engine.scrollTo.index(99999, -1);
		}, 500);

		return () => clearInterval(interval);
	}, [embla]);

	return (
		<Carousel
			withIndicators={false}
			withControls={false}
			draggable={false}
			slideSize="33.333333%"
			slideGap={0}
			breakpoints={[
				{ maxWidth: "md", slideSize: "50%" },
				{ maxWidth: "sm", slideSize: "100%", slideGap: 0 },
			]}
			loop
			align="start"
			containScroll="trimSnaps"
			getEmblaApi={setEmbla}
		>
			<Carousel.Slide>
				<Image
					width={200}
					height={80}
					radius="md"
					src="https://logos-world.net/wp-content/uploads/2021/10/Stanford-Emblem.png"
					alt="Random unsplash image"
				/>
			</Carousel.Slide>
			<Carousel.Slide>
				<Image
					width={200}
					height={80}
					radius="md"
					src="https://logos-world.net/wp-content/uploads/2022/02/UC-Berkeley-Symbol.png"
					alt="Random unsplash image"
				/>
			</Carousel.Slide>
			<Carousel.Slide>
				<Image
					width={200}
					height={80}
					radius="md"
					src="https://logos-world.net/wp-content/uploads/2022/01/Cornell-University-Logo.png"
					alt="Random unsplash image"
				/>
			</Carousel.Slide>
			<Carousel.Slide>
				<Image
					width={200}
					height={80}
					radius="md"
					src="https://1000logos.net/wp-content/uploads/2022/08/MIT-Logo.png"
					alt="Random unsplash image"
				/>
			</Carousel.Slide>
			<Carousel.Slide>
				<Image
					width={200}
					height={80}
					radius="md"
					src="https://logos-world.net/wp-content/uploads/2021/01/Harvard-Logo.png"
					alt="Random unsplash image"
				/>
			</Carousel.Slide>
		</Carousel>
	);
}

export default Carousel;
