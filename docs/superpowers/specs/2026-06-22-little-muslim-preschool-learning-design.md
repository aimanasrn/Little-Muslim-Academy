# Little Muslim Preschool Learning Design

Date: 2026-06-22
Status: Drafted and approved in brainstorming
Project type: Launch-ready full-stack preschool Islamic education platform

## 1. Goal

Build a bilingual preschool Islamic education web app called `Little Muslim Preschool Learning` that allows parents to register, purchase one-time lifetime access, manage child profiles, and guide children through interactive learning content. The platform must support:

- Public marketing and conversion pages
- Parent/user authentication and lifetime access entitlement
- Protected learning modules with preview gating before payment
- Admin management for users, content, quizzes, and payments
- Malaysian payment gateway readiness, starting with a placeholder provider

The design targets a launch-ready foundation rather than a demo-only prototype.

## 2. Product Decisions

The following decisions are fixed for v1 planning:

- Development happens on `main`
- The design optimizes for a launch-ready product foundation
- Content strategy is hybrid: seed realistic starter content and provide admin CRUD for major content types
- Payment architecture is Malaysian-gateway first, with future ToyyibPay or Billplz style flows as the primary target
- UI is bilingual Malay and English, while learning content preserves Arabic and Jawi assets where relevant

## 3. Recommended Architecture

### 3.1 Workspace shape

Use a monorepo with clear separation between frontend, backend, and shared domain logic:

- `apps/web`: Next.js frontend using React, TypeScript, and Tailwind CSS
- `apps/api`: Express.js backend using Node.js and TypeScript
- `packages/shared`: shared TypeScript types, validation schemas, enums, constants, and API contracts

This structure keeps the requested stack intact while allowing the product, admin, payment, and API concerns to evolve independently.

### 3.2 Why this approach

This design is preferred over a Next.js-only backend because:

- It matches the requested stack
- It keeps backend domain logic and integrations isolated from frontend rendering concerns
- It makes payment gateway integration, admin APIs, and background processing easier to reason about
- It supports future scaling without requiring an early rewrite

It is preferred over separate repos because a single monorepo keeps v1 development simpler while still preserving strong boundaries.

### 3.3 High-level system surfaces

The application has four product surfaces:

- Public marketing site
- Authenticated parent/user learning area
- Authenticated admin CMS and operations area
- Payment and access lifecycle layer

The database is only accessed by the API. The web app never connects directly to MySQL.

## 4. User Roles and Access Model

### 4.1 Roles

- `admin`: full access to admin dashboard, content management, user management, quizzes, payments, and publishing actions
- `parent`: access to own account, child profiles, learning dashboard, preview content, and full paid content after successful payment

Children do not receive standalone authentication in v1. They use the parent-managed account experience through selected child profiles.

### 4.2 Authentication

Authentication requirements:

- Sign up
- Sign in
- Logout
- Password hashing with `bcrypt`
- JWT-based authentication
- Protected routes
- Role-based route restriction

JWTs should be issued by the API and consumed by the frontend through a secure session pattern. The exact storage strategy can be finalized during implementation, but the design assumes secure HTTP-only cookie support or equivalent server-controlled session handling rather than exposing secrets in browser storage.

### 4.3 Entitlement

The system must distinguish between:

- Anonymous visitor
- Registered unpaid user
- Registered paid user with lifetime access
- Admin

Only paid users can access the full learning content. Unpaid users can browse approved preview content and see upgrade prompts. Entitlement checks must always be enforced server-side.

## 5. Content and Learning Model

### 5.1 Core learning modules

The platform includes these primary modules:

1. Huruf Learning
2. Cerita
3. Modul Kalimah Islam
4. Menulis
5. Doa Harian
6. Kamus Bergambar
7. Quiz and Practice

Each module receives a tailored UI, but the content model should be normalized enough that publishing, metadata, authorship, localization, and access control are consistent across the system.

### 5.2 Localization

The platform is bilingual at the UI level:

- Malay
- English

Learning content should support localized text fields when needed, while Arabic and Jawi remain first-class content assets rather than derived translations. This is especially important for:

- Huruf displays
- Doa text
- Kalimah Islam terminology
- Kamus pronunciation labels

### 5.3 Seeded plus managed content

V1 should ship with realistic seed content so the product feels complete in local development and early demos. At the same time, admins must be able to create, edit, publish, and archive content for all major content types without requiring code changes.

## 6. Data Model

### 6.1 Core tables

The initial schema should include:

- `users`
- `child_profiles`
- `modules`
- `lessons`
- `stories`
- `doa`
- `dictionary_items`
- `quizzes`
- `quiz_questions`
- `quiz_results`
- `progress`
- `payments`

Supporting tables are also expected for launch readiness, even if not named in the original brief. Likely additions include:

- `favorites`
- `badges`
- `user_badges`
- `payment_events` or `payment_logs`
- `admin_audit_logs`
- `media_assets`

### 6.2 Data ownership

- `users` is the source of truth for identity, role, access state, and account preferences
- `child_profiles` belongs to a parent user and stores learning profile metadata
- `progress`, `quiz_results`, favorites, and badge records should link to both `user_id` and `child_profile_id` where appropriate

This allows a parent account to manage multiple children while preserving child-specific progress.

### 6.3 Publishing model

Content entities should support a shared publishing lifecycle:

- `draft`
- `published`
- `archived`

Each managed content table should include timestamps and admin authorship metadata so content operations remain auditable.

### 6.4 Payment states

Payments should support at least:

- `initiated`
- `pending`
- `paid`
- `failed`
- `expired`
- `refunded`

This is necessary for Malaysian gateway readiness, where redirect flows and asynchronous callbacks are common.

## 7. Key User Flows

### 7.1 Visitor to paid user

Primary journey:

1. Visitor lands on marketing site
2. Visitor explores learning previews and pricing
3. Visitor signs up or signs in
4. Registered user sees limited preview access until payment
5. User completes checkout
6. API records successful payment and activates lifetime entitlement
7. User gains full access to learning modules and dashboard features

### 7.2 Parent learning flow

1. Parent selects or creates a child profile
2. Parent enters the dashboard
3. Dashboard shows continue learning, completed modules, progress, scores, badges, and payment state
4. Parent launches module experiences for the selected child
5. Progress updates are saved as the child learns

### 7.3 Admin operations flow

1. Admin signs in
2. Admin manages users, payments, and content
3. Admin creates or updates lessons, stories, doa, dictionary items, and quiz questions
4. Admin publishes content
5. Admin reviews access status and payment history

## 8. Frontend Experience

### 8.1 Route groups

The web application should have three route groups:

- Public routes
- Parent/user authenticated routes
- Admin authenticated routes

### 8.2 Public pages

Required public pages:

1. Landing page
2. Sign up page
3. Sign in page
4. Pricing page
5. Checkout page
6. Payment success page
7. Payment failed page

Landing page sections:

- Header navigation
- Hero section
- Feature modules
- How it works
- Learning preview
- Lifetime access pricing
- Parent benefits
- Testimonials
- FAQ
- Footer

### 8.3 Parent/user pages

Required authenticated user pages:

1. User dashboard
2. Huruf learning page
3. Cerita page
4. Cerita detail page
5. Kalimah Islam module page
6. Menulis page
7. Doa Harian page
8. Kamus Bergambar page
9. Quiz page
10. Quiz result page

Dashboard capabilities:

- Child profile selection
- Continue learning
- Completed modules
- Quiz scores
- Progress percentage
- Badges earned
- Payment status

### 8.4 Admin pages

Required authenticated admin page:

1. Admin dashboard

Admin capabilities:

- Manage users
- Manage modules
- Manage huruf content
- Manage stories
- Manage doa
- Manage kamus items
- Manage quiz questions
- View payment status
- View lifetime registered users

This can be implemented as one dashboard shell with multiple management sections and routes rather than a single literal page.

### 8.5 UI direction

The interface should feel:

- Preschool-friendly
- Safe and trustworthy for parents
- Soft and calm rather than overstimulating
- Child-friendly in sizing and affordances

Visual direction:

- Cream backgrounds
- Pastel green
- Sky blue
- Warm yellow
- Soft coral
- Dark navy text
- White cards
- Rounded cards
- Large readable text
- Large tap targets
- Smooth but restrained animations

The design should preserve accessibility and responsive behavior across desktop, tablet, and mobile.

## 9. Module Experience Design

### 9.1 Huruf Learning

Experience requirements:

- Large Arabic or Jawi letter display
- Audio pronunciation button
- Example word
- Simple quiz
- Progress tracking

### 9.2 Cerita

Experience requirements:

- Story cards
- Story detail page
- Audio playback
- Read-while-listening support
- Preschool-friendly Islamic and moral stories
- Next story navigation

### 9.3 Kalimah Islam

Experience requirements:

- Basic Islamic words such as Syahadah, Allah, Nabi, Malaikat, Masjid, and Solat
- Image
- Explanation
- Audio
- Mini quiz

### 9.4 Menulis

Experience requirements:

- Browser canvas for tracing and writing practice
- Clear or reset button
- Example stroke guide
- Practice for Alif, Ba, Ta, and simple words

The first implementation should focus on a reliable browser canvas with guide overlays, not handwriting recognition.

### 9.5 Doa Harian

Each doa item should include:

- Arabic text
- Romanized text
- Malay meaning
- Audio button
- Favorite or save button

Core doa examples:

- Before eating
- After eating
- Before sleep
- Wake up
- Entering toilet
- Leaving toilet

### 9.6 Kamus Bergambar

Capabilities:

- Image cards
- Arabic, Jawi, and Malay labels
- Audio pronunciation
- Search
- Category filters

Initial categories:

- Animals
- Food
- Family
- School
- Mosque
- Body parts
- Colors

### 9.7 Quiz and Practice

Supported quiz interactions:

- Multiple choice questions
- Match image with word
- Listen and choose correct answer
- Letter recognition quiz
- Score result page
- Badge or star reward animation

## 10. API Design

### 10.1 API domains

The backend should organize REST APIs around domain boundaries:

- `/auth`
- `/users`
- `/children`
- `/content/modules`
- `/stories`
- `/doa`
- `/dictionary`
- `/quizzes`
- `/progress`
- `/payments`
- `/admin/*`

### 10.2 Validation and contracts

Validation should be defined in shared schemas so frontend forms and backend handlers agree on:

- Field names
- Required inputs
- Error states
- Response shapes

This reduces duplication and keeps the frontend and API aligned as the product grows.

### 10.3 Admin boundaries

Admin APIs must be explicitly protected by role middleware. Route protection is required in both:

- Frontend navigation and page access
- Backend authorization checks

The backend remains the final authority.

## 11. Payment Architecture

### 11.1 V1 behavior

V1 should implement:

- Pricing page
- Checkout page
- Payment success page
- Payment failed page
- Placeholder payment provider structure
- Database payment status persistence
- User entitlement activation after successful payment

### 11.2 Provider abstraction

The payment layer should be provider-driven, with a stable internal interface for:

- Checkout session creation
- Redirect or hosted payment handoff
- Callback or webhook processing
- Payment status normalization
- Metadata attachment for user and entitlement context

This allows a placeholder provider now and future integration with ToyyibPay, Billplz, Stripe, or similar gateways without rewriting the rest of the app.

### 11.3 Malaysian gateway readiness

The design should assume redirect-based checkout and asynchronous confirmation patterns common to Malaysian gateways. Callback processing must be auditable and idempotent.

## 12. Security and Compliance Guardrails

The API owns all sensitive operations:

- Password hashing with `bcrypt`
- JWT issuance and verification
- Role checks
- Entitlement checks
- Payment callback verification
- Environment-based secret handling

Additional security expectations:

- Never expose secrets to the frontend
- Validate all request bodies
- Protect private routes
- Restrict admin routes
- Use `.env` based configuration with documented templates
- Log critical payment and admin events

Error messages on the frontend should remain safe, parent-readable, and free of sensitive system details.

## 13. Operations and Quality

### 13.1 Local developer experience

The repository should eventually include:

- Setup instructions
- `.env` templates
- Database migration workflow
- Seed data commands
- Local run commands for web and API
- Local MySQL setup guidance

### 13.2 Testing strategy

Testing should be layered:

- Unit tests for services, utilities, and validation
- Integration tests for auth, content, payment, and progress flows
- End-to-end tests for highest-risk journeys

Minimum critical end-to-end coverage should include:

- Sign up and sign in
- Preview access vs paid access behavior
- Checkout success and failure handling
- Progress updates
- Admin publishing flow

### 13.3 Auditability and launch readiness

Launch-readiness expectations include:

- Payment event traceability
- Basic admin audit logs
- Migration discipline
- Backups and restore planning
- Deployment documentation
- Monitoring and error visibility
- Localization hardening

## 14. Delivery Phases

### Phase 1: Foundation

- Monorepo setup
- Shared package setup
- Design system and app shell foundation
- MySQL schema and migrations
- Authentication and role system
- Parent and admin route shells
- Seeded starter content
- Placeholder payment lifecycle
- Preview gating

### Phase 2: Learning Product

- Full module experiences
- Story playback
- Writing practice canvas
- Doa favorites
- Dictionary search and filter
- Quiz engine
- Progress tracking
- Badges and rewards
- Richer dashboard insights

### Phase 3: Launch Hardening

- Admin publishing workflows
- Payment provider adapter integration path
- Payment audit improvements
- Reporting and operational visibility
- Localization hardening
- Deployment and monitoring readiness

## 15. Proposed Initial Repo Structure

The implementation plan should start from this target structure:

```text
Little-Muslim-Academy/
  apps/
    web/
    api/
  packages/
    shared/
  docs/
    superpowers/
      specs/
      plans/
  .env.example
  package.json
  README.md
```

This structure is intentionally minimal so the implementation plan can fill in technical detail without changing the architectural direction.

## 16. Out of Scope for the First Build

To keep implementation focused, the first build should avoid:

- Separate child login accounts
- Native mobile apps
- Advanced handwriting recognition
- Real-time classroom or teacher features
- Full CMS version diffing workflows
- Multi-tenant organization support

These can be added later without changing the core architecture.

## 17. Success Criteria

The design is successful if implementation produces a platform where:

- Parents can register, authenticate, and manage child profiles
- Unpaid users can preview selected content but not full lessons
- Paid users gain lifetime access after a successful payment flow
- Children can use multiple engaging learning modules
- Admins can manage and publish core learning content
- Progress and quiz data are tracked per child profile
- The system is ready to evolve into a real Malaysian-gateway-backed launch product
