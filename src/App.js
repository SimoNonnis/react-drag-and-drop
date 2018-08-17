import React, { Component } from 'react';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import { isNil, both, remove, insert, lensProp, lensPath, set } from 'ramda';

import { Column } from 'components';
import initialData from 'initial-data';

const Container = styled.div`
  height: 100vh;
  background-color: #fff8f1;
  display: flex;
  color: #62626d;
`;

export default class App extends Component {
  state = initialData;

  handleOnDragEnd = result => {
    const { destination, source, draggableId } = result;
    const column = this.state.columns[source.droppableId];
    const isSameColumn = (d, s) => d.droppableId === s.droppableId;
    const hasSameIndex = (d, s) => d.index === s.index;
    const noPositionChange = both(isSameColumn, hasSameIndex);

    if (isNil(destination) || noPositionChange(destination, source)) {
      return;
    } else {
      if (isSameColumn(destination, source)) {
        // Remove dragged item outside array
        const taskIDs = remove(source.index, 1, column.taskIDs);
        // Insert it in his destination position
        const updatedTaskIDs = insert(destination.index, draggableId, taskIDs);
        // Update portion of state
        const updatedLens = set(lensProp('taskIDs'), updatedTaskIDs, column);
        // Prepare new state
        const newState = set(
          lensPath(['columns', `${source.droppableId}`]),
          updatedLens,
          this.state
        );

        this.setState(newState);
      } else {
        const destinationColumn = this.state.columns[destination.droppableId];
        console.log(destinationColumn);
      }
    }
  };

  render() {
    const { columnOrder, columns, tasks } = this.state;

    return (
      <Container>
        <DragDropContext onDragEnd={this.handleOnDragEnd}>
          {columnOrder.map(columnId => {
            const column = columns[columnId];
            const taskList = column.taskIDs.map(taskId => tasks[taskId]);

            return <Column key={column.id} column={column} tasks={taskList} />;
          })}
        </DragDropContext>
      </Container>
    );
  }
}
