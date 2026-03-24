import { useState } from "react";

const screens = {
  findNow: "findNow",
  filter: "filter",
  results: "results",
  detail: "detail",
  navigate: "navigate",
  arrived: "arrived",
  report: "report",
  plan: "plan",
  discover: "discover",
  settings: "settings",
};

// Full-screen frame wrapper — fills viewport
const PhoneFrame = ({ children, title, screenLabel, labelColor }) => (
  <div style={{
    width: "100%", height: "100%", background: "#FAFAFA",
    position: "relative", display: "flex", flexDirection: "column", overflow: "hidden",
    fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
  }}>
    {/* Top bar with screen label */}
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "10px 20px 6px", background: "#fff", borderBottom: "1px solid #eee"
    }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: "#333" }}>9:41</span>
      {screenLabel && (
        <div style={{
          background: labelColor || "#4A90D9",
          color: "#fff", fontSize: 10, fontWeight: 700, padding: "4px 12px", borderRadius: 6,
          letterSpacing: 0.5, textTransform: "uppercase"
        }}>{screenLabel}</div>
      )}
      <span style={{ display: "flex", gap: 4, alignItems: "center" }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: "#333" }}>5G</span>
        <span style={{ display: "inline-block", width: 25, height: 12, border: "1.5px solid #333", borderRadius: 3, position: "relative" }}>
          <span style={{ position: "absolute", left: 2, top: 2, bottom: 2, right: 6, background: "#34C759", borderRadius: 1 }} />
        </span>
      </span>
    </div>
    {/* Header */}
    {title && (
      <div style={{
        padding: "12px 20px 14px", fontSize: 24, fontWeight: 700, color: "#1a1a1a",
        letterSpacing: -0.5, background: "#fff"
      }}>{title}</div>
    )}
    {/* Content */}
    <div style={{ flex: 1, overflowY: "auto", padding: "0 0 80px" }}>
      {children}
    </div>
  </div>
);

// Bottom Navigation — REDESIGN CHANGE 2: "Report" renamed to "Update" with pen icon
const BottomNav = ({ active, onNavigate }) => {
  const tabs = [
    { id: "findNow", icon: "📍", label: "Now" },
    { id: "report", icon: "✏️", label: "Update", subtitle: "Share conditions" },
    { id: "plan", icon: "📅", label: "Plan" },
    { id: "discover", icon: "⭐", label: "Discover" },
    { id: "settings", icon: "⚙️", label: "Settings" },
  ];
  return (
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0, background: "#fff",
      display: "flex", justifyContent: "space-around", padding: "6px 0 22px",
      borderTop: "1px solid #e0e0e0", zIndex: 10
    }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onNavigate(t.id)}
          style={{
            background: "none", border: "none", display: "flex", flexDirection: "column",
            alignItems: "center", gap: 1, cursor: "pointer", padding: "4px 6px",
            opacity: active === t.id ? 1 : 0.5, transition: "opacity 0.2s"
          }}>
          <span style={{ fontSize: 18 }}>{t.icon}</span>
          <span style={{
            fontSize: 10, fontWeight: active === t.id ? 700 : 500,
            color: active === t.id ? "#4A90D9" : "#888"
          }}>{t.label}</span>
        </button>
      ))}
    </div>
  );
};

// ========== S1: HOME MAP (Vertical + Horizontal entry) ==========
// REDESIGN CHANGE 1: Pin popup added — tapping a pin shows a popup card
const FindNowScreen = ({ onNavigate }) => {
  const [popup, setPopup] = useState(null);

  const pins = [
    { id: 0, left: "22%", top: "28%", color: "#2ECC71", label: "Hayden 2F", status: "Quiet", crowd: "40%", dist: "3 min" },
    { id: 1, left: "58%", top: "45%", color: "#F39C12", label: "Noble 1F", status: "Moderate", crowd: "65%", dist: "4 min" },
    { id: 2, left: "38%", top: "68%", color: "#E74C3C", label: "Design N", status: "Loud", crowd: "90%", dist: "6 min" },
    { id: 3, left: "75%", top: "22%", color: "#2ECC71", label: "Coor Hall", status: "Quiet", crowd: "25%", dist: "5 min" },
  ];

  return (
    <PhoneFrame title="Find Now" screenLabel="S1 · Horizontal + Vertical" labelColor="#2980B9">
      {/* Search + Filter bar */}
      <div style={{ padding: "0 20px 12px" }}>
        <div style={{
          background: "#fff", borderRadius: 12, padding: "11px 14px",
          display: "flex", alignItems: "center", gap: 10,
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: "1px solid #eee"
        }}>
          <span style={{ fontSize: 15 }}>🔍</span>
          <span style={{ color: "#999", fontSize: 13, flex: 1 }}>Search spaces...</span>
          <span style={{
            cursor: "pointer", fontSize: 13, background: "#4A90D9", color: "#fff",
            padding: "5px 12px", borderRadius: 8, fontWeight: 600
          }} onClick={() => onNavigate(screens.filter)}>⚙ Filters</span>
        </div>
      </div>

      {/* Map with pins + popup (CHANGE 1) */}
      <div style={{
        margin: "0 20px", height: 230, borderRadius: 16, position: "relative",
        background: "linear-gradient(135deg, #d4e8d0 0%, #b8d4b0 40%, #c8dcc0 100%)",
        overflow: "hidden", border: "1px solid #cde0c8"
      }}>
        {/* Roads */}
        <div style={{ position: "absolute", top: "32%", left: 0, right: 0, height: 3, background: "#e8d8b8" }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, left: "46%", width: 3, background: "#e8d8b8" }} />

        {/* Map pins */}
        {pins.map((pin) => (
          <div key={pin.id} style={{
            position: "absolute", left: pin.left, top: pin.top, transform: "translate(-50%,-100%)",
            cursor: "pointer", zIndex: popup === pin.id ? 5 : 2
          }} onClick={() => setPopup(popup === pin.id ? null : pin.id)}>
            <div style={{
              background: pin.color, width: 26, height: 26, borderRadius: "50% 50% 50% 0",
              transform: "rotate(-45deg)", display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 6px rgba(0,0,0,0.25)", border: "2px solid #fff"
            }}>
              <span style={{ transform: "rotate(45deg)", fontSize: 9, color: "#fff", fontWeight: 700 }}>
                {pin.id + 1}
              </span>
            </div>
            <div style={{
              fontSize: 8, fontWeight: 700, color: "#333", textAlign: "center", marginTop: 1,
              background: "rgba(255,255,255,0.9)", padding: "1px 4px", borderRadius: 3
            }}>{pin.label}</div>

            {/* CHANGE 1: Pin popup card */}
            {popup === pin.id && (
              <div onClick={(e) => { e.stopPropagation(); onNavigate(screens.detail); }}
                style={{
                  position: "absolute", bottom: "100%", left: "50%", transform: "translateX(-50%)",
                  marginBottom: 6, width: 160, background: "#fff", borderRadius: 12,
                  padding: "10px 12px", boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
                  border: "1px solid #eee", zIndex: 10, cursor: "pointer"
                }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#1a1a1a" }}>{pin.label}</div>
                <div style={{ fontSize: 10, color: "#666", marginTop: 3 }}>
                  {pin.status === "Quiet" ? "🟢" : pin.status === "Moderate" ? "🟡" : "🔴"} {pin.status} · 👥 {pin.crowd}
                </div>
                <div style={{ fontSize: 10, color: "#888", marginTop: 2 }}>🚶 {pin.dist} walk</div>
                <div style={{ fontSize: 9, color: "#4A90D9", fontWeight: 600, marginTop: 4 }}>Tap for details →</div>
                {/* Popup arrow */}
                <div style={{
                  position: "absolute", bottom: -6, left: "50%", transform: "translateX(-50%)",
                  width: 0, height: 0, borderLeft: "6px solid transparent",
                  borderRight: "6px solid transparent", borderTop: "6px solid #fff"
                }} />
              </div>
            )}
          </div>
        ))}

        <div style={{
          position: "absolute", bottom: 8, right: 8, background: "rgba(255,255,255,0.92)",
          padding: "4px 8px", borderRadius: 8, fontSize: 9, color: "#666"
        }}>
          🟢 Quiet &nbsp; 🟡 Moderate &nbsp; 🔴 Loud
        </div>
        <div style={{
          position: "absolute", bottom: 8, left: 8, background: "rgba(255,255,255,0.92)",
          padding: "4px 8px", borderRadius: 8, fontSize: 9, color: "#999"
        }}>Near You</div>
      </div>

      {/* Nearby results list */}
      <div style={{ padding: "14px 20px 0" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#333", marginBottom: 10 }}>Near You</div>
        {[
          { name: "Hayden Library 2F", dist: "3 min", noise: "🟢 Quiet", crowd: "40%", outlets: true },
          { name: "Coor Hall Lounge", dist: "5 min", noise: "🟢 Quiet", crowd: "25%", outlets: true },
          { name: "Noble Library 1F", dist: "4 min", noise: "🟡 Moderate", crowd: "65%", outlets: false },
        ].map((s, i) => (
          <div key={i} onClick={() => onNavigate(screens.detail)}
            style={{
              background: "#fff", borderRadius: 14, padding: "13px 14px", marginBottom: 8,
              display: "flex", justifyContent: "space-between", alignItems: "center",
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)", border: "1px solid #f0f0f0",
              cursor: "pointer"
            }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>{s.name}</div>
              <div style={{ fontSize: 10, color: "#888", marginTop: 3 }}>
                🚶 {s.dist} &nbsp; {s.noise} &nbsp; 👥 {s.crowd}
              </div>
            </div>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              {s.outlets && <span style={{ fontSize: 9, background: "#E8F5E9", color: "#2E7D32", padding: "2px 6px", borderRadius: 6, fontWeight: 600 }}>🔌</span>}
              <span style={{ color: "#4A90D9", fontSize: 18, fontWeight: 300 }}>›</span>
            </div>
          </div>
        ))}
      </div>
      <BottomNav active="findNow" onNavigate={onNavigate} />
    </PhoneFrame>
  );
};

// ========== S2: FILTER PANEL ==========
const FilterScreen = ({ onNavigate }) => (
  <PhoneFrame screenLabel="S2 · Apply Filter" labelColor="#27AE60">
    <div style={{ padding: "10px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        {/* CHANGE 4 style: large back button area */}
        <button onClick={() => onNavigate(screens.findNow)} style={{
          background: "none", border: "none", fontSize: 15, cursor: "pointer",
          color: "#4A90D9", fontWeight: 600, padding: "8px 12px 8px 0",
          minWidth: 44, minHeight: 44, display: "flex", alignItems: "center"
        }}>← Back</button>
        <span style={{ fontSize: 18, fontWeight: 700 }}>Filters</span>
        <button style={{ background: "none", border: "none", fontSize: 13, cursor: "pointer", color: "#E74C3C" }}>Reset</button>
      </div>

      {/* Noise — CHANGE 2 post-eval: merged Silent+Quiet into just Quiet */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#333", marginBottom: 10 }}>Noise Level</div>
        <div style={{ display: "flex", gap: 8 }}>
          {["🔇 Quiet", "☕ Moderate", "🗣 Any"].map((n, i) => (
            <button key={i} style={{
              flex: 1, padding: "12px 4px", borderRadius: 10,
              border: i === 0 ? "2px solid #4A90D9" : "1px solid #ddd",
              background: i === 0 ? "#E8F4FD" : "#fff", fontSize: 12,
              fontWeight: i === 0 ? 700 : 500, cursor: "pointer", color: "#333"
            }}>{n}</button>
          ))}
        </div>
      </div>

      {/* Distance */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#333", marginBottom: 10 }}>Max Walking Distance</div>
        <div style={{ display: "flex", gap: 8 }}>
          {["2 min", "5 min", "10 min", "15+ min"].map((d, i) => (
            <button key={i} style={{
              flex: 1, padding: "12px 4px", borderRadius: 10,
              border: i === 1 ? "2px solid #4A90D9" : "1px solid #ddd",
              background: i === 1 ? "#E8F4FD" : "#fff", fontSize: 12,
              fontWeight: i === 1 ? 700 : 500, cursor: "pointer", color: "#333"
            }}>{d}</button>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#333", marginBottom: 10 }}>Amenities</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {[
            { label: "🔌 Outlets", on: true },
            { label: "📶 WiFi", on: false },
            { label: "👥 Group-Friendly", on: false },
            { label: "🖨 Printer", on: false },
          ].map((a, i) => (
            <button key={i} style={{
              padding: "10px 16px", borderRadius: 20,
              border: a.on ? "2px solid #4A90D9" : "1px solid #ddd",
              background: a.on ? "#E8F4FD" : "#fff", fontSize: 12,
              fontWeight: a.on ? 700 : 500, cursor: "pointer", color: "#333"
            }}>{a.label}</button>
          ))}
        </div>
      </div>

      {/* Seating */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#333", marginBottom: 10 }}>Seating Type</div>
        <div style={{ display: "flex", gap: 8 }}>
          {["Individual", "Group", "Any"].map((s, i) => (
            <button key={i} style={{
              flex: 1, padding: "12px 4px", borderRadius: 10,
              border: i === 0 ? "2px solid #4A90D9" : "1px solid #ddd",
              background: i === 0 ? "#E8F4FD" : "#fff", fontSize: 12,
              fontWeight: i === 0 ? 700 : 500, cursor: "pointer", color: "#333"
            }}>{s}</button>
          ))}
        </div>
      </div>

      <button onClick={() => onNavigate(screens.results)} style={{
        width: "100%", padding: "16px", borderRadius: 14, border: "none",
        background: "linear-gradient(135deg, #4A90D9, #357ABD)", color: "#fff",
        fontSize: 16, fontWeight: 700, cursor: "pointer",
        boxShadow: "0 4px 12px rgba(74,144,217,0.3)"
      }}>Apply</button>
    </div>
    <BottomNav active="findNow" onNavigate={onNavigate} />
  </PhoneFrame>
);

// ========== S3: FILTERED RESULTS ==========
// CHANGE 1: Pin popup also applies here — map updates with fewer pins + popup
const ResultsScreen = ({ onNavigate }) => (
  <PhoneFrame screenLabel="S3 · Filtered Results" labelColor="#27AE60">
    <div style={{ padding: "10px 20px 0" }}>
      <button onClick={() => onNavigate(screens.filter)} style={{
        background: "none", border: "none", fontSize: 13, cursor: "pointer",
        color: "#4A90D9", fontWeight: 600, padding: "8px 12px 8px 0",
        minWidth: 44, minHeight: 44, display: "flex", alignItems: "center"
      }}>← Adjust Filters</button>
    </div>

    {/* Filtered map — only 2 green pins remain */}
    <div style={{
      margin: "4px 20px", height: 140, borderRadius: 14, position: "relative",
      background: "linear-gradient(135deg, #d4e8d0 0%, #b8d4b0 40%, #c8dcc0 100%)",
      overflow: "hidden", border: "1px solid #cde0c8"
    }}>
      <div style={{ position: "absolute", top: "32%", left: 0, right: 0, height: 2, background: "#e8d8b8" }} />
      {[
        { left: "25%", top: "30%", label: "Hayden 2F" },
        { left: "70%", top: "55%", label: "ISTB4" },
      ].map((pin, i) => (
        <div key={i} style={{
          position: "absolute", left: pin.left, top: pin.top, transform: "translate(-50%,-100%)"
        }}>
          <div style={{
            background: "#2ECC71", width: 22, height: 22, borderRadius: "50% 50% 50% 0",
            transform: "rotate(-45deg)", boxShadow: "0 2px 4px rgba(0,0,0,0.2)", border: "2px solid #fff"
          }} />
          <div style={{ fontSize: 8, fontWeight: 700, color: "#333", textAlign: "center", marginTop: 1,
            background: "rgba(255,255,255,0.9)", padding: "1px 3px", borderRadius: 3
          }}>{pin.label}</div>
        </div>
      ))}
      <div style={{
        position: "absolute", top: 8, left: 8, background: "rgba(255,255,255,0.92)",
        padding: "3px 8px", borderRadius: 6, fontSize: 9, fontWeight: 600, color: "#2ECC71"
      }}>2 matches found</div>
    </div>

    {/* Result cards */}
    <div style={{ padding: "12px 20px" }}>
      {[
        { name: "Hayden Library 2nd Floor", dist: "3 min walk", noise: 20, crowd: 40, outlets: true, hours: "Open until 10 PM", img: "📚" },
        { name: "ISTB4 Quiet Room", dist: "5 min walk", noise: 15, crowd: 30, outlets: true, hours: "Open until 11 PM", img: "🔬" },
      ].map((s, i) => (
        <div key={i} onClick={() => onNavigate(screens.detail)} style={{
          background: "#fff", borderRadius: 16, padding: "16px", marginBottom: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: "1px solid #f0f0f0",
          cursor: "pointer"
        }}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{
              width: 50, height: 50, borderRadius: 12, background: "#f0f5ff",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26
            }}>{s.img}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a" }}>{s.name}</div>
              <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>🚶 {s.dist} · 🕐 {s.hours}</div>
              {/* Noise bar */}
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
                <span style={{ fontSize: 10, color: "#666", width: 38 }}>Noise</span>
                <div style={{ flex: 1, height: 6, background: "#eee", borderRadius: 3 }}>
                  <div style={{ width: `${s.noise}%`, height: "100%", background: "#2ECC71", borderRadius: 3 }} />
                </div>
                <span style={{ fontSize: 10, color: "#2ECC71", fontWeight: 600 }}>Low</span>
              </div>
              {/* Crowd bar */}
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                <span style={{ fontSize: 10, color: "#666", width: 38 }}>Crowd</span>
                <div style={{ flex: 1, height: 6, background: "#eee", borderRadius: 3 }}>
                  <div style={{ width: `${s.crowd}%`, height: "100%", background: "#2ECC71", borderRadius: 3 }} />
                </div>
                <span style={{ fontSize: 10, color: "#2ECC71", fontWeight: 600 }}>{s.crowd}%</span>
              </div>
              {/* Tags */}
              <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
                <span style={{ fontSize: 9, background: "#E8F5E9", color: "#2E7D32", padding: "2px 6px", borderRadius: 6, fontWeight: 600 }}>🔌 Outlets</span>
                <span style={{ fontSize: 9, background: "#E3F2FD", color: "#1565C0", padding: "2px 6px", borderRadius: 6, fontWeight: 600 }}>🔇 Quiet</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    <BottomNav active="findNow" onNavigate={onNavigate} />
  </PhoneFrame>
);

// ========== S4: SPACE DETAIL ==========
// CHANGE 3: Timestamp enlarged with report count
// CHANGE 4: Back button enlarged to full top-left corner area (44pt target)
const DetailScreen = ({ onNavigate }) => (
  <PhoneFrame screenLabel="S4 · Space Detail" labelColor="#27AE60">
    <div style={{ padding: "10px 20px 0" }}>
      {/* CHANGE 4: Enlarged back button — full top-left corner, 44pt tap target */}
      <button onClick={() => onNavigate(screens.results)} style={{
        background: "none", border: "none", fontSize: 15, cursor: "pointer",
        color: "#4A90D9", fontWeight: 600,
        padding: "10px 16px 10px 0", minWidth: 60, minHeight: 44,
        display: "flex", alignItems: "center"
      }}>← Back</button>
    </div>

    {/* Hero */}
    <div style={{
      margin: "0 20px", height: 140, borderRadius: 16,
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden"
    }}>
      <span style={{ fontSize: 56 }}>📚</span>
      <div style={{
        position: "absolute", bottom: 8, right: 8, background: "rgba(0,0,0,0.55)",
        color: "#fff", padding: "3px 8px", borderRadius: 8, fontSize: 10
      }}>📷 1/4</div>
      <div style={{
        position: "absolute", top: 8, right: 8, background: "#2ECC71",
        color: "#fff", padding: "4px 10px", borderRadius: 8, fontSize: 10, fontWeight: 700
      }}>OPEN</div>
    </div>

    <div style={{ padding: "14px 20px" }}>
      <div style={{ fontSize: 19, fontWeight: 800, color: "#1a1a1a" }}>Hayden Library 2nd Floor</div>
      <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>300 E Orange Mall, Tempe · 3 min walk</div>
      <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>🕐 Open until 10:00 PM today</div>

      {/* CHANGE 3: Prominent timestamp with report count */}
      <div style={{
        background: "#FFF8E1", borderRadius: 10, padding: "10px 14px", marginTop: 12,
        display: "flex", alignItems: "center", gap: 8, border: "1px solid #FFE082"
      }}>
        <span style={{ fontSize: 18 }}>🕒</span>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#E65100" }}>Updated 4 min ago</div>
          <div style={{ fontSize: 11, color: "#F57F17" }}>Based on 3 student reports</div>
        </div>
      </div>

      {/* Live status */}
      <div style={{
        background: "#f8f9fa", borderRadius: 14, padding: "14px", marginTop: 14
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10, color: "#333" }}>Current Status</div>
        <div style={{ display: "flex", gap: 14 }}>
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#2ECC71" }}>Low</div>
            <div style={{ fontSize: 10, color: "#888" }}>Crowding</div>
          </div>
          <div style={{ width: 1, background: "#e0e0e0" }} />
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#2ECC71" }}>Quiet</div>
            <div style={{ fontSize: 10, color: "#888" }}>Noise</div>
          </div>
          <div style={{ width: 1, background: "#e0e0e0" }} />
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#4A90D9" }}>Yes</div>
            <div style={{ fontSize: 10, color: "#888" }}>Outlets</div>
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div style={{ marginTop: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8, color: "#333" }}>Amenities</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {["🔌 Outlets", "📶 WiFi", "💺 Individual Desks", "🔇 Quiet Zone", "♿ Accessible"].map((a, i) => (
            <span key={i} style={{
              fontSize: 11, background: "#f0f5ff", color: "#333",
              padding: "5px 10px", borderRadius: 10, fontWeight: 500
            }}>{a}</span>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <button onClick={() => onNavigate(screens.navigate)} style={{
        width: "100%", padding: "15px", borderRadius: 14, border: "none", marginTop: 16,
        background: "linear-gradient(135deg, #4A90D9, #357ABD)", color: "#fff",
        fontSize: 15, fontWeight: 700, cursor: "pointer",
        boxShadow: "0 4px 12px rgba(74,144,217,0.3)"
      }}>🧭 Get Directions</button>
    </div>
    <BottomNav active="findNow" onNavigate={onNavigate} />
  </PhoneFrame>
);

// ========== S5: DIRECTIONS ==========
const NavigateScreen = ({ onNavigate }) => (
  <PhoneFrame screenLabel="S5 · Directions" labelColor="#27AE60">
    <div style={{ padding: "10px 20px" }}>
      <button onClick={() => onNavigate(screens.detail)} style={{
        background: "none", border: "none", fontSize: 15, cursor: "pointer",
        color: "#4A90D9", fontWeight: 600, padding: "8px 12px 8px 0",
        minWidth: 44, minHeight: 44, display: "flex", alignItems: "center"
      }}>← Back</button>
    </div>

    {/* Map with route */}
    <div style={{
      margin: "4px 20px", height: 260, borderRadius: 16, position: "relative",
      background: "linear-gradient(135deg, #d4e8d0 0%, #b8d4b0 40%, #c8dcc0 100%)",
      overflow: "hidden", border: "1px solid #cde0c8"
    }}>
      <svg width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0 }}>
        <path d="M 80 220 C 100 170, 140 150, 180 130 S 240 90, 260 50"
          fill="none" stroke="#4A90D9" strokeWidth="4" strokeDasharray="8,4" />
      </svg>
      {/* You */}
      <div style={{ position: "absolute", left: "22%", bottom: "12%", transform: "translate(-50%,-50%)" }}>
        <div style={{
          width: 16, height: 16, borderRadius: "50%", background: "#4A90D9",
          border: "3px solid #fff", boxShadow: "0 2px 6px rgba(0,0,0,0.25)"
        }} />
        <div style={{ fontSize: 9, fontWeight: 700, color: "#4A90D9", textAlign: "center", marginTop: 2,
          background: "rgba(255,255,255,0.9)", padding: "1px 4px", borderRadius: 4 }}>You</div>
      </div>
      {/* Destination */}
      <div style={{ position: "absolute", right: "22%", top: "12%", transform: "translate(50%,-50%)" }}>
        <div style={{
          background: "#2ECC71", width: 30, height: 30, borderRadius: "50% 50% 50% 0",
          transform: "rotate(-45deg)", display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)", border: "2px solid #fff"
        }}>
          <span style={{ transform: "rotate(45deg)", fontSize: 14 }}>📚</span>
        </div>
        <div style={{ fontSize: 9, fontWeight: 700, color: "#333", textAlign: "center", marginTop: 3,
          background: "rgba(255,255,255,0.9)", padding: "1px 6px", borderRadius: 4 }}>Hayden 2F</div>
      </div>
    </div>

    {/* ETA card */}
    <div style={{ margin: "12px 20px", background: "#fff", borderRadius: 14, padding: "16px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#1a1a1a" }}>3 min</div>
          <div style={{ fontSize: 12, color: "#888" }}>0.2 miles walking</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#2ECC71" }}>🟢 Still Quiet</div>
          {/* CHANGE 3: Prominent recency */}
          <div style={{ fontSize: 11, color: "#E65100", fontWeight: 600 }}>Updated 4 min ago by a fellow student</div>
        </div>
      </div>
      <div style={{ marginTop: 12, padding: "10px", background: "#f8f9fa", borderRadius: 10,
        fontSize: 12, color: "#555", lineHeight: 1.5 }}>
        📍 Head east on Orange Mall → Enter Hayden Library → 2nd floor stairs/elevator → Quiet zone on the right
      </div>
    </div>

    <button onClick={() => onNavigate(screens.arrived)} style={{
      margin: "8px 20px", width: "calc(100% - 40px)", padding: "16px", borderRadius: 14, border: "none",
      background: "linear-gradient(135deg, #2ECC71, #27AE60)", color: "#fff",
      fontSize: 15, fontWeight: 700, cursor: "pointer",
      boxShadow: "0 4px 12px rgba(46,204,113,0.3)"
    }}>✅ I've Arrived</button>
    <BottomNav active="findNow" onNavigate={onNavigate} />
  </PhoneFrame>
);

// ========== S6: ARRIVAL CONFIRMATION ==========
// Banner with "You've arrived! Want to report conditions?" Yes / Skip
const ArrivedScreen = ({ onNavigate }) => (
  <PhoneFrame screenLabel="S6 · Confirmation" labelColor="#27AE60">
    <div style={{ padding: "20px 20px", textAlign: "center" }}>
      <div style={{ fontSize: 56, marginBottom: 8 }}>🎉</div>
      <div style={{ fontSize: 22, fontWeight: 800, color: "#1a1a1a" }}>You've arrived!</div>
      <div style={{ fontSize: 13, color: "#888", marginTop: 4 }}>Hayden Library 2nd Floor</div>
    </div>

    {/* Arrival banner — matches doc: "Want to report conditions? Yes / Skip" */}
    <div style={{
      margin: "8px 20px", background: "#fff", borderRadius: 16, padding: "24px 20px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.08)", textAlign: "center"
    }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: "#333", marginBottom: 4 }}>
        Want to report conditions?
      </div>
      <div style={{ fontSize: 12, color: "#888", marginBottom: 20 }}>
        Help other students know what it's like right now
      </div>

      {/* Yes → leads to quick report */}
      <button onClick={() => onNavigate(screens.report)} style={{
        width: "100%", padding: "16px", borderRadius: 14, border: "none",
        background: "linear-gradient(135deg, #2ECC71, #27AE60)", color: "#fff",
        fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 10,
        boxShadow: "0 4px 12px rgba(46,204,113,0.3)"
      }}>Yes — Quick Report</button>

      {/* Skip → task complete */}
      <button onClick={() => onNavigate(screens.findNow)} style={{
        width: "100%", padding: "14px", borderRadius: 14,
        border: "1px solid #ddd", background: "#fff", color: "#666",
        fontSize: 14, fontWeight: 600, cursor: "pointer"
      }}>Skip — Start Studying</button>

      <div style={{ fontSize: 11, color: "#bbb", marginTop: 12 }}>
        🔒 Reports are anonymous · Takes 5 seconds
      </div>
    </div>

    <div style={{
      margin: "16px 20px", background: "#E8F5E9", borderRadius: 12, padding: "14px",
      textAlign: "center"
    }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: "#2E7D32" }}>
        ✅ Task complete! Found it in under 2 minutes.
      </div>
    </div>

    <BottomNav active="findNow" onNavigate={onNavigate} />
  </PhoneFrame>
);

// ========== HORIZONTAL: Update / Report tab ==========
// CHANGE 2: Renamed to "Update" with subtitle "Share conditions"
const ReportScreen = ({ onNavigate }) => (
  <PhoneFrame title="Update" screenLabel="Horizontal · Report" labelColor="#F39C12">
    <div style={{ padding: "0 20px" }}>
      <div style={{ fontSize: 13, color: "#888", marginBottom: 14 }}>Share conditions to help other students</div>

      <div style={{ background: "#fff", borderRadius: 14, padding: "18px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>You're at...</div>
        <div style={{
          padding: "12px 14px", borderRadius: 10, border: "1px solid #ddd",
          background: "#f8f9fa", fontSize: 13, color: "#333", marginBottom: 10
        }}>📍 Detect my location automatically</div>

        <div style={{ fontSize: 11, color: "#999", textAlign: "center", margin: "8px 0" }}>or select a space</div>
        {["Hayden Library", "Noble Library", "Coor Hall", "ISTB4"].map((s, i) => (
          <div key={i} style={{
            padding: "10px 14px", borderRadius: 10, border: "1px solid #eee",
            marginBottom: 6, fontSize: 13, cursor: "pointer", color: "#333"
          }}>{s}</div>
        ))}
      </div>

      {/* Quick report form */}
      <div style={{
        background: "#fff", borderRadius: 14, padding: "18px", marginTop: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
      }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>How is it right now?</div>

        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 8 }}>Noise</div>
          <div style={{ display: "flex", gap: 6 }}>
            {["🔇 Quiet", "☕ Moderate", "🗣 Loud"].map((n, i) => (
              <button key={i} style={{
                flex: 1, padding: "10px 4px", borderRadius: 10, fontSize: 11,
                border: "1px solid #ddd", background: "#fff", cursor: "pointer",
                fontWeight: 500, color: "#333"
              }}>{n}</button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 8 }}>Crowding</div>
          <div style={{ display: "flex", gap: 6 }}>
            {["😌 Empty", "🙂 Some", "😐 Filling", "😰 Full"].map((c, i) => (
              <button key={i} style={{
                flex: 1, padding: "10px 2px", borderRadius: 10, fontSize: 10,
                border: "1px solid #ddd", background: "#fff", cursor: "pointer",
                fontWeight: 500, color: "#333"
              }}>{c}</button>
            ))}
          </div>
        </div>

        <button style={{
          width: "100%", padding: "14px", borderRadius: 14, border: "none",
          background: "linear-gradient(135deg, #F39C12, #E67E22)", color: "#fff",
          fontSize: 14, fontWeight: 700, cursor: "pointer"
        }}>Submit Update</button>
      </div>

      <div style={{
        marginTop: 10, fontSize: 11, color: "#aaa", textAlign: "center"
      }}>🔒 Anonymous · Takes less than 10 seconds</div>
    </div>
    <BottomNav active="report" onNavigate={onNavigate} />
  </PhoneFrame>
);

// ========== HORIZONTAL: Plan ==========
const PlanScreen = ({ onNavigate }) => (
  <PhoneFrame title="Plan Ahead" screenLabel="Horizontal · Plan" labelColor="#8E44AD">
    <div style={{ padding: "0 20px" }}>
      <div style={{ fontSize: 13, color: "#888", marginBottom: 14 }}>Typical conditions by day and time</div>

      {/* Day picker */}
      <div style={{ display: "flex", gap: 5, marginBottom: 14 }}>
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
          <button key={i} style={{
            padding: "9px 0", borderRadius: 10, flex: 1,
            border: i === 3 ? "2px solid #8E44AD" : "1px solid #ddd",
            background: i === 3 ? "#F3E5F5" : "#fff", fontSize: 12,
            fontWeight: i === 3 ? 700 : 500, cursor: "pointer", color: "#333"
          }}>{d}</button>
        ))}
      </div>

      {/* Heatmap for a space */}
      <div style={{
        background: "#fff", borderRadius: 14, padding: "16px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: "#333" }}>
          Hayden Library 2F — Thursday
        </div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {[
            { t: "7AM", l: 0.15 }, { t: "8AM", l: 0.3 }, { t: "9AM", l: 0.55 },
            { t: "10AM", l: 0.7 }, { t: "11AM", l: 0.85 }, { t: "12PM", l: 0.9 },
            { t: "1PM", l: 0.8 }, { t: "2PM", l: 0.65 }, { t: "3PM", l: 0.75 },
            { t: "4PM", l: 0.85 }, { t: "5PM", l: 0.55 }, { t: "6PM", l: 0.35 },
            { t: "7PM", l: 0.25 }, { t: "8PM", l: 0.15 },
          ].map(({ t, l }, i) => {
            const color = l > 0.75 ? "#E74C3C" : l > 0.45 ? "#F39C12" : "#2ECC71";
            return (
              <div key={i} style={{
                width: "calc(25% - 4px)", padding: "8px 2px", borderRadius: 8,
                background: `${color}18`, textAlign: "center", fontSize: 10,
                color, fontWeight: 600
              }}>{t}</div>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 10, fontSize: 10, color: "#888" }}>
          <span>🟢 Quiet</span><span>🟡 Moderate</span><span>🔴 Busy</span>
        </div>
      </div>
    </div>
    <BottomNav active="plan" onNavigate={onNavigate} />
  </PhoneFrame>
);

// ========== HORIZONTAL: Discover ==========
const DiscoverScreen = ({ onNavigate }) => (
  <PhoneFrame title="Discover" screenLabel="Horizontal · Discover" labelColor="#C0392B">
    <div style={{ padding: "0 20px" }}>
      <div style={{ fontSize: 13, color: "#888", marginBottom: 14 }}>Browse spaces, photos, and save favorites</div>

      <div style={{ fontSize: 13, fontWeight: 700, color: "#333", marginBottom: 10 }}>⭐ Your Favorites</div>
      <div style={{ display: "flex", gap: 10, marginBottom: 18, overflowX: "auto" }}>
        {[
          { name: "Hayden 2F", icon: "📚", status: "🟢" },
          { name: "ISTB4 QR", icon: "🔬", status: "🟡" },
        ].map((f, i) => (
          <div key={i} style={{
            minWidth: 110, background: "#fff", borderRadius: 14, padding: "14px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)", textAlign: "center",
            border: "1px solid #f0f0f0"
          }}>
            <div style={{ fontSize: 26 }}>{f.icon}</div>
            <div style={{ fontSize: 11, fontWeight: 700, marginTop: 4, color: "#1a1a1a" }}>{f.name}</div>
            <div style={{ fontSize: 10, color: "#888", marginTop: 2 }}>{f.status} Now</div>
          </div>
        ))}
        <div style={{
          minWidth: 110, background: "#f8f9fa", borderRadius: 14, padding: "14px",
          textAlign: "center", border: "1px dashed #ccc",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <span style={{ fontSize: 22, color: "#ccc" }}>+</span>
        </div>
      </div>

      <div style={{ fontSize: 13, fontWeight: 700, color: "#333", marginBottom: 10 }}>All Spaces</div>
      {["Hayden Library", "Noble Library", "Coor Hall", "ISTB4", "Design North", "MU Lower Level"].map((s, i) => (
        <div key={i} style={{
          background: "#fff", borderRadius: 12, padding: "12px 14px", marginBottom: 6,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)", border: "1px solid #f0f0f0"
        }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>{s}</span>
          <span style={{ fontSize: 14, color: "#ccc" }}>›</span>
        </div>
      ))}
    </div>
    <BottomNav active="discover" onNavigate={onNavigate} />
  </PhoneFrame>
);

// ========== HORIZONTAL: Settings ==========
const SettingsScreen = ({ onNavigate }) => (
  <PhoneFrame title="Settings" screenLabel="Horizontal · Preferences" labelColor="#7F8C8D">
    <div style={{ padding: "0 20px" }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#333", marginBottom: 10 }}>Preferences</div>
      {[
        { label: "Noise Tolerance", value: "Quiet" },
        { label: "Max Walk Distance", value: "10 min" },
        { label: "Must Have Outlets", value: "Yes" },
      ].map((p, i) => (
        <div key={i} style={{
          background: "#fff", borderRadius: 12, padding: "14px 16px", marginBottom: 8,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)", border: "1px solid #f0f0f0"
        }}>
          <span style={{ fontSize: 13, color: "#555" }}>{p.label}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#4A90D9" }}>{p.value}</span>
        </div>
      ))}

      <div style={{ fontSize: 13, fontWeight: 700, color: "#333", marginTop: 18, marginBottom: 10 }}>Notifications</div>
      {[
        { label: "Favorite space opens up", on: true },
        { label: "Quiet hours at saved spaces", on: true },
        { label: "Weekly insights", on: false },
      ].map((n, i) => (
        <div key={i} style={{
          background: "#fff", borderRadius: 12, padding: "14px 16px", marginBottom: 8,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)", border: "1px solid #f0f0f0"
        }}>
          <span style={{ fontSize: 13, color: "#555" }}>{n.label}</span>
          <div style={{
            width: 44, height: 24, borderRadius: 12, cursor: "pointer",
            background: n.on ? "#2ECC71" : "#ddd", position: "relative"
          }}>
            <div style={{
              width: 20, height: 20, borderRadius: "50%", background: "#fff",
              position: "absolute", top: 2, left: n.on ? 22 : 2,
              boxShadow: "0 1px 3px rgba(0,0,0,0.2)"
            }} />
          </div>
        </div>
      ))}

      <div style={{ fontSize: 13, fontWeight: 700, color: "#333", marginTop: 18, marginBottom: 10 }}>Privacy</div>
      <div style={{
        background: "#fff", borderRadius: 12, padding: "14px 16px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)", border: "1px solid #f0f0f0"
      }}>
        <span style={{ fontSize: 13, color: "#555" }}>Share location</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#F39C12" }}>While Using App</span>
      </div>
      <div style={{ fontSize: 11, color: "#aaa", marginTop: 6 }}>
        All reports are anonymous. Location is never shared with other users.
      </div>
    </div>
    <BottomNav active="settings" onNavigate={onNavigate} />
  </PhoneFrame>
);

// ========== MAIN APP ==========
export default function StudySpaceFinderPrototype() {
  const [screen, setScreen] = useState(screens.findNow);

  const navigate = (s) => setScreen(s);

  const screenMap = {
    [screens.findNow]: FindNowScreen,
    [screens.filter]: FilterScreen,
    [screens.results]: ResultsScreen,
    [screens.detail]: DetailScreen,
    [screens.navigate]: NavigateScreen,
    [screens.arrived]: ArrivedScreen,
    [screens.report]: ReportScreen,
    [screens.plan]: PlanScreen,
    [screens.discover]: DiscoverScreen,
    [screens.settings]: SettingsScreen,
  };

  const Screen = screenMap[screen] || FindNowScreen;

  // Vertical flow steps
  const verticalSteps = [
    { id: screens.findNow, label: "S1 · Home Map" },
    { id: screens.filter, label: "S2 · Filter" },
    { id: screens.results, label: "S3 · Results" },
    { id: screens.detail, label: "S4 · Detail" },
    { id: screens.navigate, label: "S5 · Directions" },
    { id: screens.arrived, label: "S6 · Arrived" },
  ];

  const horizontalTabs = [
    { id: screens.report, label: "Update (Report)" },
    { id: screens.plan, label: "Plan" },
    { id: screens.discover, label: "Discover" },
    { id: screens.settings, label: "Settings" },
  ];

  return (
    <div style={{
      height: "100vh", width: "100vw", display: "flex", overflow: "hidden",
      fontFamily: "'SF Pro Display', -apple-system, sans-serif"
    }}>
      {/* LEFT SIDEBAR — Navigation */}
      <div style={{
        width: 280, minWidth: 280, background: "#0c0c1d",
        display: "flex", flexDirection: "column", padding: "24px 16px",
        overflowY: "auto", borderRight: "1px solid rgba(255,255,255,0.06)"
      }}>
        {/* Title */}
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ color: "#fff", fontSize: 20, fontWeight: 800, margin: 0, letterSpacing: -0.5 }}>
            📍 Study Space Finder
          </h1>
          <p style={{ color: "#7777aa", fontSize: 11, margin: "4px 0 0" }}>
            Group 26 · A5 Prototype
          </p>
        </div>

        {/* Redesign changes */}
        <div style={{
          background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: "10px 12px",
          marginBottom: 20, border: "1px solid rgba(255,255,255,0.06)"
        }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: "#F39C12", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>
            Post-Eval Changes
          </div>
          <div style={{ fontSize: 10, color: "#8888aa", lineHeight: 1.6 }}>
            1. Pin popup on map tap<br/>
            2. "Report" → "Update" tab<br/>
            3. Prominent timestamps<br/>
            4. Enlarged back buttons
          </div>
        </div>

        {/* Vertical flow */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#2ECC71", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>
            Vertical — Find a Study Space
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {verticalSteps.map((s) => (
              <button key={s.id} onClick={() => navigate(s.id)} style={{
                padding: "8px 12px", borderRadius: 8, border: "none", cursor: "pointer",
                fontSize: 12, fontWeight: 600, textAlign: "left",
                background: screen === s.id ? "#2ECC71" : "rgba(255,255,255,0.04)",
                color: screen === s.id ? "#0c0c1d" : "#888",
                transition: "all 0.15s"
              }}>{s.label}</button>
            ))}
          </div>
        </div>

        {/* Horizontal tabs */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#4A90D9", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>
            Horizontal — Other Tasks
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {horizontalTabs.map((s) => (
              <button key={s.id} onClick={() => navigate(s.id)} style={{
                padding: "8px 12px", borderRadius: 8, border: "none", cursor: "pointer",
                fontSize: 12, fontWeight: 600, textAlign: "left",
                background: screen === s.id ? "#4A90D9" : "rgba(255,255,255,0.04)",
                color: screen === s.id ? "#fff" : "#888",
                transition: "all 0.15s"
              }}>{s.label}</button>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div style={{ marginTop: "auto", paddingTop: 20, display: "flex", flexDirection: "column", gap: 6, fontSize: 10, color: "#8888aa" }}>
          <span><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 2, background: "#2ECC71", marginRight: 6 }} />Vertical (S1–S6)</span>
          <span><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 2, background: "#4A90D9", marginRight: 6 }} />Horizontal</span>
        </div>
      </div>

      {/* RIGHT PANEL — Full screen prototype */}
      <div style={{
        flex: 1, background: "#FAFAFA", position: "relative", overflow: "hidden"
      }}>
        <Screen onNavigate={navigate} />
      </div>
    </div>
  );
}