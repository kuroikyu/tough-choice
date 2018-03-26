import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CheckCircle from 'react-feather/dist/icons/check-circle';
import XCircle from 'react-feather/dist/icons/x-circle';

import { transition, mobileBreak } from '../helpers';

const List = styled.ul`
  color: ${props => (props.type === 'pros' ? 'var(--text-two)' : 'var(--text-one)')};
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: grid;
  grid-template-columns: 2em 1fr 2em;
  font-size: 1.15em;
  margin-bottom: 1em;
  svg {
    width: 1em;
    color: ${props => (props.type === 'pros' ? 'var(--highlight-two)' : 'var(--highlight-one)')};
  }
  &:hover {
    button {
      opacity: 1;
      background: ${props =>
        props.type === 'pros' ? 'var(--highlight-two)' : 'var(--highlight-one)'};
      color: var(--white);
    }
  }
  @media (max-width: ${mobileBreak}) {
    grid-template-columns: 1fr 2em;
    svg {
      display: none;
    }
  }
`;

const DeleteButton = styled.button`
  appearance: none;
  border: none;
  padding: 0;
  margin: 0;
  margin-left: auto;
  width: 1.5em;
  border-radius: 3px;
  background: transparent;
  transition: opacity ${transition}, background ${transition}, color ${transition};
  color: ${props => (props['data-type'] === 'pros' ? 'var(--text-two)' : 'var(--text-one)')};
`;

const AddReason = styled.form`
  box-shadow: 0px 2px
    ${props => (props.name === 'pros' ? 'var(--highlight-two)' : 'var(--highlight-one)')};
  transition: box-shadow ${transition};
  &:focus-within {
    box-shadow: 0px 3px
      ${props => (props.name === 'pros' ? 'var(--highlight-two)' : 'var(--highlight-one)')};
  }
`;

const ReasonInput = styled.input`
  width: 100%;
  border: none;
  background: none;
  opacity: 0.5;
  line-height: 1.5;
  outline: none;
  transition: opacity ${transition};
  &:focus {
    opacity: 1;
  }
  @media (max-width: ${mobileBreak}) {
    margin-top: auto;
  }
`;

export default class Reasons extends Component {
  static propTypes = {
    list: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        text: PropTypes.string,
      })
    ),
    name: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    deleteEntry: PropTypes.func.isRequired,
    input: PropTypes.string.isRequired,
    passMyRef: PropTypes.object.isRequired,
  };

  static defaultProps = {
    list: [],
  };

  deleteHandler = event => {
    // Grab data from element data-atributes
    const { type, id } = event.target.dataset;

    // Delete entry using App.js' function
    this.props.deleteEntry(type, parseInt(id, 10));
  };

  render() {
    const { list, name, handleSubmit, input, passMyRef } = this.props;

    return (
      <Fragment>
        <List type={name}>
          {list.map(item => (
            <ListItem key={item.id} type={name}>
              {name === 'pros' ? <CheckCircle /> : <XCircle />}
              {item.text}
              <DeleteButton data-type={name} data-id={item.id} onClick={this.deleteHandler}>
                &times;
              </DeleteButton>
            </ListItem>
          ))}
        </List>

        <AddReason name={name} onSubmit={handleSubmit}>
          <ReasonInput type="text" innerRef={passMyRef} placeholder={input} />
        </AddReason>
      </Fragment>
    );
  }
}
