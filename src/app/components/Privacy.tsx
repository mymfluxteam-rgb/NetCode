import { Shield, Lock, Eye, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-4xl mb-4 text-gray-900">Privacy Policy</h1>
        <p className="text-xl text-gray-600">
          Last updated: May 27, 2026
        </p>
      </div>

      {/* Introduction */}
      <div className="prose prose-lg max-w-none mb-12">
        <p className="text-gray-700 mb-6">
          At NetCodeShop, we take your privacy seriously. This Privacy Policy explains how we collect, 
          use, disclose, and safeguard your information when you visit our website and use our services.
        </p>
      </div>

      {/* Privacy Sections */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-blue-600" />
              <CardTitle>Information We Collect</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700">
            <p>
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Name and contact information (email address, phone number)</li>
              <li>Payment information (processed securely through third-party providers)</li>
              <li>Account credentials (username and password)</li>
              <li>Purchase history and download records</li>
              <li>Communications with our support team</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Eye className="w-6 h-6 text-blue-600" />
              <CardTitle>How We Use Your Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700">
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Process and fulfill your orders</li>
              <li>Provide customer support and respond to your inquiries</li>
              <li>Send you important updates about your purchases</li>
              <li>Improve our website and services</li>
              <li>Prevent fraud and enhance security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Lock className="w-6 h-6 text-blue-600" />
              <CardTitle>Data Security</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700">
            <p>
              We implement appropriate technical and organizational security measures to protect your 
              personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
            <p>
              These measures include:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Encryption of sensitive data in transit and at rest</li>
              <li>Regular security audits and assessments</li>
              <li>Secure payment processing through certified providers</li>
              <li>Access controls and authentication requirements</li>
              <li>Regular backups and disaster recovery procedures</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cookies and Tracking</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700">
            <p>
              We use cookies and similar tracking technologies to track activity on our website 
              and hold certain information. Cookies are files with small amounts of data that are 
              sent to your browser from a website and stored on your device.
            </p>
            <p>
              You can instruct your browser to refuse all cookies or to indicate when a cookie is 
              being sent. However, if you do not accept cookies, you may not be able to use some 
              portions of our service.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Rights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700">
            <p>
              You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Access and receive a copy of your personal data</li>
              <li>Correct inaccurate or incomplete data</li>
              <li>Request deletion of your personal data</li>
              <li>Object to or restrict processing of your data</li>
              <li>Withdraw consent at any time</li>
              <li>Data portability</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700">
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="mt-4">
              Email: privacy@netcodeshop.com<br />
              Address: 123 Code Street, Tech City, TC 12345
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
