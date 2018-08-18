import React, { Component } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { TaskList } from 'components';

const Container = styled.div`
  margin: 1em;
  border: 1px solid #dcdcdc;
  border-radius: 3px;
  width: 280px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 1em;
  margin: 0;

  &:focus {
    outline: none;
    background-color: #f3f3f3;
  }
`;

const TaskListContainer = styled.div`
  padding: 1em;
  transition: background-color 0.2s ease;
  background-color: ${({ isDraggingOver }) =>
    isDraggingOver ? '#f3f3f3' : '#ffffff'};
  flex-grow: 1;
  min-height: 100px;
`;

export class Column extends Component {
  render() {
    const { title, id } = this.props.column;
    const { tasks, index } = this.props;

    return (
      <Draggable draggableId={id} index={index}>
        {provided => (
          <Container innerRef={provided.innerRef} {...provided.draggableProps}>
            <Title {...provided.dragHandleProps}>{title}</Title>
            <Droppable droppableId={id} type="task">
              {(provided, snapshot) => (
                <TaskListContainer
                  innerRef={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  <TaskList tasks={tasks} />
                  {provided.placeholder}
                </TaskListContainer>
              )}
            </Droppable>
          </Container>
        )}
      </Draggable>
    );
  }
}
