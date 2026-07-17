import axios from 'axios';
import { COMPANY } from '../constants/company';

const FORM_ENDPOINT = process.env.REACT_APP_FORM_ENDPOINT;
const FORM_ACCESS_KEY = process.env.REACT_APP_WEB3FORMS_ACCESS_KEY;

/**
 * Submit contact/consultation forms.
 * Configure one of:
 *   REACT_APP_FORM_ENDPOINT — Formspree URL (https://formspree.io/f/xxxxx)
 *   REACT_APP_WEB3FORMS_ACCESS_KEY — Web3Forms access key
 */
export async function submitContactForm(data, formType = 'contact') {
  const payload = {
    ...data,
    _subject: `[${COMPANY.shortName}] ${formType === 'newsletter' ? 'Newsletter Signup' : 'New Contact Request'}`,
    formType,
    _replyto: data.email,
  };

  if (FORM_ENDPOINT) {
    const response = await axios.post(
      FORM_ENDPOINT,
      payload,
      { headers: { Accept: 'application/json', 'Content-Type': 'application/json' } }
    );
    return response.data;
  }

  if (FORM_ACCESS_KEY) {
    const response = await axios.post('https://api.web3forms.com/submit', {
      access_key: FORM_ACCESS_KEY,
      subject: payload._subject,
      from_name: `${data.firstName || ''} ${data.lastName || ''}`.trim() || 'Website Visitor',
      email: data.email,
      phone: data.phone || '',
      service: data.service || '',
      message: data.message || data.email,
      form_type: formType,
    });
    if (!response.data.success) {
      throw new Error(response.data.message || 'Form submission failed');
    }
    return response.data;
  }

  // Dev fallback — log and simulate success when no backend is configured
  if (process.env.NODE_ENV === 'development') {
    console.info('[Form] No backend configured. Submission payload:', payload);
    await new Promise((r) => setTimeout(r, 600));
    return { ok: true, dev: true };
  }

  throw new Error(
    'Form delivery is not configured. Set REACT_APP_FORM_ENDPOINT or REACT_APP_WEB3FORMS_ACCESS_KEY.'
  );
}

export async function submitNewsletterForm(email) {
  return submitContactForm(
    { email, firstName: 'Newsletter', lastName: 'Subscriber', message: 'Newsletter subscription request' },
    'newsletter'
  );
}
