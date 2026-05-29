import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-blue-600">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-blue-600">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function Contact() {
  const contactInfo = [
    {
      icon: <TelegramIcon />,
      title: "Telegram Channel",
      link: "https://t.me/NetCodeSolutions",
    },
    {
      icon: <TelegramIcon />,
      title: "Telegram Support",
      link: "https://t.me/NetCodeShop",
    },
    {
      icon: <FacebookIcon />,
      title: "Facebook",
      link: "https://www.facebook.com/share/1B8BRnNqhr/",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl mb-4 text-white">Contact Us</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Have a question or need help? We're here to assist you. Reach out to us 
          and we'll get back to you as soon as possible.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Contact Information */}
        <div className="space-y-6">
          <div className="mb-6">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250YWN0JTIwc3VwcG9ydCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3Nzk4Nzc3NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Contact support"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>

          <div className="flex gap-4">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.link}
                target="_blank"
                rel="noopener noreferrer"
                title={info.title}
                className="bg-slate-800/60 border border-slate-700 hover:border-blue-500/60 hover:bg-slate-700/60 transition-all p-4 rounded-xl flex items-center justify-center"
              >
                {info.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Business Hours */}
        <div>
          <Card className="bg-slate-800/60 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-blue-300">Business Hours</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>10:00 AM - 4:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
