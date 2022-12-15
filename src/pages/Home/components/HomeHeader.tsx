import { createStyles, Header, Autocomplete, Group, Burger, ActionIcon, Stack, Center } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch, IconUser, IconBell } from '@tabler/icons';
import { MantineLogo } from '@mantine/ds';

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: 70,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  search: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
    width: '60%'
  },
}));

interface HomeHeaderProps {
}

export default function HomeHeader() {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();

  return (
    <Header height={"10%"} className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" />
          <MantineLogo size={28} />
        </Group>

        <Autocomplete
              radius={"md"}
              className={classes.search}
              placeholder="Search"
              icon={<IconSearch size={16} stroke={1.5} />}
              data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Broken']}
          />

        <Group>
          <ActionIcon>
            <IconBell />
          </ActionIcon>
          <ActionIcon variant="light" radius="xl" size="xl" color="blue">
                <IconUser />
            </ActionIcon>
        </Group>
      </div>
    </Header>
  );
}