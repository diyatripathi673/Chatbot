import { useState } from "react";
import axios from "axios";

interface Message {
  text: string;
  sender: "user" | "bot";
}

const useChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const sendMessage = async (message: string) => {
    await delay(500); // optional UX delay
    const newMessages: Message[] = [...messages, { text: message, sender: "user" }];
    setMessages(newMessages);

  try {
    console.log(import.meta.env.VITE_OPENROUTER_API_KEY);

 const response = await axios.post(
  "https://openrouter.ai/api/v1/chat/completions",
  {
    model: "stepfun/step-3.5-flash:free", // ✅ FREE MODEL
    messages: [{ role: "user", content: message }],
  },
  {
   headers: {
  Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
  "Content-Type": "application/json",
  "HTTP-Referer": "http://localhost:3000",
  "X-Title": "Chatbot App",
}
  }
);
  console.log("FULL RESPONSE 👉", response.data); // 🔍 debug
console.log(import.meta.env.VITE_OPENROUTER_API_KEY);

  const botMessage =
    response.data?.choices?.[0]?.message?.content ||
    "⚠️ No response from AI";

  setMessages([...newMessages, { text: botMessage, sender: "bot" }]);

} catch (error: any) {
  console.error("Error fetching AI response:", error);

  let errorMessage = "❌ Something went wrong";

  if (error.response?.status === 402) {
    errorMessage = "⚠️ API quota exceeded. Add credits.";
  } else if (error.response?.data?.error?.message) {
    errorMessage = error.response.data.error.message;
  }

  setMessages([...newMessages, { text: errorMessage, sender: "bot" }]);
}
  };

  return { messages, sendMessage };
};

export default useChatbot;