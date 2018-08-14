import React, { Component } from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import { Task } from 'components';

const Container = styled.div`
  margin: 1em;
  border: 1px solid #dcdcdc;
  border-radius: 3px;
  background-color: #ffffff;
`;
const Title = styled.h3`
  padding: 1em;
  margin: 0;
`;
const TaskList = styled.div`
  padding: 1em;
`;

export class Column extends Component {
  render() {
    const { title, id } = this.props.column;
    const { tasks } = this.props;

    return (
      <Container>
        <Title>{title}</Title>
        <Droppable droppableId={id}>
          {provided => (
            <TaskList innerRef={provided.innerRef} {...provided.droppableProps}>
              {tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    );
  }
}
