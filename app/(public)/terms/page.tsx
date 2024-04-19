import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Scholalify Terms of Service: Understanding Our Guidelines",
  description:
    "Dive into the terms governing your use of Scholalify. Familiarize yourself with our policies, guidelines, and conditions, ensuring a harmonious campus connection experience.",
};

export default function Terms() {
  return (
    <main className="w-full flex justify-center min-h-[90vh] px-10">
      <section className="max-w-screen-md flex-1 flex flex-col text-lg">
        <h1 className="text-4xl font-semibold py-28">Terms</h1>

        <article className="py-10">
          <h2 className="text-xl pb-4">Terms of Use Agreement</h2>
          <p className="py-2">
            Please read these Terms of Use carefully before using our services.
          </p>
          <p className="py-2">
            By accessing or using our services, you agree to be bound by these
            Terms. If you do not agree to these Terms, please do not use our
            services.
          </p>
          <p className="py-2">
            <b>1. Acceptance of Terms</b>
            <br />
            By using our services, you acknowledge that you have read,
            understood, and agreed to be bound by these Terms of Use. If you are
            using our services on behalf of an organization, you are agreeing to
            these Terms on behalf of that organization.
          </p>
          <p className="py-2">
            <b>2. Use of Our Services</b>
            <br />
            You agree to use our services only for lawful purposes and in
            accordance with these Terms of Use. You are responsible for all
            activities that occur under your account or with your usage.
          </p>
          <p className="py-2">
            <b>3. Privacy Policy</b>
            <br />
            Your use of our services is also governed by our Privacy Policy.
            Please review our Privacy Policy to understand how we collect and
            use your information.
          </p>
          <p className="py-2">
            <b>4. Changes to Terms</b>
            <br />
            We reserve the right to update or change these Terms at any time.
            Your continued use of our services after we post any modifications
            to these Terms will constitute your acknowledgment of the
            modifications and your consent to be bound by the modified Terms.
          </p>
          <p className="py-2">
            <b>5. Refund Policy</b>
            <br />
            We offer a 30-day refund policy. If you are not satisfied with our
            services, you may request a refund within 30 days of your purchase
            or subscription. Please contact us for assistance and we will be
            happy to help you.
          </p>
          <p className="py-2">
            <b>6. Contact Information</b>
            <br />
            If you have any questions about these Terms or our refund policy,
            please contact us at{" "}
            <Link href="mailto:contact@scholalify.com" className="text-primary">
              contact@scholalify.com
            </Link>
            .
          </p>
          <p className="py-2">Thank you for using our services!</p>
        </article>
      </section>
    </main>
  );
}
