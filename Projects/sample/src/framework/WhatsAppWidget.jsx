import React, { useEffect } from 'react';

const WhatsAppWidget = () => {
  useEffect(() => {
    // Load WhatsApp widget script
    const script = document.createElement('script');
    script.src = 'https://wati-integration-service.clare.ai/ShopifyWidget/shopifyWidget.js?27777';
    script.async = true;
    
    script.onload = () => {
      window.CreateWhatsappChatWidget({
        enabled: true,
        chatButtonSetting: {
          backgroundColor: "#4dc247",
          ctaText: "",
          borderRadius: "25",
          marginLeft: "25",
          marginBottom: "50",
          marginRight: "50",
          position: "left"
        },
        brandSetting: {
          brandName: "Sri Easwari Scientific Solution Pvt Ltd",
          brandSubTitle: "HAVE A NICE DAY!!!!",
          brandImg: "/images/logo-full-white1.png",
          welcomeText: "Hi, there!\nHow can I help you?",
          messageText: "Hello, I have a question about {{page_link}}",
          backgroundColor: "#076416",
          ctaText: "Start Chat",
          borderRadius: "25",
          autoShow: false,
          phoneNumber: "+919444427748"
        }
      });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default WhatsAppWidget;