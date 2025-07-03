/* eslint-disable linebreak-style */
import { createOptimizedPicture } from '../../scripts/aem.js';
/* eslint-disable no-console */
export default async function decorate(block) {

  console.log(block);
  block.children[0].classList.add('hero-wrapper');
  const blockChild = block.querySelector('.hero-wrapper');
  blockChild.children[0].classList.add('hero-text');
  const cta = block.querySelector('.button-container');
  cta.children[0].classList.add('cta-btn');




  // block.classList.add('container');
  // block.children[0].classList.add('hero-text');
  // const text = block.querySelector('.hero-text');
  // const btnWrapper = text.children[2];
  // const anchor = btnWrapper.querySelector('a');
  // anchor.classList.add('cta-btn');
  // block.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  // console.log(anchor);
  // console.log(cta);
  // cta.classList.add('hero-cta');
  // const button = document.querySelector('hero-text');
//   console.log(button);
}
