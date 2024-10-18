"use client";

import { useSession, getSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { ImSpinner2 } from "react-icons/im";

interface ExtendedUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface Message {
  userId: string;
  userName: string;
  userImage: string;
  content: string;
}

const Chat = () => {
  const { status } = useSession();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const userScrolled = useRef<boolean>(false);

  useEffect(() => {
    if (status === "authenticated") {
      fetchMessages();
      scrollToBottom(); // Scroll to bottom on first load

      const intervalId = setInterval(() => {
        fetchMessages(false);
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [status]);

  const fetchMessages = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);

      const res = await fetch("/api/messages");
      const data = await res.json();

      if (Array.isArray(data)) {
        setMessages(data);
      } else {
        console.error("Fetched data is not an array:", data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const currentSession = await getSession();

    if (!currentSession?.user) {
      console.error("User is not authenticated");
      return;
    }

    const { id, name, image } = currentSession.user as ExtendedUser;

    const msg: Message = {
      userId: id || " ",
      userName: name || "Anonymous",
      userImage: image || "/assets/profileimage.jpg",
      content: message,
    };

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(msg),
      });

      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.statusText}`);
      }

      setMessages((prevMessages) => [...prevMessages, msg]);
      scrollToBottom(); // Scroll to the bottom only after sending a message
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setMessage(""); // Clear input
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (!messagesContainerRef.current) return;

    const { scrollTop, clientHeight, scrollHeight } =
      messagesContainerRef.current;

    // If the user is near the bottom, set userScrolled to false
    if (scrollHeight - scrollTop - clientHeight < 100) {
      userScrolled.current = false; // Near bottom
    } else {
      userScrolled.current = true; // Not near bottom
    }
  };

  useEffect(() => {
    // Scroll to bottom whenever messages are updated
    if (messages.length && !userScrolled.current) {
      scrollToBottom();
    }
  }, [messages]);

  if (loading) {
    return (
      <div>
        <button
          type="button"
          className="bg-indigo-500 flex rounded-xl px-3 py-2 mx-5 border border-black"
          disabled
        >
          <ImSpinner2 className="animate-spin h-5 w-5 mr-3" />
          Loading Message...
        </button>
        <p className="text-lg  py-5  mx-5">
          You need to be logged in to view messages...
        </p>
      </div>
    );
  }

  if (status !== "authenticated") {
    return (
      <p className="text-center">You are not authenticated. Please sign in.</p>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <h2 className="text-center text-xl py-4">Chat Chamber</h2>

      {/* Messages container */}
      <div
        className="flex-grow overflow-y-auto px-4 py-2"
        onScroll={handleScroll}
        ref={messagesContainerRef}
      >
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className="message flex items-start space-x-4 my-2"
            >
              <img
                src={msg.userImage}
                alt={msg.userName}
                className="h-[40px] w-[40px] rounded-full"
              />
              <div className="flex-grow">
                <strong className="text-sm md:text-base">
                  {msg.userName}:
                </strong>
                <span className="block text-sm md:text-base max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl break-words">
                  {msg.content}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No messages available</p>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="sticky bottom-0 bg-white p-4 flex items-center space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message..."
          className="flex-grow border rounded-lg p-2"
        />
        <button
          onClick={sendMessage}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
