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
  week5: [
    // Day 1: EDS Setup and Getting Started
    { id: 'w5t1', name: 'System setup with basic tools', completed: false },
    { id: 'w5t2', name: 'Get familiar with IDE - VS Code', completed: false },
    { id: 'w5t3', name: 'Get familiar with tools like Maven, Git', completed: false },
    { id: 'w5t4', name: 'Build basic website with EDS', completed: false },
    { id: 'w5t5', name: 'Boilerplate code', completed: false },
    { id: 'w5t6', name: 'EDS Bot setup', completed: false },
    { id: 'w5t7', name: 'Content Folder setup (google drive)', completed: false },
    { id: 'w5t8', name: 'EDS sidekick setup', completed: false },
    { id: 'w5t9', name: 'Preview and publish content', completed: false },
    { id: 'w5t10', name: 'Changing content and reflect on preview/live site', completed: false },
    { id: 'w5t11', name: 'Changing styling, test locally and deploy to preview/publish', completed: false },

    // Day 2: EDS Developer Fundamentals
    { id: 'w5t12', name: 'Exploring the structure of an EDS project', completed: false },
    { id: 'w5t13', name: 'Structure of EDS document', completed: false },
    { id: 'w5t14', name: 'Markup', completed: false },
    { id: 'w5t15', name: 'Blocks', completed: false },
    { id: 'w5t16', name: 'Auto-Blocks', completed: false },
    { id: 'w5t17', name: 'Understanding the architecture of EDS (under the hoods)', completed: false },
    { id: 'w5t18', name: 'Building a custom Block', completed: false },
    { id: 'w5t19', name: 'Web Performance', completed: false },
    { id: 'w5t20', name: 'Google Page Speed Insights', completed: false },
    { id: 'w5t21', name: '100 score with Franklin', completed: false },
    { id: 'w5t22', name: 'EDS Admin API', completed: false },

    // Day 3: Authoring and Publishing Content with EDS
    { id: 'w5t23', name: 'Authoring content: Text Content', completed: false },
    { id: 'w5t24', name: 'Authoring content: Images', completed: false },
    { id: 'w5t25', name: 'Authoring content: Videos', completed: false },
    { id: 'w5t26', name: 'Authoring content: Links', completed: false },
    { id: 'w5t27', name: 'Authoring content: Sections', completed: false },
    { id: 'w5t28', name: 'Authoring content: Blocks', completed: false },
    { id: 'w5t29', name: 'Preview and publish content (Day 3)', completed: false },
    { id: 'w5t30', name: 'Delete content', completed: false },
    { id: 'w5t31', name: 'Redirects', completed: false },
    { id: 'w5t32', name: 'Placeholders', completed: false },
    { id: 'w5t33', name: 'Metadata on content', completed: false },
    { id: 'w5t34', name: 'Bulk Metadata', completed: false },

    // Day 4: Understanding Blocks
    { id: 'w5t35', name: 'Understand the Boilerplate EDS Blocks: Headings', completed: false },
    { id: 'w5t36', name: 'Understand the Boilerplate EDS Blocks: Text', completed: false },
    { id: 'w5t37', name: 'Understand the Boilerplate EDS Blocks: Images', completed: false },
    { id: 'w5t38', name: 'Understand the Boilerplate EDS Blocks: Lists', completed: false },
    { id: 'w5t39', name: 'Understand the Boilerplate EDS Blocks: Links', completed: false },
    { id: 'w5t40', name: 'Understand the Boilerplate EDS Blocks: Buttons', completed: false },
    { id: 'w5t41', name: 'Understand the Boilerplate EDS Blocks: Code', completed: false },
    { id: 'w5t42', name: 'Understand the Boilerplate EDS Blocks: Sections', completed: false },
    { id: 'w5t43', name: 'Understand the Boilerplate EDS Blocks: Icons', completed: false },
    { id: 'w5t44', name: 'Understand the Boilerplate EDS Blocks: Hero', completed: false },
    { id: 'w5t45', name: 'Understand the Boilerplate EDS Blocks: Columns', completed: false },
    { id: 'w5t46', name: 'Understand the Boilerplate EDS Blocks: Cards', completed: false },
    { id: 'w5t47', name: 'Understand the Boilerplate EDS Blocks: Header', completed: false },
    { id: 'w5t48', name: 'Understand the Boilerplate EDS Blocks: Footer', completed: false },
    { id: 'w5t49', name: 'Understand the Boilerplate EDS Blocks: Metadata', completed: false },
    { id: 'w5t50', name: 'Understand the Boilerplate EDS Blocks: Section Metadata', completed: false },
    { id: 'w5t51', name: 'Understand the Additional Blocks: Embed', completed: false },
    { id: 'w5t52', name: 'Understand the Additional Blocks: Fragment', completed: false },
    { id: 'w5t53', name: 'Explore Block Party', completed: false },

    // Day 5: Spreadsheets, Indexing and SEO
    { id: 'w5t54', name: 'Understand the usage of Spreadsheets with EDS: Exporting data in spreadsheet as JSON', completed: false },
    { id: 'w5t55', name: 'Understand the usage of Spreadsheets with EDS: Creating structured content and consuming in website', completed: false },
    { id: 'w5t56', name: 'Understand how to manage index of all published pages: Setting Up an Initial Query Index', completed: false },
    { id: 'w5t57', name: 'Understand how to manage index of all published pages: Setting Up Properties to be Added to the Index', completed: false },
    { id: 'w5t58', name: 'Understand how to manage index of all published pages: Activate Your Index', completed: false },
    { id: 'w5t59', name: 'Understand how to manage index of all published pages: Checking Your Index', completed: false },
    { id: 'w5t60', name: 'Understand how to manage index of all published pages: Debugging Your Index Configuration', completed: false },
    { id: 'w5t61', name: 'Understand how to manage index of all published pages: Setting Up More Index Configurations', completed: false },
    { id: 'w5t62', name: 'Understand how to manage SEO aspects: Sitemap', completed: false },
    { id: 'w5t63', name: 'Understand how to manage SEO aspects: .hlxignore', completed: false },
    { id: 'w5t64', name: 'Understand how to manage SEO aspects: Robots.txt', completed: false },

    // Day 6: Crosswalk Overview, Architecture, Universal Editor
    { id: 'w5t65', name: 'Overview of Edge delivery services with AEM authoring', completed: false },
    { id: 'w5t66', name: 'Recorded session – AEM authoring with EDS', completed: false },
    { id: 'w5t67', name: 'Understanding Universal Editor', completed: false },

    // Day 7: Crosswalk Dev set up
    { id: 'w5t68', name: 'Setup EDS demo site with AEM Based authoring (Universal editor)', completed: false },
    { id: 'w5t69', name: 'Understanding paths.json', completed: false },

    // Day 8: Crosswalk Blocks
    { id: 'w5t70', name: 'Understanding block models: Component Definition', completed: false },
    { id: 'w5t71', name: 'Understanding block models: Component Filters', completed: false },
    { id: 'w5t72', name: 'Understanding block models: Component Models', completed: false },
    { id: 'w5t73', name: 'Understand models, fields and component types', completed: false },
    { id: 'w5t74', name: 'Understanding Spreadsheets (Crosswalk Blocks): Placeholders sheet', completed: false },
    { id: 'w5t75', name: 'Understanding Spreadsheets (Crosswalk Blocks): Bulk Metadata sheet', completed: false },
    { id: 'w5t76', name: 'Understanding Spreadsheets (Crosswalk Blocks): Redirects sheet', completed: false },
    { id: 'w5t77', name: 'Understanding Spreadsheets (Crosswalk Blocks): Headers sheet', completed: false },
    { id: 'w5t78', name: 'Understanding Taxonomy', completed: false },
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
  console.log(weekTopics);
  initializeTopics();
}
