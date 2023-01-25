import {
    createStyles,
    Title,
    Text,
    Card,
    SimpleGrid,
    Container,
  } from '@mantine/core';
  import { IconGauge, IconUser, IconMessageChatbot, IconBallpen, IconFriends, IconClipboardTypography} from '@tabler/icons';
  
  const mockdata = [
    {
      title: 'AI Autocomplete',
      description:
      "Let artificial intelligence convert your ideas into real sentences.",
      icon: IconGauge,
    },
    {
      title: 'Plagiarism-free',
      description:
      "2write ensures all concent generated is original, checked against Turnitin.",
      icon: IconUser,
    },
    {
      title: 'Outline Assistant',
      description:
      'Generate useful essay outlines to structure your essay.',
      icon: IconMessageChatbot,
    },
    {
      title: 'Rewrite Sentences',
      description:
      "Have a phrase that just doesn't flow? Have 2write rewrite it.",
      icon: IconBallpen,
    },
  
    {
      title: 'Bibliography Generation',
      description:
      "Automatically create bibliography from a group of links.",
      icon: IconClipboardTypography,
    },
    {
      title: 'Real-time collaboration',
      description:
      "Allows multiple users to work together on the same document or project at the same time.",
      icon: IconFriends,
    },
  ];
  
  const useStyles = createStyles((theme) => ({
    title: {
      fontSize: 34,
      fontWeight: 900,
      [theme.fn.smallerThan('sm')]: {
        fontSize: 24,
      },
    },
  
    description: {
      maxWidth: 600,
      margin: 'auto',
  
      '&::after': {
        content: '""',
        display: 'block',
        backgroundColor: theme.fn.primaryColor(),
        width: 45,
        height: 2,
        marginTop: theme.spacing.sm,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
  
    card: {
      border: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
      }`,
    },
  
    cardTitle: {
      '&::after': {
        content: '""',
        display: 'block',
        backgroundColor: theme.fn.primaryColor(),
        width: 45,
        height: 2,
        marginTop: theme.spacing.sm,
      },
    },
  }));
  
  export function Features() {
    const { classes, theme } = useStyles();
    const features = mockdata.map((feature) => (
      <Card key={feature.title} shadow="md" radius="md" className={classes.card} p="xl">
        <feature.icon size={50} stroke={2} color={theme.fn.primaryColor()} />
        <Text size="lg" weight={500} className={classes.cardTitle} mt="md">
          {feature.title}
        </Text>
        <Text size="sm" color="dimmed" mt="sm">
          {feature.description}
        </Text>
      </Card>
    ));
    return (
      <Container size="lg" py="xl">
  
        <Title order={2} className={classes.title} align="center" mt="sm">
            Features for your next writing assignment
        </Title>
  
        <Text color="dimmed" className={classes.description} align="center" mt="md">
        </Text>
  
        <SimpleGrid cols={3} spacing="xl" mt={50} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
          {features}
        </SimpleGrid>
      </Container>
    );
  }