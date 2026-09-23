"use client";

import React, { useState, useEffect } from "react";
import QRCode from "qrcode";

interface QrCardProps {
  publicId: string;
  partnerName?: string;
  className?: string;
}

export const QrCard: React.FC<QrCardProps> = ({
  publicId,
  partnerName = "My Love",
  className = "",
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Payload strictly contains ONLY the public recipient URL
  const appUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const recipientUrl = `${appUrl}/v/${publicId}`;

  useEffect(() => {
    QRCode.toDataURL(recipientUrl, {
      width: 300,
      margin: 2,
      color: {
        dark: "#1a0814",
        light: "#faf7f2",
      },
      errorCorrectionLevel: "H",
    })
      .then((url) => {
        setQrDataUrl(url);
      })
      .catch((err) => {
        setError("Failed to generate QR code");
      });
  }, [recipientUrl]);

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = `valentino-qr-${publicId}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(recipientUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div
      data-testid="qr-keepsake-card"
      className={`relative max-w-sm mx-auto p-6 rounded-3xl bg-[#faf7f2] text-[#1a0814] shadow-2xl border-2 border-[#d4af37]/40 text-center font-serif ${className}`}
    >
      {/* Decorative Gold Rim & Wax Seal Stamp */}
      <div className="flex items-center justify-center mb-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-700 to-rose-950 flex items-center justify-center text-white shadow-md border border-[#d4af37]/60 text-lg select-none">
          💌
        </div>
      </div>

      <h4 className="text-lg font-medium tracking-tight text-[#1a0814]">
        A Valentine for {partnerName}
      </h4>
      <p className="text-xs text-[#5c4a52] font-sans font-light mt-1 mb-4">
        Scan to unseal this private romantic experience
      </p>

      {/* QR Code Container */}
      <div className="relative inline-block p-3 rounded-2xl bg-white shadow-inner border border-[#d4af37]/30 my-2">
        {qrDataUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={qrDataUrl}
            alt={`QR code linking to Valentine experience for ${partnerName}`}
            data-testid="qr-code-image"
            className="w-48 h-48 mx-auto rounded-lg"
          />
        ) : error ? (
          <div className="w-48 h-48 flex items-center justify-center text-xs text-rose-600">
            {error}
          </div>
        ) : (
          <div className="w-48 h-48 flex items-center justify-center text-xs text-stone-400 animate-pulse">
            Generating keepsake QR...
          </div>
        )}
      </div>

      {/* Verified Payload URL indicator */}
      <div className="mt-3 text-[11px] font-mono text-[#7a6870] truncate max-w-xs mx-auto">
        {recipientUrl}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-center gap-2 mt-5 font-sans">
        <button
          type="button"
          data-testid="qr-download-btn"
          onClick={handleDownload}
          disabled={!qrDataUrl}
          className="px-4 py-2 rounded-xl text-xs font-medium bg-[#1a0814] hover:bg-[#2d1223] text-white shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-50"
        >
          Download PNG
        </button>

        <button
          type="button"
          data-testid="qr-copy-btn"
          onClick={handleCopyLink}
          className="px-4 py-2 rounded-xl text-xs font-medium bg-white hover:bg-stone-50 text-[#1a0814] border border-[#1a0814]/20 shadow-sm transition-all active:scale-95 cursor-pointer"
        >
          {copied ? "Copied!" : "Copy Link"}
        </button>
      </div>
    </div>
  );
};
