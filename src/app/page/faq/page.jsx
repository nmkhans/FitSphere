"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQ() {
  return (
    <div className="max-w-4xl mx-auto space-y-4 mb-3">
      <h2 className="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>How do I create an account?</AccordionTrigger>
          <AccordionContent>
            Click the <span className="font-semibold">Sign Up</span> button in the top right corner and follow the registration process.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>I forgot my password. What should I do?</AccordionTrigger>
          <AccordionContent>
            Click on <span className="font-semibold">Forgot Password</span> on the login page and follow the instructions sent to your email.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>How do I update my profile information?</AccordionTrigger>
          <AccordionContent>
            Go to <span className="font-semibold">My Account</span> settings and select <span className="font-semibold">Edit Profile</span> to make changes.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>What membership plans do you offer?</AccordionTrigger>
          <AccordionContent>
            We offer flexible plans including <span className="font-semibold">Monthly, Quarterly, and Yearly</span> memberships to suit your fitness goals.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>Can I pause or cancel my membership?</AccordionTrigger>
          <AccordionContent>
            Yes, you can pause or cancel your membership anytime from your <span className="font-semibold">Account Settings</span>.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger>Do you provide personal trainers?</AccordionTrigger>
          <AccordionContent>
            Yes, we have certified trainers available. You can book a trainer when purchasing or updating your membership.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7">
          <AccordionTrigger>What facilities are included in my membership?</AccordionTrigger>
          <AccordionContent>
            All memberships include access to <span className="font-semibold">Gym Equipment, Locker Rooms, Showers, and Group Classes</span>.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-8">
          <AccordionTrigger>Do you offer diet or workout plans?</AccordionTrigger>
          <AccordionContent>
            Absolutely! Our trainers can provide <span className="font-semibold">personalized workout and nutrition plans</span> to help you reach your goals.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
