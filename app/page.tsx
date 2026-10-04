“use client”;

import { useState } from “react”;

const BACKEND_URL =
process.env.NEXT_PUBLIC_BACKEND_URL ||
“https://madison-backend-7lvr.onrender.com”;

export default function Home() {
const [message, setMessage] = useState(””);
const [response, setResponse] = useState(””);
const [loading, setLoading] = useState(false);

async function sendMessage() {
if (!message.trim() || loading) return;

const currentMessage = message.trim();
setMessage("");
setLoading(true);
try {
  const res = await fetch(`${BACKEND_URL}/api/madison`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: currentMessage,
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error || "MADAI could not respond.");
  }
  setResponse(
    data?.response ||
      data?.message ||
      data?.text ||
      JSON.stringify(data)
  );
} catch (error) {
  setResponse(
    error instanceof Error
      ? error.message
      : "Unable to connect to MADAI."
  );
} finally {
  setLoading(false);
}

}

return (
MADAI
MADISON AI
      <div className="flex items-center gap-2 text-xs text-white/50">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        AI ONLINE
      </div>
    </div>
  </header>
  <section className="flex-1 w-full max-w-5xl mx-auto px-6 py-12 flex flex-col">
    <div className="flex-1 flex flex-col items-center justify-center text-center">
      <div className="w-32 h-32 rounded-full border border-white/20 flex items-center justify-center mb-8 shadow-[0_0_80px_rgba(255,255,255,0.08)]">
        <div className="w-20 h-20 rounded-full border border-white/30 flex items-center justify-center">
          <span className="text-2xl font-light">M</span>
        </div>
      </div>
      <h2 className="text-4xl md:text-6xl font-light tracking-tight">
        Hello. I&apos;m MADAI.
      </h2>
      <p className="mt-4 text-white/50 max-w-xl">
        Your intelligent AI interface. Ask me anything or connect me to
        your MADAI backend.
      </p>
      {response && (
        <div className="mt-10 w-full max-w-2xl rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-left">
          <div className="text-xs tracking-widest text-white/40 mb-3">
            MADAI
          </div>
          <p className="whitespace-pre-wrap text-white/90">
            {response}
          </p>
        </div>
      )}
    </div>
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          placeholder="Talk to MADAI..."
          className="flex-1 bg-transparent px-4 py-3 outline-none placeholder:text-white/30"
        />
        <button
          onClick={sendMessage}
          disabled={loading || !message.trim()}
          className="rounded-xl bg-white px-5 py-3 font-medium text-black disabled:opacity-30"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
      <p className="text-center text-xs text-white/25 mt-4">
        MADAI • Powered by your AI backend
      </p>
    </div>
  </section>
</main>

);
}
