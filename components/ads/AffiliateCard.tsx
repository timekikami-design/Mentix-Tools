export default function AffiliateCard({
  title,
  description,
  link,
}: {
  title: string;
  description: string;
  link: string;
}) {
  return (
    <aside className="panel">
      <small>Affiliate link · we may earn a commission</small>
      <h3>{title}</h3>
      <p>{description}</p>
      <a href={link} target="_blank" rel="sponsored noopener noreferrer">
        Learn more ↗
      </a>
    </aside>
  );
}
