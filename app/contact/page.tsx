import { metadata as pageMetadata, contactEmail } from "@/lib/site";
import ContactForm from "@/components/ContactForm";
export const metadata = pageMetadata(
  "Contact — A Note Goes a Long Way",
  "Contact Mentix Tools with a question, bug report, or suggestion. Our contact form opens your email app; no server submission.",
  "/contact/",
  "contact",
);
export default function Contact() {
  return (
    <article className="reading-column prose-page">
      <span className="eyebrow">LET’S MAKE IT A LITTLE BETTER</span>
      <h1>Drop us a note.</h1>
      <p>
        Found a rough edge? Have a useful idea? Tell us what happened and which
        browser you use. Please do not include private files or passwords.
      </p>
      <p>This form opens your own mail app. You decide when to send.</p>
      <ContactForm />
      <p>
        Prefer a direct email?{" "}
        <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
      </p>
      {!process.env.NEXT_PUBLIC_CONTACT_EMAIL && (
        <p className="notice">
          Operator setup required: this is an example address. Set
          NEXT_PUBLIC_CONTACT_EMAIL before publishing.
        </p>
      )}
    </article>
  );
}
