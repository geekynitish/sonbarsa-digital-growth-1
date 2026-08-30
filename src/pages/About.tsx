import { Helmet } from "react-helmet-async";
import {
  Award,
  Users,
  Target,
  Lightbulb,
  Rocket,
  Brain,
  Code2,
  Cloud,
  Database,
  Smartphone,
  Globe,
  ShoppingCart,
  HeartPulse,
  GraduationCap,
  Landmark,
  Home as HomeIcon,
  Newspaper,
  Clapperboard,
  HardHat,
  Handshake,
  Globe2,
  Compass,
  ShieldCheck,
  TrendingUp,
  Heart,
  Star,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TeamSection } from "@/components/home/TeamSection";
import { CofounderSpotlight } from "@/components/CofounderSpotlight";
import { TechStackSection } from "@/components/TechStackSection";

const technologies = [
  { icon: Brain, label: "AI, ML & Generative AI (GPT-4, Claude, Gemini, LangChain, Hugging Face)" },
  { icon: Code2, label: "Web: React, Next.js, Node.js, TypeScript" },
  { icon: Smartphone, label: "Mobile: React Native, Flutter, Swift, Kotlin" },
  { icon: Cloud, label: "Cloud & DevOps: AWS, Azure, Kubernetes, Docker, Terraform" },
  { icon: Database, label: "Data: PostgreSQL, MongoDB, Redis, Pinecone, pgvector" },
  { icon: Globe, label: "Commerce & CMS: Shopify, WordPress, Magento, WooCommerce" },
];

const industries = [
  { icon: ShoppingCart, label: "E-commerce & Retail" },
  { icon: HeartPulse, label: "Healthcare & MedTech" },
  { icon: GraduationCap, label: "Education & EdTech" },
  { icon: Landmark, label: "Finance & FinTech" },
  { icon: HomeIcon, label: "Real Estate & PropTech" },
  { icon: Newspaper, label: "Newspaper & Publishing" },
  { icon: Clapperboard, label: "Entertainment & Social Media" },
  { icon: HardHat, label: "Construction & Engineering" },
];

const values = [
  {
    icon: Target,
    title: "Results-Driven",
    description: "We focus on delivering measurable outcomes that drive real business growth.",
  },
  {
    icon: Users,
    title: "Client-Centric",
    description: "Your success is our priority. We act as partners and stakeholders in your journey.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We leverage the latest technologies to deliver cutting-edge solutions.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Our team of experts delivers nothing but the highest quality work.",
  },
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About SonBarsa — AI, ML &amp; Cloud Solutions Company Since 2008</title>
        <meta
          name="description"
          content="Meet SonBarsa, an AI &amp; Machine Learning company since 2008 helping enterprises adopt generative AI, LLMs, computer vision, predictive analytics, AWS cloud and digital growth."
        />
        <meta
          name="keywords"
          content="about SonBarsa, AI company India, machine learning company, generative AI experts, LLM consulting, AI ML services, AWS cloud partner, digital transformation"
        />
        <link rel="canonical" href="https://sonbarsa.com/about" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="About SonBarsa — AI &amp; ML Solutions Company Since 2008" />
        <meta property="og:description" content="AI & ML experts since 2008. Generative AI, LLMs, computer vision, predictive analytics, cloud, web and mobile." />
        <meta property="og:url" content="https://sonbarsa.com/about" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About SonBarsa — AI &amp; ML Solutions Company Since 2008" />
        <meta name="twitter:description" content="AI & ML experts since 2008. Generative AI, LLMs, computer vision, predictive analytics, cloud, web and mobile." />
        <script type="application/ld+json">{JSON.stringify({
          "@context":"https://schema.org","@type":"AboutPage",
          "url":"https://sonbarsa.com/about",
          "name":"About SonBarsa",
          "mainEntity":{"@id":"https://sonbarsa.com/#organization"}
        })}</script>
      </Helmet>

      <Navbar />

      <main>
        {/* Hero */}
        <section className="pt-20 pb-16 text-center">
          <div className="tg-container max-w-[640px]">
            <p className="text-sm font-medium text-muted-foreground mb-5">About Us</p>
            <h1 className="text-4xl sm:text-5xl leading-[1.1] tracking-tight">
              Making technology <span className="text-accent-word">accessible</span>.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Since 2008, delivering world-class digital solutions with a personalised
              approach for business critical technology needs.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 md:py-20 border-t border-border">
          <div className="tg-container max-w-[640px]">
            <h2 className="text-2xl sm:text-3xl mb-6 text-center">Our story</h2>

            <p className="text-muted-foreground leading-relaxed">
              At SonBarsa, we believe in making the latest in technology accessible to your
              business. Since 2008, our personalised approach to building custom, business-critical
              technology solutions has helped us build incredible knowledge around how technology
              can be best used to help businesses grow and scale — from a two-person web shop in
              India to a 18+ strong team of engineers, data scientists, and AI researchers serving
              274+ clients across three continents.
            </p>

            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 py-10">
              {[
                { value: "15+", label: "Years Experience" },
                { value: "274+", label: "Happy Clients" },
                { value: "421+", label: "Projects Completed" },
                { value: "18+", label: "Team Members" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="text-xl sm:text-2xl font-extrabold">{stat.value}</dd>
                  <dd className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</dd>
                </div>
              ))}
            </dl>

            <div className="space-y-10">
              {/* Where it started */}
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <Rocket className="w-5 h-5 text-primary" strokeWidth={1.75} />
                  <h3 className="font-bold text-lg">Where it started</h3>
                </div>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    SonBarsa began in 2008 as a small web and digital marketing outfit with a simple
                    conviction: most businesses were being sold technology they didn't need, in
                    packages that didn't fit, by vendors who disappeared after the invoice was paid.
                    We wanted to build the opposite kind of company — one that stuck around, learned
                    the client's business as well as our own, and shipped software that actually got
                    used.
                  </p>
                  <p>
                    The first few years were spent in the trenches of small-business web design,
                    WordPress builds, SEO, and early social media marketing — unglamorous work, but it
                    taught us discipline: ship on time, measure the result, and never hand over a
                    project you wouldn't want to maintain yourself. That discipline is still the
                    backbone of how we operate today.
                  </p>
                  <p>
                    As clients grew, so did their requests — custom e-commerce platforms instead of
                    templated stores, mobile apps instead of just responsive websites, and dashboards
                    that answered real business questions instead of vanity metrics. Every new
                    request pushed us to hire specialists rather than generalists, and by our fifth
                    year SonBarsa had grown from a two-person shop into dedicated web, mobile, and
                    marketing teams working out of India with clients in the UK and the Middle East.
                  </p>
                </div>
              </div>

              {/* The shift toward AI & ML */}
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <Brain className="w-5 h-5 text-primary" strokeWidth={1.75} />
                  <h3 className="font-bold text-lg">The shift toward AI &amp; machine learning</h3>
                </div>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Our move into artificial intelligence wasn't a rebrand chasing a trend — it grew
                    directly out of client work. A retail client needed to predict demand instead of
                    guessing at inventory. A recruiter needed to screen thousands of resumes without
                    burning out their HR team. A media client needed to recommend the right story to
                    the right reader instead of showing everyone the same homepage. Each of these
                    problems needed statistics, pattern recognition, and eventually deep learning —
                    not another WordPress plugin.
                  </p>
                  <p>
                    So we invested: hiring machine learning engineers and data scientists, building
                    internal MLOps pipelines, and training the team on everything from classical
                    predictive models to convolutional networks for computer vision. When large
                    language models and generative AI broke into the mainstream, we were already
                    positioned to move fast — fine-tuning models on client data, building
                    retrieval-augmented pipelines grounded in real company knowledge, and shipping
                    production chatbots and AI agents instead of one-off demos.
                  </p>
                  <p>
                    Today, AI and machine learning sit at the core of almost everything we build — an
                    AI-powered interview platform, an AI SEO intelligence suite, computer vision for
                    manufacturing and retail, and predictive analytics engines for enterprises that
                    need to see around corners, not just look in the rear-view mirror.
                  </p>
                </div>
              </div>

              {/* Technology */}
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <Code2 className="w-5 h-5 text-primary" strokeWidth={1.75} />
                  <h3 className="font-bold text-lg">The technology we've mastered</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We deliberately stay technology-agnostic and pick the right tool for the problem
                  rather than forcing every client into the same stack. Over 15+ years that's meant
                  building deep, hands-on expertise across the full modern technology landscape —
                  from generative AI and LLMs to the cloud infrastructure, web frameworks, and
                  commerce platforms that turn a model into a working product.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-5">
                  What we don't do is chase every new framework announcement for its own sake. A
                  technology earns a place in our stack only after it's proven itself in production —
                  stable, well-documented, and maintainable by whoever inherits the codebase after us.
                  That's the filter that decided which of the tools below became core to how we build,
                  rather than a one-off experiment that never left a sandbox.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {technologies.map((tech) => (
                    <div key={tech.label} className="flex items-start gap-2.5 rounded-lg border border-border p-3">
                      <tech.icon className="w-4 h-4 text-primary mt-0.5 shrink-0" strokeWidth={1.75} />
                      <span className="text-sm text-muted-foreground">{tech.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Industries */}
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <Globe2 className="w-5 h-5 text-primary" strokeWidth={1.75} />
                  <h3 className="font-bold text-lg">Industries we've shaped</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-5">
                  Different industries break in different places, and the only way to build software
                  that actually holds up is to understand where those breaking points are. We've
                  spent a decade and a half doing exactly that — building luxury fashion storefronts
                  that survive flash-sale traffic, subscription and recommendation engines for
                  newspaper publishers, HR tooling that a non-technical recruiter can actually use,
                  and enterprise portals that IT departments don't dread maintaining. That
                  cross-industry pattern-matching is often the difference between a feature that looks
                  good in a demo and one that survives contact with real users.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-5">
                  No two of these industries buy technology the same way, get regulated the same way,
                  or measure success the same way — a healthcare client cares about compliance and
                  uptime above almost everything else, while a fashion e-commerce brand cares about
                  page speed during a flash sale and how well a recommendation engine lifts average
                  order value. Working across all of them at once is what keeps our engineering team
                  from over-fitting to a single playbook, and it's a big part of why solutions we
                  build for one industry often turn out to solve a problem in a completely different
                  one.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {industries.map((industry) => (
                    <div key={industry.label} className="flex flex-col items-center text-center gap-2 rounded-lg border border-border p-3">
                      <industry.icon className="w-5 h-5 text-primary" strokeWidth={1.75} />
                      <span className="text-xs text-muted-foreground">{industry.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* How we work */}
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <Handshake className="w-5 h-5 text-primary" strokeWidth={1.75} />
                  <h3 className="font-bold text-lg">How we work</h3>
                </div>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    We act as partners and stakeholders in your success, not an outside vendor billing
                    by the hour. That means we ask uncomfortable questions before writing a line of
                    code — what does success actually look like in three months, who is going to
                    maintain this after launch, and is AI even the right tool for this problem, or
                    would a simpler system do the job better and cheaper. Being AI specialists doesn't
                    mean every problem needs a model; sometimes the right answer is a well-indexed
                    database and a clean UI.
                  </p>
                  <p>
                    Every engagement runs through the same discipline we learned in our earliest
                    years: scope clearly, ship in small increments, measure against real metrics, and
                    hand over documentation and training, not just a production URL. We put your needs
                    ahead of the limitations that come with off-the-shelf products and "nearly there"
                    solutions, because a demo that impresses in a meeting and a system that survives a
                    Black Friday traffic spike are two very different things — and we're only
                    interested in building the second one.
                  </p>
                </div>
              </div>

              {/* Global footprint */}
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <Compass className="w-5 h-5 text-primary" strokeWidth={1.75} />
                  <h3 className="font-bold text-lg">Global footprint, close collaboration</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  From our roots in India, SonBarsa now works with clients across the UK and the
                  Middle East, running distributed teams that overlap comfortably across time zones so
                  a client in London or Dubai gets the same responsiveness as one down the road. Being
                  close to clients across such different markets — retail in the UK, entertainment and
                  hospitality in the Middle East, and a booming startup scene in India — has kept our
                  work grounded in real regional context instead of a one-size-fits-all playbook,
                  which is exactly the trap we set out to avoid back in 2008.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  That distributed setup also means we've had to get disciplined about
                  communication long before it became fashionable to talk about "remote-first
                  culture." Every project runs on shared documentation, recorded demos for
                  stakeholders who can't join a call live, and status updates that don't require a
                  meeting to understand — small habits that add up to clients always knowing exactly
                  where their project stands, no matter which country they're calling in from.
                </p>
              </div>

              {/* Client relationships */}
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <Star className="w-5 h-5 text-primary" strokeWidth={1.75} />
                  <h3 className="font-bold text-lg">What partnering with us looks like</h3>
                </div>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Abstract claims about "AI transformation" are easy to make and hard to trust,
                    so we'd rather point at the work itself. Interview.SonBarsa.com automates
                    candidate screening and video-interview scoring so recruiters spend their time on
                    people, not paperwork. SEO.SonBarsa.com gives marketing teams AI-driven rank
                    tracking and content optimization instead of a spreadsheet full of guesses. A
                    newspaper group we partnered with needed reader subscriptions, a paywall, and a
                    recommendation engine that could personalise a front page for millions of
                    different readers — we built all three as one connected platform rather than three
                    disconnected tools bolted together after the fact.
                  </p>
                  <p>
                    On the commerce side, luxury fashion retailers have trusted us to build and run
                    storefronts that need to hold up under flash-sale traffic while still feeling
                    boutique rather than generic — because a slow checkout page during a big drop
                    costs real revenue, not just a bad review. Whether the deliverable is a
                    from-scratch AI product or a Shopify storefront, the standard we hold ourselves to
                    is the same: would we be comfortable being the ones woken up at 2am if it broke.
                  </p>
                </div>
              </div>

              {/* Culture & careers */}
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <Heart className="w-5 h-5 text-primary" strokeWidth={1.75} />
                  <h3 className="font-bold text-lg">The culture behind the work</h3>
                </div>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    None of this is possible without a team that actually believes in it. Four
                    principles show up in how we hire, review work, and make decisions day to day:
                    being results-driven enough to care about the business outcome and not just the
                    ticket being closed; staying client-centric by treating every engagement like a
                    partnership rather than a transaction; pushing innovation by giving engineers time
                    to explore new approaches instead of only maintaining what already exists; and
                    holding the line on excellence, because in AI specifically, a "good enough" model
                    quietly erodes a client's trust in ways that are hard to win back.
                  </p>
                  <p>
                    That culture is also why so many people who join SonBarsa's engineering, data
                    science, and design teams stay for years rather than treating it as a stepping
                    stone — cross-industry variety keeps the work interesting, and a genuinely
                    distributed team across India, the UK, and the Middle East means career growth
                    doesn't require relocating to a single head-office city.
                  </p>
                </div>
              </div>

              {/* Quality, security & support */}
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <ShieldCheck className="w-5 h-5 text-primary" strokeWidth={1.75} />
                  <h3 className="font-bold text-lg">Quality, security &amp; long-term support</h3>
                </div>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Shipping fast means nothing if what you ship falls over under real traffic or
                    leaks data it shouldn't. Every engagement — whether it's a Shopify storefront or a
                    production LLM pipeline — goes through code review, staging environments, and
                    load and security testing before it reaches production. For AI systems
                    specifically, that also means guarding against the failure modes unique to
                    machine learning: model drift, hallucinated outputs, and biased predictions,
                    caught through monitoring dashboards and human-in-the-loop review rather than
                    hoping the model behaves.
                  </p>
                  <p>
                    We're equally serious about data protection and enterprise-grade security and
                    compliance, especially now that so much of our work involves feeding client data
                    into AI systems that need to be trustworthy, auditable, and compliant with
                    regional regulations across India, the UK, and the Middle East. Encryption at rest
                    and in transit, least-privilege access to production systems, and clear data
                    retention policies aren't an afterthought bolted on before a client audit — they're
                    part of how we architect a system from day one.
                  </p>
                  <p>
                    Our relationship with a client doesn't end at launch. Cloud infrastructure needs
                    to be right-sized as usage grows, models need to be retrained as data and user
                    behavior shift, and dependencies need patching long after the initial invoice is
                    paid. That's why so many of our 274+ clients have stayed with us for years rather
                    than projects — ongoing support, monitoring, and incremental improvement are built
                    into how we scope engagements, not sold separately as an afterthought.
                  </p>
                </div>
              </div>

              {/* Where we're headed */}
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <TrendingUp className="w-5 h-5 text-primary" strokeWidth={1.75} />
                  <h3 className="font-bold text-lg">Where we're headed</h3>
                </div>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    The next chapter for SonBarsa looks a lot like the last fifteen years: following
                    where the technology is genuinely useful, not where the headlines are loudest.
                    That currently means deeper investment in agentic AI systems that can carry out
                    multi-step business processes autonomously, retrieval-augmented pipelines that
                    keep large language models grounded in a client's real, current knowledge instead
                    of stale training data, and low-code and no-code AI automation that lets non-technical
                    teams move fast without waiting on an engineering backlog.
                  </p>
                  <p>
                    We're also doubling down on industries where AI is still under-deployed relative to
                    its potential — newspaper and digital publishing, entertainment and social media
                    management, and mobile gaming — building the subscription systems, recommendation
                    engines, and engagement tooling those industries will need as reader and viewer
                    attention keeps fragmenting across more platforms.
                  </p>
                  <p>
                    None of that changes the founding conviction that got SonBarsa started in a small
                    office in 2008: technology is only worth building if it makes someone else's
                    business measurably better. Fifteen years, 421+ projects, and one very large shift
                    from web agency to AI company later, that's still the only metric that actually
                    matters to us.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <TechStackSection />

        {/* Values */}
        <section className="py-16 md:py-20 border-t border-border">
          <div className="tg-container max-w-[720px] text-center">
            <h2 className="text-2xl sm:text-3xl mb-4">Our core values</h2>
            <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
              The principles that guide everything we do at SonBarsa.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-12 text-left">
              {values.map((value) => (
                <div key={value.title} className="rounded-xl border border-border p-6 text-center">
                  <value.icon className="w-6 h-6 text-primary mx-auto mb-4" strokeWidth={1.75} />
                  <h3 className="font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Co-Founder Spotlight */}
        <CofounderSpotlight />

        {/* Team */}
        <TeamSection />
      </main>

      <Footer />
    </>
  );
};

export default About;
