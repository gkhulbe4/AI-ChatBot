import { useState } from "react";
import "./App.css";
import axios from "axios";
import { User, Bot, Loader, SendHorizontal } from "lucide-react";

function App() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function sendMessage() {
    setMessage("");
    setLoading(true);
    const userMessage = { sender: "user", text: message };
    setChatHistory([...chatHistory, userMessage]);
    try {
      const res = await axios.post("http://127.0.0.1:5000/chat", { message });
      const botReply = {
        sender: "bot",
        text: res.data.message.replace(/\*\*/g, "").replace(/\*/g, "\n"),
      };
      setChatHistory((prevHistory) => [...prevHistory, botReply]);
      // console.log(res.data.message);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="chatbot">
      <div className="chat-window">
        {error == true ? (
          <h1 className="error">Something went wrong :(</h1>
        ) : (
          chatHistory.map((chat, index) => (
            <div key={index} className={`chat-message ${chat.sender}`}>
              <div className="chat-icon">
                {chat.sender === "user" ? (
                  <User size={24} />
                ) : (
                  <Bot size={24} />
                )}
              </div>
              <span>{chat.text}</span>
            </div>
          ))
        )}
      </div>
      {loading && (
        <div className="loading">
          <Loader size={32} className="loader-icon" />
        </div>
      )}
      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={() => sendMessage()}>
          <SendHorizontal size={20} />
        </button>
      </div>
    </div>
  );
}

export default App;
