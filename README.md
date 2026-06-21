# Royal Arabian China Destination Page

A CMS-driven China destination experience built for the Royal Arabian Senior Full-Stack Developer Assessment.

The application uses Next.js 14, TypeScript, Tailwind CSS, and Sanity CMS. It also includes the optional Supabase enquiry flow, package detail pages, component tests, and automated deployment through GitHub Actions.

## Live Links

- Live application: [https://project-zo9u9.vercel.app](https://project-zo9u9.vercel.app)
- China destination page: [https://project-zo9u9.vercel.app/cn](https://project-zo9u9.vercel.app/cn)
- GitHub repository: [https://github.com/Minhaj-T/ra-developer-assessment](https://github.com/Minhaj-T/ra-developer-assessment)
- Embedded Sanity Studio: [https://project-zo9u9.vercel.app/studio](https://project-zo9u9.vercel.app/studio)

The root URL redirects to `/cn`.

## Sanity Project

- Project ID: `x022qpej`
- Dataset: `production`
- Schema types: `destination` and `package`

The Sanity project contains the China destination, its hero image, overview, highlights, practical travel information, SEO metadata, and linked travel packages.

## Features

- CMS-driven China destination content
- Responsive layouts for mobile, tablet, and desktop
- Four travel packages with pricing, duration, description, images, and inclusions
- Dynamic package detail pages at `/cn/packages/[slug]`
- Book Now enquiry modal with client-side validation
- Supabase enquiry submission for name, email, phone, and package
- Embedded Sanity Studio at `/studio`
- Dynamic SEO metadata from Sanity
- Optimized responsive images through `next/image`
- Incremental Static Regeneration with a five-minute revalidation interval
- Smooth anchor scrolling and limited hover transitions with reduced-motion support
- Custom loading-failure and not-found experiences
- Vitest and React Testing Library component tests
- GitHub Actions quality checks and Vercel deployment

## Tech Stack

- Next.js 14 with the App Router
- React 18
- TypeScript
- Tailwind CSS
- Sanity CMS
- Supabase
- Vitest and React Testing Library
- GitHub Actions
- Vercel

## Prerequisites

- Node.js 20 or later
- npm
- A Sanity project and dataset
- A Supabase project if the enquiry bonus is enabled

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/Minhaj-T/ra-developer-assessment.git
cd ra-developer-assessment
```

### 2. Install dependencies

The repository uses npm and includes `package-lock.json`.

```bash
npm ci
```

### 3. Configure environment variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Do not commit `.env.local`. Variables prefixed with `NEXT_PUBLIC_` are available to browser code, so never place a Sanity write token or Supabase service-role key in them.

### 4. Configure Sanity

The Studio configuration is located at:

```text
sanity.config.ts
sanity.cli.ts
sanity/schemaTypes/
```

The schemas are registered in `sanity/schemaTypes/index.ts`. Add and publish:

1. A destination document with the slug `cn`.
2. At least three package documents referencing that destination.
3. Images, itinerary entries, inclusions, pricing, and other required fields.

Start the application and open [http://localhost:3000/studio](http://localhost:3000/studio) to manage content.

### 5. Configure Supabase

Open the Supabase SQL Editor and run:

```text
supabase/enquiries.sql
```

The script creates the `enquiries` table, enables Row Level Security, and adds an insert policy for anonymous and authenticated users.

The table stores:

- `name`
- `email`
- `phone`
- `package`
- `created_at`

### 6. Start development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root route redirects to `/cn`.

## Available Commands

```bash
npm run dev          # Start the development server
npm run build        # Create a production build
npm run start        # Run the production build
npm run lint         # Run Next.js ESLint checks
npx tsc --noEmit     # Run TypeScript validation
npm test             # Run component tests once
npm run test:watch   # Run tests in watch mode
```

## Project Structure

```text
.
├── .github/workflows/
│   └── ci.yml                       # Quality checks and Vercel deployment
├── sanity/
│   └── schemaTypes/
│       ├── destination.ts           # Destination document schema
│       ├── package.ts               # Package document schema
│       └── index.ts                 # Registered schema types
├── src/
│   ├── app/
│   │   ├── cn/
│   │   │   ├── packages/[slug]/
│   │   │   │   └── page.tsx         # Dynamic package detail page
│   │   │   └── page.tsx             # China destination page
│   │   ├── studio/[[...tool]]/
│   │   │   └── page.tsx             # Embedded Sanity Studio
│   │   ├── error.tsx                # Application error boundary
│   │   ├── not-found.tsx            # Custom 404 page
│   │   └── page.tsx                 # Redirects `/` to `/cn`
│   ├── components/
│   │   ├── destination/              # Destination-page sections
│   │   ├── layout/                   # Navbar and footer
│   │   └── packages/                 # Package cards, grid, modal, and test
│   ├── lib/
│   │   ├── sanity/                   # Sanity client and GROQ queries
│   │   └── supabase/                 # Supabase browser client
│   └── types/
│       └── index.ts                  # Shared TypeScript interfaces
├── supabase/
│   └── enquiries.sql                 # Reproducible enquiry-table setup
├── sanity.cli.ts
├── sanity.config.ts
├── vitest.config.ts
└── vitest.setup.ts
```

## Architecture and Decisions

### Server-rendered CMS data

The destination and package pages are React Server Components. They fetch Sanity data on the server, keeping CMS access and rendering logic out of client components.

Independent destination and package requests run in parallel. React `cache` deduplicates repeated requests used by page rendering and metadata generation.

### Content revalidation

Sanity requests use a revalidation interval of 300 seconds. This provides fast cached pages while allowing published CMS updates to appear without rebuilding the complete application.

### Content ownership

Destination editorial content and package data come from Sanity. Reusable interface labels, navigation text, brand contact details, validation messages, and error-state copy remain application-owned because they are shared UI content rather than destination records.

### Image optimization

Sanity image URLs are generated at appropriate dimensions and rendered with `next/image`. Responsive `sizes`, fixed aspect-ratio containers, and priority loading for hero images reduce layout shift and unnecessary image transfer.

### Enquiry submission

The enquiry modal is a client component because it manages dialog state, validation, and browser-side Supabase submission. Supabase Row Level Security permits inserts but does not expose enquiry records to anonymous users.

### Responsive design

The interface uses a mobile-first approach:

- Single-column content and mobile navigation at small widths
- Two-column package grids on tablets
- Three-column package grids and wider editorial layouts on desktops
- Responsive dialog, typography, spacing, images, and footer layouts

### Accessibility

- Semantic headings and landmarks
- Descriptive image alternative text
- Labelled form controls and inline validation messages
- Visible keyboard focus styles
- Accessible dialog labelling
- Reduced-motion support

## Testing

`src/components/packages/EnquireModal.test.tsx` covers the highest-risk interactive flow:

1. Opening the enquiry dialog for the selected package.
2. Displaying validation errors and preventing invalid submissions.
3. Sending the correct valid payload to the Supabase `enquiries` table.

Run the tests with:

```bash
npm test
```

## Deployment and CI/CD

The GitHub Actions workflow runs the following checks on pull requests:

1. Install dependencies with `npm ci`.
2. Run ESLint.
3. Run TypeScript validation.
4. Run component tests.

After changes reach `main`, the workflow pulls the Vercel production configuration, builds the application, and deploys the prebuilt output to Vercel.

The following GitHub Actions secrets are required:

```text
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
```

Sanity and Supabase application variables are configured for the Vercel Production and Preview environments.

## Assessment Requirements

The implementation covers the required destination fields, responsive page, package cards, pricing, durations, descriptions, enquiry actions, optimized images, TypeScript typing, and documentation.

Implemented bonus items:

- Supabase enquiry integration
- Dynamic package detail pages
- Basic component tests

## Known Trade-offs

- The enquiry form submits directly from the browser using the Supabase anonymous key and an insert-only RLS policy. A production implementation should add rate limiting or CAPTCHA protection.
- The project contains focused tests for the enquiry flow rather than complete component and end-to-end coverage.
- Motion is limited to smooth anchor scrolling and small hover transitions; dedicated scroll-reveal animations were not implemented.
- CMS updates may take up to five minutes to appear because of the configured revalidation interval.
