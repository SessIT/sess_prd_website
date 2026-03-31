
import React, { useEffect } from "react";

const SocialFeeds = () => {
  useEffect(() => {
    // FACEBOOK INIT (required)
    window.fbAsyncInit = function () {
      window.FB.init({
        xfbml: true,
        version: "v18.0",
      });
      window.FB.XFBML.parse();
    };

    // LOAD SCRIPTS ONLY ONCE
    const loadScript = (id, src) => {
      return new Promise((resolve) => {
        if (document.getElementById(id)) {
          resolve();
          return;
        }
        const s = document.createElement("script");
        s.id = id;
        s.src = src;
        s.async = true;
        s.onload = resolve;
        document.body.appendChild(s);
      });
    };

    Promise.all([
      loadScript("fb-sdk", "https://connect.facebook.net/en_US/sdk.js"),
      loadScript("twitter-sdk", "https://platform.twitter.com/widgets.js"),
      loadScript("insta-sdk", "https://www.instagram.com/embed.js"),
    ]).then(() => {
      // AFTER ALL LOADED → RENDER
      if (window.FB) window.FB.XFBML.parse();
      if (window.twttr) window.twttr.widgets.load();
      if (window.instgrm) window.instgrm.Embeds.process();
    });
  }, []);

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      
      {/* FACEBOOK */}
      <div style={{ width: "33%" }}>
        <h2>Facebook Feed</h2>
        <div
          className="fb-page"
          data-href="https://www.facebook.com/sesschennai"
          data-tabs="timeline"
          data-width="340"
          data-height="500"
        ></div>
      </div>

      {/* ✅ FIXED TWITTER (Single Tweet Embed) */}
      <div style={{ width: "33%" }}>
        <h2>Twitter Feed</h2>

        <blockquote className="twitter-tweet">
          <p lang="en" dir="ltr">
            May this Pongal bring new opportunities and continued success.
            <br />
            <br />
            Happy Pongal from our team to yours!!
          </p>
          &mdash; SESS (@sesschennai){" "}
          <a href="https://twitter.com/sesschennai/status/2011299219097981243">
            January 14, 2026
          </a>
        </blockquote>

      </div>

      {/* INSTAGRAM */}
      <div style={{ width: "33%" }}>
        <h2>Instagram Post</h2>
        <blockquote
          className="instagram-media"
          data-instgrm-permalink="https://www.instagram.com/p/DWDdZtFCU8b/"
          data-instgrm-version="14"
          style={{ width: "100%" }}
        ></blockquote>
      </div>

    </div>
  );
};

export default SocialFeeds;
