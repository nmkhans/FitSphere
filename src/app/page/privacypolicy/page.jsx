// --- File: PrivacyPolicy.jsx ---
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PrivacyPolicy = ({
  siteName = "FitSphere Gym",
  effectiveDate = "September 2025",
  companyName = "FitSphere Fitness Ltd.",
  contactEmail = "support@fitsphere.com",
  dpoEmail = "privacy@fitsphere.com",
  companyAddress = "123 Fitness Street, Dhaka, Bangladesh",
}) => {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      <Card className="rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl sm:text-4xl font-bold">
            Privacy Policy
          </CardTitle>
          <p className="mt-2 text-sm text-muted-foreground">
            Effective Date: {effectiveDate}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <p className="leading-relaxed">
            {companyName} ("we", "us", or "our") operates {siteName}. This
            Privacy Policy explains what information we collect, how we use
            it, and your choices. By using our gym website or services, you
            agree to this Policy.
          </p>

          <section>
            <h2 className="text-xl font-semibold">1. Information We Collect</h2>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>
                <span className="font-medium">Membership Data:</span> name,
                email, phone, address, emergency contact, fitness goals.
              </li>
              <li>
                <span className="font-medium">Payment Data:</span> processed by
                third-party gateways; we only receive limited transaction
                details (no card storage).
              </li>
              <li>
                <span className="font-medium">Technical Data:</span> IP,
                device, browser, cookies, and analytics usage data.
              </li>
              <li>
                <span className="font-medium">User Content:</span> feedback,
                reviews, support requests, and class bookings.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">2. How We Use Information</h2>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Provide and manage memberships, bookings, and support.</li>
              <li>
                Send service updates, class reminders, and—where you consent—
                promotional offers.
              </li>
              <li>
                Improve gym services, website performance, and user experience.
              </li>
              <li>Comply with legal obligations and prevent fraud.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">3. Legal Bases</h2>
            <p className="mt-2">
              Depending on your location, processing may rely on consent,
              contract performance (e.g., gym membership), legal obligations,
              or legitimate interests (e.g., improving our fitness services).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">4. Sharing & Disclosures</h2>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>
                With trainers, fitness instructors, and partners to provide
                services.
              </li>
              <li>
                With payment processors and IT vendors (under strict contracts).
              </li>
              <li>
                With authorities if required by law or to ensure safety of
                members and staff.
              </li>
              <li>
                In a business transfer (e.g., merger or acquisition) with
                appropriate notice.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">5. International Transfers</h2>
            <p className="mt-2">
              Your data may be transferred and processed in countries outside
              your own. Safeguards (like contractual clauses) are used where
              required.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">6. Data Retention</h2>
            <p className="mt-2">
              We keep personal data only as long as needed for membership,
              billing, or legal reasons.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">7. Your Rights</h2>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Access, correction, deletion, and portability of your data.</li>
              <li>
                Object to or restrict processing; withdraw consent anytime
                (without affecting past use).
              </li>
              <li>
                Opt out of gym marketing emails by using the unsubscribe link.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">8. Security</h2>
            <p className="mt-2">
              We use safeguards such as encrypted payments and restricted
              access to member data. However, no system is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">9. Children</h2>
            <p className="mt-2">
              Our services are not directed to children under 13 (or the
              applicable age of consent). If you believe a child has provided
              data, please contact us for deletion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">
              10. Changes to This Policy
            </h2>
            <p className="mt-2">
              We may update this Privacy Policy over time. Significant changes
              will be reflected in the Effective Date and additional notice may
              be given.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">11. Contact</h2>
            <p className="mt-2">
              For privacy-related questions, email{" "}
              <a
                className="text-blue-600 underline"
                href={`mailto:${contactEmail}`}
              >
                {contactEmail}
              </a>
              {dpoEmail !== "" ? (
                <>
                  {" "}
                  or contact our Data Protection Officer at{" "}
                  <a
                    className="text-blue-600 underline"
                    href={`mailto:${dpoEmail}`}
                  >
                    {dpoEmail}
                  </a>
                </>
              ) : null}
              . You can also write to us at {companyAddress}.
            </p>
          </section>
        </CardContent>
      </Card>
    </main>
  );
};
export default PrivacyPolicy;