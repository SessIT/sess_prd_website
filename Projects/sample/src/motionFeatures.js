// framer-motion's animation engine, loaded asynchronously by <LazyMotion> in
// App.jsx. Components on the critical path (Header, EnquiryButtons) use the
// lightweight `m` components, so the main bundle doesn't carry the full engine.
export { domAnimation as default } from 'framer-motion';
