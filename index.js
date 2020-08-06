const BOTTOM = 'Bottom';
const TOP = 'Top';
const MIDDLE = 'Middle';
const LEFT = 'Left';
const RIGHT = 'Right';
const UNKNOWN = 'Unknown';

let state = {
  main: {
    horizontal: UNKNOWN,
    vertical: UNKNOWN
  },
  secondary: {
    horizontal: UNKNOWN,
    vertical: UNKNOWN
  }
}

const setState = newState => state = newState;

const cells = [
  { horizontal: UNKNOWN, vertical: UNKNOWN },
  { horizontal: LEFT, vertical: UNKNOWN },
  { horizontal: MIDDLE, vertical: UNKNOWN },
  { horizontal: RIGHT, vertical: UNKNOWN },
  { horizontal: UNKNOWN, vertical: TOP },
  { horizontal: LEFT, vertical: TOP },
  { horizontal: MIDDLE, vertical: TOP },
  { horizontal: RIGHT, vertical: TOP },
  { horizontal: UNKNOWN, vertical: MIDDLE },
  { horizontal: LEFT, vertical: MIDDLE },
  { horizontal: MIDDLE, vertical: MIDDLE },
  { horizontal: RIGHT, vertical: MIDDLE },
  { horizontal: UNKNOWN, vertical: BOTTOM },
  { horizontal: LEFT, vertical: BOTTOM },
  { horizontal: MIDDLE, vertical: BOTTOM },
  { horizontal: RIGHT, vertical: BOTTOM },
];

// quadrantName = main or secondary
function generateQuadrant(label, quadrantName) {
  const container = document.createElement('div');
  const header = document.createElement('h3');
  header.innerHTML = label;
  container.append(header);

  const quadrantContainer = document.createElement('div');
  quadrantContainer.className = 'quadrant container';

  for (let i = 0; i < cells.length; i++) {
    const quadrant = document.createElement('button');
    quadrant.dataset.horizontal = cells[i].horizontal;
    quadrant.dataset.vertical   = cells[i].vertical;
    if (cells[i].horizontal === state[quadrantName].horizontal
      && cells[i].vertical === state[quadrantName].vertical) {
      quadrant.classList.add('current');
    }

    quadrant.onclick = function() {
      setState({
        ...state,
        [quadrantName]: {
          horizontal: this.dataset.horizontal,
          vertical: this.dataset.vertical
        }
      });

      quadrantContainer.childNodes.forEach(child => child.classList.remove('current'));
      this.classList.add('current');

      generateSonyaImages();
    }

    quadrantContainer.append(quadrant);
  }

  container.append(quadrantContainer);
  document.querySelector('div.ui.container').append(container);
}

function generateSonyaImages() {
  const container = document.querySelector('.manip.images.container');
  container.innerHTML = '';
  console.log(data);

  const filteredData = data.filter(manip =>
    (state.main.horizontal      === UNKNOWN || state.main.horizontal      === manip.main.horizontal) &&
    (state.main.vertical        === UNKNOWN || state.main.vertical        === manip.main.vertical) &&
    (state.secondary.horizontal === UNKNOWN || state.secondary.horizontal === manip.secondary.horizontal) &&
    (state.secondary.vertical   === UNKNOWN || state.secondary.vertical   === manip.secondary.vertical));

  console.log(filteredData, state);

  for (let i = 0; i < filteredData.length; i++) {
    const imageContainer = document.createElement('div');
    imageContainer.className = 'manip image container';

    const mainHeader = document.createElement('h6');
    mainHeader.innerHTML = `${filteredData[i].main.vertical} - ${filteredData[i].main.horizontal}`;
    imageContainer.append(mainHeader);

    const secondaryHeader = document.createElement('h6');
    secondaryHeader.innerHTML = `${filteredData[i].main.vertical} - ${filteredData[i].main.horizontal}`;
    imageContainer.append(secondaryHeader);

    const additionalInfoHeader = document.createElement('h6');
    additionalInfoHeader.innerHTML = filteredData[i].additionalInfo.reduce((accu, cur, index) => {
      return accu + (index > 0 ? ', ' : '') + cur }, '') + '&nbsp';
    imageContainer.append(additionalInfoHeader);

    const image = document.createElement('img');
    image.src = `images/${filteredData[i].image}.png`
    imageContainer.append(image);

    container.append(imageContainer);
  }
}

generateQuadrant('Main Quadrant', 'main');
generateQuadrant('Secondary Quadrant', 'secondary');
generateSonyaImages();
