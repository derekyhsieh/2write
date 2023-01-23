import { createStyles, Container, Text, Button, Group, AppShell, Header, Image, Center, Space } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { GithubIcon } from '@mantine/ds';
import React from 'react'


const useStyles = createStyles((theme, _params, getRef) => ({
  price: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },

  carousel: {
    '&:hover': {
      [`& .${getRef('carouselControls')}`]: {
        opacity: 1,
      },
    },
  },

  carouselControls: {
    ref: getRef('carouselControls'),
    transition: 'opacity 150ms ease',
    opacity: 0,
  },

  carouselIndicator: {
    width: 4,
    height: 4,
    backgroundColor: "black",
    transition: 'width 250ms ease',

    '&[data-active]': {
      width: 16,
    },
  },
}));


export function CollegeCarousel() {
  const { classes } = useStyles();
  return (
    //  @ts.ignore
    <Carousel
    classNames={{
      // root: classes.carousel,
      // controls: classes.carouselControls,
      indicator: classes.carouselIndicator,
    }}
    withIndicators
    height={200}
    slideSize="33.333333%"
    slideGap="md"
    breakpoints={[
      { maxWidth: 'md', slideSize: '50%' },
      { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
    ]}
    loop
    align="start"


  >
    <Carousel.Slide>
      <Image
        radius="md"
        src="https://logos-world.net/wp-content/uploads/2021/10/Stanford-Emblem.png"
        alt="Random unsplash image"
      />
    </Carousel.Slide>
    <Carousel.Slide>
      <Image
        radius="md"
        src="https://logos-world.net/wp-content/uploads/2022/02/UC-Berkeley-Symbol.png"
        alt="Random unsplash image"
      />
    </Carousel.Slide>
    <Carousel.Slide>
      <Image
        radius="md"
        src="https://logos-world.net/wp-content/uploads/2021/11/University-of-California-Los-Angeles-UCLA-Emblem.png"
        alt="Random unsplash image"
      />
    </Carousel.Slide>
    <Carousel.Slide>
      <Image
        radius="md"
        src="https://logos-world.net/wp-content/uploads/2022/01/Cornell-University-Logo.png"
        alt="Random unsplash image"
      />
    </Carousel.Slide>
    <Carousel.Slide>
      <Image
        radius="md"
        src="https://1000logos.net/wp-content/uploads/2022/08/MIT-Logo.png"
        alt="Random unsplash image"
      />
    </Carousel.Slide>
    <Carousel.Slide>
      <Image
        radius="md"
        src="https://logos-world.net/wp-content/uploads/2021/01/Harvard-Logo.png"
        alt="Random unsplash image"
      />
    </Carousel.Slide>
  </Carousel>
  )
}

export default Carousel
