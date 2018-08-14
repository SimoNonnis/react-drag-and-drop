import React, { Component } from 'react';
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
    const { task } = this.props;

    return <Container>{task.content}</Container>;
  }
}
