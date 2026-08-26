import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SEO_CONFIG, DEFAULT_SEO, BASE_URL } from './seoConfig';

// Sets a <meta>/<link> tag's attribute, creating the element if missing.
function setHeadTag(selector, create, attr, value) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function setMetaByName(name, content) {
  setHeadTag(`meta[name="${name}"]`, () => {
    const m = document.createElement('meta');
    m.setAttribute('name', name);
    return m;
  }, 'content', content);
}

function setMetaByProperty(property, content) {
  setHeadTag(`meta[property="${property}"]`, () => {
    const m = document.createElement('meta');
    m.setAttribute('property', property);
    return m;
  }, 'content', content);
}

// Updates document title, description, canonical and social tags per route.
// Renders nothing — mount once inside the Router.
export default function SeoManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = SEO_CONFIG[pathname] || DEFAULT_SEO;
    const url = BASE_URL + (pathname === '/' ? '/' : pathname);

    document.title = seo.title;
    setMetaByName('description', seo.description);
    setMetaByName('twitter:title', seo.title);
    setMetaByName('twitter:description', seo.description);
    setMetaByProperty('og:title', seo.title);
    setMetaByProperty('og:description', seo.description);
    setMetaByProperty('og:url', url);
    setHeadTag('link[rel="canonical"]', () => {
      const l = document.createElement('link');
      l.setAttribute('rel', 'canonical');
      return l;
    }, 'href', url);
  }, [pathname]);

  return null;
}
