import Layout from "@/components/Layout";

const Terms = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
        <p className="text-gray-600">
          These Terms govern your use of Lifeplans (“the Service”). By accessing or using the Service, you agree to these Terms.
        </p>

        <div className="space-y-4 text-gray-700">
          <h2 className="text-xl font-bold text-gray-900">1. Eligibility</h2>
          <p>You must be able to form a legally binding contract in your jurisdiction to use the Service.</p>

          <h2 className="text-xl font-bold text-gray-900">2. Accounts and security</h2>
          <p>
            You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under
            your account.
          </p>

          <h2 className="text-xl font-bold text-gray-900">3. Acceptable use</h2>
          <p>
            You agree not to misuse the Service, attempt to access data that does not belong to you, interfere with app
            functionality, or use the Service for unlawful purposes.
          </p>

          <h2 className="text-xl font-bold text-gray-900">4. Your content</h2>
          <p>
            You retain ownership of the content you create in the Service (such as goals, notes, and check-ins). You grant us a
            limited license to host and process your content solely to provide the Service.
          </p>

          <h2 className="text-xl font-bold text-gray-900">5. Service availability</h2>
          <p>
            We may modify, suspend, or discontinue parts of the Service at any time. We do not guarantee uninterrupted availability.
          </p>

          <h2 className="text-xl font-bold text-gray-900">6. Disclaimers</h2>
          <p>
            The Service is provided “as is” without warranties of any kind. Lifeplans provides planning tools and does not provide
            medical, legal, or financial advice.
          </p>

          <h2 className="text-xl font-bold text-gray-900">7. Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, Lifeplans will not be liable for indirect, incidental, special, consequential, or
            punitive damages.
          </p>

          <h2 className="text-xl font-bold text-gray-900">8. Changes to these Terms</h2>
          <p>We may update these Terms from time to time. Continued use of the Service means you accept the updated Terms.</p>

          <h2 className="text-xl font-bold text-gray-900">9. Contact</h2>
          <p>
            Questions about these Terms can be sent to <span className="font-semibold">info@goalplanner.io</span>.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
