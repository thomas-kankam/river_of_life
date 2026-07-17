import { Helmet } from 'react-helmet-async';
import { COMPANY } from '../constants/company';
import { BRAND } from '../constants/brand';

export default function SEO({
  title,
  description,
  path = '/',
  type = 'website',
  image,
  noindex = false,
  jsonLd,
  keywords,
}) {
  const fullTitle = title
    ? `${title} | ${COMPANY.shortName}`
    : `${COMPANY.name} — ${COMPANY.tagline}`;
  const metaDescription = description || `${COMPANY.slogan} Premium home healthcare services in ${COMPANY.address}. ${COMPANY.closingStatement}`;
  const canonical = `${COMPANY.website}${path}`;
  const ogImage = image?.startsWith('http') ? image : `${COMPANY.website}${image || BRAND.ogImage}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={COMPANY.shortName} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLd && (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).map((schema, index) => (
        <script key={index} type="application/ld+json">{JSON.stringify(schema)}</script>
      ))}
    </Helmet>
  );
}
