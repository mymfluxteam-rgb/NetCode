import { useEffect, useState } from "react";
import { Check, Copy, ShieldCheck, WalletCards } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";

type LicenseType = "nonExclusive" | "exclusive";

type PaymentProduct = {
  name: string;
  price: number;
  nonExclusivePrice?: number;
  exclusivePrice?: number;
};

type WalletOption = {
  id: string;
  name: string;
  network: string;
  address: string;
  logo: "bitcoin" | "bnb" | "tether";
};

const walletOptions: WalletOption[] = [
  {
    id: "btc",
    name: "BTC Coin",
    network: "Bitcoin network",
    address: "bc1qff7tyhcxemcw643d9lmseu3txwpx8347z4d9uh",
    logo: "bitcoin",
  },
  {
    id: "bnb",
    name: "BNB Coin",
    network: "BNB Smart Chain (BEP20)",
    address: "0x71A0Bd652DCD54B404Ac8E7D80743692CdCc190a",
    logo: "bnb",
  },
  {
    id: "usdt-bep20",
    name: "USDT (BEP20)",
    network: "BNB Smart Chain",
    address: "0x71A0Bd652DCD54B404Ac8E7D80743692CdCc190a",
    logo: "tether",
  },
  {
    id: "usdt-trc20",
    name: "USDT (TRC20)",
    network: "TRON network",
    address: "0x71A0Bd652DCD54B404Ac8E7D80743692CdCc190a",
    logo: "tether",
  },
];

function CryptoLogo({ type }: { type: WalletOption["logo"] }) {
  const commonProps = {
    viewBox: "0 0 24 24",
    className: "h-9 w-9 shrink-0",
    role: "img" as const,
  };

  if (type === "bitcoin") {
    return (
      <svg {...commonProps} aria-label="Bitcoin logo">
        <circle cx="12" cy="12" r="12" fill="#F7931A" />
        <path
          fill="#fff"
          d="M14.66 5.24c1.7.29 2.66 1.15 2.52 2.55-.11 1.06-.72 1.62-1.52 1.91 1.35.34 2.2 1.11 2.03 2.66-.2 1.83-1.65 2.5-3.53 2.58l-.37 1.63-1.13-.26.36-1.58-.9-.2-.36 1.58-1.13-.26.37-1.62-2.22-.51.32-1.38.81.19c.42.1.59-.1.68-.48l.88-3.84c.1-.47-.04-.67-.5-.78l-.81-.19.32-1.4 2.2.51.36-1.58 1.13.26-.36 1.58.9.2.36-1.58 1.13.26-.37 1.63Zm-3.21 6.07-.37 1.61c.78.18 3.16.83 3.42-.31.27-1.18-2.27-1.48-3.05-1.66Zm.72-3.13-.34 1.48c.65.15 2.68.73 2.91-.29.24-1.05-1.91-1.39-2.57-1.55Z"
        />
      </svg>
    );
  }

  if (type === "bnb") {
    return (
      <svg {...commonProps} aria-label="BNB logo">
        <circle cx="12" cy="12" r="12" fill="#F3BA2F" />
        <path
          fill="#fff"
          d="m12 3.6 2.1 2.1L12 7.8 9.9 5.7 12 3.6Zm-4.6 4.6 2.1 2.1-2.1 2.1-2.1-2.1 2.1-2.1Zm9.2 0 2.1 2.1-2.1 2.1-2.1-2.1 2.1-2.1ZM12 8.2l3.8 3.8-3.8 3.8-3.8-3.8L12 8.2Zm-4.6 6.2 2.1 2.1L12 19l2.5-2.5 2.1 2.1-4.6 4.6-4.6-4.6 2.1-2.1Z"
        />
      </svg>
    );
  }

  return (
    <svg {...commonProps} aria-label="Tether logo">
      <circle cx="12" cy="12" r="12" fill="#26A17B" />
      <path
        fill="#fff"
        d="M5.5 5h13v2.2h-5.4v2c3.2.15 5.6.83 5.6 1.65v.5c0 .94-2.9 1.7-6.7 1.8V18h-2v-4.85c-3.8-.1-6.7-.86-6.7-1.8v-.5c0-.82 2.4-1.5 5.6-1.65v-2H5.5V5Zm1.8 5.9c0 .45 2.1.83 4.7.83s4.7-.38 4.7-.83-2.1-.83-4.7-.83-4.7.38-4.7.83Z"
      />
    </svg>
  );
}

function formatPrice(price: number) {
  return `$${price.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

async function copyToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.select();
  const copied = document.execCommand("copy");
  textArea.remove();

  if (!copied) {
    throw new Error("Unable to copy address");
  }
}

export function CryptoPaymentDialog({
  product,
  open,
  onOpenChange,
}: {
  product: PaymentProduct | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [licenseType, setLicenseType] = useState<LicenseType>("nonExclusive");
  const [copiedWallet, setCopiedWallet] = useState<string | null>(null);
  const [copyError, setCopyError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setLicenseType("nonExclusive");
    setCopiedWallet(null);
    setCopyError(null);
  }, [open, product]);

  if (!product) return null;

  const nonExclusivePrice = product.nonExclusivePrice ?? product.price;
  const exclusivePrice = product.exclusivePrice ?? product.price;
  const selectedPrice = licenseType === "exclusive" ? exclusivePrice : nonExclusivePrice;

  const handleCopy = async (wallet: WalletOption) => {
    try {
      await copyToClipboard(wallet.address);
      setCopiedWallet(wallet.id);
      setCopyError(null);
      window.setTimeout(() => setCopiedWallet((current) => current === wallet.id ? null : current), 2200);
    } catch {
      setCopiedWallet(null);
      setCopyError("We couldn't copy that address. Please select and copy it manually.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[min(90vh,760px)] overflow-y-auto border-slate-200 bg-white p-0 text-slate-900 shadow-2xl sm:max-w-2xl">
        <DialogHeader className="border-b border-slate-200 px-6 py-6 sm:px-7">
          <div className="flex items-start gap-4 pr-7">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-inset ring-indigo-100">
              <WalletCards className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold tracking-tight text-slate-900">
                Select Payment Method &amp; Send Crypto
              </DialogTitle>
              <DialogDescription className="mt-2 text-sm leading-6 text-slate-500">
                Pay securely for <span className="font-semibold text-slate-700">{product.name}</span> using one of the wallet addresses below.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 px-6 py-6 sm:px-7">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Selected product</p>
                <p className="mt-1 font-semibold text-slate-900">{product.name}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Amount to send</p>
                <p className="mt-1 text-xl font-bold text-indigo-600">{formatPrice(selectedPrice)}</p>
              </div>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2" role="radiogroup" aria-label="Select a license type">
              {([
                ["nonExclusive", "Non-Exclusive Rights", nonExclusivePrice],
                ["exclusive", "Exclusive Rights", exclusivePrice],
              ] as const).map(([value, label, price]) => (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={licenseType === value}
                  onClick={() => setLicenseType(value)}
                  className={`rounded-lg border px-3.5 py-3 text-left transition-colors ${
                    licenseType === value
                      ? "border-indigo-500 bg-white shadow-sm ring-2 ring-indigo-100"
                      : "border-slate-200 bg-white hover:border-indigo-300"
                  }`}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-slate-700">{label}</span>
                    <span className="text-sm font-bold text-slate-900">{formatPrice(price)}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <section aria-labelledby="wallet-options-heading">
            <div className="mb-3 flex items-end justify-between gap-3">
              <div>
                <h2 id="wallet-options-heading" className="text-sm font-semibold text-slate-900">Choose a payment wallet</h2>
                <p className="mt-1 text-xs text-slate-500">Only use the matching network shown for each option.</p>
              </div>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">4 options</span>
            </div>

            <div className="space-y-3">
              {walletOptions.map((wallet) => {
                const isCopied = copiedWallet === wallet.id;
                return (
                  <div key={wallet.id} className="rounded-xl border border-slate-200 bg-white p-3.5 transition-colors hover:border-slate-300">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex min-w-0 flex-1 items-center gap-3">
                        <CryptoLogo type={wallet.logo} />
                        <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900">{wallet.name}</p>
                        <p className="mt-0.5 text-xs text-slate-500">{wallet.network}</p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => handleCopy(wallet)}
                        className={isCopied ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-700" : "border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"}
                        aria-label={`${isCopied ? "Copied" : "Copy"} ${wallet.name} address`}
                      >
                        {isCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                        {isCopied ? "Copied" : "Copy Address"}
                      </Button>
                    </div>
                    <code className="mt-3 block break-all rounded-lg bg-slate-50 px-3 py-2.5 text-xs leading-5 text-slate-600">
                      {wallet.address}
                    </code>
                  </div>
                );
              })}
            </div>
            {copyError && <p className="mt-2 text-xs text-rose-600" role="alert">{copyError}</p>}
          </section>

          <div className="rounded-xl border border-indigo-100 bg-indigo-50/70 p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" />
              <div className="text-sm leading-6 text-slate-700">
                <p className="font-semibold text-slate-900">Before you send</p>
                <p className="mt-1">
                  Send the exact amount for your selected license ({formatPrice(selectedPrice)}), then contact support or submit your proof of transaction so we can confirm and deliver your order.
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="border-t border-slate-200 bg-slate-50/70 px-6 py-4 sm:px-7">
          <p className="mr-auto text-xs text-slate-500">Double-check the wallet address and network before sending.</p>
          <DialogClose asChild>
            <Button type="button" variant="outline" className="border-slate-300 bg-white text-slate-700 hover:bg-slate-100">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}