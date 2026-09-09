// Tiny event bus so any component (Header, ProductHero, carousels…) can open
// the globally-mounted EnquiryModal without prop drilling.
// EnquiryButtons.jsx listens for this event and opens the modal,
// pre-filling the product name when one is passed.

export const OPEN_ENQUIRY_EVENT = 'sess:open-enquiry';
export const OPEN_SEARCH_EVENT = 'sess:open-search';

export function openEnquiry(product = '') {
  window.dispatchEvent(
    new CustomEvent(OPEN_ENQUIRY_EVENT, { detail: { product } })
  );
}

// The search overlay lives at App level (EnquiryButtons) rather than in the
// Header: the Header remounts on route change, which would orphan the
// overlay's exit animation and leave an invisible click-blocking layer.
export function openSearch() {
  window.dispatchEvent(new CustomEvent(OPEN_SEARCH_EVENT));
}

// Opens the globally-mounted BrochureModal. Pass the product name shown in the
// hero (e.g. 'Walk-in Chamber') to force that product's brochure; with no
// argument the modal picks the brochure for the current route.
export const OPEN_BROCHURE_EVENT = 'sess:open-brochure';

export function openBrochure(product = '') {
  window.dispatchEvent(
    new CustomEvent(OPEN_BROCHURE_EVENT, { detail: { product } })
  );
}
