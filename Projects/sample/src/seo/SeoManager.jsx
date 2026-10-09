import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { resolveSeo } from './seoConfig';

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

// Updates document title, description, keywords, canonical, robots, social
// tags and JSON-LD per route. Renders nothing — mount once inside the Router.
// The same values are prerendered into static HTML at build (vite.config.js).
export default function SeoManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
    const seo = resolveSeo(path);

    document.title = seo.title;
    setMetaByName('description', seo.description);
    setMetaByName('keywords', seo.keywords);
    setMetaByName('robots', seo.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');
    setMetaByName('twitter:title', seo.title);
    setMetaByName('twitter:description', seo.description);
    setMetaByName('twitter:image', seo.image);
    setMetaByProperty('og:title', seo.title);
    setMetaByProperty('og:description', seo.description);
    setMetaByProperty('og:url', seo.url);
    setMetaByProperty('og:image', seo.image);
    setMetaByProperty('og:image:secure_url', seo.image);
    setHeadTag('link[rel="canonical"]', () => {
      const l = document.createElement('link');
      l.setAttribute('rel', 'canonical');
      return l;
    }, 'href', seo.url);

    let ld = document.head.querySelector('script#seo-jsonld');
    if (!ld) {
      ld = document.createElement('script');
      ld.id = 'seo-jsonld';
      ld.type = 'application/ld+json';
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify(seo.jsonLd);
  }, [pathname]);

  return null;
}
