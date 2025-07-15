import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const hideFooter = getMetadata('hidefooter');
  if (hideFooter === 'true') {
    console.log('we are here');
    block.remove(); // Or don't render anything
    return;
  }
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta
    ? new URL(footerMeta, window.location).pathname
    : '/footer';
  // footerPathfooterMetanewURL.pathname;
  const fragment = await loadFragment(footerPath);
  
  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);
}
