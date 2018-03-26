import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import SettingsCog from 'react-feather/dist/icons/settings';

import { transition } from '../helpers';

const SettingsButton = styled.div`
  background: transparent;
  border: none;
  padding: 10px;
  border-radius: 5px;
  position: relative;

  display: flex;
  align-items: center;
  transition: background ${transition};
  &:hover {
    background: var(--highlight-one);
  }

  svg {
    color: var(--white);
  }
`;

const Menu = styled.div`
  position: absolute;
  right: -10px;
  top: 2.5em;
  width: auto;
  z-index: 20;

  padding: 0 1em;
  text-align: left;
  border-radius: 7px;
  ${'' /* background: rgba(245, 245, 245, 0.5); */};
  background: var(--white);
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.25);
  ul {
    list-style: none;
    padding: 0;
    font-family: var(--body-font);
  }
  li {
    padding: 0.25em;
    transition: background ${transition}, color ${transition};
    color: var(--text-one);
    &:hover {
      color: var(--highlight-one);
      span {
        border: 2px solid var(--highlight-one);
      }
    }
  }
`;

const ColorSchemeButton = styled.button`
  appearance: none;
  border: none;
  outline: none;

  width: 100%;

  display: flex;
  align-items: center;
  text-transform: capitalize;
  background: transparent;
  color: inherit;
`;

const ColoredCircle = styled.span`
  width: 2.5em;
  height: 2.5em;
  margin-right: 1em;

  border-radius: 50%;
  background: linear-gradient(to right top, ${props => props.hsl[0]}, ${props => props.hsl[1]});
  border: 2px solid var(--white);
  transition: border ${transition};
`;

const LiHeader = styled.li`
  margin-top: 1em;
  font-size: 0.75em;
  text-transform: uppercase;
  font-family: var(--title-font);
`;

export default class Settings extends Component {
  state = {
    menuOpen: false,
    colorSchemes: [
      {
        name: 'default',
        active: true,
        hsl: ['hsl(251.2,60.7%,53.1%)', 'hsl(191.2,60.7%,53.1%)'],
        hue: ['251.2', '191.2'],
      },
      {
        name: 'sunset',
        active: false,
        hsl: ['hsl(37.1,73.7%,58.2%)', 'hsl(311.9,61.3%,53.3%)'],
        hue: ['37.1', '311.9'],
      },
      {
        name: 'electric',
        active: false,
        hsl: ['hsl(206.3,100%,49.6%)', 'hsl(152.2,70%,56.3%)'],
        hue: ['206.3', '152.2'],
      },
    ],
  };

  async componentWillMount() {
    // Reinstate our local storage
    const localStorageRef = localStorage.getItem('tough-choice-color');
    if (localStorageRef) {
      this.setState(JSON.parse(localStorageRef));
    }
  }

  componentDidMount() {
    // Update Background Colors
    this.updateBackgroundColors();
  }

  componentDidUpdate() {
    // Update Background Colors
    this.updateBackgroundColors();

    // Store data in local storage
    const currentState = JSON.stringify(this.state);
    localStorage.setItem('tough-choice-color', currentState);
  }

  updateBackgroundColors = () => {
    // Get active scheme
    const { hue, hsl } = this.state.colorSchemes.filter(el => el.active)[0];

    // Update CSS variables
    const rootElement = document.documentElement.style;
    rootElement.setProperty('--hue-one', hue[0]);
    rootElement.setProperty('--hue-two', hue[1]);

    rootElement.setProperty('--highlight-one', hsl[0]);
    rootElement.setProperty('--highlight-two', hsl[1]);
  };

  openSettings = () => {
    // Get current state
    const { menuOpen } = this.state;

    // Update state to open or close menu
    this.setState({ menuOpen: !menuOpen });
  };

  selectScheme = event => {
    // Get current state
    const newState = [...this.state.colorSchemes];

    // Update state to reflect selected theme
    const selectedScheme = event.currentTarget.name;
    const updatedState = newState.map(el => ({
      ...el,
      active: el.name === selectedScheme,
    }));

    // Push updated state to app
    this.setState({ colorSchemes: updatedState });

    // document.documentElement.style.setProperty('--highlight-one', hsl[0]);
    // document.documentElement.style.setProperty('--highlight-two', hsl[1]);
  };

  render() {
    return (
      <React.Fragment>
        <SettingsButton onClick={this.openSettings}>
          <SettingsCog />
          {this.state.menuOpen && (
            <Menu>
              <ul>
                {/* <li>Clear all</li> */}
                <LiHeader>Choose a background</LiHeader>
                {this.state.colorSchemes.map(color => (
                  <li key={color.name}>
                    <ColorSchemeButton
                      onClickCapture={this.selectScheme}
                      name={color.name}
                      hsl={color.hsl}
                    >
                      <ColoredCircle hsl={color.hsl} />
                      {color.name}
                    </ColorSchemeButton>
                  </li>
                ))}
              </ul>
            </Menu>
          )}
        </SettingsButton>
      </React.Fragment>
    );
  }
}
