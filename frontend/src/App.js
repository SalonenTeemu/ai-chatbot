import { useState, useRef, useEffect } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messageContainerRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt || loading) return;

    const userMessage = prompt;

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: userMessage },
    ]);

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      const aiMessage = data.response;

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "ai", text: aiMessage },
      ]);
      setPrompt("");
    } catch (error) {
      console.error(error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "ai", text: "An error occurred." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-50 selection:bg-lime-500">
      <div className="max-w-4xl w-full p-6 bg-slate-800 rounded-lg shadow-lg border border-slate-700">
        <h1 className="text-2xl font-semibold text-center mb-4">
          Gemini AI Chatbot
        </h1>

        {messages.length > 0 && (
          <div
            className="max-h-[400px] overflow-y-auto mb-4 p-4 bg-slate-900 rounded-md border border-slate-700"
            ref={messageContainerRef}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  msg.sender === "user" ? "text-lime-500" : "text-slate-50"
                }`}>
                <strong>{msg.sender === "user" ? "You" : "Gemini"}:</strong>
                <p>{msg.text}</p>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full p-3 border border-slate-700 rounded-md bg-slate-900 text-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-lime-500"
            placeholder="Message Gemini..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows="4"
            onKeyDown={handleKeyPress}
            disabled={loading}
          />
          <button
            type="submit"
            className="mt-4 w-full p-3 bg-lime-500 text-slate-950 font-semibold rounded-lg hover:bg-lime-400 transition-colors duration-200"
            disabled={loading}>
            {loading ? "Generating..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
