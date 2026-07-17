import { COMPANY } from '../constants/company';
import { SERVICES } from './services';
import { FAQS } from './faqs';
import { TESTIMONIALS } from './testimonials';

export const CHATBOT_INTENTS = [
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon'],
    response: `Hello! Welcome to ${COMPANY.shortName}. I'm here to help you learn about our home healthcare services. How can I assist you today?`,
    quickReplies: ['Our Services', 'Book Consultation', 'Contact Info', 'Office Hours'],
  },
  {
    keywords: ['service', 'services', 'care', 'help with', 'what do you offer'],
    response: `We offer premium home care including:\n\n${SERVICES.slice(0, 6).map((s) => `• ${s.title}`).join('\n')}\n\n...and specialized care options. Would you like to explore a specific service?`,
    quickReplies: ['Personal Care', 'Companion Care', 'Specialized Care', 'View All Services'],
    link: '/services',
  },
  {
    keywords: ['personal care', 'bathing', 'grooming', 'dressing'],
    response: 'Our Personal Care service provides dignified assistance with bathing, grooming, dressing, mobility, and daily hygiene — all in the comfort of home.',
    quickReplies: ['Book Consultation', 'Pricing', 'Contact Us'],
    link: '/services/personal-care',
  },
  {
    keywords: ['companion', 'companionship', 'lonely', 'social'],
    response: 'Companion Care offers meaningful conversation, activities, emotional support, and safety check-ins to reduce isolation and uplift daily life.',
    quickReplies: ['Learn More', 'Book Consultation', 'FAQs'],
    link: '/services/companion-care',
  },
  {
    keywords: ['medication', 'medicine', 'pill', 'reminder'],
    response: 'Our Medication Reminder service helps clients stay on track with prescribed routines through timely reminders and adherence support.',
    quickReplies: ['Learn More', 'Book Consultation'],
    link: '/services/medication-reminders',
  },
  {
    keywords: ['price', 'pricing', 'cost', 'how much', 'rates', 'insurance'],
    response: 'Care costs depend on the type and frequency of services needed. We offer transparent pricing during your free consultation and can discuss private pay and coverage options.',
    quickReplies: ['Book Free Consultation', 'Contact Us', 'FAQs'],
    link: '/contact',
  },
  {
    keywords: ['book', 'consultation', 'appointment', 'schedule', 'start care'],
    response: 'We\'d love to help you get started! Book a free consultation and our care team will create a personalized plan for your family.',
    quickReplies: ['Go to Contact Page', 'Call Now', 'Office Hours'],
    link: '/contact',
  },
  {
    keywords: ['hour', 'hours', 'open', 'when are you', 'office'],
    response: `Our office hours:\n\n📅 ${COMPANY.hours.weekdays}\n📅 ${COMPANY.hours.saturday}\n📅 ${COMPANY.hours.sunday}\n\n🚨 ${COMPANY.hours.emergency}`,
    quickReplies: ['Contact Us', 'Book Consultation'],
  },
  {
    keywords: ['phone', 'call', 'number', 'contact'],
    response: `You can reach us at ${COMPANY.phone} or email ${COMPANY.email}. We're here to help!`,
    quickReplies: ['Book Consultation', 'Office Hours', 'Our Location'],
    link: '/contact',
  },
  {
    keywords: ['email', 'mail'],
    response: `Email us anytime at ${COMPANY.email}. We typically respond within one business day.`,
    quickReplies: ['Contact Page', 'Book Consultation'],
    link: '/contact',
  },
  {
    keywords: ['location', 'address', 'where', 'area', 'serve'],
    response: `We serve the ${COMPANY.address}. Contact us to confirm availability for your specific location.`,
    quickReplies: ['Contact Us', 'Book Consultation'],
    link: '/contact',
  },
  {
    keywords: ['about', 'company', 'who are you', 'mission'],
    response: `${COMPANY.name} — ${COMPANY.tagline}\n\n${COMPANY.slogan}\n\nWe deliver premium, compassionate home healthcare with a focus on trust, safety, and family partnership.`,
    quickReplies: ['Our Services', 'Meet the Team', 'Testimonials'],
    link: '/about',
  },
  {
    keywords: ['testimonial', 'review', 'feedback', 'experience'],
    response: `"${TESTIMONIALS[0].quote}"\n\n— ${TESTIMONIALS[0].name}, ${TESTIMONIALS[0].role}`,
    quickReplies: ['More Testimonials', 'Book Consultation', 'Contact Us'],
    link: '/about#testimonials',
  },
  {
    keywords: ['faq', 'question', 'help'],
    response: `Here's a common question:\n\nQ: ${FAQS[0].question}\nA: ${FAQS[0].answer}`,
    quickReplies: ['View All FAQs', 'Contact Us', 'Book Consultation'],
    link: '/faq',
  },
  {
    keywords: ['alzheimer', 'dementia', 'memory'],
    response: 'We offer specialized Alzheimer\'s and Dementia Care with trained caregivers focused on safety, routine, dignity, and meaningful engagement.',
    quickReplies: ['Alzheimer Care', 'Dementia Care', 'Book Consultation'],
    link: '/services/alzheimer-care',
  },
  {
    keywords: ['transport', 'ride', 'appointment', 'driver'],
    response: 'Our Transportation service provides safe rides to medical appointments, errands, and community activities with caring escort support.',
    quickReplies: ['Learn More', 'Book Consultation'],
    link: '/services/transportation',
  },
  {
    keywords: ['human', 'agent', 'person', 'speak to someone', 'representative'],
    response: 'I\'ll connect you with our care team. Visit our Contact page or call us directly for personalized assistance.',
    quickReplies: ['Contact Page', `Call ${COMPANY.phone}`],
    link: '/contact',
    escalate: true,
  },
];

export const CHATBOT_GREETING = {
  message: `Hi there! 👋 I'm the ${COMPANY.shortName} Care Assistant. I can help with services, hours, booking, and more. What would you like to know?`,
  quickReplies: ['Our Services', 'Book Consultation', 'Office Hours', 'Contact Info'],
};

export function findChatbotResponse(input) {
  const normalized = input.toLowerCase().trim();
  if (!normalized) return null;

  const match = CHATBOT_INTENTS.find((intent) =>
    intent.keywords.some((keyword) => normalized.includes(keyword))
  );

  return match || {
    response: "I'm not sure about that yet, but our care team would love to help! You can visit our Contact page or ask about services, hours, pricing, or booking.",
    quickReplies: ['Our Services', 'Contact Us', 'Book Consultation', 'FAQs'],
    link: '/contact',
  };
}
