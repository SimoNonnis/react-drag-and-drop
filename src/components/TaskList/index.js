import React, { Component } from 'react';
import { Task } from 'components';

export class TaskList extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.tasks === this.props.tasks ? false : true;
  }

  render() {
    const { tasks } = this.props;

    return tasks.map((task, index) => (
      <Task key={task.id} task={task} index={index} />
    ));
  }
}
