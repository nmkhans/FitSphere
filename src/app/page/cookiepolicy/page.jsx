// --- File: CookiePolicy.jsx ---
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CookiePolicy = ({
  siteName = "FitSphere Gym",
  effectiveDate = "September 2025",
}) => {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      <Card className="rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl sm:text-4xl font-bold">
            Cookie Policy
          </CardTitle>
          <p className="mt-2 text-sm text-muted-foreground">
            Effective Date: {effectiveDate}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <p className="leading-relaxed">
            This Cookie Policy explains how {siteName} uses cookies and
            similar technologies to recognize you when you visit our
            fitness website, why we use them, and how you can control them.
          </p>

          <section>
            <h2 className="text-xl font-semibold">
              1. What Are Cookies?
            </h2>
            <p className="mt-2">
              Cookies are small text files placed on your device. They help
              websites run smoothly, store your preferences (like workout
              schedules or login info), and improve your overall experience.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">
              2. Types of Cookies We Use
            </h2>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>
                <span className="font-medium">Strictly Necessary:</span>{" "}
                required for secure login, membership booking, and class
                reservations.
              </li>
              <li>
                <span className="font-medium">Performance/Analytics:</span>{" "}
                help us track how members use the site (e.g., page visits,
                workout plan views).
              </li>
              <li>
                <span className="font-medium">Functionality:</span> remember
                preferences like your favorite trainers, gym location, or
                preferred workout type.
              </li>
              <li>
                <span className="font-medium">Advertising/Targeting:</span>{" "}
                show you relevant fitness promotions and offers.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">3. Cookies We May Set</h2>
            <div className="overflow-x-auto mt-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Duration</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>session_id</TableCell>
                    <TableCell>Maintain secure login & booking</TableCell>
                    <TableCell>Strictly necessary</TableCell>
                    <TableCell>Session</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>analytics_*</TableCell>
                    <TableCell>
                      Track site performance & member engagement
                    </TableCell>
                    <TableCell>Performance</TableCell>
                    <TableCell>Up to 24 months</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>fav_trainer</TableCell>
                    <TableCell>
                      Remember your selected trainer preferences
                    </TableCell>
                    <TableCell>Functionality</TableCell>
                    <TableCell>6-12 months</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>promo_consent</TableCell>
                    <TableCell>
                      Save your choice for promotional offers
                    </TableCell>
                    <TableCell>Targeting</TableCell>
                    <TableCell>6-12 months</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold">4. Managing Cookies</h2>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>
                Most browsers let you block or delete cookies via their
                settings. Check your browser’s Help section for details.
              </li>
              <li>
                You can opt out of some analytics and advertising cookies
                using their own opt-out tools.
              </li>
              <li>
                Disabling some cookies may affect gym features such as class
                booking or membership management.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">5. Changes to This Policy</h2>
            <p className="mt-2">
              We may update this Cookie Policy as our services grow. Please
              check back occasionally for updates.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">6. Contact</h2>
            <p className="mt-2">
              Have questions about cookies? Contact us at{" "}
              <a
                className="text-blue-600 underline"
                href="mailto:info@fitsphere.com"
              >
                info@fitsphere.com
              </a>
              .
            </p>
          </section>
        </CardContent>
      </Card>
    </main>
  );
};


export default CookiePolicy;