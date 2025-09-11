// --- File: TermsOfUse.jsx ---
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const page = ({
  siteName = "FitSphere Gym",
  effectiveDate = "September 2025",
  companyName = "FitSphere Fitness Ltd.",
  contactEmail = "support@fitsphere.com",
  companyAddress = "123 Fitness Street, Dhaka, Bangladesh",
  supportPhone = "+880-1234-567890",
}) => {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      <Card className="rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl sm:text-4xl font-bold">
            Terms of Use
          </CardTitle>
          <p className="mt-2 text-sm text-muted-foreground">
            Effective Date: {effectiveDate}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <p className="leading-relaxed">
            Welcome to {siteName}! By accessing or using our website and gym
            services, you agree to be bound by these Terms of Use. If you do
            not agree, please do not use our services.
          </p>

          <section>
            <h2 className="text-xl font-semibold">1. Services</h2>
            <p className="mt-2">
              We provide fitness-related services including gym memberships,
              personal training, group classes, wellness programs, and related
              online resources (the "Services"). All memberships and bookings
              are subject to availability and confirmation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">
              2. Eligibility & Account
            </h2>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>You must be at least 16 years old to use our gym facilities (with parental consent if under 18).</li>
              <li>
                You are responsible for keeping your account details secure and
                for all activities under your account.
              </li>
              <li>
                Provide accurate and current information when registering or
                booking classes.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">
              3. Memberships, Payments & Cancellations
            </h2>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>
                Payments are processed via secure third-party gateways.{" "}
                {companyName} does not store full card details.
              </li>
              <li>
                Memberships, classes, and personal training packages may have
                their own cancellation/refund rules. Please review before
                purchase.
              </li>
              <li>
                Any applicable bank or transaction fees are the responsibility
                of the member.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">4. Member Conduct</h2>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>
                Respectful behavior toward staff and other members is required.
              </li>
              <li>
                No unlawful, harmful, or disruptive activities are permitted on
                premises or online.
              </li>
              <li>
                Gym equipment must be used safely and appropriately.
              </li>
              <li>
                Member reviews, posts, or feedback must be accurate and
                respectful.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">5. Intellectual Property</h2>
            <p className="mt-2">
              All content on {siteName} (workout programs, text, images, videos,
              branding) is owned by {companyName} or its licensors and is
              protected by applicable IP laws. You may not reproduce or
              distribute without written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">6. Third-Party Services</h2>
            <p className="mt-2">
              Our Services may use or link to third parties (e.g., nutrition
              apps, payment processors). We are not responsible for third-party
              content, terms, or actions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">7. Disclaimers</h2>
            <p className="mt-2">
              Our gym and fitness services are provided on an "as is" and "as
              available" basis. Exercise carries inherent risks, and members
              should consult with a physician before beginning any program. We
              do not guarantee uninterrupted or error-free services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">8. Limitation of Liability</h2>
            <p className="mt-2">
              To the maximum extent permitted by law, {companyName} will not be
              liable for indirect, incidental, or consequential damages, or any
              injuries, losses, or claims arising from use of our facilities or
              services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">9. Indemnification</h2>
            <p className="mt-2">
              You agree to indemnify and hold {companyName}, its staff, and
              partners harmless from claims or demands related to your use of
              the Services or your violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">10. Changes to Terms</h2>
            <p className="mt-2">
              We may update these Terms from time to time. Updates will be
              effective upon posting on this page unless otherwise specified.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">
              11. Governing Law & Dispute Resolution
            </h2>
            <p className="mt-2">
              These Terms are governed by the laws of Bangladesh. Disputes will
              first be attempted to be resolved amicably; if unresolved, they
              shall be subject to the exclusive jurisdiction of the courts in
              Dhaka.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">12. Contact</h2>
            <p className="mt-2">
              Questions? Contact us at{" "}
              <a
                className="text-blue-600 underline"
                href={`mailto:${contactEmail}`}
              >
                {contactEmail}
              </a>{" "}
              or write to {companyAddress}. Support: {supportPhone}
            </p>
          </section>
        </CardContent>
      </Card>
    </main>
  );
};
export default page;