import { COMPANY } from '../constants/company';
import { BRAND } from '../constants/brand';
import { SERVICES } from '../data/services';

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: COMPANY.name,
    description: `${COMPANY.tagline} ${COMPANY.slogan}`,
    url: COMPANY.website,
    logo: `${COMPANY.website}${BRAND.ogImage}`,
    image: `${COMPANY.website}${BRAND.ogImage}`,
    telephone: COMPANY.phone,
    email: COMPANY.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: COMPANY.city,
      addressRegion: COMPANY.state,
      addressCountry: COMPANY.country,
    },
    areaServed: {
      '@type': 'City',
      name: COMPANY.city,
    },
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '14:00',
      },
    ],
    sameAs: Object.values(COMPANY.social),
  };
}

export function getBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${COMPANY.website}${item.path}`,
    })),
  };
}

export function getServiceSchema(service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'MedicalBusiness',
      name: COMPANY.name,
    },
    areaServed: COMPANY.city,
    serviceType: 'Home Health Care',
  };
}

export function getFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function getArticleSchema(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: COMPANY.name,
    },
  };
}

export function getLocalBusinessSchema() {
  return getOrganizationSchema();
}

export function getAllServicesSchema() {
  return SERVICES.map((service) => getServiceSchema(service));
}
