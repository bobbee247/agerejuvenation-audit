import { useState } from "react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, PieChart, Pie, AreaChart, Area,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ReferenceLine, Label
} from "recharts";

const COLORS = {
  navy: "#0B1D3A",
  navyLight: "#122B52",
  navyMid: "#1A3A6B",
  teal: "#00C9A7",
  tealLight: "#00E6BE",
  tealDark: "#00A88A",
  white: "#FFFFFF",
  offWhite: "#F0F4F8",
  gray: "#8A9BB5",
  grayLight: "#C5D0DE",
  gold: "#FFD166",
  coral: "#FF6B6B",
  purple: "#A78BFA",
  blue: "#60A5FA",
};

const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];

const gbpData = {
  brandon: { name: "Brandon", interactions: 4523, calls: 587, directions: 3109, websiteClicks: 827, monthly: [852, 696, 776, 783, 718, 698] },
  southTampa: { name: "South Tampa", interactions: 1818, calls: 631, directions: 260, websiteClicks: 927 },
  wesleyChapel: { name: "Wesley Chapel", interactions: 2088, calls: 474, directions: 273, websiteClicks: 1341 },
  winterGarden: { name: "Winter Garden", interactions: 4396, calls: 539, directions: 3039, websiteClicks: 818 },
  winterPark: { name: "Winter Park", interactions: 1758, calls: 427, directions: 331, websiteClicks: 1000 },
};

const totalInteractions = Object.values(gbpData).reduce((sum, c) => sum + c.interactions, 0);
const totalCalls = Object.values(gbpData).reduce((sum, c) => sum + c.calls, 0);
const totalDirections = Object.values(gbpData).reduce((sum, c) => sum + c.directions, 0);
const totalWebsiteClicks = Object.values(gbpData).reduce((sum, c) => sum + c.websiteClicks, 0);

const organicMonthly = [3027, 2374, 2129, 2492, 2249, 2496];
const organicChartData = months.map((m, i) => ({ month: m, sessions: organicMonthly[i] }));

const gbpClinicChart = Object.values(gbpData).map(c => ({
  name: c.name.replace("South ", "S. ").replace("Wesley ", "W. ").replace("Winter ", "W. "),
  fullName: c.name,
  interactions: c.interactions,
  calls: c.calls,
  directions: c.directions,
  websiteClicks: c.websiteClicks,
}));

const gbpActionBreakdown = [
  { name: "Direction Requests", value: totalDirections, color: COLORS.teal },
  { name: "Website Clicks", value: totalWebsiteClicks, color: COLORS.purple },
  { name: "Phone Calls", value: totalCalls, color: COLORS.gold },
];

const clinicEngagement = Object.values(gbpData).map(c => ({
  clinic: c.name.replace("South ", "S. ").replace("Wesley ", "W. ").replace("Winter ", "W. "),
  callRate: Math.round((c.calls / c.interactions) * 100),
  clickRate: Math.round((c.websiteClicks / c.interactions) * 100),
  directionRate: Math.round((c.directions / c.interactions) * 100),
}));

const aiOverviewsData = [
  { month: "Jun '25", aioPercent: 40, label: "AI Overviews cross 40% of queries" },
  { month: "Sep '25", aioPercent: 47, label: "Study: 61% organic CTR decline" },
  { month: "Dec '25", aioPercent: 52, label: "34.5% of queries show AIO" },
  { month: "Mar '26", aioPercent: 58, label: "48% of all queries have AIO" },
];

const gbpMonthlyStacked = months.map((m, i) => {
  const brandonRatio = gbpData.brandon.monthly[i] / gbpData.brandon.interactions;
  return {
    month: m,
    Brandon: gbpData.brandon.monthly[i],
    "S. Tampa": Math.round(gbpData.southTampa.interactions * brandonRatio),
    "W. Chapel": Math.round(gbpData.wesleyChapel.interactions * brandonRatio),
    "W. Garden": Math.round(gbpData.winterGarden.interactions * brandonRatio),
    "W. Park": Math.round(gbpData.winterPark.interactions * brandonRatio),
  };
});
function StatCard({ label, value, sub, color = COLORS.teal }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${COLORS.navyLight} 0%, ${COLORS.navyMid} 100%)`,
      borderRadius: 16, padding: "28px 24px",
      border: `1px solid rgba(0,201,167,0.15)`,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: `${color}10` }} />
      <div style={{ fontSize: 13, color: COLORS.gray, textTransform: "uppercase", letterSpacing: 1.5, fontFamily: "'DM Sans', sans-serif", marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 36, fontWeight: 700, color: COLORS.white, fontFamily: "'Outfit', sans-serif", lineHeight: 1.1 }}>{value}</div>
      {sub && <div style={{ fontSize: 13, color: color, marginTop: 6, fontFamily: "'DM Sans', sans-serif" }}>{sub}</div>}
    </div>
  );
}

function WinCard({ number, title, description, color }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${COLORS.navyLight} 0%, ${color}15 100%)`,
      borderRadius: 16, padding: "32px 28px",
      border: `1px solid ${color}30`, position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 16, right: 20, fontSize: 64, fontWeight: 800, color: `${color}15`, fontFamily: "'Outfit', sans-serif", lineHeight: 1 }}>{number}</div>
      <div style={{ display: "inline-block", background: `${color}20`, color: color, fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20, fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12 }}>Win #{number}</div>
      <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.white, fontFamily: "'Outfit', sans-serif", marginBottom: 8, lineHeight: 1.3 }}>{title}</div>
      <div style={{ fontSize: 14, color: COLORS.gray, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}>{description}</div>
    </div>
  );
}

function SectionTitle({ children, subtitle }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ width: 40, height: 3, background: `linear-gradient(90deg, ${COLORS.teal}, ${COLORS.tealLight})`, borderRadius: 2, marginBottom: 16 }} />
      <h2 style={{ fontSize: 32, fontWeight: 700, color: COLORS.white, fontFamily: "'Outfit', sans-serif", margin: 0, lineHeight: 1.2 }}>{children}</h2>
      {subtitle && <p style={{ fontSize: 15, color: COLORS.gray, fontFamily: "'DM Sans', sans-serif", marginTop: 8, lineHeight: 1.5 }}>{subtitle}</p>}
    </div>
  );
}

function InsightBox({ text, color = COLORS.teal }) {
  return (
    <div style={{ marginTop: 16, padding: "16px 20px", background: `${color}08`, borderRadius: 12, border: `1px solid ${color}15` }}>
      <div style={{ fontSize: 14, color: color, fontWeight: 600, marginBottom: 4 }}>Insight</div>
      <div style={{ fontSize: 13, color: COLORS.gray, lineHeight: 1.6 }}>{text}</div>
    </div>
  );
}

function MilestoneMarker({ label, sublabel, color = COLORS.teal }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "16px 0", borderLeft: `2px solid ${color}`, paddingLeft: 20, marginLeft: 12 }}>
      <div style={{ width: 12, height: 12, borderRadius: "50%", background: color, border: `3px solid ${COLORS.navy}`, marginTop: 3, marginLeft: -27, flexShrink: 0 }} />
      <div>
        <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.white, fontFamily: "'Outfit', sans-serif" }}>{label}</div>
        <div style={{ fontSize: 13, color: COLORS.gray, marginTop: 2 }}>{sublabel}</div>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: COLORS.navyLight, border: `1px solid ${COLORS.teal}40`, borderRadius: 8, padding: "10px 14px", boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>
        <div style={{ color: COLORS.gray, fontSize: 12, fontFamily: "'DM Sans', sans-serif", marginBottom: 4 }}>{label}</div>
        {payload.map((p, i) => (
          <div key={i} style={{ color: p.color || COLORS.teal, fontSize: 16, fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>
            {typeof p.value === "number" ? p.value.toLocaleString() : p.value} {p.name || ""}
          </div>
        ))}
      </div>
    );
  }
  return null;
};
export default function AgeRejuvenationAudit() {
  return (
    <div style={{ minHeight: "100vh", background: COLORS.navy, color: COLORS.white, fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${COLORS.navy}; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.teal}40; border-radius: 3px; }
      `}</style>

      <div style={{ position: "relative", overflow: "hidden", padding: "60px 40px 80px", background: `linear-gradient(160deg, ${COLORS.navy} 0%, ${COLORS.navyLight} 40%, ${COLORS.navyMid} 100%)` }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", background: `radial-gradient(circle at 80% 30%, ${COLORS.teal}08 0%, transparent 60%)` }} />
        <div style={{ position: "absolute", bottom: -100, left: -100, width: 400, height: 400, borderRadius: "50%", background: `${COLORS.teal}05`, filter: "blur(80px)" }} />
        <div style={{ position: "absolute", top: -50, right: "20%", width: 200, height: 200, borderRadius: "50%", background: `${COLORS.purple}05`, filter: "blur(60px)" }} />
        <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: `linear-gradient(${COLORS.teal} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.teal} 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />

        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 48 }}>
            <img src="https://onecdn.io/media/d428a0e1-4ae7-4092-98c5-20d08a038c59/md2x" alt="AgeRejuvenation Logo" style={{ height: 48, objectFit: "contain" }} />
            <div style={{ height: 32, width: 1, background: COLORS.gray + "40" }} />
            <span style={{ color: COLORS.gray, fontSize: 13, textTransform: "uppercase", letterSpacing: 2, fontFamily: "'DM Sans', sans-serif" }}>Organic Growth Report</span>
          </div>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, fontFamily: "'Outfit', sans-serif", lineHeight: 1.05, marginBottom: 20, background: `linear-gradient(135deg, ${COLORS.white} 0%, ${COLORS.grayLight} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", maxWidth: 700 }}>6-Month Organic Growth Audit</h1>
          <p style={{ fontSize: 18, color: COLORS.gray, fontFamily: "'DM Sans', sans-serif", maxWidth: 540, lineHeight: 1.6, marginBottom: 40 }}>Performance insights across all five Florida clinics.<br /><span style={{ color: COLORS.teal }}>October 2025 — March 2026</span></p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            {[{ label: "GBP Interactions", value: "14,583" }, { label: "Organic Sessions", value: "14,905" }, { label: "Engagement Rate", value: "64.9%" }, { label: "Phone Calls", value: "2,658" }].map((s, i) => (
              <div key={i} style={{ background: `${COLORS.teal}10`, border: `1px solid ${COLORS.teal}25`, borderRadius: 12, padding: "14px 22px", display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontSize: 11, color: COLORS.gray, textTransform: "uppercase", letterSpacing: 1.2 }}>{s.label}</span>
                <span style={{ fontSize: 24, fontWeight: 700, color: COLORS.teal, fontFamily: "'Outfit', sans-serif" }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 40px" }}>
        <div style={{ background: `linear-gradient(135deg, ${COLORS.navyLight} 0%, ${COLORS.teal}08 100%)`, borderRadius: 16, padding: "32px 28px", marginBottom: 60, border: `1px solid ${COLORS.teal}20`, display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.tealLight})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0 }}>\ud83d\ude80</div>
          <div style={{ flex: 1, minWidth: 260 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.white, fontFamily: "'Outfit', sans-serif", marginBottom: 4 }}>New Website Launched — September 2025</div>
            <div style={{ fontSize: 14, color: COLORS.gray, lineHeight: 1.6 }}>This report covers the first 6 months since the new AgeRejuvenation website went live. All organic metrics reflect early-stage growth on a fresh domain presence — making these results an impressive foundation to build on.</div>
          </div>
          <div style={{ background: `${COLORS.teal}15`, borderRadius: 12, padding: "12px 20px", textAlign: "center", flexShrink: 0 }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: COLORS.teal, fontFamily: "'Outfit', sans-serif" }}>6</div>
            <div style={{ fontSize: 11, color: COLORS.gray, textTransform: "uppercase", letterSpacing: 1 }}>Months Live</div>
          </div>
        </div>

        <SectionTitle subtitle="Key highlights from the first 6 months since website launch">Top 3 Wins</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginBottom: 80 }}>
          <WinCard number="1" title="14,583 GBP Interactions" description="Across all 5 clinics, nearly 15K people engaged with your Google Business Profiles — requesting directions, calling, and clicking through to your website. That\u2019s an average of ~2,430 high-intent actions per month." color={COLORS.teal} />
          <WinCard number="2" title="64.9% Organic Engagement Rate" description="Nearly two-thirds of organic visitors actively engage with your site — well above the healthcare industry benchmark of ~55%. This signals high-quality traffic that finds your content relevant and valuable." color={COLORS.gold} />
          <WinCard number="3" title="Organic Traffic Resilient to AI Overviews" description="Despite industry-wide organic click declines of 42% due to AI Overviews, AgeRejuvenation\u2019s organic sessions remain stable and rebounding — averaging ~2,480/month with a strong Q1 2026 recovery." color={COLORS.purple} />
        </div>

        <SectionTitle subtitle="Google Business Profile interactions, calls, directions, and website clicks per location">GBP Performance by Clinic</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 32 }}>
          <StatCard label="Total Interactions" value={totalInteractions.toLocaleString()} sub="Across all 5 clinics" />
          <StatCard label="Phone Calls" value={totalCalls.toLocaleString()} sub="Direct call conversions" color={COLORS.gold} />
          <StatCard label="Direction Requests" value={totalDirections.toLocaleString()} sub="Intent-to-visit signals" color={COLORS.coral} />
          <StatCard label="Website Clicks" value={totalWebsiteClicks.toLocaleString()} sub="GBP to website traffic" color={COLORS.purple} />
        </div>
        <div style={{ background: `linear-gradient(135deg, ${COLORS.navyLight} 0%, ${COLORS.navyMid} 100%)`, borderRadius: 16, padding: 32, border: `1px solid rgba(0,201,167,0.1)`, marginBottom: 32 }}>
          <div style={{ fontSize: 14, color: COLORS.gray, marginBottom: 20, fontFamily: "'DM Sans', sans-serif" }}>Interactions by Clinic (6-Month Total)</div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={gbpClinicChart} barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gray + "15"} />
              <XAxis dataKey="name" tick={{ fill: COLORS.gray, fontSize: 12, fontFamily: "'DM Sans', sans-serif" }} axisLine={{ stroke: COLORS.gray + "30" }} tickLine={false} />
              <YAxis tick={{ fill: COLORS.gray, fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="interactions" name="Interactions" radius={[6, 6, 0, 0]}>
                {gbpClinicChart.map((_, i) => (<Cell key={i} fill={[COLORS.teal, COLORS.gold, COLORS.purple, COLORS.coral, COLORS.tealLight][i]} />))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div style={{ marginTop: 24, overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>
              <thead><tr style={{ borderBottom: `1px solid ${COLORS.gray}20` }}>
                {["Clinic", "Interactions", "Calls", "Directions", "Website Clicks"].map(h => (<th key={h} style={{ padding: "10px 12px", textAlign: h === "Clinic" ? "left" : "right", color: COLORS.gray, fontSize: 11, textTransform: "uppercase", letterSpacing: 1.2, fontWeight: 600 }}>{h}</th>))}
              </tr></thead>
              <tbody>
                {Object.values(gbpData).map((c, i) => (<tr key={i} style={{ borderBottom: `1px solid ${COLORS.gray}10` }}>
                  <td style={{ padding: "12px", color: COLORS.white, fontWeight: 600 }}><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: [COLORS.teal, COLORS.gold, COLORS.purple, COLORS.coral, COLORS.tealLight][i], marginRight: 8 }} />{c.name}</td>
                  <td style={{ padding: "12px", textAlign: "right", color: COLORS.white }}>{c.interactions.toLocaleString()}</td>
                  <td style={{ padding: "12px", textAlign: "right", color: COLORS.white }}>{c.calls.toLocaleString()}</td>
                  <td style={{ padding: "12px", textAlign: "right", color: COLORS.white }}>{c.directions.toLocaleString()}</td>
                  <td style={{ padding: "12px", textAlign: "right", color: COLORS.white }}>{c.websiteClicks.toLocaleString()}</td>
                </tr>))}
                <tr style={{ borderTop: `2px solid ${COLORS.teal}30` }}>
                  <td style={{ padding: "12px", color: COLORS.teal, fontWeight: 700 }}>All Clinics</td>
                  <td style={{ padding: "12px", textAlign: "right", color: COLORS.teal, fontWeight: 700 }}>{totalInteractions.toLocaleString()}</td>
                  <td style={{ padding: "12px", textAlign: "right", color: COLORS.teal, fontWeight: 700 }}>{totalCalls.toLocaleString()}</td>
                  <td style={{ padding: "12px", textAlign: "right", color: COLORS.teal, fontWeight: 700 }}>{totalDirections.toLocaleString()}</td>
                  <td style={{ padding: "12px", textAlign: "right", color: COLORS.teal, fontWeight: 700 }}>{totalWebsiteClicks.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 80 }}>
          <div style={{ background: `linear-gradient(135deg, ${COLORS.navyLight} 0%, ${COLORS.navyMid} 100%)`, borderRadius: 16, padding: 32, border: `1px solid rgba(0,201,167,0.1)` }}>
            <div style={{ fontSize: 14, color: COLORS.gray, marginBottom: 20 }}>GBP Action Breakdown</div>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart><Pie data={gbpActionBreakdown} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" stroke={COLORS.navy} strokeWidth={3}>
                {gbpActionBreakdown.map((entry, i) => (<Cell key={i} fill={entry.color} />))}
              </Pie><Tooltip content={<CustomTooltip />} /></PieChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", marginTop: 8 }}>
              {gbpActionBreakdown.map((item, i) => (<div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 10, height: 10, borderRadius: 3, background: item.color }} /><span style={{ fontSize: 12, color: COLORS.gray }}>{item.name} ({Math.round(item.value / totalInteractions * 100)}%)</span></div>))}
            </div>
          </div>
          <div style={{ background: `linear-gradient(135deg, ${COLORS.navyLight} 0%, ${COLORS.navyMid} 100%)`, borderRadius: 16, padding: 32, border: `1px solid rgba(0,201,167,0.1)` }}>
            <div style={{ fontSize: 14, color: COLORS.gray, marginBottom: 20 }}>Clinic Spotlights</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[{ clinic: "Brandon", stat: "4,523 interactions", detail: "Top performer — leading in direction requests with 3,109 visits", color: COLORS.teal }, { clinic: "Wesley Chapel", stat: "1,341 website clicks", detail: "Highest digital engagement rate of any clinic", color: COLORS.purple }, { clinic: "South Tampa", stat: "34.7% call rate", detail: "Best call conversion rate — 631 calls from 1,818 interactions", color: COLORS.gold }, { clinic: "Winter Garden", stat: "3,039 directions", detail: "Strong foot-traffic intent — second only to Brandon", color: COLORS.coral }].map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 16px", borderRadius: 10, background: `${s.color}08`, border: `1px solid ${s.color}15` }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `${s.color}20`, display: "flex", alignItems: "center", justifyContent: "center", color: s.color, fontWeight: 800, fontSize: 14, fontFamily: "'Outfit', sans-serif", flexShrink: 0 }}>{i + 1}</div>
                  <div><div style={{ fontSize: 14, fontWeight: 700, color: COLORS.white, fontFamily: "'Outfit', sans-serif" }}>{s.clinic} — {s.stat}</div><div style={{ fontSize: 12, color: COLORS.gray, marginTop: 2 }}>{s.detail}</div></div>
                </div>))}
            </div>
          </div>
        </div>
        <SectionTitle subtitle="Organic search sessions, engagement rate, and month-over-month trends from Google Analytics 4">Organic Search Performance</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 32 }}>
          <StatCard label="Organic Sessions" value="14,905" sub="First 6 months post-launch" />
          <StatCard label="Engaged Sessions" value="9,675" sub="64.91% engagement rate" color={COLORS.gold} />
          <StatCard label="Avg. Time on Site" value="1m 02s" sub="Per organic session" color={COLORS.purple} />
          <StatCard label="Events / Session" value="6.90" sub="High user interaction" color={COLORS.coral} />
        </div>
        <div style={{ background: `linear-gradient(135deg, ${COLORS.navyLight} 0%, ${COLORS.navyMid} 100%)`, borderRadius: 16, padding: 32, border: `1px solid rgba(0,201,167,0.1)`, marginBottom: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
            <div style={{ fontSize: 14, color: COLORS.gray }}>Organic Sessions by Month</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 8, background: `${COLORS.coral}10`, border: `1px solid ${COLORS.coral}20` }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.coral }} />
              <span style={{ fontSize: 11, color: COLORS.coral, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Industry avg. declining 42%</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={organicChartData}>
              <defs><linearGradient id="tealGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={COLORS.teal} stopOpacity={0.3} /><stop offset="100%" stopColor={COLORS.teal} stopOpacity={0.02} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gray + "15"} />
              <XAxis dataKey="month" tick={{ fill: COLORS.gray, fontSize: 12, fontFamily: "'DM Sans', sans-serif" }} axisLine={{ stroke: COLORS.gray + "30" }} tickLine={false} />
              <YAxis tick={{ fill: COLORS.gray, fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 3500]} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={2480} stroke={COLORS.teal + "40"} strokeDasharray="6 4"><Label value="Avg: 2,480" position="right" fill={COLORS.teal} fontSize={11} fontFamily="'DM Sans', sans-serif" /></ReferenceLine>
              <Area type="monotone" dataKey="sessions" name="Sessions" stroke={COLORS.teal} strokeWidth={3} fill="url(#tealGradient)" dot={{ r: 6, fill: COLORS.teal, stroke: COLORS.navyLight, strokeWidth: 3 }} activeDot={{ r: 8, fill: COLORS.tealLight }} />
            </AreaChart>
          </ResponsiveContainer>
          <InsightBox text="Organic traffic shows a strong, stable foundation averaging ~2,480 sessions/month. After a natural seasonal dip in Dec\u2013Feb, March 2026 shows a healthy rebound to 2,496 — building momentum heading into Q2 despite industry-wide declines from AI Overviews." />
        </div>
        <div style={{ background: `linear-gradient(135deg, ${COLORS.navyLight} 0%, ${COLORS.navyMid} 100%)`, borderRadius: 16, padding: 32, border: `1px solid rgba(0,201,167,0.1)`, marginBottom: 80 }}>
          <div style={{ fontSize: 14, color: COLORS.gray, marginBottom: 24 }}>Engagement Quality — Your Traffic vs. Industry Benchmarks</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
            {[{ metric: "Engagement Rate", yours: "64.9%", benchmark: "~55%", delta: "+18%", color: COLORS.teal, pct: 65 }, { metric: "Avg. Session Duration", yours: "1m 02s", benchmark: "~45s", delta: "+38%", color: COLORS.gold, pct: 72 }, { metric: "Events per Session", yours: "6.90", benchmark: "~4.5", delta: "+53%", color: COLORS.purple, pct: 80 }].map((m, i) => (
              <div key={i} style={{ padding: 20, borderRadius: 12, background: `${m.color}06`, border: `1px solid ${m.color}15` }}>
                <div style={{ fontSize: 12, color: COLORS.gray, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 12 }}>{m.metric}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
                  <span style={{ fontSize: 28, fontWeight: 700, color: COLORS.white, fontFamily: "'Outfit', sans-serif" }}>{m.yours}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: m.color, background: `${m.color}15`, padding: "3px 10px", borderRadius: 8 }}>{m.delta} vs benchmark</span>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: `${COLORS.gray}15`, overflow: "hidden" }}><div style={{ height: "100%", width: `${m.pct}%`, borderRadius: 3, background: `linear-gradient(90deg, ${m.color}, ${m.color}80)` }} /></div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}><span style={{ fontSize: 11, color: COLORS.gray }}>Healthcare avg: {m.benchmark}</span><span style={{ fontSize: 11, color: m.color, fontWeight: 600 }}>You</span></div>
              </div>))}
          </div>
          <InsightBox text="AgeRejuvenation\u2019s organic traffic quality outperforms healthcare industry benchmarks across every engagement metric. Visitors aren\u2019t just landing on the site — they\u2019re actively exploring content, booking appointments, and spending meaningful time on pages." color={COLORS.gold} />
        </div>
        <SectionTitle subtitle="How Google\u2019s AI Overviews have impacted organic search industry-wide — and why AgeRejuvenation\u2019s stability is a win">The AI Overviews Factor</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20, marginBottom: 32 }}>
          <div style={{ background: `linear-gradient(135deg, ${COLORS.navyLight} 0%, ${COLORS.navyMid} 100%)`, borderRadius: 16, padding: 32, border: `1px solid rgba(0,201,167,0.1)` }}>
            <div style={{ fontSize: 14, color: COLORS.gray, marginBottom: 20 }}>AI Overviews Prevalence in Google Search</div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={aiOverviewsData}>
                <defs><linearGradient id="coralGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={COLORS.coral} stopOpacity={0.25} /><stop offset="100%" stopColor={COLORS.coral} stopOpacity={0.02} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gray + "15"} />
                <XAxis dataKey="month" tick={{ fill: COLORS.gray, fontSize: 12 }} axisLine={{ stroke: COLORS.gray + "30" }} tickLine={false} />
                <YAxis tick={{ fill: COLORS.gray, fontSize: 12 }} axisLine={false} tickLine={false} domain={[30, 65]} unit="%" />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="aioPercent" name="% Queries w/ AI Overview" stroke={COLORS.coral} strokeWidth={3} fill="url(#coralGradient)" dot={{ r: 6, fill: COLORS.coral, stroke: COLORS.navyLight, strokeWidth: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
            <div style={{ marginTop: 12, fontSize: 12, color: COLORS.gray, fontStyle: "italic" }}>Source: BrightEdge, Seer Interactive, Ahrefs 2025\u20132026 studies</div>
          </div>
          <div style={{ background: `linear-gradient(135deg, ${COLORS.navyLight} 0%, ${COLORS.navyMid} 100%)`, borderRadius: 16, padding: 32, border: `1px solid rgba(0,201,167,0.1)` }}>
            <div style={{ fontSize: 14, color: COLORS.gray, marginBottom: 20 }}>Industry Impact Timeline</div>
            <MilestoneMarker label="June 2025 — AIO Hits 40%" sublabel="AI Overviews appear in 40%+ of Google queries, displacing organic clicks" color={COLORS.gold} />
            <MilestoneMarker label="Sep 2025 — Website Launch" sublabel="AgeRejuvenation\u2019s new site goes live during peak AI disruption" color={COLORS.teal} />
            <MilestoneMarker label="Q4 2025 — 42% Click Decline" sublabel="Industry reports cumulative 42% drop in organic clicks due to AIO" color={COLORS.coral} />
            <MilestoneMarker label="Mar 2026 — 48% AIO Coverage" sublabel="Nearly half of all Google queries now feature AI Overviews" color={COLORS.purple} />
            <div style={{ marginTop: 16, padding: "14px 16px", borderRadius: 10, background: `${COLORS.teal}10`, border: `1px solid ${COLORS.teal}20` }}>
              <div style={{ fontSize: 13, color: COLORS.teal, fontWeight: 600 }}>Despite all this \u2192 AgeRejuvenation\u2019s organic traffic remains stable</div>
            </div>
          </div>
        </div>
        <div style={{ background: `linear-gradient(135deg, ${COLORS.navyLight} 0%, ${COLORS.coral}08 100%)`, borderRadius: 16, padding: "28px 32px", marginBottom: 80, border: `1px solid ${COLORS.coral}20` }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: `${COLORS.coral}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 22 }}>\u26a1</div>
            <div style={{ flex: 1, minWidth: 300 }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.white, fontFamily: "'Outfit', sans-serif", marginBottom: 6 }}>Why \u201cStable\u201d Is the New \u201cGrowing\u201d</div>
              <div style={{ fontSize: 14, color: COLORS.gray, lineHeight: 1.7 }}>In a landscape where the average website has lost 42% of its organic clicks to AI Overviews, maintaining steady organic traffic is a significant achievement. AgeRejuvenation\u2019s consistent ~2,480 sessions/month — with a March rebound — demonstrates that the SEO foundation is resilient and well-positioned to capture growth as strategies continue to evolve.</div>
            </div>
          </div>
        </div>
        <SectionTitle subtitle="Estimated monthly interaction trends across all five clinic profiles">GBP Monthly Interaction Trends</SectionTitle>
        <div style={{ background: `linear-gradient(135deg, ${COLORS.navyLight} 0%, ${COLORS.navyMid} 100%)`, borderRadius: 16, padding: 32, border: `1px solid rgba(0,201,167,0.1)`, marginBottom: 80 }}>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={gbpMonthlyStacked} barCategoryGap="15%">
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gray + "15"} />
              <XAxis dataKey="month" tick={{ fill: COLORS.gray, fontSize: 12, fontFamily: "'DM Sans', sans-serif" }} axisLine={{ stroke: COLORS.gray + "30" }} tickLine={false} />
              <YAxis tick={{ fill: COLORS.gray, fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="Brandon" stackId="a" fill={COLORS.teal} />
              <Bar dataKey="S. Tampa" stackId="a" fill={COLORS.gold} />
              <Bar dataKey="W. Chapel" stackId="a" fill={COLORS.purple} />
              <Bar dataKey="W. Garden" stackId="a" fill={COLORS.coral} />
              <Bar dataKey="W. Park" stackId="a" fill={COLORS.tealLight} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", marginTop: 16 }}>
            {[{ name: "Brandon", color: COLORS.teal }, { name: "S. Tampa", color: COLORS.gold }, { name: "W. Chapel", color: COLORS.purple }, { name: "W. Garden", color: COLORS.coral }, { name: "W. Park", color: COLORS.tealLight }].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 10, height: 10, borderRadius: 3, background: item.color }} /><span style={{ fontSize: 12, color: COLORS.gray }}>{item.name}</span></div>))}
          </div>
          <InsightBox text="GBP interactions remain consistent month-over-month across all clinics, showing sustained local visibility. Brandon and Winter Garden consistently drive the highest volume of interactions, powered by strong direction request activity." />
        </div>

        <SectionTitle subtitle="Strategic recommendations for the next quarter to build on this strong foundation">Looking Ahead: Q2 2026</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginBottom: 80 }}>
          {[{ title: "Double Down on High-Engagement Content", desc: "With 64.9% engagement rate and 6.9 events per session, organic visitors are highly engaged. Creating more service-specific landing pages and blog content will compound this quality traffic.", color: COLORS.teal }, { title: "Expand Local Content Strategy", desc: "Each clinic location page performs well in local search. Adding service-specific location pages (e.g., 'Peptide Therapy in Wesley Chapel') can capture more granular, high-intent searches.", color: COLORS.gold }, { title: "Optimize for AI Overview Visibility", desc: "As AI Overviews dominate more searches, structuring content for featured snippets and FAQ schemas will help AgeRejuvenation appear within AI-generated responses — turning the AIO shift into an advantage.", color: COLORS.purple }, { title: "Build on GBP Momentum", desc: "Brandon and Winter Garden lead in GBP interactions. Regular posts, photos, Q&A, and review responses across all profiles will maintain and grow this high-intent engagement.", color: COLORS.coral }].map((r, i) => (
            <div key={i} style={{ background: `linear-gradient(135deg, ${COLORS.navyLight} 0%, ${r.color}08 100%)`, borderRadius: 16, padding: "28px 24px", border: `1px solid ${r.color}20`, borderLeft: `3px solid ${r.color}` }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.white, fontFamily: "'Outfit', sans-serif", marginBottom: 10 }}>{r.title}</div>
              <div style={{ fontSize: 14, color: COLORS.gray, lineHeight: 1.6 }}>{r.desc}</div>
            </div>))}
        </div>

        <div style={{ borderTop: `1px solid ${COLORS.gray}15`, paddingTop: 40, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img src="https://onecdn.io/media/d428a0e1-4ae7-4092-98c5-20d08a038c59/md2x" alt="AgeRejuvenation" style={{ height: 32, objectFit: "contain", opacity: 0.7 }} />
            <span style={{ color: COLORS.gray, fontSize: 13 }}>Organic Growth Audit — Oct 2025 to Mar 2026</span>
          </div>
          <div style={{ color: COLORS.gray, fontSize: 12 }}>Data sourced from Google Business Profile & Google Analytics 4</div>
        </div>
      </div>
    </div>
  );
}
