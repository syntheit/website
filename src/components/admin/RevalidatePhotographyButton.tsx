"use client";

import { useState } from "react";

type Status = "idle" | "pending" | "ok" | "error";

export function RevalidatePhotographyButton() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  async function handleClick() {
    setStatus("pending");
    setMessage("");
    try {
      const res = await fetch("/api/admin/revalidate-photography", {
        method: "POST",
      });
      if (!res.ok) {
        setStatus("error");
        setMessage(`HTTP ${res.status}`);
        return;
      }
      setStatus("ok");
      setMessage(`Revalidated at ${new Date().toLocaleTimeString()}`);
    } catch (e) {
      setStatus("error");
      setMessage(e instanceof Error ? e.message : "Request failed");
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={status === "pending"}
        className="px-4 py-2 rounded-full bg-[#3B2314] text-[#F5EBD9] text-[13px] font-semibold hover:bg-[#D4581A] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-wait"
      >
        {status === "pending" ? "Revalidating…" : "Revalidate now"}
      </button>
      {message && (
        <span
          className={`text-[12px] font-mono ${
            status === "error" ? "text-red-700" : "text-[#7A5C42]"
          }`}
        >
          {message}
        </span>
      )}
    </div>
  );
}
