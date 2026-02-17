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
  FileText,
  MessageSquare,
  CheckCircle,
  Shield,
  Scale,
  Eye,
  Lock,
  ArrowRight,
  ChevronDown,
  Target,
  DollarSign,
  Clock,
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
  return <span>{prefix}{display.toLocaleString()}{suffix}</span>;
}

export default function Home() {
  const [units, setUnits] = useState(500);
  const [delinquencyRate, setDelinquencyRate] = useState(12);
  const [avgRent, setAvgRent] = useState(1200);

  const monthlyLoss = Math.round(units * (delinquencyRate / 100) * avgRent);
  const monthlyRecovery = Math.round(monthlyLoss * 0.6);
  const annualRecovery = monthlyRecovery * 12;
  const annualROI = monthlyLoss > 0 ? Math.round((monthlyRecovery / monthlyLoss) * 100) : 0;

  const [formSubmitted, setFormSubmitted] = useState(false);
  function handleSubmit(e: FormEvent) { e.preventDefault(); setFormSubmitted(true); }

  return (
    <main className="min-h-screen bg-white text-[#1d1d1f]">

      {/* ─── NAV ─── */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-[#e8e8ed]">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-base font-semibold tracking-tight">Managed Collections</span>
          <div className="hidden md:flex items-center gap-8 text-[13px] text-[#86868b]">
            <a href="#how-it-works" className="hover:text-[#1d1d1f] transition-colors">How It Works</a>
            <a href="#results" className="hover:text-[#1d1d1f] transition-colors">Results</a>
            <a href="#technology" className="hover:text-[#1d1d1f] transition-colors">Technology</a>
            <a href="#what-you-get" className="hover:text-[#1d1d1f] transition-colors">Services</a>
          </div>
          <a href="#contact" className="bg-[#1d1d1f] hover:bg-black text-white text-[13px] font-medium px-5 py-2 rounded-full transition-colors">
            Get Started
          </a>
        </div>
      </nav>

      {/* ─── HERO + CALCULATOR ─── */}
      <section className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] font-semibold tracking-[3px] uppercase text-[#86868b] mb-4">Property Management Collections</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] mb-6">
              Stop Losing Revenue<br />
              <span className="text-[#86868b]">to Unpaid Rent</span>
            </h1>
            <p className="text-[#86868b] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Professional collections built exclusively for property management. Full transparency, and results within 2 weeks.
            </p>
          </div>

          {/* ROI Calculator */}
          <div className="bg-[#f5f5f7] border border-[#e8e8ed] rounded-2xl p-6 md:p-8 max-w-3xl mx-auto">
            <h2 className="text-xl font-bold mb-8 text-center">Calculate Your Recovery Potential</h2>
            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-[#86868b]">Number of Units</label>
                  <span className="text-sm font-semibold">{units.toLocaleString()}</span>
                </div>
                <input type="range" min={50} max={5000} step={10} value={units} onChange={(e) => setUnits(Number(e.target.value))} />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-[#86868b]">Delinquency Rate</label>
                  <span className="text-sm font-semibold">{delinquencyRate}%</span>
                </div>
                <input type="range" min={5} max={30} step={1} value={delinquencyRate} onChange={(e) => setDelinquencyRate(Number(e.target.value))} />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-[#86868b]">Average Monthly Rent</label>
                  <span className="text-sm font-semibold">${avgRent.toLocaleString()}</span>
                </div>
                <input type="range" min={800} max={3000} step={50} value={avgRent} onChange={(e) => setAvgRent(Number(e.target.value))} />
              </div>

              <div className="border-t border-[#e8e8ed] pt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-sm text-[#86868b] mb-1">Monthly Loss</p>
                  <p className="text-2xl md:text-3xl font-extrabold text-red-500"><AnimatedNumber value={monthlyLoss} prefix="$" /></p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-[#86868b] mb-1">Monthly Recovery</p>
                  <p className="text-2xl md:text-3xl font-extrabold text-emerald-600"><AnimatedNumber value={monthlyRecovery} prefix="$" /></p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-[#86868b] mb-1">Annual Recovery</p>
                  <p className="text-2xl md:text-3xl font-extrabold"><AnimatedNumber value={annualRecovery} prefix="$" /></p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-[#86868b] mb-1">Recovery Rate</p>
                  <p className="text-2xl md:text-3xl font-extrabold"><AnimatedNumber value={annualROI} suffix="%" /></p>
                </div>
              </div>

              <div className="text-center">
                <a href="#contact" className="inline-flex items-center gap-2 bg-[#1d1d1f] hover:bg-black text-white font-medium px-8 py-3.5 rounded-full transition-colors text-lg">
                  Get Your Custom Recovery Plan <ArrowRight className="w-5 h-5" />
                </a>
              </div>
              <p className="text-[10px] text-[#c7c7cc] text-center mt-4 leading-relaxed">
                Recovery estimates based on a 60% collection rate, consistent with industry benchmarks from{" "}
                <a href="https://www.abi.org/" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#86868b] transition-colors">ABI</a>
                {" and "}
                <a href="https://www.acainternational.org/" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#86868b] transition-colors">ACA International</a>
                . Actual results vary by portfolio.
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <ChevronDown className="w-5 h-5 text-[#86868b] animate-bounce" />
          </div>
        </div>
      </section>

      {/* ─── WHY US ─── */}
      <section className="border-y border-[#e8e8ed] bg-[#f5f5f7]">
        <div className="px-6 py-20 md:py-28 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-3 tracking-tight">Built Different From Day One</h2>
          <p className="text-[#86868b] text-center max-w-2xl mx-auto mb-14">
            We built this service from the ground up for one industry. Every process, every script, every metric is designed for property management collections.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Target, title: "Purpose-Built for Property Management", desc: "We don't do medical debt, credit cards, or auto loans. We specialize in one thing: recovering unpaid rent." },
              { icon: DollarSign, title: "Performance-Based Model", desc: "Our success is tied to yours. We only get paid when you recover revenue. Full alignment, full transparency." },
              { icon: Clock, title: "Operational in 2 Weeks", desc: "From signed agreement to live campaigns in as little as 2 weeks. We handle agent training, scripts, dialer config, and compliance." },
              { icon: Eye, title: "Total Visibility Into Every Call", desc: "Real-time dashboards, recorded calls, and detailed reporting. You'll know exactly what's happening at all times." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title}>
                <Icon className="w-6 h-6 text-[#1d1d1f] mb-3" />
                <h3 className="font-bold mb-2">{title}</h3>
                <p className="text-sm text-[#86868b] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROBLEM ─── */}
      <section id="problem" className="px-6 py-20 md:py-28 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-3 tracking-tight">The Real Cost of Unpaid Rent</h2>
        <p className="text-[#86868b] text-center max-w-2xl mx-auto mb-14">
          Every month you delay collections, the problem compounds. Internal teams are expensive and inconsistent. Traditional agencies take half your money and give you zero visibility.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { num: "$2.4M", desc: "Average annual revenue lost by a 1,000-unit property to delinquent accounts" },
            { num: "480+", desc: "Hours per year your team spends chasing payments instead of managing properties" },
            { num: "$8,500", desc: "Average cost per eviction when collections escalate to legal proceedings" },
            { num: "34%", desc: "Of delinquent accounts become unrecoverable after 90 days without action" },
          ].map(({ num, desc }) => (
            <div key={num} className="bg-[#f5f5f7] border border-[#e8e8ed] rounded-2xl p-6 md:p-8">
              <p className="text-3xl font-extrabold text-red-500 mb-2">{num}</p>
              <p className="text-sm text-[#86868b]">{desc}</p>
            </div>
          ))}
          <div className="col-span-full mt-6 text-center">
            <p className="text-[11px] text-[#c7c7cc]">
              Sources:{" "}
              <a href="https://www.nmhc.org/research-insight/nmhc-rent-payment-tracker/" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#86868b] transition-colors">NMHC Rent Payment Tracker</a>
              {" · "}
              <a href="https://ipropertymanagement.com/research/average-eviction-cost" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#86868b] transition-colors">iPropertyManagement Eviction Cost Study</a>
              {" · "}
              <a href="https://www.transunion.com/industry/collections" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#86868b] transition-colors">TransUnion Collections Industry Report</a>
            </p>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" className="border-y border-[#e8e8ed] bg-[#f5f5f7]">
        <div className="px-6 py-20 md:py-28 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-3 tracking-tight">How It Works</h2>
          <p className="text-[#86868b] text-center max-w-2xl mx-auto mb-14">From data handoff to real-time recovery tracking in four steps.</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: 1, icon: Upload, title: "You Send Us the Data", desc: "Securely upload your delinquent accounts. CSV, Excel, or direct integration. We handle the rest." },
              { step: 2, icon: Settings, title: "We Build Your Campaign", desc: "Custom call scripts, dialer setup, compliance checks, and agent training — all tailored to your portfolio." },
              { step: 3, icon: Users, title: "Dedicated Team Goes Live", desc: "Trained agents begin outreach within 2 weeks. Your accounts, your rules, your brand represented professionally." },
              { step: 4, icon: BarChart3, title: "Track Recovery in Real-Time", desc: "Full dashboard access from day one. Every call logged, every dollar tracked, every outcome documented." },
            ].map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm font-bold text-[#1d1d1f]">0{step}</span>
                  <div className="h-px flex-1 bg-[#e8e8ed]" />
                </div>
                <Icon className="w-5 h-5 text-[#86868b] mb-3" />
                <h3 className="font-bold mb-2">{title}</h3>
                <p className="text-sm text-[#86868b] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHAT YOU GET ─── */}
      <section id="what-you-get" className="px-6 py-20 md:py-28 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-3 tracking-tight">What You Get</h2>
        <p className="text-[#86868b] text-center max-w-2xl mx-auto mb-14">A complete, turnkey collections operation — built, managed, and optimized by our team.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 max-w-4xl mx-auto">
          {[
            "Dedicated, trained collection agents assigned to your portfolio",
            "Enterprise-grade predictive dialer technology",
            "Custom call scripts written for property management",
            "Multi-channel outreach: phone, SMS, and email follow-ups",
            "Real-time performance dashboard with full campaign visibility",
            "100% call recording with searchable archives",
            "FDCPA-compliant processes with built-in regulatory safeguards",
            "State-specific compliance management across all jurisdictions",
            "Weekly performance reports with recovery metrics and KPIs",
            "Dedicated account manager as your single point of contact",
            "Payment plan setup and management for willing residents",
            "Escalation protocols for accounts requiring legal action",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 py-2.5 border-b border-[#f5f5f7]">
              <CheckCircle className="w-4 h-4 text-[#1d1d1f] mt-0.5 flex-shrink-0" />
              <span className="text-sm text-[#6e6e73]">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── COMPARISON ─── */}
      <section className="border-y border-[#e8e8ed] bg-[#f5f5f7]">
        <div id="difference" className="px-6 py-20 md:py-28 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-3 tracking-tight">How We Compare</h2>
          <p className="text-[#86868b] text-center max-w-2xl mx-auto mb-14">See why outsourcing to a specialized partner outperforms both in-house teams and traditional collection agencies.</p>
          <div className="bg-white border border-[#e8e8ed] rounded-2xl p-6 md:p-8 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e8e8ed]">
                  <th className="text-left py-4 px-4 text-[#86868b] font-medium" />
                  <th className="text-left py-4 px-4 font-bold text-[#1d1d1f]">Managed Collections</th>
                  <th className="text-left py-4 px-4 text-[#86868b] font-medium">In-House Team</th>
                  <th className="text-left py-4 px-4 text-[#86868b] font-medium">Traditional Agency</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Transparency", "Real-time dashboard + recorded calls", "Limited, manual reporting", "Black box — minimal visibility"],
                  ["Time to Launch", "Live in 2 weeks", "3-6 months to hire and train", "Weeks to onboard, slow ramp"],
                  ["Control Over Process", "Your rules, your scripts, your brand", "Full control but expensive to maintain", "Little to none"],
                  ["Technology", "Enterprise-grade predictive dialer", "Basic phone system", "Varies widely"],
                  ["Scalability", "Scale up or down in days", "Requires new hires", "Rigid contracts"],
                  ["Reporting", "Real-time + weekly", "Whatever your team builds", "Monthly summary at best"],
                ].map(([label, us, inHouse, agency]) => (
                  <tr key={label} className="border-b border-[#f5f5f7] last:border-0">
                    <td className="py-3.5 px-4 font-semibold text-[#1d1d1f]">{label}</td>
                    <td className="py-3.5 px-4 text-[#1d1d1f]">{us}</td>
                    <td className="py-3.5 px-4 text-[#86868b]">{inHouse}</td>
                    <td className="py-3.5 px-4 text-[#86868b]">{agency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── RESULTS ─── */}
      <section id="results" className="px-6 py-20 md:py-28 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-3 tracking-tight">Measurable Results</h2>
        <p className="text-[#86868b] text-center max-w-2xl mx-auto mb-14">Our numbers speak for themselves.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: "50-70%", label: "Recovery Rate", desc: "On delinquent accounts within the first 90 days" },
            { number: "2 Weeks", label: "Go-Live Timeline", desc: "From signed agreement to first outbound calls" },
            { number: "100%", label: "Call Recording", desc: "Every interaction documented for compliance and quality" },
            { number: "3x", label: "Contact Rate", desc: "Versus manual dialing through predictive technology" },
          ].map(({ number, label, desc }) => (
            <div key={label} className="text-center">
              <p className="text-3xl md:text-4xl font-extrabold text-[#1d1d1f] mb-1">{number}</p>
              <p className="font-bold text-sm mb-1">{label}</p>
              <p className="text-xs text-[#86868b]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── TECHNOLOGY ─── */}
      <section id="technology" className="border-y border-[#e8e8ed] bg-[#f5f5f7]">
        <div className="px-6 py-20 md:py-28 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-3 tracking-tight">Enterprise Infrastructure</h2>
          <p className="text-[#86868b] text-center max-w-2xl mx-auto mb-14">We invest in the technology stack so you don&apos;t have to.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Phone, title: "Professional Power Dialer", desc: "Enterprise-grade predictive dialer with intelligent call routing and cadence management. 3x more contacts per hour." },
              { icon: Monitor, title: "Real-Time Dashboard", desc: "Watch campaign performance, call outcomes, agent activity, and recovery metrics as they happen." },
              { icon: Mic, title: "Full Call Recording", desc: "Every call recorded, timestamped, and stored. Searchable archives for compliance and quality assurance." },
              { icon: ShieldCheck, title: "Compliance Engine", desc: "Built-in FDCPA compliance checks, automated time-zone calling windows, consent tracking, and DNC management." },
              { icon: MessageSquare, title: "Multi-Channel Outreach", desc: "Coordinated phone, SMS, and email campaigns with automated follow-up sequences." },
              { icon: FileText, title: "Advanced Reporting", desc: "Customizable reports by property, time period, agent, or account status. Weekly delivery or on-demand export." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title}>
                <Icon className="w-5 h-5 text-[#1d1d1f] mb-3" />
                <h3 className="font-bold mb-2">{title}</h3>
                <p className="text-sm text-[#86868b] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMPLIANCE ─── */}
      <section id="compliance" className="px-6 py-20 md:py-28 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-3 tracking-tight">Built for Compliance</h2>
        <p className="text-[#86868b] text-center max-w-2xl mx-auto mb-14">Collections done wrong creates liability. We ensure every interaction meets regulatory standards.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Scale, title: "FDCPA Compliant", desc: "Full adherence to the Fair Debt Collection Practices Act across every channel." },
            { icon: Shield, title: "State Regulations", desc: "Automated compliance with state-specific collection laws, licensing, and calling restrictions." },
            { icon: Eye, title: "Complete Audit Trail", desc: "100% of calls recorded. Every SMS, email, and payment interaction logged." },
            { icon: Lock, title: "Dispute Resolution", desc: "Proper validation, dispute handling, and cease-and-desist processing built in." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="text-center">
              <Icon className="w-5 h-5 text-[#1d1d1f] mx-auto mb-3" />
              <h3 className="font-bold mb-2">{title}</h3>
              <p className="text-sm text-[#86868b]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="border-y border-[#e8e8ed] bg-[#f5f5f7]">
        <div className="px-6 py-20 md:py-28 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-3 tracking-tight">Ready to Recover What&apos;s Yours?</h2>
          <p className="text-[#86868b] text-center max-w-2xl mx-auto mb-14">Tell us about your portfolio and we&apos;ll put together a custom recovery plan within 24 hours.</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="bg-white border border-[#e8e8ed] rounded-2xl p-6 md:p-8">
              {formSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-12 h-12 text-[#1d1d1f] mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                  <p className="text-[#86868b]">We&apos;ll be in touch within 24 hours with your custom recovery plan.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { name: "name", label: "Name", type: "text" },
                    { name: "company", label: "Company", type: "text" },
                    { name: "email", label: "Email", type: "email" },
                    { name: "phone", label: "Phone", type: "tel" },
                    { name: "units", label: "Number of Units", type: "number" },
                  ].map(({ name, label, type }) => (
                    <div key={name}>
                      <label className="block text-sm text-[#86868b] mb-1">{label}</label>
                      <input type={type} name={name} required className="w-full bg-[#f5f5f7] border border-[#e8e8ed] rounded-lg px-4 py-2.5 text-sm text-[#1d1d1f] focus:outline-none focus:border-[#1d1d1f] transition-colors" />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm text-[#86868b] mb-1">Message</label>
                    <textarea name="message" rows={3} className="w-full bg-[#f5f5f7] border border-[#e8e8ed] rounded-lg px-4 py-2.5 text-sm text-[#1d1d1f] focus:outline-none focus:border-[#1d1d1f] transition-colors resize-none" />
                  </div>
                  <button type="submit" className="w-full bg-[#1d1d1f] hover:bg-black text-white font-medium py-3 rounded-full transition-colors">
                    Send Recovery Plan Request
                  </button>
                </form>
              )}
            </div>

            <div className="flex flex-col justify-center space-y-8">
              <div>
                <h3 className="font-bold mb-1">Email</h3>
                <a href="mailto:jose@tamezmg.com" className="text-[#86868b] hover:text-[#1d1d1f] transition-colors text-sm">jose@tamezmg.com</a>
              </div>
              <div>
                <h3 className="font-bold mb-1">Phone</h3>
                <a href="tel:+19565782446" className="text-[#86868b] hover:text-[#1d1d1f] transition-colors text-sm">(956) 578-2446</a>
              </div>
              <div>
                <h3 className="font-bold mb-1">Response Time</h3>
                <p className="text-sm text-[#86868b]">All inquiries receive a response within 24 hours. Most within the same business day.</p>
              </div>
              <div>
                <h3 className="font-bold mb-1">No Obligation</h3>
                <p className="text-sm text-[#86868b]">Your custom recovery plan is free. No commitment required.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-[#e8e8ed] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-sm text-[#86868b]">© {new Date().getFullYear()} Managed Collections. All rights reserved.</span>
          <div className="flex gap-6 text-sm text-[#86868b]">
            <a href="#how-it-works" className="hover:text-[#1d1d1f] transition-colors">How It Works</a>
            <a href="#results" className="hover:text-[#1d1d1f] transition-colors">Results</a>
            <a href="#contact" className="hover:text-[#1d1d1f] transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
