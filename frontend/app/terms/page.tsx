import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | VideoDownloadLink",
  description:
    "Read the Terms of Service for using VideoDownloadLink. Learn about acceptable use, limitations, disclaimers, and user responsibilities.",
};

export default function TermsOfServicePage() {
  return (
    <main className="bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-16 text-gray-800">

        <h1 className="text-4xl font-bold mb-6 text-gray-900">
          Terms of Service
        </h1>

        <p className="mb-6 text-gray-600 leading-7">
          Welcome to VideoDownloadLink. By accessing or using this website,
          you agree to be bound by the following Terms of Service. If you do
          not agree with these terms, please do not use our service.
        </p>

        <section className="space-y-8 leading-7">

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">
              Description of Service
            </h2>
            <p>
              VideoDownloadLink provides an online tool that allows users to
              download publicly accessible media content in various formats.
              The service is provided for personal and informational use only.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">
              Acceptable Use
            </h2>
            <p>
              You agree to use this website only for lawful purposes and in
              compliance with all applicable local, national, and international
              laws. You must not use this service to download or distribute
              content in violation of copyright or other intellectual property
              rights.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">
              No Hosting of Content
            </h2>
            <p>
              VideoDownloadLink does not host, store, or archive any media
              content on its servers. All content is retrieved directly from
              third-party platforms at the request of the user and streamed
              temporarily for download.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">
              User Responsibility
            </h2>
            <p>
              Users are solely responsible for how they use the downloaded
              content. You acknowledge that you are responsible for ensuring
              compliance with the terms of service of the original content
              provider and all applicable laws.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">
              Intellectual Property
            </h2>
            <p>
              All trademarks, logos, and brand names displayed on this website
              belong to their respective owners. VideoDownloadLink does not
              claim ownership of any third-party content accessed through
              this service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">
              Disclaimer of Warranties
            </h2>
            <p>
              This service is provided on an &quot;as is&quot; and
              &quot;as available&quot; basis. VideoDownloadLink makes no
              warranties, expressed or implied, regarding the availability,
              reliability, or accuracy of the service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">
              Limitation of Liability
            </h2>
            <p>
              In no event shall VideoDownloadLink be liable for any direct,
              indirect, incidental, or consequential damages arising out of
              the use or inability to use this website or its services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">
              Service Modifications
            </h2>
            <p>
              We reserve the right to modify, suspend, or discontinue any part
              of the service at any time without prior notice.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">
              Third-Party Links
            </h2>
            <p>
              This website may contain links to third-party websites. We are
              not responsible for the content, policies, or practices of any
              third-party sites.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">
              Termination
            </h2>
            <p>
              We reserve the right to restrict or terminate access to the
              service for users who violate these Terms of Service or engage
              in unlawful or abusive activities.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">
              Governing Law
            </h2>
            <p>
              These Terms of Service shall be governed and interpreted in
              accordance with applicable laws, without regard to conflict of
              law principles.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">
              Changes to These Terms
            </h2>
            <p>
              We may update these Terms of Service from time to time. Continued
              use of the website after any changes constitutes acceptance of
              the updated terms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">
              Contact Information
            </h2>
            <p>
              If you have any questions regarding these Terms of Service, please
              contact us through the Contact page on this website.
            </p>
          </div>

        </section>

        <div className="mt-12 text-sm text-gray-500">
          Last updated: {new Date().getFullYear()}
        </div>

      </div>
    </main>
  );
}
