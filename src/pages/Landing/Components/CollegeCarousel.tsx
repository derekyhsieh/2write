import { createStyles, Image } from "@mantine/core";
import { Carousel, Embla } from "@mantine/carousel";
import { useState, useEffect } from "react";
import { useInterval } from "@mantine/hooks";

import stanford from "../../../img/stanford.png";
import cornell from "../../../img/cornell.png";
import berkeley from "../../../img/berkeley.png";
import mit from "../../../img/mit.png";
import harvard from "../../../img/harvard.png";
import dartmouth from "../../../img/dartmouth.png";
import usc from "../../../img/usc.png";
import princeton from "../../../img/princeton.png";

export function CollegeCarousel() {
	const [embla, setEmbla] = useState<Embla | null>(null);

	const interval = useInterval(() => {
		// Start scrolling slowly
		const engine = embla.internalEngine();
		engine.scrollBody.useSpeed(0.03);
		engine.scrollTo.index(embla.scrollSnapList().length - 1, -1);
	}, 500);

	useEffect(() => {
		if (!embla) return;

		// Start scrolling slowly
		const engine = embla.internalEngine();
		engine.scrollBody.useSpeed(0.04);
		engine.scrollTo.index(embla.scrollSnapList().length - 1, -1);

		interval.start();

		return interval.stop;
	}, [embla]);

	return (
		<Carousel
			withIndicators={false}
			withControls={false}
			draggable={false}
			slideGap={0}
			slideSize={"25%"}
			breakpoints={[
				{ maxWidth: "md", slideSize: "30%" },
				{ maxWidth: "sm", slideSize: "70%" },
			]}
			loop
			align="start"
			containScroll="trimSnaps"
			getEmblaApi={setEmbla}
		>
			<Carousel.Slide>
				<Image width={200} height={80} radius="md" src={stanford} />
			</Carousel.Slide>
			<Carousel.Slide>
				<Image width={200} height={80} radius="md" src={berkeley} />
			</Carousel.Slide>
			<Carousel.Slide>
				<Image width={200} height={80} radius="md" src={cornell} />
			</Carousel.Slide>
			<Carousel.Slide>
				<Image width={200} height={80} radius="md" src={mit} />
			</Carousel.Slide>
			<Carousel.Slide>
				<Image width={200} height={80} radius="md" src={harvard} />
			</Carousel.Slide>
			<Carousel.Slide>
				<Image width={200} height={80} radius="md" src={dartmouth} />
			</Carousel.Slide>
			<Carousel.Slide>
				<Image width={200} height={80} radius="md" src={usc} />
			</Carousel.Slide>
		</Carousel>
	);
}

export default CollegeCarousel;
