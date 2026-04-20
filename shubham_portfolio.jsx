import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const SKILLS = [
  { cat: "EDR & ENDPOINT", items: ["Trend Micro Apex One", "Microsoft Defender for Endpoint", "Microsoft Intune", "Alert Triage & Containment"], color: "#00ff9d" },
  { cat: "IDENTITY & IAM", items: ["Microsoft Entra ID (Azure AD)", "Conditional Access", "MFA / YubiKey", "RBAC", "OAuth 2.0", "Privileged Access Management"], color: "#4fc3f7" },
  { cat: "VULNERABILITY MGT", items: ["CVSS v3 Scoring", "Patch Compliance", "VAPT Checklists", "QA Audit Readiness", "Nessus / Qualys (Familiar)"], color: "#ffd700" },
  { cat: "CLOUD & AI", items: ["AWS Security Fundamentals", "Azure Security", "Microsoft Sentinel (Learning)", "AI/LLM Security (Learning)", "Zero Trust"], color: "#ce93d8" },
  { cat: "NETWORK & LOGS", items: ["Palo Alto NGFW", "Windows Event Logs (4624/4625/4688)", "TCP/IP", "DNS", "VPN", "Log Correlation"], color: "#ff8a65" },
  { cat: "FRAMEWORKS", items: ["MITRE ATT&CK", "NIST CSF", "ISO 27001", "Incident Response Lifecycle", "Microsoft 365 Security Centre"], color: "#80cbc4" },
];

const EXPERIENCE = [
  {
    role: "Senior Associate Engineer",
    company: "Invenio Business Solutions, Inc.",
    location: "Pune, Maharashtra",
    period: "DEC 2024 – PRESENT",
    type: "ACTIVE",
    bullets: [
      "Triaged 50+ security alerts/month via Trend Micro Apex One EDR; mapped threats to MITRE ATT&CK and executed containment actions to minimize exposure windows.",
      "Maintained endpoint security posture across 300+ corporate endpoints via Microsoft Intune EMS; achieved 95%+ Windows patch compliance using CVSS v3 severity prioritisation.",
      "Analysed Microsoft Entra ID sign-in logs to detect impossible travel patterns, anomalous logins, and identity-based IOCs; reduced MTTD for IAM incidents.",
      "Administered Microsoft 365 Defender — enforced MFA/YubiKey policies, Conditional Access rules, and RBAC-based access governance for 200+ accounts.",
      "Palo Alto NGFW monitoring by reviewing traffic logs and identifying unusual outbound connections to assist in firewall rule validation.",
      "Correlated Windows Event IDs (4624, 4625, 4688) for log analysis; documented incident timelines for ISO 27001 / NIST CSF audit readiness.",
    ]
  }
];

const INCIDENT = {
  title: "Suspicious Endpoint Behaviour Investigation",
  tool: "Trend Micro Apex One",
  steps: [
    { step: "01", label: "ALERT TRIGGERED", desc: "High-severity behavioural EDR alert detected on corporate endpoint" },
    { step: "02", label: "PROCESS ANALYSIS", desc: "Analysed process execution chains and user context via Event ID 4688" },
    { step: "03", label: "IOC CORRELATION", desc: "Correlated indicators of compromise with suspicious email attachments" },
    { step: "04", label: "CONTAINMENT", desc: "Executed file quarantine and triggered credential reset on affected account" },
    { step: "05", label: "VERIFICATION", desc: "Verified clean post-remediation state across endpoint and identity plane" },
    { step: "06", label: "DOCUMENTATION", desc: "Full incident timeline documented for internal audit trail" },
  ]
};

const CERTS = [
  { code: "CEH", name: "Certified Ethical Hacker", issuer: "EC-Council", color: "#ff6b6b" },
  { code: "CAP", name: "Certified AppSec Professional", issuer: "TheSecOps Group", color: "#ffd700" },
  { code: "CNSP", name: "Certified Network Security Practitioner", issuer: "TheSecOps Group", color: "#4fc3f7" },
  { code: "PG DIP", name: "PG Diploma in Cyber Security & Forensics", issuer: "CDAC – Thiruvananthapuram · 2024", color: "#00ff9d" },
  { code: "B.TECH", name: "CSE (Minor: Cyber Security)", issuer: "Sanjay Ghodawat University · 2019–2023", color: "#ce93d8" },
];

const UPSKILLING = [
  { icon: "🤖", label: "AI & LLM Security", status: "IN PROGRESS", color: "#ff8a65" },
  { icon: "☁️", label: "AWS Cloud Security (IAM, GuardDuty, CloudTrail)", status: "IN PROGRESS", color: "#4fc3f7" },
  { icon: "📊", label: "Microsoft Sentinel & KQL", status: "IN PROGRESS", color: "#ffd700" },
  { icon: "🎯", label: "AZ-500 Azure Security Engineer", status: "PLANNED", color: "#ce93d8" },
  { icon: "🔬", label: "CompTIA CySA+ / BTL1", status: "PLANNED", color: "#80cbc4" },
  { icon: "🛡️", label: "(ISC)² CC Certification", status: "PLANNED", color: "#00ff9d" },
];

const LAB = [
  { tool: "VirtualBox", role: "Hypervisor" },
  { tool: "Kali Linux", role: "Attack Platform" },
  { tool: "Security Onion", role: "NSM + Detection" },
  { tool: "Wazuh", role: "SIEM / HIDS" },
  { tool: "ELK Stack", role: "Log Analytics" },
  { tool: "Suricata", role: "IDS / IPS" },
  { tool: "Metasploitable 2", role: "Vuln Target" },
];

const NAV = ["PROFILE", "SKILLS", "EXPERIENCE", "INCIDENT", "CERTS", "LAB", "CONTACT"];

// ─── TYPEWRITER ───────────────────────────────────────────────────────────────
function Typewriter({ text, delay = 0, speed = 38 }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;
    const t = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), speed);
    return () => clearTimeout(t);
  }, [started, displayed, text, speed]);
  return <span>{displayed}<span style={{ opacity: displayed.length < text.length ? 1 : 0, color: "#00ff9d" }}>█</span></span>;
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("PROFILE");
  const [hoveredSkillCat, setHoveredSkillCat] = useState(null);
  const [incidentStep, setIncidentStep] = useState(null);
  const [booted, setBooted] = useState(false);
  const sectionRefs = useRef({});

  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 600);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (id) => {
    setActiveSection(id);
    const el = sectionRefs.current[id];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActiveSection(e.target.dataset.section)),
      { threshold: 0.3 }
    );
    Object.values(sectionRefs.current).forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, [booted]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#050d14",
      fontFamily: "'IBM Plex Mono', monospace",
      color: "#c8d6e5",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600;700&family=Rajdhani:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050d14; }
        ::-webkit-scrollbar-thumb { background: #00ff9d33; border-radius: 2px; }
        .grid-bg {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image: linear-gradient(rgba(0,255,157,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,157,0.025) 1px, transparent 1px);
          background-size: 44px 44px;
        }
        .scan {
          position: fixed; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, #00ff9d66, transparent);
          animation: scanDown 6s linear infinite; pointer-events: none; z-index: 999;
        }
        @keyframes scanDown { from { transform: translateY(-2px); } to { transform: translateY(100vh); } }
        .nav-item { cursor: pointer; transition: all 0.15s; }
        .nav-item:hover { color: #00ff9d !important; }
        section { scroll-margin-top: 60px; }
        .skill-tag { transition: all 0.15s; cursor: default; }
        .skill-tag:hover { transform: translateY(-1px); }
        .step-card { transition: all 0.2s; cursor: pointer; }
        .step-card:hover { transform: translateX(4px); }
        .cert-card { transition: all 0.2s; }
        .cert-card:hover { transform: translateY(-3px); }
        .lab-row { transition: all 0.15s; }
        .lab-row:hover { background: rgba(0,255,157,0.04) !important; }
        .link-btn { transition: all 0.15s; cursor: pointer; text-decoration: none; }
        .link-btn:hover { filter: brightness(1.3); }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        .fade-up { animation: fadeUp 0.5s ease both; }
        .blink { animation: pulse 1.8s ease infinite; }
      `}</style>

      <div className="grid-bg" />
      <div className="scan" />

      {/* ── NAVBAR ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(5,13,20,0.92)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid #0d2233",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px", height: 48,
      }}>
        <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 15, color: "#00ff9d", letterSpacing: "0.15em" }}>
          SK<span style={{ color: "#4fc3f7" }}>::</span>PORTFOLIO
        </div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {NAV.map(n => (
            <div key={n} className="nav-item" onClick={() => scrollTo(n)} style={{
              padding: "6px 10px", fontSize: 9, letterSpacing: "0.15em",
              color: activeSection === n ? "#00ff9d" : "#3a5068",
              borderBottom: activeSection === n ? "1px solid #00ff9d" : "1px solid transparent",
            }}>{n}</div>
          ))}
        </div>
        <div style={{ fontSize: 9, color: "#1a3348" }}>
          <span className="blink" style={{ color: "#00ff9d" }}>●</span> ONLINE
        </div>
      </nav>

      <div style={{ paddingTop: 48, position: "relative", zIndex: 1 }}>

        {/* ══ HERO / PROFILE ══════════════════════════════════════════════════ */}
        <section ref={el => sectionRefs.current["PROFILE"] = el} data-section="PROFILE"
          style={{ minHeight: "92vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 28px 40px" }}>
          <div style={{ maxWidth: 800 }}>
            <div className="fade-up" style={{ fontSize: 10, color: "#00ff9d", letterSpacing: "0.4em", marginBottom: 12 }}>
              ▶ INITIALIZING PROFILE // ANALYST_ID: SK-294
            </div>
            <div className="fade-up" style={{ animationDelay: "0.1s", fontFamily: "'Rajdhani', sans-serif", fontSize: "clamp(36px, 7vw, 64px)", fontWeight: 700, lineHeight: 1, color: "#fff", marginBottom: 10 }}>
              SHUBHAM<br /><span style={{ color: "#00ff9d" }}>KAPASE</span>
            </div>
            <div className="fade-up" style={{ animationDelay: "0.2s", fontFamily: "'Rajdhani', sans-serif", fontSize: 18, color: "#4fc3f7", letterSpacing: "0.1em", marginBottom: 20 }}>
              {booted && <Typewriter text="CYBERSECURITY ANALYST // SOC & EDR // IAM & CLOUD" delay={400} speed={32} />}
            </div>
            <div className="fade-up" style={{ animationDelay: "0.35s", fontSize: 12, color: "#7a9aaf", lineHeight: 1.8, maxWidth: 640, marginBottom: 28 }}>
              Security Analyst with 1.5+ years in SOC operations, endpoint detection & response, vulnerability management, and Microsoft 365 security across 300+ enterprise endpoints. CEH-certified with hands-on expertise in MITRE ATT&CK, CVSS v3, Entra ID threat detection, and Zero Trust access enforcement.
            </div>
            <div className="fade-up" style={{ animationDelay: "0.45s", display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
              {[
                { label: "50+", sub: "Alerts/Month Triaged" },
                { label: "300+", sub: "Endpoints Secured" },
                { label: "95%+", sub: "Patch Compliance" },
                { label: "200+", sub: "Accounts Managed" },
              ].map(s => (
                <div key={s.label} style={{
                  background: "rgba(0,255,157,0.05)",
                  border: "1px solid rgba(0,255,157,0.15)",
                  borderRadius: 6, padding: "12px 18px", textAlign: "center"
                }}>
                  <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 28, fontWeight: 700, color: "#00ff9d" }}>{s.label}</div>
                  <div style={{ fontSize: 9, color: "#3a5068", letterSpacing: "0.1em", marginTop: 2 }}>{s.sub}</div>
                </div>
              ))}
            </div>
            <div className="fade-up" style={{ animationDelay: "0.55s", display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[
                { label: "📍 Pune, Maharashtra", color: "#3a5068" },
                { label: "✉ Shubhamkapase294@gmail.com", color: "#4fc3f7", href: "mailto:Shubhamkapase294@gmail.com" },
                { label: "🔗 LinkedIn", color: "#4fc3f7", href: "https://linkedin.com/in/shubham-kapase-ba548018a" },
                { label: "📞 7083043648", color: "#3a5068" },
              ].map(c => (
                c.href
                  ? <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className="link-btn" style={{
                    padding: "6px 14px", border: "1px solid #1a3348", borderRadius: 4,
                    fontSize: 11, color: c.color, background: "rgba(79,195,247,0.05)"
                  }}>{c.label}</a>
                  : <div key={c.label} style={{
                    padding: "6px 14px", border: "1px solid #1a3348", borderRadius: 4,
                    fontSize: 11, color: c.color
                  }}>{c.label}</div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ SKILLS ══════════════════════════════════════════════════════════ */}
        <section ref={el => sectionRefs.current["SKILLS"] = el} data-section="SKILLS"
          style={{ padding: "60px 28px" }}>
          <SectionHeader label="TECHNICAL SKILLS" index="02" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14, marginTop: 24 }}>
            {SKILLS.map(s => (
              <div key={s.cat}
                onMouseEnter={() => setHoveredSkillCat(s.cat)}
                onMouseLeave={() => setHoveredSkillCat(null)}
                style={{
                  background: hoveredSkillCat === s.cat ? `${s.color}08` : "rgba(255,255,255,0.02)",
                  border: `1px solid ${hoveredSkillCat === s.cat ? s.color + "44" : "#1a3348"}`,
                  borderLeft: `3px solid ${s.color}`,
                  borderRadius: 6, padding: "16px",
                  transition: "all 0.2s"
                }}>
                <div style={{ fontSize: 9, color: s.color, letterSpacing: "0.2em", marginBottom: 12, fontFamily: "'Rajdhani', sans-serif", fontWeight: 600 }}>
                  {s.cat}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {s.items.map(item => (
                    <div key={item} className="skill-tag" style={{
                      fontSize: 10, padding: "3px 10px", borderRadius: 3,
                      background: `${s.color}11`, border: `1px solid ${s.color}33`, color: s.color
                    }}>{item}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ EXPERIENCE ══════════════════════════════════════════════════════ */}
        <section ref={el => sectionRefs.current["EXPERIENCE"] = el} data-section="EXPERIENCE"
          style={{ padding: "60px 28px" }}>
          <SectionHeader label="WORK EXPERIENCE" index="03" />
          {EXPERIENCE.map(exp => (
            <div key={exp.role} style={{ marginTop: 24, maxWidth: 820 }}>
              <div style={{
                background: "rgba(0,255,157,0.04)", border: "1px solid rgba(0,255,157,0.2)",
                borderLeft: "3px solid #00ff9d", borderRadius: 6, padding: "20px 22px"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 6 }}>
                  <div>
                    <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 20, fontWeight: 700, color: "#fff", letterSpacing: "0.05em" }}>{exp.role}</div>
                    <div style={{ fontSize: 12, color: "#4fc3f7", marginTop: 2 }}>{exp.company} · {exp.location}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                    <div style={{ fontSize: 10, color: "#00ff9d", background: "rgba(0,255,157,0.1)", padding: "3px 10px", borderRadius: 10, border: "1px solid rgba(0,255,157,0.3)" }}>
                      <span className="blink">●</span> {exp.type}
                    </div>
                    <div style={{ fontSize: 10, color: "#3a5068" }}>{exp.period}</div>
                  </div>
                </div>
                <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                  {exp.bullets.map((b, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ color: "#00ff9d", fontSize: 10, marginTop: 2, flexShrink: 0 }}>▸</span>
                      <span style={{ fontSize: 11, color: "#9ab5c9", lineHeight: 1.7 }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* ══ INCIDENT ════════════════════════════════════════════════════════ */}
        <section ref={el => sectionRefs.current["INCIDENT"] = el} data-section="INCIDENT"
          style={{ padding: "60px 28px" }}>
          <SectionHeader label="KEY INCIDENT EXPERIENCE" index="04" />
          <div style={{ marginTop: 24, maxWidth: 820 }}>
            <div style={{
              background: "rgba(255,107,107,0.04)", border: "1px solid rgba(255,107,107,0.2)",
              borderLeft: "3px solid #ff6b6b", borderRadius: 6, padding: "20px 22px", marginBottom: 20
            }}>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 18, fontWeight: 700, color: "#ff6b6b", letterSpacing: "0.05em" }}>
                {INCIDENT.title}
              </div>
              <div style={{ fontSize: 10, color: "#3a5068", marginTop: 4 }}>TOOL: {INCIDENT.tool} · SEVERITY: HIGH · STATUS: RESOLVED</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 10 }}>
              {INCIDENT.steps.map((s, i) => (
                <div key={s.step} className="step-card"
                  onClick={() => setIncidentStep(incidentStep === i ? null : i)}
                  style={{
                    background: incidentStep === i ? "rgba(255,107,107,0.08)" : "rgba(255,255,255,0.02)",
                    border: `1px solid ${incidentStep === i ? "rgba(255,107,107,0.5)" : "#1a3348"}`,
                    borderTop: `2px solid ${incidentStep === i ? "#ff6b6b" : "#1a3348"}`,
                    borderRadius: 6, padding: "14px",
                  }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6 }}>
                    <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 22, fontWeight: 700, color: incidentStep === i ? "#ff6b6b" : "#3a5068" }}>
                      {s.step}
                    </div>
                    <div style={{ fontSize: 9, color: incidentStep === i ? "#ff6b6b" : "#3a5068", letterSpacing: "0.15em" }}>{s.label}</div>
                  </div>
                  {incidentStep === i && (
                    <div style={{ fontSize: 11, color: "#9ab5c9", lineHeight: 1.6, animation: "fadeUp 0.2s ease" }}>{s.desc}</div>
                  )}
                  {incidentStep !== i && (
                    <div style={{ fontSize: 10, color: "#1a3348" }}>Click to expand</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CERTS ════════════════════════════════════════════════════════════ */}
        <section ref={el => sectionRefs.current["CERTS"] = el} data-section="CERTS"
          style={{ padding: "60px 28px" }}>
          <SectionHeader label="CERTIFICATIONS & EDUCATION" index="05" />
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
            {CERTS.map(c => (
              <div key={c.code} className="cert-card" style={{
                background: `${c.color}08`, border: `1px solid ${c.color}33`,
                borderTop: `3px solid ${c.color}`, borderRadius: 6,
                padding: "16px 18px", minWidth: 180, maxWidth: 220
              }}>
                <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 22, fontWeight: 700, color: c.color, letterSpacing: "0.1em" }}>{c.code}</div>
                <div style={{ fontSize: 11, color: "#c8d6e5", marginTop: 4, lineHeight: 1.4 }}>{c.name}</div>
                <div style={{ fontSize: 9, color: "#3a5068", marginTop: 8 }}>{c.issuer}</div>
              </div>
            ))}
          </div>

          {/* UPSKILLING */}
          <div style={{ marginTop: 36 }}>
            <div style={{ fontSize: 10, color: "#4fc3f7", letterSpacing: "0.2em", marginBottom: 16 }}>⟩ CURRENTLY UPSKILLING</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 8 }}>
              {UPSKILLING.map(u => (
                <div key={u.label} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  background: "rgba(255,255,255,0.02)", border: "1px solid #1a3348",
                  borderRadius: 6, padding: "10px 14px"
                }}>
                  <span style={{ fontSize: 16 }}>{u.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, color: "#c8d6e5" }}>{u.label}</div>
                  </div>
                  <div style={{
                    fontSize: 8, padding: "2px 8px", borderRadius: 10, letterSpacing: "0.1em",
                    background: u.status === "IN PROGRESS" ? `${u.color}22` : "rgba(255,255,255,0.03)",
                    border: `1px solid ${u.status === "IN PROGRESS" ? u.color + "55" : "#1a3348"}`,
                    color: u.status === "IN PROGRESS" ? u.color : "#3a5068"
                  }}>{u.status}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ HOME LAB ══════════════════════════════════════════════════════════ */}
        <section ref={el => sectionRefs.current["LAB"] = el} data-section="LAB"
          style={{ padding: "60px 28px" }}>
          <SectionHeader label="HOME SOC LAB" index="06" />
          <div style={{ marginTop: 24, maxWidth: 600 }}>
            <div style={{
              background: "rgba(79,195,247,0.04)", border: "1px solid rgba(79,195,247,0.15)",
              borderRadius: 6, padding: "8px 0", overflow: "hidden"
            }}>
              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr",
                borderBottom: "1px solid #1a3348", padding: "8px 16px",
                fontSize: 9, color: "#3a5068", letterSpacing: "0.2em"
              }}>
                <span>TOOL</span><span>FUNCTION</span>
              </div>
              {LAB.map((l, i) => (
                <div key={l.tool} className="lab-row" style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr",
                  padding: "10px 16px",
                  borderBottom: i < LAB.length - 1 ? "1px solid #0d2233" : "none",
                  background: "transparent"
                }}>
                  <span style={{ fontSize: 11, color: "#4fc3f7", fontWeight: 500 }}>{l.tool}</span>
                  <span style={{ fontSize: 11, color: "#5a8299" }}>{l.role}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14, fontSize: 10, color: "#3a5068", lineHeight: 1.8 }}>
              ⟩ Active 30-day study plan: Log analysis → Detection engineering → Incident response simulation → CTF consolidation
            </div>
          </div>
        </section>

        {/* ══ CONTACT ═══════════════════════════════════════════════════════════ */}
        <section ref={el => sectionRefs.current["CONTACT"] = el} data-section="CONTACT"
          style={{ padding: "60px 28px 80px" }}>
          <SectionHeader label="CONTACT" index="07" />
          <div style={{ marginTop: 24, maxWidth: 540 }}>
            <div style={{
              background: "rgba(0,255,157,0.03)", border: "1px solid rgba(0,255,157,0.15)",
              borderRadius: 6, padding: "24px"
            }}>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 13, color: "#00ff9d", letterSpacing: "0.1em", marginBottom: 20 }}>
                OPEN TO OPPORTUNITIES
              </div>
              {[
                { label: "EMAIL", value: "Shubhamkapase294@gmail.com", href: "mailto:Shubhamkapase294@gmail.com" },
                { label: "PHONE", value: "+91 7083043648", href: "tel:+917083043648" },
                { label: "LINKEDIN", value: "linkedin.com/in/shubham-kapase-ba548018a", href: "https://linkedin.com/in/shubham-kapase-ba548018a" },
                { label: "LOCATION", value: "Pune, Maharashtra, India", href: null },
              ].map(c => (
                <div key={c.label} style={{ display: "flex", gap: 16, padding: "10px 0", borderBottom: "1px solid #0d2233", alignItems: "center" }}>
                  <div style={{ fontSize: 9, color: "#3a5068", letterSpacing: "0.2em", minWidth: 80 }}>{c.label}</div>
                  {c.href
                    ? <a href={c.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: "#4fc3f7", textDecoration: "none" }} className="link-btn">{c.value}</a>
                    : <span style={{ fontSize: 11, color: "#7a9aaf" }}>{c.value}</span>
                  }
                </div>
              ))}
              <div style={{ marginTop: 20, display: "flex", gap: 10, flexWrap: "wrap" }}>
                {["SOC L1/L2", "IAM Analyst", "Endpoint Security", "Microsoft 365 Security"].map(tag => (
                  <div key={tag} style={{
                    fontSize: 9, padding: "4px 10px", borderRadius: 3, letterSpacing: "0.1em",
                    background: "rgba(0,255,157,0.08)", border: "1px solid rgba(0,255,157,0.2)", color: "#00ff9d"
                  }}>{tag}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* FOOTER */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "rgba(5,13,20,0.95)", backdropFilter: "blur(10px)",
        borderTop: "1px solid #0d2233",
        padding: "7px 24px",
        display: "flex", justifyContent: "space-between",
        fontSize: 9, color: "#1a3348", zIndex: 100
      }}>
        <span style={{ color: "#2a4058" }}>SHUBHAM KAPASE // SECURITY_ANALYST // CEH·CAP·CNSP</span>
        <span style={{ color: "#2a4058" }}>PUNE, INDIA // OPEN_TO_WORK</span>
        <span><span className="blink" style={{ color: "#00ff9d" }}>●</span> <span style={{ color: "#1a3348" }}>PORTFOLIO_v1.0</span></span>
      </div>
    </div>
  );
}

// ─── SECTION HEADER ───────────────────────────────────────────────────────────
function SectionHeader({ label, index }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 11, color: "#00ff9d", letterSpacing: "0.3em" }}>
        [{index}]
      </div>
      <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 20, fontWeight: 700, color: "#fff", letterSpacing: "0.15em" }}>
        {label}
      </div>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, #1a3348, transparent)" }} />
    </div>
  );
}
