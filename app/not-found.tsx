import Link from "next/link";
export default function NotFound() {
  return (
    <section className="shell error-page">
      <span className="eyebrow">A SMALL WRONG TURN</span>
      <h1>Nothing at this address.</h1>
      <p>The tool you need is probably one click away.</p>
      <Link href="/tools/" className="button">
        Explore all tools →
      </Link>
    </section>
  );
}
