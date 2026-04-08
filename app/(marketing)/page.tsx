import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, FileText, PanelsTopLeft, Sparkles, Stars, Target } from "lucide-react";

import { AnimatedSection } from "@/components/marketing/animated-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: FileText,
    title: "Resume builder with live preview",
    description: "Craft modern resumes with structured sections, polished spacing, and export-ready formatting.",
  },
  {
    icon: Sparkles,
    title: "AI bullet point improvement",
    description: "Upgrade weak bullets into sharper, more measurable outcomes with one click.",
  },
  {
    icon: PanelsTopLeft,
    title: "Cover letters on demand",
    description: "Generate tailored letters from job descriptions and refine the tone before sending.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Job tracking that stays usable",
    description: "Track roles, links, statuses, and notes in one calm workspace built for real search volume.",
  },
];

const faqs = [
  ["Can I export my resume to PDF?", "Yes. Each resume includes a polished live preview and one-click PDF export."],
  ["Does CareerForge support dark mode?", "Yes. Light and dark themes are built intentionally across every core screen."],
  ["Do I need billing set up to use this?", "No. Pricing is productized now, but real billing can be connected later with Stripe."],
  ["What AI model powers generation?", "Gemini is used for bullet rewrites and cover letter generation through a server-side integration."],
];

export default function LandingPage() {
  return (
    <main>
      <section className="grid-pattern relative overflow-hidden px-6 pb-24 pt-16 md:pb-32 md:pt-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <AnimatedSection>
            <div className="inline-flex items-center rounded-full border border-border/70 bg-background/80 px-4 py-2 text-sm text-muted-foreground backdrop-blur-xl">
              <Stars className="mr-2 h-4 w-4 text-accent" />
              Designed for ambitious candidates and operators.
            </div>
            <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
              Land better opportunities with <span className="text-gradient">AI-crafted resumes</span>, cover letters, and job tracking.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
              CareerForge AI helps you shape stronger application materials, tailor each outreach faster, and keep your search organized without the usual spreadsheet chaos.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="accent">
                <Link href="/signup">
                  Start free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {[
                ["2.1x", "faster resume iteration"],
                ["80%", "less manual rewriting"],
                ["1 workspace", "for every application"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-[28px] border border-border/70 bg-background/70 p-5 backdrop-blur-xl">
                  <p className="text-2xl font-semibold">{value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="glass shadow-glow rounded-[36px] p-5">
              <div className="rounded-[30px] border border-border/70 bg-slate-950 p-5 text-slate-50 dark:bg-slate-900">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <p className="text-sm text-slate-400">Product preview</p>
                    <h2 className="mt-1 text-xl font-semibold">Your search, finally organized</h2>
                  </div>
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs text-emerald-300">AI-ready</span>
                </div>
                <div className="mt-5 grid gap-4">
                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-400">Resume score uplift</p>
                        <p className="mt-2 text-3xl font-semibold">+34%</p>
                      </div>
                      <Target className="h-10 w-10 text-cyan-300" />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                      <p className="text-sm text-slate-400">Active applications</p>
                      <p className="mt-2 text-2xl font-semibold">18</p>
                      <p className="mt-3 text-xs text-slate-400">5 interviews in motion</p>
                    </div>
                    <div className="rounded-[24px] border border-white/10 bg-gradient-to-br from-sky-500/20 to-emerald-500/20 p-4">
                      <p className="text-sm text-slate-300">AI cover letter</p>
                      <p className="mt-2 text-sm leading-6 text-slate-100">"I thrive where product clarity, systems thinking, and measured execution all matter at once..."</p>
                    </div>
                  </div>
                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-400">Resume builder</p>
                        <p className="mt-1 text-base font-medium">Live preview, AI bullet tuning, export-ready formatting</p>
                      </div>
                      <div className="h-3 w-24 rounded-full bg-gradient-to-r from-sky-400 to-emerald-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <AnimatedSection className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-sm uppercase tracking-[0.24em] text-muted-foreground">Trusted by candidates shipping higher-quality applications</p>
          <div className="mt-8 grid gap-4 rounded-[32px] border border-border/70 bg-card/70 p-6 text-center text-sm font-medium text-muted-foreground backdrop-blur-xl md:grid-cols-5">
            {['Northstar', 'Monograph', 'Payload', 'Juniper', 'Vector'].map((name) => <div key={name}>{name}</div>)}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="features" className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-accent">Features</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">A premium operating system for your job search.</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="group overflow-hidden">
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/15 to-emerald-500/15 text-accent transition duration-200 group-hover:-translate-y-0.5">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="mt-6">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-[24px] border border-border/70 bg-muted/40 p-4 text-sm text-muted-foreground">
                      Workflow module {(index + 1).toString().padStart(2, "0")}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-[36px] border border-border/70 bg-card/70 p-8 backdrop-blur-xl md:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-medium text-accent">Preview</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Move from blank page to polished materials without losing your voice.</h2>
              <p className="mt-4 text-muted-foreground">CareerForge AI is built to feel calm under pressure. Strong hierarchy, generous whitespace, fast interactions, and AI support exactly where it earns its place.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ["Live preview", "Edit your resume while seeing the final output update in real time."],
                ["Usage tracking", "Understand how much AI assistance you are using across your workflow."],
                ["Thoughtful empty states", "Every page stays guided, even before your first save."],
                ["Responsive layouts", "Built to feel intentional across desktop, tablet, and mobile."],
              ].map(([title, description]) => (
                <div key={title} className="rounded-[28px] border border-border/70 bg-background/80 p-5">
                  <p className="font-medium">{title}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-[36px] border border-border/70 bg-gradient-to-br from-sky-500/8 to-emerald-500/8 p-8 md:p-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium text-accent">Pricing teaser</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Start free. Upgrade when your search gets serious.</h2>
            </div>
            <Button asChild variant="outline"><Link href="/pricing">Explore plans</Link></Button>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="faq" className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-sm font-medium text-accent">FAQ</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Everything you need to know before you begin.</h2>
          </div>
          <div className="mt-10 grid gap-4">
            {faqs.map(([question, answer]) => (
              <Card key={question}>
                <CardHeader>
                  <CardTitle className="text-lg">{question}</CardTitle>
                  <CardDescription className="text-base leading-7">{answer}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </main>
  );
}
