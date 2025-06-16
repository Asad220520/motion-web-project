import React, { useState, useEffect, useRef } from "react";
import "./ChatDesktop.scss";
import defaultAvatar from "../../../assets/images/defaultAvatar.png";
import { FiPaperclip, FiMic, FiSmile } from "react-icons/fi";
import { IoSend } from "react-icons/io5";

// Моковые данные чатов
const chats = [
  {
    id: 1,
    name: "Друзья навеки",
    lastMessage: "Привет, как дела?",
    time: "15:25",
    unread: 2,
    avatar: defaultAvatar,
  },
  {
    id: 2,
    name: "Ира",
    lastMessage: "Где встретимся?",
    time: "14:10",
    unread: 0,
    avatar: defaultAvatar,
  },
];

const ChatDesktop = () => {
  const [activeChat, setActiveChat] = useState(1);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef(null);

  // Подключение к WebSocket
  useEffect(() => {
    // Замените на ваш реальный WS URL
    ws.current = new WebSocket("ws://localhost:3001/ws/chat/room1/");

    ws.current.onopen = () => {
      console.log("WebSocket подключён");
      setIsConnected(true);

      // Загрузка истории сообщений при подключении
      ws.current.send(
        JSON.stringify({
          type: "get_history",
          chat_id: activeChat,
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
            isMe: data.sender === "Вы",
            sender: data.sender,
          },
        ]);
      } else if (data.type === "history") {
        // Обработка истории сообщений
        setMessages(
          data.messages.map((msg) => ({
            ...msg,
            time: new Date(msg.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            isMe: msg.sender === "Вы",
          }))
        );
      }
    };

    ws.current.onclose = () => {
      console.log("WebSocket отключён");
      setIsConnected(false);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const handleSendMessage = () => {
    if (message.trim() && ws.current && isConnected) {
      const newMessage = {
        id: Date.now(),
        text: message,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isMe: true,
        sender: "Вы",
      };

      // Отправка на сервер
      ws.current.send(
        JSON.stringify({
          type: "message",
          chat_id: activeChat,
          message: message,
          sender: "Вы",
        })
      );

      // Локальное обновление
      setMessages((prev) => [...prev, newMessage]);
      setMessage("");

      // Прокрутка к новому сообщению
      setTimeout(() => {
        const messagesContainer = document.querySelector(
          ".chat-desktop__messages"
        );
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }, 100);
    }
  };

  return (
    <div className="chat-desktop">
      {/* Левая панель - список чатов */}
      <div className="chat-desktop__sidebar">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`chat-desktop__chat-item ${
              activeChat === chat.id ? "active" : ""
            }`}
            onClick={() => setActiveChat(chat.id)}
          >
            <img
              src={chat.avatar}
              alt={chat.name}
              className="chat-desktop__avatar"
            />
            <div className="chat-desktop__chat-info">
              <h4>{chat.name}</h4>
              <p>{chat.lastMessage}</p>
            </div>
            <div className="chat-desktop__meta">
              <span>{chat.time}</span>
              {chat.unread > 0 && <span className="unread">{chat.unread}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Правая панель - окно переписки */}
      <div className="chat-desktop__conversation">
        {/* Шапка чата */}
        <div className="chat-desktop__header">
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

        {/* Окно сообщений */}
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
                {!msg.isMe && <span className="sender-name">{msg.sender}</span>}
                <p>{msg.text}</p>
                <span className="message-time">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Панель ввода сообщения */}
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
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
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
    </div>
  );
};

export default ChatDesktop;
