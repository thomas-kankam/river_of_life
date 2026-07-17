import { IMAGES } from '../constants/images';

export const BLOG_POSTS = [
  {
    slug: 'signs-your-loved-one-may-need-home-care',
    title: '7 Signs Your Loved One May Need Home Care',
    excerpt: 'Recognizing early signs that extra support at home could improve safety, health, and quality of life for your aging loved one.',
    category: 'Care Guides',
    author: 'River of Life Care Team',
    authorRole: 'Clinical Coordination',
    date: '2026-06-15',
    readTime: 6,
    featured: true,
    image: IMAGES.blog1,
    tags: ['Home Care', 'Family', 'Safety'],
    content: `
## Introduction

Choosing home care is a deeply personal decision. Many families wait until a crisis occurs, but early support can prevent falls, hospitalizations, and caregiver burnout.

## 1. Difficulty with Daily Activities

If bathing, dressing, or meal preparation has become challenging, personal care support can restore dignity and independence.

## 2. Increased Forgetfulness

Missed medications or unpaid bills may signal the need for medication reminders and companion care.

## 3. Social Withdrawal

Isolation affects mental and physical health. Companion care encourages engagement and routine.

## 4. Recent Hospitalization

Post-hospital care helps ensure a safe recovery and reduces readmission risk.

## 5. Mobility Changes

Unsteady walking, fear of falling, or difficulty using stairs are important safety signals.

## 6. Caregiver Stress

Family caregivers deserve respite. Professional support protects everyone involved.

## 7. Home Safety Concerns

Clutter, expired food, or neglected housekeeping may indicate a need for light home support.

## Next Steps

A free consultation with River of Life can help your family explore options with clarity and compassion.
    `.trim(),
  },
  {
    slug: 'how-to-choose-a-home-healthcare-agency',
    title: 'How to Choose a Trusted Home Healthcare Agency',
    excerpt: 'A practical checklist for evaluating credentials, caregiver training, communication, and care quality before you commit.',
    category: 'Resources',
    author: 'River of Life Care Team',
    authorRole: 'Patient Advocacy',
    date: '2026-05-28',
    readTime: 8,
    featured: false,
    image: IMAGES.blog2,
    tags: ['Choosing Care', 'Trust', 'Checklist'],
    content: `
## What Matters Most

Look beyond marketing promises. Evaluate licensing, supervision, caregiver screening, and family communication practices.

## Questions to Ask

- Are caregivers employees or independent contractors?
- How are care plans updated?
- What is the backup plan if a caregiver is unavailable?
- How do you handle emergencies?

## Red Flags

High turnover, vague pricing, and poor responsiveness during the inquiry phase often predict future issues.

## Why Families Choose River of Life

We prioritize transparency, compassionate matching, and ongoing supervision — because your health is our priority.
    `.trim(),
  },
  {
    slug: 'benefits-of-companion-care-for-seniors',
    title: 'The Life-Changing Benefits of Companion Care',
    excerpt: 'Learn how regular companionship improves emotional wellbeing, cognitive engagement, and overall health outcomes.',
    category: 'Companion Care',
    author: 'River of Life Care Team',
    authorRole: 'Wellness Education',
    date: '2026-05-10',
    readTime: 5,
    featured: false,
    image: IMAGES.blog3,
    tags: ['Companion Care', 'Wellness', 'Seniors'],
    content: `
## More Than Conversation

Companion care reduces loneliness, encourages activity, and creates meaningful daily structure.

## Health Impacts

Social connection is linked to lower stress, better sleep, and improved adherence to health routines.

## Activities That Help

Walks, puzzles, music, light exercise, and shared meals all support cognitive and emotional health.

## Getting Started

Even a few hours per week can make a measurable difference in quality of life.
    `.trim(),
  },
  {
    slug: 'nutrition-tips-for-seniors-at-home',
    title: 'Nutrition Tips for Seniors Living at Home',
    excerpt: 'Simple, practical guidance for balanced meals, hydration, and dietary adjustments that support healthy aging.',
    category: 'Nutrition',
    author: 'River of Life Care Team',
    authorRole: 'Care Education',
    date: '2026-04-22',
    readTime: 7,
    featured: false,
    image: IMAGES.blog4,
    tags: ['Nutrition', 'Meal Prep', 'Wellness'],
    content: `
## Hydration First

Dehydration is common and often overlooked. Encourage water throughout the day.

## Balanced Plates

Aim for lean protein, colorful vegetables, whole grains, and healthy fats at each meal.

## Medication & Diet Interactions

Coordinate with physicians when appetite changes or new medications are introduced.

## How We Help

Our meal preparation services support dietary needs while making dining enjoyable again.
    `.trim(),
  },
];

export const BLOG_CATEGORIES = ['All', 'Care Guides', 'Resources', 'Companion Care', 'Nutrition'];

export function getBlogBySlug(slug) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getRelatedPosts(slug, limit = 3) {
  const current = getBlogBySlug(slug);
  if (!current) return BLOG_POSTS.slice(0, limit);
  return BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, limit);
}
