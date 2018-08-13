import React, { Component } from 'react';
import styled from 'react-emotion';
import { Task } from 'components';

const Container = styled('div')`
  margin: 1em;
  border: 1px solid tomato;
  border-radius: 3px;
`;
const Title = styled('h3')`
  padding: 1em;
  margin: 0;
`;
const TaskList = styled('div')`
  padding: 1em;
`;

export class Column extends Component {
  render() {
    const { title } = this.props.column;
    const { tasks } = this.props;

    return (
      <Container>
        <Title>{title}</Title>
        <TaskList>
          {tasks.map(task => <Task key={task.id} task={task} />)}
        </TaskList>
      </Container>
    );
  }
}
