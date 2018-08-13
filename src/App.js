import React, { Component } from 'react';

import { Column } from 'components';
import initialData from 'initial-data';

export default class App extends Component {
  state = initialData;

  render() {
    return this.state.columnOrder.map(columnId => {
      const column = this.state.columns[columnId];
      const tasks = column.taskIDs.map(taskId => this.state.tasks[taskId]);

      return <Column key={column.id} column={column} tasks={tasks} />;
    });
  }
}
