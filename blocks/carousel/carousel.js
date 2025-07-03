function initializeCarousel() {
  const buttons = document.querySelectorAll('[data-carousel-button]');
  // console.log(buttons);
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      console.log(button);
      const offset = button.dataset.carouselButton === 'next' ? 1 : -1;
      const carousel = button.closest('[data-carousel]');
      const slides = carousel.querySelector('[data-slides]');
      const activeSlide = slides.querySelector('[data-active]');
      if (!activeSlide) return; // Guard against no active slide

      let newIndex = [...slides.children].indexOf(activeSlide) + offset;

      if (newIndex < 0) newIndex = slides.children.length - 1;
      if (newIndex >= slides.children.length) newIndex = 0;

      // Remove active state from current slide
      activeSlide.removeAttribute('data-active');
      // Add active state to new slide
      slides.children[newIndex].setAttribute('data-active', 'true');
    });
  });
}

export default async function decorate(block) {
  block.setAttribute('data-carousel', '');
  // console.log(block);
  const list = document.createElement('ul');
  list.setAttribute('data-slides', '');
  let iter = 0;
  [...block.children].forEach((child) => {
    iter += 1;
    // eslint-disable-next-line space-before-blocks
    if (iter > 2) {
      const li = document.createElement('li');
      li.classList.add('carousel-item');
      li.appendChild(child);
      list.appendChild(li);
    } else {
      // console.log(child);
      child.classList.add('carousel-button');
      // maybe need to add attribute to the buttons
    }
    if (iter === 1) {
      child.classList.add('next');
      child.setAttribute('data-carousel-button', 'next');
    }
    if (iter === 2) {
      child.classList.add('prev');
      child.setAttribute('data-carousel-button', 'prev');
    }
  });

  const btPrev = document.createElement('button');
  btPrev.append(block.children[1]);
  block.prepend(btPrev);

  const btNext = document.createElement('button');
  btNext.append(block.children[1]);
  block.prepend(btNext);
  // const btNext = document.createElement('button');
  // btNext.append(block.children[0]);
  // block.prepend(btNext);
  // console.log(block);
  const div = document.createElement('div');
  [...list.children].forEach((li) => {
    li.classList.add('slide');
    li.children[0].classList.add('slide-content');
    const liChild = li.children[0];
    liChild.children[0].classList.add('slide-image');
    const textDiv = document.createElement('div');
    textDiv.append(liChild.children[1]);
    textDiv.append(liChild.children[1]);
    // textDiv.append(liChild.children[1]);
    // textDiv.append(liChild.children[1]);
    textDiv.classList.add('slide-text');
    liChild.append(textDiv);
    // liChild.children[1].classList.add('slide-text');
    // liChild.children[2].classList.add('slide-text');
  });
  list.children[0].setAttribute('data-active', '');
  div.append(list);
  div.classList.add('slides-container');
  div.classList.add('container');
  list.classList.add('slides-wrapper');

  block.append(div);
  // console.log(block);
  initializeCarousel();
}
