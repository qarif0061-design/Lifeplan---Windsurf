import Layout from "@/components/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
        <p className="text-gray-600">
          This Privacy Policy explains how Lifeplans (“we”, “us”) collects, uses, and protects information when you use the Lifeplans
          web application.
        </p>

        <div className="space-y-4 text-gray-700">
          <h2 className="text-xl font-bold text-gray-900">1. Information we collect</h2>
          <p>
            We collect information you provide directly to us, including your email address and profile information (such as your
            display name). We also collect the content you create in the app, such as goals, progress values, strategy and planning
            notes, and daily check-ins.
          </p>

          <h2 className="text-xl font-bold text-gray-900">2. How we use your information</h2>
          <p>
            We use your information to operate and improve the app, including authenticating your account, syncing your goals and
            check-ins across devices, displaying analytics and insights, and providing customer support.
          </p>

          <h2 className="text-xl font-bold text-gray-900">3. Data storage</h2>
          <p>
            Lifeplans uses Firebase (Google) services for authentication and database storage. Your data is stored in Firebase
            Firestore and is associated with your account.
          </p>

          <h2 className="text-xl font-bold text-gray-900">4. Payments</h2>
          <p>
            If you purchase a subscription, payments may be processed by a third-party payment provider / merchant of record. We do not
            store your full payment card details.
          </p>

          <h2 className="text-xl font-bold text-gray-900">5. Sharing</h2>
          <p>
            We do not sell your personal information. We may share information only as needed to provide the service (for example,
            with our infrastructure providers) or to comply with legal obligations.
          </p>

          <h2 className="text-xl font-bold text-gray-900">6. Security</h2>
          <p>
            We take reasonable measures to protect your information. No method of transmission or storage is 100% secure, so we
            cannot guarantee absolute security.
          </p>

          <h2 className="text-xl font-bold text-gray-900">7. Your choices</h2>
          <p>
            You can update your profile details within the app. You may also request deletion of your account or data by contacting
            support.
          </p>

          <h2 className="text-xl font-bold text-gray-900">8. Contact</h2>
          <p>
            If you have questions about this policy, contact us at <span className="font-semibold">info@goalplanner.io</span>.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
