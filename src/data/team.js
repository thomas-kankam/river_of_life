import { IMAGES } from '../constants/images';

export const TEAM = [
  {
    id: 1,
    name: 'Elena Martinez',
    role: 'Founder & Director of Care',
    bio: 'With over 15 years in home healthcare leadership, Elena founded River of Life to deliver premium, family-centered care rooted in compassion and trust.',
    image: IMAGES.team1,
    credentials: ['RN, BSN', 'Certified Care Manager'],
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    role: 'Clinical Advisor',
    bio: 'Dr. Chen guides our clinical standards, care protocols, and quality assurance to ensure safe, evidence-informed home care.',
    image: IMAGES.team2,
    credentials: ['MD', 'Geriatric Medicine'],
  },
  {
    id: 3,
    name: 'Angela Brooks',
    role: 'Care Coordination Lead',
    bio: 'Angela matches families with the right caregivers and ensures seamless communication throughout every care journey.',
    image: IMAGES.team3,
    credentials: ['LPN', 'Care Coordination Certified'],
  },
  {
    id: 4,
    name: 'Daniel Wright',
    role: 'Community Outreach Director',
    bio: 'Daniel builds partnerships with families, providers, and community organizations to expand access to trusted home care.',
    image: IMAGES.team4,
    credentials: ['MSW', 'Community Health'],
  },
];

export const CAREGIVERS = [
  {
    id: 1,
    name: 'Sarah Johnson',
    specialty: 'Personal & Companion Care',
    experience: '8 years',
    image: IMAGES.caregiver,
    quote: 'Every client deserves to feel seen, respected, and cared for like family.',
  },
  {
    id: 2,
    name: 'Maria Gonzalez',
    specialty: 'Dementia & Memory Care',
    experience: '10 years',
    image: IMAGES.team1,
    quote: 'Patience and routine create comfort for clients living with memory challenges.',
  },
  {
    id: 3,
    name: 'Keith Thompson',
    specialty: 'Post-Hospital Recovery',
    experience: '6 years',
    image: IMAGES.team2,
    quote: 'Recovery at home is smoother when clients feel supported every single day.',
  },
];

export const TIMELINE = [
  { year: '2014', title: 'Founded with a Mission', description: 'River of Life began with a commitment to dignified, premium home care.' },
  { year: '2017', title: 'Expanded Specialized Care', description: 'Added memory care, respite, and post-hospital support programs.' },
  { year: '2020', title: '150+ Caregivers Strong', description: 'Grew a trusted team serving families across the Philadelphia region.' },
  { year: '2024', title: 'Community Partnerships', description: 'Launched outreach initiatives and caregiver career pathways.' },
  { year: '2026', title: 'Premium Care, Modern Standards', description: 'Continuing to elevate home healthcare with technology and compassion.' },
];

export const VALUES = [
  { title: 'Compassion', description: 'We lead with empathy in every interaction and care decision.' },
  { title: 'Integrity', description: 'Transparent communication and ethical care are non-negotiable.' },
  { title: 'Excellence', description: 'We hold ourselves to the highest professional standards.' },
  { title: 'Dignity', description: 'Every client deserves respect, autonomy, and personalized attention.' },
  { title: 'Family Partnership', description: 'Families are essential partners in the care journey.' },
  { title: 'Safety', description: 'Proactive planning keeps clients secure and supported at home.' },
];

export const CERTIFICATIONS = [
  'Licensed Home Care Agency',
  'Background-Checked Caregivers',
  'HIPAA Compliant Practices',
  'Ongoing Caregiver Training',
  'Care Plan Supervision',
  '24/7 On-Call Coordination',
];
