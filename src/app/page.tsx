"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import {
  Upload,
  Settings,
  Users,
  BarChart3,
  Phone,
  Monitor,
  Mic,
  ShieldCheck,
  Mail,
  FileText,
  MessageSquare,
  CheckCircle,
  Shield,
  Scale,
  Eye,
  Lock,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

/* ─── Animated Number ─── */
function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    const start = display;
    const diff = value - start;
    const duration = 400;
    const startTime = performance.now();

    if (ref.current) cancelAnimationFrame(ref.current);

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + diff * eased));
      if (progress < 1) ref.current = requestAnimationFrame(animate);
    }

    ref.current = requestAnimationFrame(animate);
    return () => { if (ref.current) cancelAnimationFrame(ref.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ─── Section Wrapper ─── */
function Section({ children, id, className = "" }: { children: React.ReactNode; id?: string; className?: string }) {
  return (
    <section id={id} className={`px-6 py-24 md:py-32 max-w-6xl mx-auto ${className}`}>
      {children}
    </section>
  );
}

/* ─── Card ─── */
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-[#111] border border-white/[0.06] rounded-2xl p-6 md:p-8 ${className}`}>
      {children}
    </div>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  /* ROI Calculator State */
  const [units, setUnits] = useState(500);
  const [delinquencyRate, setDelinquencyRate] = useState(12);
  const [avgRent, setAvgRent] = useState(1200);

  const monthlyLoss = Math.round(units * (delinquencyRate / 100) * avgRent);
  const monthlyRecovery = Math.round(monthlyLoss * 0.6);
  const annualRecovery = monthlyRecovery * 12;
  const estimatedCost = annualRecovery * 0.15;
  const annualROI = estimatedCost > 0 ? Math.round(((annualRecovery - estimatedCost) / estimatedCost) * 100) : 0;

  /* Contact Form */
  const [formSubmitted, setFormSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormSubmitted(true);
  }

  return (
    <main className="min-h-screen">
      {/* ─── NAV ─── */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-lg font-semibold tracking-tight">CollectPro</span>
          <a
            href="#contact"
            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            Get Started
          </a>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Stop Losing Revenue
              <br />
              <span className="text-[#2563eb]">to Unpaid Rent</span>
            </h1>
            <p className="text-[#888] text-lg md:text-xl max-w-2xl mx-auto">
              Professional collections built for property management. Full transparency. Results in 30 days.
            </p>
          </div>

          {/* ROI Calculator */}
          <Card className="max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold mb-8 text-center">Calculate Your Recovery Potential</h2>

            <div className="space-y-8">
              {/* Units Slider */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-[#888]">Number of Units</label>
                  <span className="text-sm font-medium">{units.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={5000}
                  step={10}
                  value={units}
                  onChange={(e) => setUnits(Number(e.target.value))}
                />
              </div>

              {/* Delinquency Slider */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-[#888]">Delinquency Rate</label>
                  <span className="text-sm font-medium">{delinquencyRate}%</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={30}
                  step={1}
                  value={delinquencyRate}
                  onChange={(e) => setDelinquencyRate(Number(e.target.value))}
                />
              </div>

              {/* Avg Rent Slider */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-[#888]">Average Monthly Rent</label>
                  <span className="text-sm font-medium">${avgRent.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={800}
                  max={3000}
                  step={50}
                  value={avgRent}
                  onChange={(e) => setAvgRent(Number(e.target.value))}
                />
              </div>

              {/* Results */}
              <div className="border-t border-white/[0.06] pt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-sm text-[#888] mb-1">Monthly Loss</p>
                  <p className="text-2xl md:text-3xl font-bold text-red-400">
                    <AnimatedNumber value={monthlyLoss} prefix="$" />
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-[#888] mb-1">We Can Recover</p>
                  <p className="text-2xl md:text-3xl font-bold text-[#10b981]">
                    <AnimatedNumber value={monthlyRecovery} prefix="$" suffix="/mo" />
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-[#888] mb-1">Annual ROI</p>
                  <p className="text-2xl md:text-3xl font-bold text-[#2563eb]">
                    <AnimatedNumber value={annualROI} suffix="%" />
                  </p>
                </div>
              </div>

              <div className="text-center">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium px-8 py-3.5 rounded-lg transition-colors text-lg"
                >
                  Get Your Custom Recovery Plan
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </Card>

          <div className="flex justify-center mt-12">
            <ChevronDown className="w-6 h-6 text-[#888] animate-bounce" />
          </div>
        </div>
      </section>

      {/* ─── PROBLEM ─── */}
      <Section id="problem">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">The Real Cost of Unpaid Rent</h2>
        <p className="text-[#888] text-center max-w-2xl mx-auto mb-16">
          Every month you delay collections, the problem compounds. Internal teams are expensive and
          inconsistent. Traditional agencies take half your money and give you zero visibility.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <p className="text-4xl font-bold text-red-400 mb-2">$2.4M</p>
            <p className="text-sm text-[#888]">Average annual revenue lost by a 1,000-unit property to delinquent accounts</p>
          </Card>
          <Card>
            <p className="text-4xl font-bold text-red-400 mb-2">480+</p>
            <p className="text-sm text-[#888]">Hours per year your team spends chasing payments instead of managing properties</p>
          </Card>
          <Card>
            <p className="text-4xl font-bold text-red-400 mb-2">$8,500</p>
            <p className="text-sm text-[#888]">Average cost per eviction when collections escalate to legal proceedings</p>
          </Card>
        </div>
      </Section>

      {/* ─── HOW IT WORKS ─── */}
      <Section id="how-it-works">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">How It Works</h2>
        <p className="text-[#888] text-center max-w-2xl mx-auto mb-16">
          From data handoff to real-time recovery tracking in four simple steps.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-white/[0.06]" />

          {[
            { step: 1, icon: Upload, title: "You Send Us the Data", desc: "Securely upload your delinquent accounts. We handle the rest." },
            { step: 2, icon: Settings, title: "We Build Your Campaign", desc: "Custom scripts, Convoso dialer setup, and agent training tailored to your portfolio." },
            { step: 3, icon: Users, title: "Dedicated Team Goes Live", desc: "Trained agents begin outreach within 4 weeks. Your accounts, your rules." },
            { step: 4, icon: BarChart3, title: "Watch Recovery in Real-Time", desc: "Full dashboard access. Every call logged, every dollar tracked." },
          ].map(({ step, icon: Icon, title, desc }) => (
            <Card key={step} className="relative text-center">
              <div className="w-10 h-10 rounded-full bg-[#2563eb] flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                {step}
              </div>
              <Icon className="w-6 h-6 mx-auto mb-3 text-[#888]" />
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm text-[#888]">{desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ─── COMPARISON ─── */}
      <Section id="difference">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">The Difference</h2>
        <p className="text-[#888] text-center max-w-2xl mx-auto mb-16">
          See how we compare to doing it yourself or hiring a traditional agency.
        </p>

        <Card className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left py-4 px-4 text-[#888] font-medium" />
                <th className="text-left py-4 px-4 text-[#2563eb] font-semibold">Us</th>
                <th className="text-left py-4 px-4 text-[#888] font-medium">In-House</th>
                <th className="text-left py-4 px-4 text-[#888] font-medium">Collection Agency</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Cost", "Low flat rate", "High (salaries + benefits)", "25-50% commission"],
                ["Transparency", "Full dashboard", "Limited reporting", "Black box"],
                ["Speed", "Live in 4 weeks", "Months to hire & train", "Weeks to months"],
                ["Control", "Your rules, your scripts", "Full but expensive", "None"],
                ["Technology", "Enterprise dialer", "Basic phone system", "Varies"],
              ].map(([label, us, inHouse, agency]) => (
                <tr key={label} className="border-b border-white/[0.06] last:border-0">
                  <td className="py-4 px-4 font-medium">{label}</td>
                  <td className="py-4 px-4 text-[#10b981]">{us}</td>
                  <td className="py-4 px-4 text-[#888]">{inHouse}</td>
                  <td className="py-4 px-4 text-[#888]">{agency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Section>

      {/* ─── RESULTS ─── */}
      <Section id="results">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Results That Speak</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { number: "50-70%", label: "Recovery Rate", desc: "On delinquent accounts within the first 90 days" },
            { number: "4 Weeks", label: "Time to Go Live", desc: "From data handoff to first calls made" },
            { number: "100%", label: "Calls Recorded", desc: "Full transparency on every interaction" },
          ].map(({ number, label, desc }) => (
            <Card key={label} className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-[#10b981] mb-2">{number}</p>
              <p className="font-semibold mb-1">{label}</p>
              <p className="text-sm text-[#888]">{desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ─── TECHNOLOGY ─── */}
      <Section id="technology">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">Enterprise Technology, Startup Speed</h2>
        <p className="text-[#888] text-center max-w-2xl mx-auto mb-16">
          We invest in the infrastructure so you don&apos;t have to.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Phone, title: "Convoso Dialer", desc: "Enterprise-grade predictive dialer with intelligent call routing and cadence management." },
            { icon: Monitor, title: "Real-Time Dashboard", desc: "Watch campaign performance, call outcomes, and recovery metrics as they happen." },
            { icon: Mic, title: "Call Recording", desc: "Every call recorded and stored. Full audit trail for compliance and quality assurance." },
            { icon: ShieldCheck, title: "Compliance Engine", desc: "Built-in FDCPA compliance checks, time-zone calling windows, and do-not-call management." },
            { icon: MessageSquare, title: "SMS/Email Automation", desc: "Multi-channel outreach with automated follow-ups to maximize contact rates." },
            { icon: FileText, title: "Custom Reporting", desc: "Weekly and monthly reports tailored to your KPIs. Export anytime." },
          ].map(({ icon: Icon, title, desc }) => (
            <Card key={title}>
              <Icon className="w-8 h-8 text-[#2563eb] mb-4" />
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm text-[#888]">{desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ─── COMPLIANCE ─── */}
      <Section id="compliance">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">Built for Compliance</h2>
        <p className="text-[#888] text-center max-w-2xl mx-auto mb-16">
          Collections done wrong creates liability. We do it right.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Scale, title: "FDCPA Compliant", desc: "Full adherence to the Fair Debt Collection Practices Act." },
            { icon: Shield, title: "State Regulations", desc: "We track and comply with state-specific collection laws." },
            { icon: Eye, title: "Recorded Calls", desc: "100% of calls recorded for quality and compliance review." },
            { icon: Lock, title: "Dispute Handling", desc: "Proper dispute resolution and validation processes built in." },
          ].map(({ icon: Icon, title, desc }) => (
            <Card key={title} className="text-center">
              <Icon className="w-8 h-8 text-[#10b981] mx-auto mb-4" />
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm text-[#888]">{desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ─── CONTACT ─── */}
      <Section id="contact">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">Ready to Recover What&apos;s Yours?</h2>
        <p className="text-[#888] text-center max-w-2xl mx-auto mb-16">
          Tell us about your portfolio and we&apos;ll put together a custom recovery plan.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Form */}
          <Card>
            {formSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle className="w-12 h-12 text-[#10b981] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                <p className="text-[#888]">We&apos;ll be in touch within 24 hours with your custom recovery plan.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { name: "name", label: "Name", type: "text" },
                  { name: "company", label: "Company", type: "text" },
                  { name: "email", label: "Email", type: "email" },
                  { name: "phone", label: "Phone", type: "tel" },
                  { name: "units", label: "Number of Units", type: "number" },
                ].map(({ name, label, type }) => (
                  <div key={name}>
                    <label className="block text-sm text-[#888] mb-1.5">{label}</label>
                    <input
                      type={type}
                      name={name}
                      required
                      className="w-full bg-[#0a0a0a] border border-white/[0.06] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm text-[#888] mb-1.5">Message</label>
                  <textarea
                    name="message"
                    rows={3}
                    className="w-full bg-[#0a0a0a] border border-white/[0.06] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium py-3.5 rounded-lg transition-colors"
                >
                  Send Recovery Plan Request
                </button>
              </form>
            )}
          </Card>

          {/* Contact Info */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <h3 className="font-semibold mb-1">Email</h3>
              <a href="mailto:jose@collectpro.com" className="text-[#2563eb] hover:underline">
                jose@collectpro.com
              </a>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Phone</h3>
              <a href="tel:+15551234567" className="text-[#2563eb] hover:underline">
                (555) 123-4567
              </a>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Response Time</h3>
              <p className="text-[#888]">We respond to all inquiries within 24 hours.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/[0.06] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-sm text-[#888]">© {new Date().getFullYear()} CollectPro. All rights reserved.</span>
          <div className="flex gap-6 text-sm text-[#888]">
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#results" className="hover:text-white transition-colors">Results</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
