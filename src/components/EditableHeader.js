import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { transition } from '../helpers';

const PageHeader = styled.textarea`
  appearance: none;
  resize: none;
  overflow: hidden;
  display: block;

  border: none;
  width: 100%;

  background: transparent;
  color: var(--white);
  text-align: center;
  font-size: 2.25em;
  font-weight: 400;
  margin: 0;
  flex-grow: 1;
  outline: none;
  border-radius: 5px;
  transition: background ${transition};
  &:focus {
    background: rgba(245, 245, 245, 0.25);
  }
  &::placeholder {
    color: rgba(245, 245, 245, 0.5);
  }
`;

class EditableHeader extends Component {
  static propTypes = {
    placeholder: PropTypes.string.isRequired,
    updateTitle: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  };

  autoresize = element => {
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
    element.scrollTop = element.scrollHeight;
    // window.scrollTo(window.scrollLeft, element.scrollTop + element.scrollHeight);
  };

  handleChange = event => {
    // Auto resize text area
    this.autoresize(event.target);

    // Update state with new value
    this.props.updateTitle(event.target.value);
    console.log(event.target.value);
  };

  render() {
    return (
      <PageHeader
        onChange={this.handleChange}
        placeholder={this.props.placeholder}
        value={this.props.value}
      />
    );
  }
}

export default EditableHeader;
