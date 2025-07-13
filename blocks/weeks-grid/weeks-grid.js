import { showModal } from '../modals/modals.js';

// Week-wise topics data
const weekTopics = {
 week1: [
    { id: 'w1t1', name: 'Introduction to web development', completed: false },
    { id: 'w1t2', name: 'Components of web development', completed: false },
    { id: 'w1t3', name: 'Introduction to web tools', completed: false },
    { id: 'w1t4', name: 'Version of HTML', completed: false },
    { id: 'w1t5', name: 'HTML Skeleton', completed: false },
    { id: 'w1t6', name: 'Headings, header, footer', completed: false },
    { id: 'w1t7', name: 'Div, Span, Section, Article, Aside', completed: false },
    { id: 'w1t8', name: 'Link and Button', completed: false },
    { id: 'w1t9', name: 'Listing (UL, OL, DL)', completed: false },
    { id: 'w1t10', name: 'Table', completed: false },
    { id: 'w1t11', name: 'HTML validation', completed: false },
    { id: 'w1t12', name: 'P-tags', completed: false },
    { id: 'w1t13', name: 'Best practices for HTML', completed: false },
    { id: 'w1t14', name: 'Icons and Nav', completed: false },
    { id: 'w1t15', name: 'Forms', completed: false },
    { id: 'w1t16', name: 'Image, Video, Audio', completed: false },
    { id: 'w1t17', name: 'Iframe', completed: false },
    { id: 'w1t18', name: 'SVG and Canvas', completed: false },
  ],
  week2: [
    { id: 'w2t1', name: 'Introduction to CSS', completed: false },
    { id: 'w2t2', name: 'Why CSS and CSS versions', completed: false },
    { id: 'w2t3', name: 'How to include CSS in HTML pages', completed: false },
    { id: 'w2t4', name: 'CSS naming convention', completed: false },
    { id: 'w2t5', name: 'Writing CSS: Selectors and Properties', completed: false },
    { id: 'w2t6', name: 'CSS Font property', completed: false },
    { id: 'w2t7', name: 'CSS text property', completed: false },
    { id: 'w2t8', name: 'CSS Specificity', completed: false },
    { id: 'w2t9', name: 'CSS Box property', completed: false },
    { id: 'w2t10', name: 'Creating layouts', completed: false },
    { id: 'w2t11', name: 'Optimizing CSS', completed: false },
    { id: 'w2t12', name: 'Media queries', completed: false },
    { id: 'w2t13', name: 'Web testing of responsive design', completed: false },
    { id: 'w2t14', name: 'Block, inline, vs block-inline', completed: false },
    { id: 'w2t15', name: 'Introduction to SASS', completed: false },
    { id: 'w2t16', name: 'How to write maintainable CSS', completed: false },
    { id: 'w2t17', name: 'Intro to Bootstrap', completed: false },
  ],
  week3: [
    { id: 'w3t1', name: 'Introduction to JavaScript', completed: false },
    { id: 'w3t2', name: 'Why JS to be used', completed: false },
    { id: 'w3t3', name: 'How to include JS in the code', completed: false },
    { id: 'w3t4', name: 'Introduction to Webpack / package.json', completed: false },
    { id: 'w3t5', name: 'Setting up VS Code with extensions', completed: false },
    { id: 'w3t6', name: 'Naming convention', completed: false },
    { id: 'w3t7', name: 'ES6+ features', completed: false },
    { id: 'w3t8', name: 'Performance and Accessibility', completed: false },
    { id: 'w3t9', name: 'Handling form data by JS', completed: false },
    { id: 'w3t10', name: 'JS loading', completed: false },
    { id: 'w3t11', name: 'Modular JS', completed: false },
    { id: 'w3t12', name: 'DOM manipulation with JS', completed: false },
    { id: 'w3t13', name: 'Storage', completed: false },
    { id: 'w3t14', name: 'Web worker', completed: false },
    { id: 'w3t15', name: 'Fetch and Service worker', completed: false },
  ],
  week4: [
    { id: 'w4t1', name: 'Introduction to JQuery', completed: false },
    { id: 'w4t2', name: 'How to use JQuery - Demo', completed: false },
    { id: 'w4t3', name: 'Creating application: fetch an API', completed: false },
    { id: 'w4t4', name: 'Creating application: Manipulate DOM', completed: false },
    { id: 'w4t5', name: 'Introduction to Node.JS', completed: false },
    { id: 'w4t6', name: 'Native modules', completed: false },
    { id: 'w4t7', name: 'Import, Export', completed: false },
    { id: 'w4t8', name: 'Publishing package', completed: false },
    { id: 'w4t9', name: 'Responsive design', completed: false },
    { id: 'w4t10', name: 'Geolocation', completed: false },
    { id: 'w4t11', name: 'Drag and Drop', completed: false },
    { id: 'w4t12', name: 'History and Clipboard', completed: false },
  ],
};

// Initialize the topics in localStorage if not present
function initializeTopics() {
  if (!localStorage.getItem('weekTopics')) {
    localStorage.setItem('weekTopics', JSON.stringify(weekTopics));
  }
}

export default function decorate(block) {
//   console.log(block);
  let iter = 1;

  [...block.children].forEach((week) => {
    week.classList.add('progress-card');
    week.id = `${iter}`;
    iter += 1;
    week.addEventListener('click', () => {
      showModal(`week${week.id}modal`);
    });
    // console.log(week);
    // week.childern[1].classList.add('progress-info');
    const svg = document.createElement('div');
    svg.innerHTML = '<svg class="radial-progress" viewBox="0 0 36 36"> <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke-width="2" stroke-dasharray="0, 100"/></svg>';

    while (svg.firstChild) {
      week.children[1].prepend(svg.firstChild);
    }
    week.children[1].classList.add('progress-info');
  });

  window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
      event.target.classList.remove('show');
    }
  };

  initializeTopics();
}
