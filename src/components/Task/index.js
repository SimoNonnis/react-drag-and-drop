import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 0.5em;
  border: 1px solid lightgrey;
  margin-bottom: 0.5em;
  border-radius: 3px;
`;

export class Task extends Component {
  render() {
    return <Container>this.props.task.content</Container>;
  }
}
