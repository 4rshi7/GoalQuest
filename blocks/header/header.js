import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 900px)');

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = document.getElementById('nav');
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector(
      '[aria-expanded="true"]',
    );
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections);
      navSectionExpanded.focus();
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections);
      nav.querySelector('button').focus();
    }
  }
}

function closeOnFocusLost(e) {
  const nav = e.currentTarget;
  if (!nav.contains(e.relatedTarget)) {
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector(
      '[aria-expanded="true"]',
    );
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections, false);
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections, false);
    }
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused.className === 'nav-drop';
  if (isNavDrop && (e.code === 'Enter' || e.code === 'Space')) {
    const dropExpanded = focused.getAttribute('aria-expanded') === 'true';
    // eslint-disable-next-line no-use-before-define
    toggleAllNavSections(focused.closest('.nav-sections'));
    focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
  }
}

function focusNavSection() {
  document.activeElement.addEventListener('keydown', openOnKeydown);
}

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
  sections
    .querySelectorAll('.nav-sections .default-content-wrapper > ul > li')
    .forEach((section) => {
      section.setAttribute('aria-expanded', expanded);
    });
}

/**
 * Toggles the entire nav
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded = forceExpanded !== null
    ? !forceExpanded
    : nav.getAttribute('aria-expanded') === 'true';
  // expandedforceExpandednull!forceExpanded
  // const button = nav.querySelector('.nav-hamburger button');
  document.body.style.overflowY = expanded || isDesktop.matches ? '' : 'hidden';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  toggleAllNavSections(
    navSections,
    expanded || isDesktop.matches ? 'false' : 'true',
  );

  // commented out to avoid conflict with the hamburger button
  // button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  // enable nav dropdown keyboard accessibility
  const navDrops = navSections.querySelectorAll('.nav-drop');
  if (isDesktop.matches) {
    navDrops.forEach((drop) => {
      if (!drop.hasAttribute('tabindex')) {
        drop.setAttribute('tabindex', 0);
        drop.addEventListener('focus', focusNavSection);
      }
    });
  } else {
    navDrops.forEach((drop) => {
      drop.removeAttribute('tabindex');
      drop.removeEventListener('focus', focusNavSection);
    });
  }

  // enable menu collapse on escape keypress
  if (!expanded || isDesktop.matches) {
    // collapse menu on escape press
    window.addEventListener('keydown', closeOnEscape);
    // collapse menu on focus lost
    nav.addEventListener('focusout', closeOnFocusLost);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
    nav.removeEventListener('focusout', closeOnFocusLost);
  }
}

function showSidebar() {
  const sidebar = document.querySelector('.nav-tools');
  sidebar.style.display = 'flex';
}

// Close sidebar
function closeSidebar() {
  const sidebar = document.querySelector('.nav-tools');
  sidebar.style.display = 'none';
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */

function toggleTheme() {
  const html = document.documentElement;

  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  if (currentTheme === 'dark') {
    html.removeAttribute('data-theme');
  } else {
    html.setAttribute('data-theme', 'dark');
  }

  // Save theme preference
  localStorage.setItem('theme', newTheme);
}

function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
}

function toggleMarkup() {
  const navUl = document.querySelector('.nav-sections ul');
  const isSignedwrapper = navUl.querySelector('li:nth-of-type(5)');
  const signin = isSignedwrapper.querySelector('em:nth-of-type(1)');
  const signout = isSignedwrapper.querySelector('em:nth-of-type(2)');
  const session = localStorage.getItem('isSignedIn');

  if (session === 'true') {
    signin.style.display = 'none';
    signout.style.display = 'block';
  } else {
    signin.style.display = 'block';
    signout.style.display = 'none';
  }
}
function toggleSession() {
  const session = localStorage.getItem('isSignedIn');
  if (session === 'true') {
    const weekTopics = JSON.parse(localStorage.getItem('weekTopics'));
    ['week1', 'week2', 'week3', 'week4', 'week5'].forEach((week) => {
      weekTopics[week].forEach((task) => {
      // console.log(task);
      // console.log(task.completed);
        task.completed = false;
        console.log(task.completed);
      });
    });
    localStorage.setItem('weekTopics', JSON.stringify(weekTopics));
    localStorage.setItem('isSignedIn', 'false');
    const html = document.documentElement;
    html.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
    window.location.href = '/';
    toggleMarkup();
  } else {
    localStorage.setItem('isSignedIn', 'true');
    toggleMarkup();
  }
}

export default async function decorate(block) {
  // load nav as fragment
  const hideHeader = getMetadata('hideheader');
  //  console.log(hideHeader);
  if (hideHeader === 'true') {
    console.log('we are here');
    block.remove(); // Or don't render anything
    return;
  }
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  // navPathnavMetanewURL.pathname;
  const fragment = await loadFragment(navPath);

  // decorate nav DOM
  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  const classes = ['brand', 'sections', 'tools'];
  classes.forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  const navBrand = nav.querySelector('.nav-brand');
  const brandLink = navBrand.querySelector('.button');
  if (brandLink) {
    brandLink.className = '';
    brandLink.closest('.button-container').className = '';
  }

  const navSections = nav.querySelector('.nav-sections');
  if (navSections) {
    navSections
      .querySelectorAll(':scope .default-content-wrapper > ul > li')
      .forEach((navSection) => {
        if (navSection.querySelector('ul')) navSection.classList.add('nav-drop');
        navSection.addEventListener('click', () => {
          if (isDesktop.matches) {
            const expanded = navSection.getAttribute('aria-expanded') === 'true';
            toggleAllNavSections(navSections);
            navSection.setAttribute(
              'aria-expanded',
              expanded ? 'false' : 'true',
            );
          }
        });
      });
  }

  // hamburger for mobile
  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>`;
  hamburger.addEventListener('click', () => toggleMenu(nav, navSections));
  // commented out to avoid conflict with the hamburger button
  // nav.prepend(hamburger);
  nav.setAttribute('aria-expanded', 'false');
  // prevent mobile nav behavior on window resize
  toggleMenu(nav, navSections, isDesktop.matches);
  isDesktop.addEventListener('change', () => toggleMenu(nav, navSections, isDesktop.matches));

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);

  const hamburg = block.querySelector('.nav-sections p');
  const closer = block.querySelector('.nav-tools p');

  hamburg.addEventListener('click', () => {
    showSidebar();
  });

  closer.addEventListener('click', () => {
    closeSidebar();
  });
  // console.log(hamburg);

  const navUl = block.querySelector('.nav-sections ul');
  const themeToggle = navUl.querySelector('li:last-of-type');
  themeToggle.style.cursor = 'pointer';
  themeToggle.addEventListener('click', () => {
    toggleTheme();
  });

  const isSignedwrapper = navUl.querySelector('li:nth-of-type(5)');
  const session = localStorage.getItem('isSignedIn');
  const signin = isSignedwrapper.querySelector('em:nth-of-type(1)');
  const signout = isSignedwrapper.querySelector('em:nth-of-type(2)');
  if (session === 'true') {
    signin.style.display = 'none';
  } else {
    signout.style.display = 'none';
  }
  signin.addEventListener('click', () => {
    console.log('you were here');
    console.log('signed in');
    window.location.href = '/signin';
    toggleSession();
  });
  signout.addEventListener('click', () => {
    console.log('signed out');
    toggleSession();
  });
  initializeTheme();
}
