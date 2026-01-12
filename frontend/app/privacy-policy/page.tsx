import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | VideoDownloadLink",
  description:
    "Read our Privacy Policy to understand how we handle user data, cookies, and third-party services while providing a safe video downloader experience.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-16 text-gray-800">

        <h1 className="text-4xl font-bold mb-6 text-gray-900">
          Privacy Policy
        </h1>

        <p className="mb-6 text-gray-600 leading-7">
          This Privacy Policy explains how VideoDownloadLink ("we", "our", or
          "us") operates and protects user privacy when you use our website.
          By accessing or using our service, you agree to the terms described
          in this policy.
        </p>

        {/* SECTION */}
        <section className="space-y-8 leading-7">

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">
              Information We Do Not Collect
            </h2>
            <p>
              We do not collect personal information such as names, email
              addresses, phone numbers, or payment details. Users are not
              required to create an account or provide personal data to use
              our service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">
              Automatically Collected Information
            </h2>
            <p>
              Like most websites, we may collect non-personal information
              automatically, including browser type, operating system,
              referring URLs, and general usage statistics. This data is used
              only to improve website performance and user experience.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">
              Cookies and Web Beacons
            </h2>
            <p>
              VideoDownloadLink may use cookies to store user preferences and
              optimize website functionality. Cookies help us understand how
              users interact with the site. You can disable cookies through
              your browser settings if you prefer.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">
              Third-Party Advertising
            </h2>
            <p>
              We may display advertisements from third-party ad networks such
              as Google AdSense. These advertisers may use cookies, JavaScript,
              or web beacons to show ads relevant to users. VideoDownloadLink
              has no control over these cookies used by third-party advertisers.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">
              Google AdSense and DoubleClick Cookie
            </h2>
            <p>
              Google, as a third-party vendor, uses cookies to serve ads on our
              website. Google's use of the DoubleClick cookie enables it and
              its partners to serve ads based on users' visits to this and
              other websites. Users may opt out of personalized advertising by
              visiting Google's Ads Settings.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">
              How We Use Information
            </h2>
            <p>
              Any non-personal information collected is used solely to analyze
              trends, manage the website, track user movement, and gather
              demographic information for improving our services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">
              Children's Information
            </h2>
            <p>
              VideoDownloadLink does not knowingly collect any personal
              information from children under the age of 13. If you believe
              your child has provided information on our website, please
              contact us immediately, and we will remove such information.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">
              External Links
            </h2>
            <p>
              Our website may contain links to external sites. We are not
              responsible for the privacy practices or content of these
              third-party websites. We encourage users to review the privacy
              policies of any external sites they visit.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">
              Consent
            </h2>
            <p>
              By using our website, you hereby consent to our Privacy Policy
              and agree to its terms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">
              Updates to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page, and the updated policy will be
              effective immediately upon posting.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">
              Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy or our
              practices, please contact us through the Contact page available
              on our website.
            </p>
          </div>

        </section>

        {/* FOOT NOTE */}
        <div className="mt-12 text-sm text-gray-500">
          Last updated: {new Date().getFullYear()}
        </div>

      </div>
    </main>
  );
}
