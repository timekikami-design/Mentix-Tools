"use client";
export default function PrivacySettings() {
  return (
    <button
      type="button"
      className="text-button"
      onClick={() => window.dispatchEvent(new Event("privacy-settings"))}
    >
      Cookie settings
    </button>
  );
}
