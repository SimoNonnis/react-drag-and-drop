import React, { Component } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
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

    const isSameColumn = (d, s) => d.droppableId === s.droppableId;
    const hasSameIndex = (d, s) => d.index === s.index;
    const noPositionChange = both(isSameColumn, hasSameIndex);

    if (isNil(destination) || noPositionChange(destination, source)) {
      return;
    } else {
      if (isSameColumn(destination, source)) {
        const column = this.state.columns[source.droppableId];
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
        const { columns } = this.state;
        const column = columns[source.droppableId];
        const destinationColumn = columns[destination.droppableId];

        // Remove dragged item outside array
        const startTaskIDs = remove(source.index, 1, column.taskIDs);
        // Insert released item in destination column taskIDs array
        const destinationTaskIDs = insert(
          destination.index,
          draggableId,
          destinationColumn.taskIDs
        );

        const updatedStartLens = set(lensProp('taskIDs'), startTaskIDs, column);
        const updatedDestinationLens = set(
          lensProp('taskIDs'),
          destinationTaskIDs,
          destinationColumn
        );

        const newState = {
          ...this.state,
          columns: {
            ...this.state.columns,
            [source.droppableId]: updatedStartLens,
            [destination.droppableId]: updatedDestinationLens
          }
        };

        this.setState(newState);
      }
    }
  };

  render() {
    const { columnOrder, columns, tasks } = this.state;

    return (
      <DragDropContext onDragEnd={this.handleOnDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {provided => (
            <Container
              innerRef={provided.innerRef}
              {...provided.droppableProps}
            >
              {columnOrder.map((columnId, index) => {
                const column = columns[columnId];
                const taskList = column.taskIDs.map(taskId => tasks[taskId]);

                return (
                  <Column
                    key={column.id}
                    column={column}
                    tasks={taskList}
                    index={index}
                  />
                );
              })}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}
