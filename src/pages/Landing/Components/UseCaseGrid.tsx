import React from 'react'
import { Container, Grid, Paper } from '@mantine/core';
import { Image, Text } from '@mantine/core';
import UseCaseCard from './UseCaseCard';

function UseCaseGrid() {
    return (
      
      <Grid grow gutter="lg">
        <Grid.Col span={4}>
            <UseCaseCard />
        </Grid.Col>
        <Grid.Col span={4}>
            <UseCaseCard />
        </Grid.Col>
        <Grid.Col span={4}>
            <UseCaseCard />
        </Grid.Col>
        <Grid.Col span={4}>
            <UseCaseCard />
        </Grid.Col>
        <Grid.Col span={4}>
            <UseCaseCard />
        </Grid.Col>
        
      </Grid>
      
    );
  }

export default UseCaseGrid