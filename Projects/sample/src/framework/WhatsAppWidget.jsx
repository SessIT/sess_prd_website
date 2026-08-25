import React, { useState } from "react";
import logo from "../assets/sess_fav_icon.png";
import icon from '../assets/Website_Gallery_img/whatsapp.png'

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-[99999] flex flex-col items-start gap-2">
      
      {/* ✅ Chat Box */}
      {isOpen && (
        <div className="w-72 max-w-[calc(100vw-3rem)] bg-white rounded-xl shadow-2xl overflow-hidden border">
          
          {/* Header */}
          <div className="flex items-center justify-between bg-[#222733] text-white p-3">
            <div className="flex items-center gap-2">
              <img src={logo} alt="logo" className="w-8 h-8 rounded-full" />
              <div>
                <div className="text-sm font-semibold">
                  Sri Easwari Scientific Solution Pvt Ltd
                </div>
                <div className="text-xs opacity-80">
                  HAVE A NICE DAY!!!!
                </div>
              </div>
            </div>

            {/* Close */}
            <button onClick={() => setIsOpen(false)} className="text-lg">
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-4 text-sm text-gray-700">
            <div className="font-medium mb-1">
              Sri Easwari Scientific Solution Pvt Ltd
            </div>
            <div>
              Hi, there! <br />
              How can I help you?
            </div>
          </div>

          {/* Button */}
          <div className="p-3 border-t">
            <a
              href="https://api.whatsapp.com/send?phone=919444427748&text=Hello"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-[#00b3b3] text-white py-2 rounded-lg hover:bg-[#048d8d] transition"
            >
              Start Chat
            </a>
          </div>
        </div>
      )}

      {/* ✅ WhatsApp Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-0 rounded-full shadow-lg hover:scale-110 transition flex items-center justify-center"
      >
        <img
          src={icon}
          alt="WhatsApp"
          className="w-12 h-12 object-contain"
        />
      </button>
    </div>
  );
};

export default WhatsAppWidget;