import { MantineLogo } from '@mantine/ds';
import React from 'react'
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';


function UseCaseCard() {
    return (
        <Card shadow="sm" p="lg" radius="md" withBorder>
          
    
          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>Norway Fjord Adventures</Text>
            <Badge color="pink" variant="light">
              On Sale
            </Badge>
          </Group>
    
          <Text size="sm" color="dimmed">
            With Fjord Tours you can explore more of the magical fjord landscapes with tours and
            activities on and around the fjords of Norway
          </Text>
    
          <Button variant="light" color="blue" fullWidth mt="md" radius="md">
            Book classic tour now
          </Button>
        </Card>
      );
}


export default UseCaseCard