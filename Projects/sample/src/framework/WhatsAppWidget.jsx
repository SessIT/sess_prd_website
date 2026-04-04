import React, { useEffect } from "react";
import logo from '../assets/sess_fav_icon.png'

const WhatsAppWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://wati-integration-service.clare.ai/ShopifyWidget/shopifyWidget.js?27777";
    script.async = true;

    script.onload = () => {
      window.CreateWhatsappChatWidget({
        enabled: true,
        chatButtonSetting: {
          backgroundColor: "#00b3b3",
          ctaText: "",
          borderRadius: "25",
          marginLeft: "25",
          marginBottom: "50",
          marginRight: "50",
          position: "left",
        },
        brandSetting: {
          brandName: "Sri Easwari Scientific Solution Pvt Ltd",
          brandSubTitle: "HAVE A NICE DAY!!!!",
          brandImg:logo,
          welcomeText: "Hi, there!\nHow can I help you?",
          messageText: "Hello, I have a question about {{page_link}}",
          backgroundColor: "#222733",
          ctaText: "Start Chat",
          borderRadius: "25",
          autoShow: false,
          phoneNumber: "+919444427748",
        },
      });

      // ✅ IMPORTANT: Wait until WATI renders DOM
      const removeBranding = setInterval(() => {
        const el = document.querySelector(".wa-chat-box-poweredby");
        if (el) {
          el.remove(); // 🔥 REMOVE TEXT COMPLETELY
          clearInterval(removeBranding);
        }
      }, 10);
    }

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default WhatsAppWidget;