"use client";

import { useSession, getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { ImSpinner2 } from "react-icons/im";

interface ExtendedUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface ExtendedSession {
  user: ExtendedUser;
}

interface Message {
  userId: string;
  userName: string;
  userImage: string;
  content: string;
}

const Chat = () => {
  const { data: session, status } = useSession();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (status === "authenticated") {
      fetchMessages();

      // Poll for new messages every 5 seconds (5000 ms)
      const intervalId = setInterval(() => {
        fetchMessages(false); // Set loading to false during polling
      }, 5000);

      // Clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    }
  }, [status]);

  const fetchMessages = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);

      const res = await fetch("/api/messages");
      const data = await res.json();

      if (Array.isArray(data)) {
        setMessages(data); // Update the messages state with the latest messages
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

    const { id, name, image } = currentSession.user as ExtendedUser; // Cast session.user to ExtendedUser

    const msg: Message = {
      userId: id || " ", // Use the userId from the session
      userName: name || "Anonymous",
      userImage: image || "path/to/default/image.png", // Fallback image
      content: message,
    };

    console.log("Sending message:", msg); // Log the message being sent

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

      setMessages((prevMessages) => [...prevMessages, msg]); // Add message to state
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setMessage(""); // Clear the input field
  };

  if (loading) {
    return (
      <button
        type="button"
        className="bg-indigo-500 flex rounded-xl px-3 py-2 border border-black"
        disabled
      >
        <ImSpinner2 className="animate-spin h-5 w-5 mr-3" />
        Loading Message...
      </button>
    );
  }

  if (status !== "authenticated") {
    return <p>You are not authenticated. Please sign in.</p>;
  }

  return (
    <div>
      <h2>Chat Room</h2>
      <div>
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className="message">
              <img
                src={msg.userImage}
                alt={msg.userName}
                className="h-[40px] w-[40px] rounded-full"
              />
              <div>
                <strong>{msg.userName}:</strong> {msg.content}
              </div>
            </div>
          ))
        ) : (
          <p>No messages available</p>
        )}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
