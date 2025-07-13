export default function decorate(block) {
  const weeks = block.children[0];
  let iter = 0;
  [...weeks.children].forEach((week) => {
    week.classList.add('week-btn');
    week.setAttribute('watt', iter);
    iter += 1;
  });
}
