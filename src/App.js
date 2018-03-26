import React, { Component, createRef } from 'react';
import styled from 'styled-components';

import Reasons from './components/Reasons';
import Settings from './components/Settings';
import EditableHeader from './components/EditableHeader';
import { transition, mobileBreak } from './helpers';

import './App.css';
import logo from './logo.png';

const bigDesktopBreak = '1500px';

const StyledApp = styled.div`
  background: var(--highlight-two);
  background: linear-gradient(to right top, var(--highlight-one), var(--highlight-two));
  height: auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 2em 4em;
  @media (max-width: ${mobileBreak}) {
    font-size: 14px;
    padding: 2em 1em;
  }
  @media (min-width: ${bigDesktopBreak}) {
    padding: 2em 15%;
  }
`;

const AppNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.h1`
  margin: 0;
  display: flex;
  align-items: center;

  img {
    width: 50%;
  }
`;

const Header = styled.header`
  margin: 1em 0 3em 0;
  font-family: var(--title-font);
`;

const Main = styled.main`
  flex-grow: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 4em;
  transition: all ${transition};

  div:first-child {
    margin-right: 5%;
  }
  @media (max-width: ${mobileBreak}) {
    grid-column-gap: 0;

    display: flex;

    background: var(--white);
    border-radius: 10px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.25);

    div:first-child {
      margin: 0;
    }
  }
`;

const ReasonsContainer = styled.div`
  background: var(--white);
  width: 100%;
  padding: 4em 2em 2em 2em;
  border-radius: 10px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
  position: relative;
  font-family: var(--body-font);
  transition: all ${transition};

  button {
    opacity: 0;
  }
  &:hover button {
    opacity: 1;
  }
  @media (max-width: ${mobileBreak}) {
    box-shadow: 0 0 0 0 transparent;
    background: transparent;
    padding: 4em 1.25em 1.25em 1.25em;

    ${'' /* display: block; */};
    display: flex;
    ${'' /* min-height: 100vh; */};

    button {
      opacity: 1;
    }
  }
`;

const SectionTitle = styled.h2`
  color: var(--white);
  background-color: ${props =>
    props.type === 'pros' ? 'var(--highlight-two)' : 'var(--highlight-one)'};

  text-transform: uppercase;
  font-size: 2.25em;
  font-style: italic;
  font-weight: bold;
  font-family: var(--title-font);

  position: absolute;
  z-index: 1;

  padding: 0.25em 0.6em 0.15em 0.5em;
  margin: 0;
  top: 0;
  left: -1rem;

  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.15);
  transform-origin: bottom left;
  transform: rotate(-9deg);

  @media (max-width: ${mobileBreak}) {
    left: 1rem;
    top: -0.5rem;
    font-size: 2em;
  }
`;

const Footer = styled.footer`
  opacity: 0.5;
  padding-top: 3em;
  text-align: center;
  font-family: var(--body-font);
  color: var(--white);
  font-size: 0.75em;
  transition: opacity ${transition};
  &:hover {
    opacity: 1;
  }

  p {
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
    padding-bottom: 0.25em;
    transition: box-shadow ${transition};
    box-shadow: 0 2px 0 0 var(--white);
    &:hover {
      box-shadow: 0 3px 0 0 var(--white);
    }
  }
`;

class App extends Component {
  state = {
    title: '',
    pros: [
      {
        id: 10001,
        text: 'A pro',
      },
      {
        id: 20002,
        text: 'Another pro',
      },
      {
        id: 30003,
        text: 'And another one',
      },
    ],
    cons: [
      {
        id: 10002,
        text: 'A con',
      },
      {
        id: 20003,
        text: 'Another con',
      },
      {
        id: 40003,
        text:
          'Another con but this time a very long one so we are sure it makes it to the next line',
      },
      {
        id: 30004,
        text: 'And another one',
      },
    ],
  };

  async componentWillMount() {
    // Reinstate our local storage
    const localStorageRef = localStorage.getItem('tough-choice-state');
    if (localStorageRef) {
      this.setState(JSON.parse(localStorageRef));
    }
  }

  componentDidUpdate() {
    // Store data in local storage
    const currentState = JSON.stringify(this.state);
    localStorage.setItem('tough-choice-state', currentState);
  }

  proRef = createRef();
  conRef = createRef();

  handleSubmit = event => {
    // Stop form from submitting
    event.preventDefault();

    // Store type
    const type = event.target.name;
    const ref = type === 'pros' ? this.proRef : this.conRef;

    // Store data
    const userInput = {
      id: Date.now(),
      text: ref.current.value,
    };

    // If text is empty, return 0
    if (!userInput.text) return 0;

    // Otherwise push data to state
    const newElement = [...this.state[type], userInput];
    this.setState({ [type]: newElement });

    // Refresh the form
    event.currentTarget.reset();
  };

  deleteEntry = (type, id) => {
    // Get current state
    const stateToFilter = { ...this.state };

    // Filter out using parameters received
    const newState = stateToFilter[type].filter(el => el.id !== id);

    // Update state with new results
    this.setState({
      [type]: newState,
    });
  };

  updateTitle = value => {
    this.setState({ title: value });
  };

  render() {
    return (
      <StyledApp>
        <AppNav>
          <Logo>
            <img src={logo} alt="Tough Choice logo" />
          </Logo>
          <Settings />
        </AppNav>
        <Header>
          <EditableHeader
            placeholder="What is on your mind?"
            value={this.state.title}
            updateTitle={this.updateTitle}
          />
        </Header>
        <Main>
          <ReasonsContainer>
            <SectionTitle type="pros">Pros</SectionTitle>
            <Reasons
              name="pros"
              input="+   Add a Pro..."
              list={this.state.pros}
              handleSubmit={this.handleSubmit}
              deleteEntry={this.deleteEntry}
              passMyRef={this.proRef}
            />
          </ReasonsContainer>

          <ReasonsContainer>
            <SectionTitle type="cons">Cons</SectionTitle>
            <Reasons
              name="cons"
              input="+   Add a Con..."
              list={this.state.cons}
              handleSubmit={this.handleSubmit}
              deleteEntry={this.deleteEntry}
              passMyRef={this.conRef}
            />
          </ReasonsContainer>
        </Main>
        <Footer>
          <p>
            &copy; {new Date().getFullYear()}{' '}
            <a href="https://kuroikyu.com" target="_blank" rel="noopener noreferrer">
              Kuroi Kyu
            </a>
          </p>
        </Footer>
      </StyledApp>
    );
  }
}

// export default App;
export { App as default, transition };
