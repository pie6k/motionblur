// <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="filters">
// 	<defs>
// 		<filter id="blur">
// 			<feGaussianBlur in="SourceGraphic" stdDeviation="0,0" />
// 		</filter>
// 	</defs>
// </svg>

import { generateId } from './id';
import { Point } from './point';

const SVG_NS = 'http://www.w3.org/2000/svg';

function createSvgElement(type: string) {
  return document.createElementNS(SVG_NS, type);
}

export function createBlurSvg() {
  // const svg = document.createElement('svg') as SVGElement;

  const svg = createSvgElement('svg');

  svg.setAttribute('version', '1.1');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.classList.add('motionblur-svg');

  const defs = createSvgElement('defs');
  const filter = createSvgElement('filter');

  const filterId = generateId();

  filter.id = filterId;

  const blurFilter = createSvgElement('feGaussianBlur');

  blurFilter.setAttribute('stdDeviation', '0,0');
  blurFilter.setAttribute('edgeMode', 'duplicate');
  blurFilter.setAttribute('in', 'SourceGraphic');

  filter.appendChild(blurFilter);

  defs.appendChild(filter);

  svg.appendChild(defs);

  document.body.appendChild(svg);

  function destroy() {}

  function setBlur({ x, y }: Point) {
    blurFilter.setAttribute('stdDeviation', `${x},${y}`);
  }

  function getId() {
    return filterId;
  }

  function applyTo(element: HTMLElement) {
    element.style.filter = `url(#${filterId})`;
    element.style.transform = 'translate3d(0,0,0)';
    element.style.willChange = 'filter, transform';

    return function cancel() {};
  }

  return {
    destroy,
    setBlur,
    getId,
    applyTo,
  };
}
