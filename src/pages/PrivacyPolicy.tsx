import Layout from "@/components/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8 p-6">
        <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
        <p className="text-lg text-gray-600">
          Last updated: March 29, 2026
        </p>
        <p className="text-gray-600">
          This Privacy Policy explains how Goal Planner – Lifeplans ("we", "us", "our") collects, uses, and protects information when you use the Goal Planner – Lifeplans web application and related services.
        </p>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Personal Information</h3>
                <p>We collect information you provide directly to us, including:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Email address for account authentication</li>
                  <li>Display name and profile information</li>
                  <li>Payment information (processed securely by third-party providers)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">User-Generated Content</h3>
                <p>We collect the content you create in the app, including:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Goals and objectives</li>
                  <li>Progress tracking data</li>
                  <li>Strategy and planning notes</li>
                  <li>Daily check-ins and reflections</li>
                  <li>Task lists and completion data</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Technical Information</h3>
                <p>We automatically collect certain technical information:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>IP address and device information</li>
                  <li>Browser type and version</li>
                  <li>Usage patterns and app interactions</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Provide and operate the Goal Planner service</li>
              <li>Authenticate your account and sync data across devices</li>
              <li>Display analytics and insights about your progress</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Improve our services and develop new features</li>
              <li>Send important service-related communications</li>
              <li>Comply with legal obligations</li>
              <li>Display relevant advertisements through Google AdSense</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Data Storage and Security</h2>
            <p>
              Goal Planner – Lifeplans uses Firebase (Google) services for authentication and database storage. Your data is stored in Firebase Firestore and is associated with your account. We implement reasonable security measures to protect your information, including:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Encrypted data transmission</li>
              <li>Secure authentication systems</li>
              <li>Regular security reviews</li>
              <li>Access controls and authentication</li>
            </ul>
            <p className="mt-4">No method of transmission or storage is 100% secure, so we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Third-Party Services</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Google Services</h3>
                <p>We use Google services including:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Firebase for authentication and data storage</li>
                  <li>Google AdSense for displaying advertisements</li>
                  <li>Google Analytics for website analytics</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Payment Processors</h3>
                <p>Payments are processed by third-party payment providers. We do not store your full payment card details.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Information Sharing</h2>
            <p>We do not sell your personal information. We may share information only as needed to:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Provide the service (with infrastructure providers)</li>
              <li>Comply with legal obligations</li>
              <li>Protect our rights and safety</li>
              <li>Respond to legal process</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies and Tracking</h2>
            <p>We use cookies and similar technologies to:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Remember your preferences and settings</li>
              <li>Analyze website usage and performance</li>
              <li>Display relevant advertisements</li>
              <li>Improve user experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Delete your account and associated data</li>
              <li>Opt out of marketing communications</li>
              <li>Request data portability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children's Privacy</h2>
            <p>Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. International Transfers</h2>
            <p>Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us at:</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p>Email: shumailasahervu@gmail.com</p>
              <p>Website: https://goalplanner.io</p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
