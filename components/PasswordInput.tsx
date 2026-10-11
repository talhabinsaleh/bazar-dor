"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput({
  name,
  placeholder,
  autoComplete = "new-password",
}: {
  name: string;
  placeholder: string;
  autoComplete?: "current-password" | "new-password";
}) {
  const [visible, setVisible] = useState(false);
  // read-only until focused: the browser won't fill it on page load,
  // but its saved-login popup still works once the user clicks in
  const [locked, setLocked] = useState(true);

  return (
    <div className="relative">
      <input
        name={name}
        type={visible ? "text" : "password"}
        autoComplete={autoComplete}
        readOnly={locked}
        onFocus={() => setLocked(false)}
        placeholder={placeholder}
        className="input w-full pr-11"
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
        className="absolute inset-y-0 right-0 z-10 grid w-11 place-items-center text-base-content/60 hover:text-base-content"
      >
        {visible ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
      </button>
    </div>
  );
}
