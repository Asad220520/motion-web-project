import React, { useState, useEffect, useRef } from "react";
import "./ChatDesktop.scss";
import defaultAvatar from "../../../assets/images/defaultAvatar.png";
import { FiPaperclip, FiMic, FiSmile } from "react-icons/fi";
import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";
import Button from "../../../components/Button/Button";
import { FaArrowLeft } from "react-icons/fa";

const chats = [
  { id: 1, name: "Друзья навеки", roomName: "general", avatar: defaultAvatar },
  { id: 2, name: "Ира", roomName: "ira", avatar: defaultAvatar },
];

const ChatDesktop = () => {
  const [activeChat, setActiveChat] = useState(chats[0].id);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef(null);
  const token = useSelector((state) => state.auth.tokens?.access);
  console.log("token", token);
  const user = useSelector((state) => state.auth.user);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!token) return;
    const wsProtocol = window.location.protocol === "https:" ? "wss" : "ws";
    const currentRoom =
      chats.find((c) => c.id === activeChat)?.roomName || "general";
    const wsUrl = `${wsProtocol}://13.60.235.183/ws/chat/${currentRoom}/?token=${token}`;
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      setIsConnected(true);
      setMessages([]);
      ws.current.send(
        JSON.stringify({
          type: "get_history",
          chat: currentRoom,
        })
      );
    };

    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === "message") {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            text: data.message,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            isMe: data.sender === user?.email,
            sender: data.sender,
          },
        ]);
      } else if (data.type === "history") {
        const history = data.messages.map((msg) => ({
          id: msg.id,
          text: msg.message,
          time: new Date(msg.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isMe: msg.sender === user?.email,
          sender: msg.sender,
        }));
        setMessages(history);
      }
    };

    ws.current.onclose = () => {
      setIsConnected(false);
    };

    return () => {
      ws.current?.close();
    };
  }, [token, activeChat]);

  const handleSendMessage = () => {
    if (message.trim() && ws.current && isConnected) {
      const outgoing = {
        type: "message",
        message: message,
        sender: user?.email || "Вы",
      };
      ws.current.send(JSON.stringify(outgoing));
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: message,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isMe: true,
          sender: user?.email,
        },
      ]);
      setMessage("");
      setTimeout(() => {
        const container = document.querySelector(".chat-desktop__messages");
        if (container) container.scrollTop = container.scrollHeight;
      }, 100);
    }
  };

  return (
    <div className="chat-desktop">
      {(!isMobile || showSidebar) && (
        <div className="chat-desktop__sidebar">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`chat-desktop__chat-item ${
                activeChat === chat.id ? "active" : ""
              }`}
              onClick={() => {
                setActiveChat(chat.id);
                if (isMobile) setShowSidebar(false);
              }}
            >
              <img
                src={chat.avatar}
                alt={chat.name}
                className="chat-desktop__avatar"
              />
              <div className="chat-desktop__chat-info">
                <h4>{chat.name}</h4>
                <p>{messages[messages.length - 1]?.text || "Нет сообщений"}</p>
              </div>
              <div className="chat-desktop__meta">
                <span>{messages[messages.length - 1]?.time || ""}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {(!isMobile || !showSidebar) && (
        <div className="chat-desktop__conversation">
          <div className="chat-desktop__header">
            {isMobile && (
              <button
                className="chat-desktop__button"
                onClick={() => setShowSidebar(true)}
                style={{ fontSize: "20px", marginRight: "10px" }}
              >
                <FaArrowLeft />

                {/* <Button iconName="ArrowLeft" mode="" label="" /> */}
              </button>
            )}
            <img
              src={defaultAvatar}
              alt="Аватар"
              className="chat-desktop__avatar"
            />
            <div>
              <h3>{chats.find((c) => c.id === activeChat)?.name}</h3>
              <p>{isConnected ? "В сети" : "Не в сети"}</p>
            </div>
          </div>

          <div className="chat-desktop__messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message ${msg.isMe ? "my-message" : ""}`}
              >
                {!msg.isMe && (
                  <img
                    src={defaultAvatar}
                    alt="Аватар"
                    className="message__avatar"
                  />
                )}
                <div className="message__content">
                  {!msg.isMe && (
                    <span className="sender-name">{msg.sender}</span>
                  )}
                  <p>{msg.text}</p>
                  <span className="message-time">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="chat-desktop__input-area">
            <button className="chat-desktop__button">
              <FiSmile />
            </button>
            <button className="chat-desktop__button">
              <FiPaperclip />
            </button>
            <input
              type="text"
              placeholder="Написать сообщение..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button className="chat-desktop__button">
              <FiMic />
            </button>
            <button
              className="chat-desktop__send-button"
              onClick={handleSendMessage}
              disabled={!isConnected}
            >
              <IoSend />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatDesktop;
