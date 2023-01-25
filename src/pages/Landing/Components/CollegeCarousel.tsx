import { createStyles, Image } from "@mantine/core";
import { Carousel, Embla } from "@mantine/carousel";
import {
	useState,
	useEffect,
} from "react";

import stanford from "../../../img/stanford.png"
import cornell from "../../../img/cornell.png"
import berkeley from "../../../img/berkeley.png"
import mit from "../../../img/mit.png"
import harvard from "../../../img/harvard.png"

export function CollegeCarousel() {
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
				{ maxWidth: "sm", slideSize: "100%" },
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
					src={stanford}
				/>
			</Carousel.Slide>
			<Carousel.Slide>
				<Image
					width={200}
					height={80}
					radius="md"
					src={berkeley}
				/>
			</Carousel.Slide>
			<Carousel.Slide>
				<Image
					width={200}
					height={80}
					radius="md"
					src={cornell}
				/>
			</Carousel.Slide>
			<Carousel.Slide>
				<Image
					width={200}
					height={80}
					radius="md"
					src={mit}
				/>
			</Carousel.Slide>
			<Carousel.Slide>
				<Image
					width={200}
					height={80}
					radius="md"
					src={harvard}
				/>
			</Carousel.Slide>
		</Carousel>
	);
}

export default Carousel;
