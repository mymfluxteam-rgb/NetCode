import {
  BookOpen,
  ShoppingCart,
  CheckCircle,
  MessageCircle,
  Shield,
  Download,
  HelpCircle,
  Star,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Link } from "react-router";

export function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <BookOpen className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-4xl mb-4 text-gray-900">Documentation</h1>
        <p className="text-xl text-gray-600">
          Everything you need to know about purchasing source code from NetCodeShop
        </p>
      </div>

      <div className="space-y-6">

        {/* How to Purchase */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
              <CardTitle>How to Purchase</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700">
            <p>Buying source code from NetCodeShop is simple and straightforward. Follow these steps:</p>
            <ol className="space-y-3">
              {[
                { step: "1", text: 'Browse the store at "Buy Source Code" and find the tool you need.' },
                { step: "2", text: 'Click "Buy Now" on any product to open its detail page.' },
                { step: "3", text: "Choose your preferred contact channel — Facebook, Telegram, or WhatsApp." },
                { step: "4", text: "Message us with the product name. We will confirm availability and send you the payment details." },
                { step: "5", text: "Complete the payment via your agreed method. We confirm receipt and deliver the source code immediately." },
              ].map(({ step, text }) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">
                    {step}
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* Payment Channels */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <MessageCircle className="w-6 h-6 text-blue-600" />
              <CardTitle>Payment Channels</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-700">
            <p>
              All purchases are handled personally through our official channels below. We accept payments via
              bank transfer, e-wallet, or cryptocurrency — details are confirmed during your chat.
            </p>

            {/* Facebook */}
            <div className="flex items-start gap-4 p-4 rounded-lg bg-blue-50 border border-blue-100">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Facebook Messenger</p>
                <p className="text-sm text-gray-600 mb-2">Fastest response during business hours. Send us a message directly on our page.</p>
                <a
                  href="https://www.facebook.com/share/1B8BRnNqhr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Open Facebook Page →
                </a>
              </div>
            </div>

            {/* Telegram */}
            <div className="flex items-start gap-4 p-4 rounded-lg bg-sky-50 border border-sky-100">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Telegram</p>
                <p className="text-sm text-gray-600 mb-2">Available 24/7. Instant replies for order inquiries, demos, and payment confirmation.</p>
                <a
                  href="https://t.me/NetCodeShop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sky-600 hover:text-sky-700 text-sm font-medium"
                >
                  Open @NetCodeShop on Telegram →
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-start gap-4 p-4 rounded-lg bg-green-50 border border-green-100">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">WhatsApp</p>
                <p className="text-sm text-gray-600 mb-2">Scan the QR code on any product page to start a chat directly. No account required.</p>
                <Link
                  to="/buy-source-code"
                  className="inline-flex items-center gap-1 text-green-600 hover:text-green-700 text-sm font-medium"
                >
                  Browse products to find QR code →
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What You Get */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Download className="w-6 h-6 text-blue-600" />
              <CardTitle>What You Get After Purchase</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-700">
            {[
              { icon: <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />, text: "Full source code — complete, uncommented, and ready to compile" },
              { icon: <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />, text: "All required libraries and dependencies included" },
              { icon: <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />, text: "Setup and build instructions to get you running immediately" },
              { icon: <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />, text: "Lifetime access — no subscriptions, no expiry" },
              { icon: <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />, text: "Free bug fixes for issues that exist at the time of purchase" },
              { icon: <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />, text: "Direct support via the same channel you used to purchase" },
            ].map(({ icon, text }, i) => (
              <div key={i} className="flex items-start gap-3">
                {icon}
                <span>{text}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Buy with Confidence */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-blue-600" />
              <CardTitle className="text-blue-900">Buy with Confidence</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-blue-900">
            <p>
              Every product sold at NetCodeShop is developed and tested in-house. We stand behind the quality of our tools.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <p className="font-semibold text-gray-900">Genuine Code</p>
                <p className="text-sm text-gray-600 mt-1">All source code is original and owned by us. Customers are not allowed to resell purchased source code without a license.</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <Zap className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="font-semibold text-gray-900">Instant Delivery</p>
                <p className="text-sm text-gray-600 mt-1">Delivered within minutes of confirmed payment, directly via your chat channel</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <MessageCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="font-semibold text-gray-900">Human Support</p>
                <p className="text-sm text-gray-600 mt-1">Talk to a real person — not a bot — at every stage of your purchase</p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-white rounded-lg border border-blue-100">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Refund Policy:</span> If the source code you receive does not match its listed description and features, contact us within 7 days and we will resolve the issue or issue a full refund. Your satisfaction is guaranteed.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-blue-600" />
              <CardTitle>Frequently Asked Questions</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-5 text-gray-700">
            {[
              {
                q: "Can I request a demo before buying?",
                a: "Yes. Message us on any channel and we can provide a video demo or screenshot walkthrough of the tool in action.",
              },
              {
                q: "Is the source code compatible with all Windows versions?",
                a: "Most tools are built for Windows 10/11 x64. Specific compatibility details are listed on each product page.",
              },
              {
                q: "Can I resell or redistribute the source code?",
                a: "No. Each purchase is a single-user licence for personal or business use. Redistribution or resale is not permitted.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept bank transfer, popular e-wallets, and selected cryptocurrencies. Payment options are confirmed during your order chat.",
              },
              {
                q: "Will I receive updates when the tool is improved?",
                a: "Major version updates may be available at a discounted upgrade price. Bug fixes for the purchased version are always free.",
              },
              {
                q: "How do I get started after receiving the source code?",
                a: "Each delivery includes a README with build instructions. We're also available on your purchase channel if you need any setup help.",
              },
            ].map(({ q, a }, i) => (
              <div key={i} className="border-b border-gray-100 last:border-0 pb-5 last:pb-0">
                <p className="font-semibold text-gray-900 mb-1">{q}</p>
                <p className="text-gray-600">{a}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Ready to purchase? Browse our full catalogue.</p>
          <Link
            to="/buy-source-code"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            Browse Source Code
          </Link>
        </div>

      </div>
    </div>
  );
}
