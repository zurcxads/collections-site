"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import {
  ArrowRight,
  ChevronDown,
  CheckCircle,
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
  const annualROI = monthlyLoss > 0 ? Math.round(((monthlyRecovery * 12) / (monthlyLoss * 12)) * 100) : 0;

  const [formSubmitted, setFormSubmitted] = useState(false);
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-white text-[#1d1d1f]">

      {/* ─── NAV ─── */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-[#e8e8ed]">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-base font-semibold tracking-tight text-[#1d1d1f]">Managed Collections</span>
          <div className="hidden md:flex items-center gap-8 text-[13px] text-[#86868b]">
            <a href="#problem" className="hover:text-[#1d1d1f] transition-colors">The Problem</a>
            <a href="#solution" className="hover:text-[#1d1d1f] transition-colors">Solution</a>
            <a href="#process" className="hover:text-[#1d1d1f] transition-colors">Process</a>
            <a href="#contact" className="hover:text-[#1d1d1f] transition-colors">Contact</a>
          </div>
          <a href="#contact" className="bg-[#1d1d1f] hover:bg-black text-white text-[13px] font-medium px-5 py-2 rounded-full transition-colors">
            Get Started
          </a>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 relative">
        <div className="max-w-2xl text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-[-0.04em] leading-[0.95] mb-5">
            Managed<br />Collections.
          </h1>
          <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed max-w-lg mx-auto">
            Professional delinquent rent recovery for property management companies.
          </p>
        </div>
        <div className="absolute bottom-10">
          <ChevronDown className="w-5 h-5 text-white/30 animate-bounce" />
        </div>
      </section>

      {/* ─── PROBLEM ─── */}
      <section id="problem" className="px-6 py-24 md:py-32">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] font-semibold tracking-[3px] uppercase text-[#86868b] mb-10">The Problem</p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-[-0.03em] leading-[1.08] mb-4">
            Delinquent rent costs you<br />more than you think.{" "}
            <span className="text-[#86868b]">And the current process isn't built to fix it.</span>
          </h2>
          <p className="text-base md:text-lg text-[#6e6e73] max-w-xl mb-16 leading-relaxed">
            Manual dialing, spreadsheet tracking, and overextended staff. It's slow, inconsistent, and every week of delay reduces recovery rates.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {[
              { title: "Manual Dialing", desc: "Individual callers reach a fraction of what a predictive dialer handles. Most delinquent tenants never get a follow-up." },
              { title: "No Real-Time Visibility", desc: "Spreadsheet tracking means you're always working with yesterday's information. No live view into what's happening." },
              { title: "Can't Scale", desc: "More properties means more complexity. The current model breaks when your portfolio grows." },
              { title: "No Accountability", desc: "Without call recordings or tracking, there's no way to verify quality, frequency, or follow-through." },
              { title: "Team Distraction", desc: "Property managers shouldn't be chasing rent. Every hour on collections is an hour away from operations." },
              { title: "Revenue Lost to Delay", desc: "The longer a delinquent account sits, the lower the chance of recovery. Speed is everything." },
            ].map(({ title, desc }, i) => (
              <div
                key={title}
                className={`py-5 pr-6 ${i % 2 === 1 ? "md:pl-6 md:border-l border-[#e8e8ed]" : ""} ${i >= 2 ? "border-t border-[#e8e8ed]" : ""}`}
              >
                <h4 className="text-[15px] font-bold text-[#1d1d1f] mb-1">{title}</h4>
                <p className="text-[13px] text-[#6e6e73] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="px-6 py-16 bg-[#f5f5f7]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "3–4x", label: "More Contacts Per Hour" },
            { num: "100%", label: "Call Transparency" },
            { num: "$0", label: "Upfront Cost" },
            { num: "2 Wks", label: "To Go Live" },
          ].map(({ num, label }) => (
            <div key={label}>
              <p className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#1d1d1f]">{num}</p>
              <p className="text-[11px] font-semibold tracking-[1px] uppercase text-[#86868b] mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SOLUTION ─── */}
      <section id="solution" className="px-6 py-24 md:py-32">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] font-semibold tracking-[3px] uppercase text-[#86868b] mb-10">The Solution</p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-[-0.03em] leading-[1.08] mb-4">
            Everything you need.{" "}
            <span className="text-[#86868b]">Nothing you don't.</span>
          </h2>
          <p className="text-base md:text-lg text-[#6e6e73] max-w-xl mb-16 leading-relaxed">
            A complete, fully managed collections operation built for one industry — property management. You send accounts. We recover rent.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {[
              { title: "Predictive Dialer", desc: "Enterprise Convoso platform with automated routing, recording, and compliance. 3–4x more live contacts per hour than manual dialing." },
              { title: "Trained Collections Agents", desc: "Dedicated team trained on your specific procedures, communication standards, and escalation protocols." },
              { title: "Custom Call Scripts", desc: "Built from your existing guides and loaded into the dialer. Every agent follows your approved process, every time." },
              { title: "Live Reporting Dashboard", desc: "Real-time view of calls, contacts, commitments, and dollars collected — by property, by agent, by day." },
              { title: "Quality Assurance", desc: "Call monitoring, scoring, and coaching. Performance improves continuously. Your standards are always maintained." },
              { title: "Full Audit Trail", desc: "Every call recorded. Every contact attempt logged. Complete documentation accessible anytime." },
            ].map(({ title, desc }, i) => (
              <div
                key={title}
                className={`py-5 pr-6 ${i % 2 === 1 ? "md:pl-6 md:border-l border-[#e8e8ed]" : ""} ${i >= 2 ? "border-t border-[#e8e8ed]" : ""}`}
              >
                <h4 className="text-[15px] font-bold text-[#1d1d1f] mb-1">{title}</h4>
                <p className="text-[13px] text-[#6e6e73] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-[#f5f5f7] rounded-2xl px-8 py-6 text-center">
            <p className="text-[15px] font-medium text-[#1d1d1f] leading-relaxed">
              We handle the infrastructure, the agents, and the technology.<br />You get the results and the visibility.
            </p>
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section id="process" className="px-6 py-24 md:py-32 bg-[#f5f5f7]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] font-semibold tracking-[3px] uppercase text-[#86868b] mb-10">The Process</p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-[-0.03em] leading-[1.08] mb-4">
            Four steps.{" "}
            <span className="text-[#86868b]">Total transparency.</span>
          </h2>
          <p className="text-base md:text-lg text-[#6e6e73] max-w-xl mb-16 leading-relaxed">
            A simple, repeatable process designed for clarity at every stage.
          </p>

          <div className="space-y-0">
            {[
              { n: "01", title: "You send us delinquent accounts", desc: "Tenant name, unit, balance, contact info. On whatever schedule works for your team — monthly, weekly, or on demand." },
              { n: "02", title: "Our agents call using your approved scripts", desc: "The predictive dialer automatically connects agents to tenants — no wasted time on voicemails, busy signals, or wrong numbers. Your scripts are followed on every call." },
              { n: "03", title: "You see everything in real time", desc: "Live dashboard shows call activity, contact outcomes, payment commitments, and recovered dollars — updated as it happens." },
              { n: "04", title: "Weekly performance reports", desc: "Recovery rates, agent metrics, call volume, and collected amounts delivered weekly. You always know exactly where things stand." },
            ].map(({ n, title, desc }) => (
              <div key={n} className="flex items-start py-6 border-b border-[#d2d2d7] last:border-0">
                <span className="text-3xl md:text-4xl font-extrabold text-[#d2d2d7] min-w-[70px] leading-none tracking-tight">{n}</span>
                <div>
                  <h4 className="text-base font-bold text-[#1d1d1f] mb-1">{title}</h4>
                  <p className="text-[13px] text-[#6e6e73] leading-relaxed max-w-lg">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REPORTING ─── */}
      <section className="px-6 py-24 md:py-32">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] font-semibold tracking-[3px] uppercase text-[#86868b] mb-10">Reporting</p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-[-0.03em] leading-[1.08] mb-16">
            What you'll have<br />access to.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
            {[
              "Real-time dashboard — calls in progress, agent status, daily totals",
              "Call recordings — every tenant interaction, accessible anytime",
              "Recovery reports — dollars collected by property and period",
              "Agent performance — calls per hour, contact rate, conversions",
              "Disposition logs — documented outcome of every contact attempt",
              "Weekly executive summary — ready to share with leadership",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 py-4 border-b border-[#f5f5f7]">
                <div className="w-[6px] h-[6px] rounded-full bg-[#d2d2d7] flex-shrink-0" />
                <span className="text-[14px] text-[#1d1d1f]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      <section className="px-6 py-24 md:py-32 bg-black text-white">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] font-semibold tracking-[3px] uppercase text-white/40 mb-10">Timeline</p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-[-0.03em] leading-[1.08] mb-4">
            Live in two weeks.{" "}
            <span className="text-white/40">Scale from there.</span>
          </h2>
          <p className="text-base md:text-lg text-white/50 max-w-xl mb-16 leading-relaxed">
            We move fast. From kickoff to live calls in 14 days — dialer configured, agents trained, scripts loaded, dashboard ready.
          </p>

          <div className="space-y-0">
            {[
              { time: "Week 1", title: "Setup & Configuration", desc: "Dialer account, CRM configuration, call scripts built from your guides, agent recruitment begins." },
              { time: "Week 2", title: "Training & Launch", desc: "Agents trained on your procedures and escalation protocols. Dashboard configured. Go live on initial properties." },
              { time: "Week 3+", title: "Full Rollout", desc: "Expand across your full portfolio. Scale agent capacity based on volume and recovery targets. Continuous optimization." },
            ].map(({ time, title, desc }) => (
              <div key={time} className="flex items-baseline py-6 border-b border-white/10 last:border-0">
                <span className="text-[11px] font-bold tracking-[1px] uppercase text-white/30 w-24 flex-shrink-0">{time}</span>
                <div>
                  <h4 className="text-base font-bold text-white mb-1">{title}</h4>
                  <p className="text-[13px] text-white/50 leading-relaxed max-w-lg">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ROI CALCULATOR ─── */}
      <section className="px-6 py-24 md:py-32 bg-[#f5f5f7]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[11px] font-semibold tracking-[3px] uppercase text-[#86868b] mb-10">Calculator</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-[-0.03em]">
              See your recovery potential.
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm">
            <div className="space-y-8">
              {[
                { label: "Number of Units", value: units, min: 50, max: 5000, step: 10, set: setUnits, format: (v: number) => v.toLocaleString() },
                { label: "Delinquency Rate", value: delinquencyRate, min: 5, max: 30, step: 1, set: setDelinquencyRate, format: (v: number) => `${v}%` },
                { label: "Average Monthly Rent", value: avgRent, min: 800, max: 3000, step: 50, set: setAvgRent, format: (v: number) => `$${v.toLocaleString()}` },
              ].map(({ label, value, min, max, step, set, format }) => (
                <div key={label}>
                  <div className="flex justify-between mb-2">
                    <label className="text-[13px] text-[#86868b]">{label}</label>
                    <span className="text-[13px] font-semibold text-[#1d1d1f]">{format(value)}</span>
                  </div>
                  <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => set(Number(e.target.value))}
                    className="w-full accent-[#1d1d1f]"
                  />
                </div>
              ))}

              <div className="border-t border-[#e8e8ed] pt-8 grid grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-[11px] font-semibold tracking-[1px] uppercase text-[#86868b] mb-1">Monthly Loss</p>
                  <p className="text-2xl md:text-3xl font-extrabold text-red-500">
                    <AnimatedNumber value={monthlyLoss} prefix="$" />
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold tracking-[1px] uppercase text-[#86868b] mb-1">We Can Recover</p>
                  <p className="text-2xl md:text-3xl font-extrabold text-[#1d1d1f]">
                    <AnimatedNumber value={monthlyRecovery} prefix="$" suffix="/mo" />
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold tracking-[1px] uppercase text-[#86868b] mb-1">Recovery Rate</p>
                  <p className="text-2xl md:text-3xl font-extrabold text-[#1d1d1f]">
                    <AnimatedNumber value={annualROI} suffix="%" />
                  </p>
                </div>
              </div>

              <div className="text-center pt-2">
                <a href="#contact" className="inline-flex items-center gap-2 bg-[#1d1d1f] hover:bg-black text-white font-medium px-8 py-3.5 rounded-full transition-colors">
                  Get Your Recovery Plan
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="px-6 py-24 md:py-32">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-[-0.03em] mb-4">
              Ready to get started?
            </h2>
            <p className="text-base md:text-lg text-[#6e6e73] max-w-lg mx-auto leading-relaxed">
              Tell us about your portfolio and we'll put together a custom recovery plan.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-4xl mx-auto">
            <div className="bg-[#f5f5f7] rounded-2xl p-8">
              {formSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-10 h-10 text-[#1d1d1f] mx-auto mb-4" />
                  <h3 className="text-lg font-bold mb-2">Thank you.</h3>
                  <p className="text-[13px] text-[#6e6e73]">We'll be in touch within 24 hours.</p>
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
                      <label className="block text-[12px] text-[#86868b] mb-1">{label}</label>
                      <input
                        type={type}
                        name={name}
                        required
                        className="w-full bg-white border border-[#e8e8ed] rounded-lg px-4 py-2.5 text-[14px] text-[#1d1d1f] focus:outline-none focus:border-[#1d1d1f] transition-colors"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-[12px] text-[#86868b] mb-1">Message</label>
                    <textarea
                      name="message"
                      rows={3}
                      className="w-full bg-white border border-[#e8e8ed] rounded-lg px-4 py-2.5 text-[14px] text-[#1d1d1f] focus:outline-none focus:border-[#1d1d1f] transition-colors resize-none"
                    />
                  </div>
                  <button type="submit" className="w-full bg-[#1d1d1f] hover:bg-black text-white font-medium py-3 rounded-full transition-colors">
                    Send Recovery Plan Request
                  </button>
                </form>
              )}
            </div>

            <div className="flex flex-col justify-center space-y-10">
              <div>
                <h3 className="text-[13px] font-bold text-[#1d1d1f] mb-1">Email</h3>
                <a href="mailto:jose@tamezmg.com" className="text-[14px] text-[#6e6e73] hover:text-[#1d1d1f] transition-colors">
                  jose@tamezmg.com
                </a>
              </div>
              <div>
                <h3 className="text-[13px] font-bold text-[#1d1d1f] mb-1">Phone</h3>
                <a href="tel:+19565782446" className="text-[14px] text-[#6e6e73] hover:text-[#1d1d1f] transition-colors">
                  (956) 578-2446
                </a>
              </div>
              <div>
                <h3 className="text-[13px] font-bold text-[#1d1d1f] mb-1">Response Time</h3>
                <p className="text-[14px] text-[#6e6e73]">All inquiries receive a response within 24 hours.</p>
              </div>
              <div>
                <h3 className="text-[13px] font-bold text-[#1d1d1f] mb-1">No Obligation</h3>
                <p className="text-[14px] text-[#6e6e73]">Your recovery plan is free. No commitment required.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-[#e8e8ed] py-6 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[12px] text-[#86868b]">© {new Date().getFullYear()} Managed Collections.</span>
          <div className="flex gap-6 text-[12px] text-[#86868b]">
            <span>Jose Tamez</span>
            <span>jose@tamezmg.com</span>
            <span>(956) 578-2446</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
