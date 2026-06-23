# Little Muslim Learning Adventure Design

Date: 2026-06-23
Status: Approved in brainstorming
Project type: Full-stack preschool Islamic education game web app

## 1. Goal

Build `Little Muslim Learning Adventure`, a full-stack preschool Islamic education game web app for parents and children. The product must feel like a colorful learning adventure rather than a module dashboard. Children should progress through themed worlds, complete mini games, earn rewards, unlock new areas, and learn through audio-first, preschool-friendly interactions.

The platform must include:

- Public marketing and conversion pages
- Parent registration, authentication, and payment entitlement
- Child profiles managed by parents
- A semi-open game world with level progression
- World-specific Islamic learning mini games
- Rewards, stars, badges, points, and unlocks
- Admin tools for content, progression, and operational management

## 2. Product Decisions

The following decisions are fixed for this design:

- Scope covers the full platform, not only an MVP slice
- UI is fully bilingual from day one: Malay and English are equal first-class languages
- Arabic and Jawi are learning content assets, not simple UI translations
- Payment architecture is Malaysian-gateway first, built around redirect flows and asynchronous confirmation
- The child progression model is a semi-open world
- The implementation strategy is hybrid: shared game engines plus a few custom signature mechanics in v1

## 3. Product Vision

The platform should present a child with a colorful learning world named `Little Muslim Learning Adventure`.

The child enters a map-based game universe with these themed areas:

1. `Huruf Island`
2. `Story Forest`
3. `Kalimah Castle`
4. `Writing Garden`
5. `Doa Village`
6. `Picture Dictionary Zoo`

This is not a "module" system with game styling on top. The product is a game-first learning experience with:

- worlds
- levels
- activities
- missions
- rewards
- badges
- stars
- points or coins
- locked and unlocked paths
- map-based navigation
- friendly audio and celebrations

## 4. Architecture

### 4.1 Workspace shape

Use a monorepo with these primary areas:

- `apps/web`: Next.js, React, TypeScript, Tailwind CSS
- `apps/api`: Node.js, Express.js, TypeScript
- `packages/shared`: shared types, validation, constants, enums, contracts, and i18n structures

### 4.2 Product surfaces

The platform has four distinct surfaces:

- Public marketing and checkout
- Parent account and child management
- Child game experience
- Admin CMS and operations

### 4.3 High-level system design

The backend is the single authority for:

- authentication
- payment status
- entitlement
- child progress
- reward grants
- level unlocks
- admin actions

The web app never talks directly to MySQL. All database access happens through the API.

## 5. Roles And Access

### 5.1 Roles

- `parent`
- `admin`

Children do not get standalone authentication in v1. They use parent-managed child profiles.

### 5.2 Authentication

Authentication requirements:

- parent registration
- login and logout
- password hashing with `bcrypt`
- JWT issuance and verification
- protected routes
- role-based middleware for admin

JWT should be issued by the API and consumed via a secure session pattern suitable for a web app.

### 5.3 Access states

The system must distinguish between:

- anonymous visitor
- registered unpaid parent
- registered paid parent with lifetime access
- admin

Anonymous visitors can only access public pages.

Registered unpaid parents can:

- sign in
- view pricing
- manage their account basics
- access a limited demo path

Paid parents can:

- create child profiles
- access the full game
- view full progress and rewards

Admins can manage all operational and content surfaces.

## 6. Payment And Entitlement

The payment model is:

- one-time payment
- lifetime access
- status stored in MySQL
- entitlement enforced server-side

### 6.1 Flow

1. Parent chooses lifetime access
2. API creates payment record
3. API redirects parent to payment provider
4. Provider returns browser to success or failure page
5. Provider callback or webhook confirms final state
6. API updates payment status
7. API activates lifetime entitlement

### 6.2 Payment states

At minimum support:

- `initiated`
- `pending`
- `paid`
- `failed`
- `expired`
- `refunded`

### 6.3 Provider abstraction

The codebase should support a payment provider layer with a stable internal interface for:

- checkout session creation
- redirect handoff
- callback or webhook verification
- payment status normalization
- metadata binding for user and entitlement context

The initial structure should be ready for:

- ToyyibPay
- Billplz
- Stripe
- manual or placeholder gateway implementations

### 6.4 Demo gating

Unpaid users should be able to preview the product through a limited demo path. Preview content should be explicitly flagged in the backend with entitlement checks on all non-preview content.

## 7. Game Structure

The child experience should be modeled around:

- `worlds`
- `levels`
- `activities`
- `missions`
- `rewards`

### 7.1 Worlds

- `Huruf Island`
- `Story Forest`
- `Kalimah Castle`
- `Writing Garden`
- `Doa Village`
- `Picture Dictionary Zoo`

### 7.2 Progression model

Use a semi-open world:

- `Huruf Island` starts unlocked
- `Picture Dictionary Zoo` starts unlocked
- `Doa Village` and `Story Forest` unlock after early star milestones
- `Kalimah Castle` and `Writing Garden` unlock later
- `Quiz Battle` acts as a major progression gate per area

### 7.3 Core loop

1. Parent selects child profile
2. Child enters the game map
3. Child chooses an unlocked world
4. Child chooses an unlocked level
5. Child completes one or more activities
6. System awards stars, points, badges, or world-specific rewards
7. Progress is saved
8. New levels or worlds unlock when rules are met

### 7.4 Design rule

The child is never "opening modules." The child is entering a world, selecting a level, completing missions, and unlocking the path forward.

## 8. World Design

### 8.1 Huruf Island

Learning focus:

- Arabic letters such as Alif, Ba, Ta

Mini games:

- tap the correct Arabic letter
- listen and choose the correct letter
- match letter with example word
- drag and drop letter matching

Rewards:

- stars
- letter pearls

### 8.2 Story Forest

Learning focus:

- short Islamic and moral stories

Mini games:

- read while audio plays
- answer story checkpoint questions
- choose the moral value
- unlock next story after completion

Rewards:

- story lanterns

### 8.3 Kalimah Castle

Learning focus:

- basic Islamic words and Kalimah Islam

Mini games:

- match Islamic word with image
- listen and choose correct word
- simple meaning quiz

Rewards:

- castle gems

### 8.4 Writing Garden

Learning focus:

- tracing and writing Arabic letters

Mini games:

- trace Alif, Ba, Ta
- canvas drawing area
- reset and retry

Rewards:

- flower badges

### 8.5 Doa Village

Learning focus:

- daily doa recognition and memorization

Mini games:

- listen to doa
- choose correct doa for a situation
- match doa with image
- memorization practice

Rewards:

- moon tokens

### 8.6 Picture Dictionary Zoo

Learning focus:

- vocabulary through images, sound, and matching

Mini games:

- image-word matching
- listen and tap correct picture
- category-based games

Categories:

- animals
- food
- family
- school
- mosque
- body parts
- colors

Rewards:

- animal badges

### 8.7 Quiz Battle

Learning focus:

- mastery check after each area

Mini games:

- multiple-choice questions
- mixed recognition questions
- score calculation
- star rating result
- major unlock after pass

## 9. Mini-Game Engine Strategy

V1 should use a hybrid approach:

- reusable shared activity engines for common interactions
- custom signature mechanics for a few standout worlds

### 9.1 Shared engines

- `tap-correct`
- `listen-and-choose`
- `match-pairs`
- `drag-and-drop`
- `multiple-choice`
- `story-checkpoint`
- `trace-canvas`
- `quiz-battle`

Each engine should define:

- input schema
- assets required
- completion rules
- retry rules
- scoring logic
- star-award logic
- reward animation payload

### 9.2 Signature mechanics

Custom v1 mechanics should include:

- `Writing Garden`: tracing canvas
- `Story Forest`: narrated story playback with checkpoints
- `Quiz Battle`: end-of-area challenge flow

Other worlds may reuse shared engines while still feeling distinct through art direction, sound, reward language, and level framing.

## 10. Reward System

Children should receive frequent positive feedback with gentle correction.

Reward systems should include:

- stars
- points or coins
- badges
- world-specific collectible rewards
- unlock animations
- confetti or celebration screens

Guiding rules:

- celebrate success immediately
- allow retries without harsh punishment
- provide partial progress where appropriate
- use reward screens as a major motivation loop
- avoid "hard fail" dead ends for preschool users

## 11. Frontend Experience

### 11.1 Public pages

Required pages:

1. Landing page
2. Sign up page
3. Sign in page
4. Pricing page
5. Checkout page
6. Payment success page
7. Payment failed page

The landing page should show the game identity clearly through:

- world previews
- map-style visuals
- mascots
- rewards
- sample mini games
- parent trust messaging

### 11.2 Parent pages

Required pages:

1. Parent dashboard
2. Child profile page
3. Progress view
4. Payment status view
5. Continue game launcher

Parent experience priorities:

- child profile management
- progress visibility
- earned stars and badges
- completed worlds and levels
- payment state
- fast access back into the game

### 11.3 Child pages

Required pages:

1. Game home map
2. World intro or level select
3. Huruf Island game page
4. Story Forest game page
5. Kalimah Castle game page
6. Writing Garden game page
7. Doa Village game page
8. Picture Dictionary Zoo game page
9. Quiz Battle page
10. Reward result page
11. Badge collection page

Navigation should stay shallow:

- map
- world
- level
- activity
- reward

### 11.4 Admin pages

Required pages:

1. Admin dashboard
2. Users management
3. Child profiles management
4. Game worlds management
5. Levels management
6. Activities or questions management
7. Stories management
8. Doa management
9. Dictionary items management
10. Badges management
11. Payments management
12. Progress reporting

## 12. UI And Design Direction

The product should feel like a child-friendly preschool adventure game with Islamic-friendly warmth.

### 12.1 Visual traits

- soft pastel colors
- cute mascot characters
- map-style home screen
- rounded cards
- large icons
- large text
- big buttons
- playful but calm animation
- audio-first affordances

### 12.2 Color direction

- sky blue
- mint green
- warm cream
- soft yellow
- peach or coral accents
- navy or deep teal text
- white cards and surfaces

### 12.3 Audience separation

- Child UI: playful, immersive, visual-first
- Parent UI: calm, reassuring, informative
- Admin UI: practical, structured, efficient

### 12.4 UX rules

- mobile-first
- fully responsive
- very large tap targets for children
- minimal reading burden on child screens
- consistent audio buttons
- strong visual hierarchy
- clear lock and unlock state
- reward-rich feedback

## 13. Localization

The platform is fully bilingual at the UI level:

- Malay
- English

The system should treat both as first-class from day one. Parents should be able to choose a language preference, and the UI architecture should avoid Malay-first or English-first shortcuts.

Learning content should support:

- Arabic text
- Jawi where needed
- Malay translations or explanations
- English translations or explanations
- audio assets that match the learning content

This is especially important for:

- huruf content
- doa
- kalimah content
- dictionary labels
- story text and prompts

## 14. Backend Domains And APIs

Organize the API around domain boundaries:

- `/auth`
- `/users`
- `/child-profiles`
- `/payments`
- `/game-worlds`
- `/game-levels`
- `/game-activities`
- `/stories`
- `/doa`
- `/dictionary-items`
- `/badges`
- `/progress`
- `/quiz-results`
- `/admin/*`

The backend must be the final authority for:

- role checks
- entitlement checks
- preview gating
- reward grants
- unlock rules
- payment verification

## 15. Database Schema

The database must be modeled around game progression, not generic modules.

### 15.1 Core account tables

- `users`
- `child_profiles`
- `payments`

### 15.2 Game structure tables

- `game_worlds`
- `game_levels`
- `game_activities`
- `activity_questions`
- `world_unlock_rules`
- `level_unlock_rules`

### 15.3 Content tables

- `stories`
- `story_segments`
- `doa`
- `dictionary_items`
- `writing_traces`

### 15.4 Rewards and progress tables

- `badges`
- `user_badges`
- `progress`
- `activity_attempts`
- `quiz_results`
- `reward_events`

### 15.5 Support and operations tables

- `media_assets`
- `payment_events`
- `admin_audit_logs`

### 15.6 Required ownership rules

- a user may own multiple child profiles
- progress must attach to both parent and child where applicable
- rewards must be auditable
- unlock grants must be traceable
- payment state must be traceable

## 16. Admin CMS

The admin system should be a game-content control center, not only a lesson manager.

Admins must be able to:

- manage users
- manage child profiles
- manage game worlds
- manage levels
- manage activities
- manage questions
- manage stories and story segments
- manage doa
- manage dictionary items
- manage badges and reward definitions
- view payments
- view user progress

Managed content should support a publishing lifecycle such as:

- `draft`
- `published`
- `archived`

## 17. Seed Data

The project should include realistic starter seed data so the app is usable immediately in local development.

Seed content should include:

- all six game worlds
- initial unlock rules
- at least 3 to 5 levels per world
- representative activities for every shared engine
- complete sample stories for `Story Forest`
- starter daily doa entries
- vocabulary across all requested categories
- tracing records for `Alif`, `Ba`, and `Ta`
- sample badges and reward definitions
- demo preview path for unpaid users
- one paid parent test user
- one unpaid parent test user
- one admin user

## 18. Recommended Project Structure

```text
Little-Muslim-Academy/
  apps/
    web/
      src/
        app/
          (public)/
          (parent)/
          (child)/
          (admin)/
        components/
        features/
        lib/
        styles/
    api/
      src/
        modules/
          auth/
          users/
          child-profiles/
          payments/
          game-worlds/
          game-levels/
          game-activities/
          stories/
          doa/
          dictionary-items/
          badges/
          progress/
          quiz-results/
          admin/
        middleware/
        lib/
        config/
      prisma/
        schema.prisma
        seed.ts
  packages/
    shared/
      src/
        auth/
        game/
        content/
        payments/
        validation/
        i18n/
  docs/
    superpowers/
      specs/
      plans/
  README.md
  package.json
```

## 19. Testing And Quality

Testing should be layered:

- unit tests for services, utilities, and validation
- integration tests for auth, payments, progress, and admin flows
- end-to-end tests for the highest-risk journeys

Minimum high-risk journey coverage should include:

- sign up and sign in
- unpaid preview versus paid access
- payment success and failure handling
- child progress updates
- reward grants
- level or world unlocks
- admin content publishing

## 20. Setup And Documentation Expectations

The repository should eventually include:

- setup instructions
- environment templates
- local MySQL guidance
- migration instructions
- seed commands
- run commands for web and API
- payment provider placeholder documentation
- bilingual content guidance

## 21. Out Of Scope For First Build

To keep the first implementation practical, defer:

- separate child login accounts
- native mobile apps
- advanced handwriting recognition
- classroom or teacher portals
- deep CMS version diffing
- multi-tenant organization support

## 22. Success Criteria

The design is successful if the implementation results in a product where:

- parents can sign up, sign in, and pay once for lifetime access
- unpaid users can preview a small part of the game
- paid users can create child profiles and access the full experience
- children learn through game worlds instead of modules
- levels unlock through progress and quiz results
- stars, badges, and rewards are tracked per child profile
- admins can manage content, payments, and progress
- the platform is ready for real Malaysian payment gateway integration
