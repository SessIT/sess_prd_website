// Google reCAPTCHA v2 ("I'm not a robot") for the EmailJS forms.
//
// EmailJS verifies the token itself when "reCAPTCHA V2 verification" is
// enabled on the template (EmailJS dashboard → Email Templates → Settings),
// using the same reCAPTCHA *secret* key entered there. The site only has to
// send the token as the `g-recaptcha-response` template parameter.
//
// Off until VITE_RECAPTCHA_SITE_KEY is set: with no key this renders nothing
// and the forms send exactly as before. Roll-out order matters — deploy a
// build with the site key FIRST, then enable verification in EmailJS;
// enabling it first would reject every form submission.
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
export const RECAPTCHA_ENABLED = Boolean(SITE_KEY);

// Extra EmailJS params for a submission (empty when reCAPTCHA is off).
export const captchaParams = (token) => (RECAPTCHA_ENABLED ? { 'g-recaptcha-response': token } : {});

// Google's script, loaded once and only when a form with the widget mounts.
let scriptPromise;
function loadRecaptcha() {
  if (window.grecaptcha?.render) return Promise.resolve(window.grecaptcha);
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      window.__sessRecaptchaReady = () => resolve(window.grecaptcha);
      const s = document.createElement('script');
      s.src = 'https://www.google.com/recaptcha/api.js?onload=__sessRecaptchaReady&render=explicit';
      s.async = true;
      s.defer = true;
      s.onerror = () => { scriptPromise = null; reject(new Error('reCAPTCHA failed to load')); };
      document.head.appendChild(s);
    });
  }
  return scriptPromise;
}

export const ReCaptcha = forwardRef(function ReCaptcha({ onChange, theme = 'light', style }, ref) {
  const box = useRef(null);
  const widgetId = useRef(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useImperativeHandle(ref, () => ({
    // Tokens are single-use: reset after every send attempt.
    reset() {
      if (widgetId.current !== null) window.grecaptcha?.reset(widgetId.current);
      onChangeRef.current?.('');
    },
  }), []);

  useEffect(() => {
    if (!RECAPTCHA_ENABLED) return undefined;
    let cancelled = false;
    loadRecaptcha()
      .then((g) => {
        if (cancelled || !box.current || widgetId.current !== null) return;
        widgetId.current = g.render(box.current, {
          sitekey: SITE_KEY,
          theme,
          callback: (token) => onChangeRef.current?.(token),
          'expired-callback': () => onChangeRef.current?.(''),
          'error-callback': () => onChangeRef.current?.(''),
        });
      })
      .catch((err) => console.error(err));
    return () => { cancelled = true; };
  }, [theme]);

  if (!RECAPTCHA_ENABLED) return null;
  // 304×78 is the widget's fixed size; reserving it avoids a layout shift.
  return <div ref={box} style={{ minHeight: 78, maxWidth: '100%', overflow: 'hidden', ...style }} />;
});

export const CAPTCHA_REQUIRED_MESSAGE = 'Please tick “I’m not a robot” before submitting.';
