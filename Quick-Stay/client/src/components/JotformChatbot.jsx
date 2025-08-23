import { useState } from "react";

export default function JotformChatbot() {
  const [showChat, setShowChat] = useState(false);

  const toggleChat = () => setShowChat(!showChat);

  return (
    <>
      {/* ✅ Avatar Button */}
      <button
        onClick={toggleChat}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 10000,
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
        }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png" // ✅ Replace with your image if needed
          alt="Chatbot Avatar"
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          }}
        />
      </button>

      {/* ✅ Chatbox */}
      {showChat && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "320px",
            height: "420px",
            zIndex: 9999,
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 0 20px rgba(0,0,0,0.25)",
          }}
        >
          <iframe
            title="Jotform Chatbot"
            src="https://www.jotform.com/agent/019883759af0711eac3b8a9eb6242a98a6cd"
            width="100%"
            height="100%"
            style={{ border: "none" }}
            allow="camera; microphone; autoplay"
          />
        </div>
      )}
    </>
  );
}
