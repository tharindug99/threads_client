/* eslint-disable react/no-unescaped-entities */
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Scholalify Privacy Policy: Safeguarding Your Information",
  description:
    "Explore Scholalify's commitment to privacy. Understand how we collect, use, and protect your personal data, ensuring a secure and transparent experience on our platform.",
};

export default function Privacy() {
  return (
    <main className="w-full flex justify-center px-10">
      <section className="max-w-screen-md flex-1 flex flex-col text-lg">
        <h1 className="text-4xl font-semibold py-28">Privacy</h1>

        <article className="py-10">
          <h2 className="text-xl pb-4">OUR COMMITMENT TO YOU</h2>
          <p className="py-2">
            At Scholalify, your privacy is of paramount importance. We
            understand that trust is at the heart of the educational technology
            services we provide.
            <br /> <br />
            We value the trust you place in us when you share your information,
            and we take this responsibility seriously.
          </p>
          <p className="py-2">
            <b>Our commitment to privacy.</b> We build and operate all our
            services with your privacy in mind.
          </p>
          <p className="py-2">
            <b>Our commitment to transparency.</b> Unlike many privacy policies
            that are convoluted, we believe in clear and straightforward
            communication. We want you to read and understand our privacy
            practices. You'll find our policy written in plain language to make
            it accessible.
          </p>
          <p className="py-2">
            <b>Our commitment to security.</b> We follow the state of art
            practices to ensure the security of your data. Regular updates and
            investments in security measures are integral to safeguarding your
            information.
          </p>
        </article>
        <article className="py-10">
          <h2 className="text-xl pb-4">PRIVACY POLICY</h2>
          <p className="py-2">
            Welcome to Scholalify's Privacy Policy, tailored to our AI-driven
            English learning service. Thank you for taking the time to review
            it.
            <br /> <br />
            In the context of this service, we collect the following information
            from you: your email address and phone number. Your email serves as
            a means of authentication and user identification, while your phone
            number facilitates the delivery of WhatsApp notifications. If you
            opt to make payments, we will collect your payment information. Rest
            assured, we do not store card details on our servers for security
            reasons, unless you explicitly choose to do so. We do, however,
            retain your billing address by default to streamline the payment
            process.
            <br /> <br />
            In terms of data sharing, please note that your email may be shared
            with third parties for analytics and usage tracking, while your card
            information will be utilized by the payment provider. We keep
            updating our privacy policy to reflect any changes in our data
            collection and sharing practices. We encourage you to review this
            policy periodically.
          </p>
        </article>
      </section>
    </main>
  );
}
