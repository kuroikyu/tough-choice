const transitionTime = '0.15s';
const transitionType = 'ease';
const transition = `${transitionTime} ${transitionType}`;

const mobileBreak = '700px';
const bigDesktopBreak = '1500px';

export function rando(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomTitle() {
  const titles = ['What is on your mind?', 'Choose a topic', 'Type in your topic'];
  return rando(titles);
}

export { transition, transitionTime, transitionType, mobileBreak, bigDesktopBreak, randomTitle };
