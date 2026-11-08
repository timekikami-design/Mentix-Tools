import { metadata as pageMetadata, contactEmail } from "@/lib/site";
export const metadata = pageMetadata(
  "Privacy Policy — Your Files Stay Yours",
  "Read how Mentix Tools processes files locally, handles currency requests, and uses optional analytics, cookies, and advertising.",
  "/privacy-policy/",
  "privacy-policy",
);
export default function Privacy() {
  return (
    <article className="reading-column prose-page">
      <span className="eyebrow">THE DETAILS, IN PLAIN ENGLISH</span>
      <h1>Privacy policy.</h1>
      <p>
        Effective November 6, 2026. This policy describes the default
        implementation. The operator must review it against the services
        actually enabled before launch.
      </p>
      <p className="notice">
        <strong>Operator details:</strong>{" "}
        {process.env.NEXT_PUBLIC_LEGAL_ENTITY ||
          "[PLACEHOLDER — YOUR LEGAL ENTITY]"}
        <br />
        <strong>Contact:</strong>{" "}
        {process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
          "[PLACEHOLDER — YOUR CONTACT EMAIL]"}
        <br />
        These clearly marked fields must be replaced before a public production
        launch.
      </p>
      <h2>Your tool inputs</h2>
      <p>
        Tool inputs, generated passwords, and document contents are processed in
        browser memory. We do not upload or save them to a server. Refreshing or
        closing the tab clears tool state. A downloaded file is saved by your
        browser to your device. Copying text uses your system clipboard, which
        is outside our control.
      </p>
      <h2>Currency reference requests</h2>
      <p>
        The currency converter sends selected currency codes to
        api.frankfurter.app. It does not send the amount. Frankfurter and its
        infrastructure receive ordinary connection data such as your IP address.
        Rates are cached in tab memory, not persistent storage.
      </p>
      <h2>Hosting and ordinary web requests</h2>
      <p>
        Our hosting provider necessarily receives network requests to deliver
        pages, fonts, scripts, and assets. Server access logs may contain IP
        addresses, user agents, timestamps, and requested URLs. Do not include
        sensitive information in page URLs. Fonts and tool workers are hosted
        with the site, not requested from a third-party CDN at runtime.
      </p>
      <h2>Optional Google Analytics 4</h2>
      <p>
        If NEXT_PUBLIC_GA_ID is configured, Analytics loads only after you allow
        optional cookies. GA4 may collect page views, device and browser
        details, approximate location, and interaction events. The custom
        tool_used and file_processed events contain a tool slug, never input
        text, file names, contents, or passwords. Google may process this
        information according to its own privacy policy and applicable data
        transfer arrangements.
      </p>
      <h2>Cookies and preferences</h2>
      <p>
        A single localStorage preference, mentix-tools-consent, records your
        optional-cookie decision. Tool state is not saved there. Use “Cookie
        settings” in the footer to change your choice. Selecting essential-only
        reloads the page without optional scripts; cookies already set by a
        third party may need to be removed in your browser settings. Blocking
        local storage means the preference may not persist.
      </p>
      <h2>Optional Google AdSense</h2>
      <p>
        If an AdSense ID and ad slots are configured, the Google advertising
        script loads only after optional consent. Google and its partners may
        use cookies or other identifiers for ad delivery, measurement, and
        personalization where permitted. No more than two reserved ad areas
        appear on a tool page. Ads are never placed above the tool interface. A
        publisher may need a certified consent management platform, regional
        disclosures, and additional controls before enabling personalized ads in
        regulated markets. Do not enable ads until those obligations are met.
      </p>
      <h2>Links and contact messages</h2>
      <p>
        External links have their own privacy practices. The contact form opens
        your email application using a mailto link; it does not submit to our
        server. Messages you choose to send are handled by your email provider
        and the operator’s mailbox.
      </p>
      <h2>Your choices and rights</h2>
      <p>
        You can refuse optional cookies and continue using every tool. Depending
        on your location, you may have rights to access, correct, delete, or
        restrict personal data held by the operator, or complain to a
        supervisory authority. Contact{" "}
        <a href={`mailto:${contactEmail}`}>{contactEmail}</a> with a request. Do
        not send sensitive files as part of a support message.
      </p>
      <h2>Changes</h2>
      <p>
        We may update this page when the site’s behavior changes. The effective
        date will be revised. This template is not legal advice and needs
        operator review before publication.
      </p>
    </article>
  );
}
