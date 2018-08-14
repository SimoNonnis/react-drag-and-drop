import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
  padding: 0.5em;
  border: 1px solid #dcdcdc;
  border-radius: 3px;
  background-color: #d9d9f8;

  & + & {
    margin-top: 0.5em;
  }
`;

export class Task extends Component {
  render() {
    const { content, id } = this.props.task;
    const { index } = this.props;

    return (
      <Draggable draggableId={id} index={index}>
        {provided => (
          <Container
            innerRef={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {content}
          </Container>
        )}
      </Draggable>
    );
  }
}
