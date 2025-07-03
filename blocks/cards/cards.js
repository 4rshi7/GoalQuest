/* eslint-disable padded-blocks */
/* eslint-disable max-len */
/* eslint-disable no-console */
import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
// const container = document.querySelector('.cards-container');

// // 
 
// // Create the wrapper div
// const wrapper = document.createElement('div');
// wrapper.className = 'wrapper';
 
// // Move the first and second children into the wrapper
// while (container.firstChild) {
//   wrapper.appendChild(container.firstChild);
// }
// // Append the wrapper to the container
// container.appendChild(wrapper);
  // block.classList.add('container');
  [...block.children].forEach((child) => {
    // console.log(child);
    child.classList.add('feature-card');
    // child.classlist.add('feature-card');
    // child.firstElementChild.classList.add('icon');
  });

  // console.log(block);
  /* change to ul, li */
  // ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
}
