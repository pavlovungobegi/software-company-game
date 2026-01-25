# Screen Layouts

> **All screens, panels, and layout structure**

---

## 🖥️ Layout Overview

### Desktop Layout (1024px+)
```
┌─────────────────────────────────────────────────────┐
│ HEADER (Fixed)                                      │
│ Company Name | Day Counter | Cash | Speed Controls │
├─────────────────────────────────────────────────────┤
│                                                     │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│ │ Products │ │ R&D      │ │ Event    │           │
│ │ Panel    │ │ Panel    │ │ Log      │           │
│ │          │ │          │ │ Panel    │           │
│ │          │ │          │ │          │           │
│ │          │ │          │ │          │           │
│ └──────────┘ └──────────┘ └──────────┘           │
│                                                     │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│ │ Employees│ │ Finances │ │          │           │
│ │ Panel    │ │ Panel    │ │          │           │
│ │          │ │          │ │          │           │
│ │          │ │          │ │          │           │
│ └──────────┘ └──────────┘ └──────────┘           │
└─────────────────────────────────────────────────────┘
```

**Grid:** 3 columns, responsive

---

### Mobile Layout (<1024px)
```
┌───────────────────────┐
│ HEADER (Compact)      │
│ Company | Day | Cash  │
├───────────────────────┤
│                       │
│ [Active Panel Only]   │
│                       │
│                       │
│                       │
│                       │
│                       │
│                       │
│                       │
├───────────────────────┤
│ BOTTOM NAV (Fixed)    │
│ [📦][🔬][👥][💰][📋] │
└───────────────────────┘
```

**Single panel at a time with bottom navigation**

---

## 📋 Panel Specifications

### 1. Header (Fixed Top)

**Desktop Layout:**
```
┌─────────────────────────────────────────────────────┐
│ Left Side:                      Right Side:         │
│ • Company Name                  • Cash (large)      │
│ • Day Counter                   • Next Billing Info │
│ • Founder Badge                                     │
│                                                     │
│ Controls Bar:                                       │
│ [Pause] [1x] [2x] [4x] | [Save] [Reset]           │
└─────────────────────────────────────────────────────┘
```

**Mobile Layout:**
```
┌────────────────────────┐
│ Company Name           │
│ Day 50 | Week 7        │
│ $25,000 (Yellow)       │
│ Next: -$5,000 in 10d   │
└────────────────────────┘
```

**Components:**
- Company name (editable on click?)
- Day counter with week calculation
- Cash display (color-coded: green/yellow/red)
- Next billing projection (cash flow + days)
- Speed controls (1x/2x/4x)
- Pause button (yellow highlight when paused)
- Save button
- Reset button

---

### 2. Products Panel

**Header:**
- Title: "Products"
- Action: "New Product" button
- Filter pills: All | In Development | Published | Deprecated

**Content:**
- Scrollable list of product cards
- Empty state: "No products yet. Create your first product!"

**Product Card:**
```
┌─────────────────────────────┐
│ Task Manager         [v]    │ ← Expandable
│ 📦 Published                │
│ 500 subscribers             │
│ $5,000/mo revenue           │
│                             │
│ [Expanded State]            │
│ Progress: 100%              │
│ Assigned Developers: None   │
│ Assigned Marketers: 2       │
│ • John Smith (1.2 eff)      │
│ • Jane Doe (0.8 eff)        │
│                             │
│ [Assign Devs] [Assign Mkts] │
│ [Deprecate]                 │
└─────────────────────────────┘
```

**Status Colors:**
- In Development: Orange
- Published: Green
- Deprecated: Red

---

### 3. R&D Panel

**Header:**
- Title: "R&D Projects"
- Action: "New R&D Project" button
- Filter pills: All | Available | In Progress | Completed

**Content:**
- Scrollable list of R&D cards
- Shows active projects and completed projects
- Empty state: "No R&D projects. Start researching!"

**R&D Card:**
```
┌─────────────────────────────┐
│ SEO & Content Marketing [v] │
│ 🚀 Growth Category          │
│ Progress: 45%               │
│ [████████████░░░░░░░░]      │
│                             │
│ Assigned: 2 developers      │
│ • Founder (1.0 eff)         │
│ • John Smith (0.5 eff)      │
│                             │
│ Est. Completion: 3 days     │
│                             │
│ [Assign Developers]         │
└─────────────────────────────┘
```

---

### 4. Employees Panel

**Header:**
- Title: "Team"
- Actions: "Hire Developer" | "Hire Marketer" | "Hire Manager" (if unlocked)
- Filter pills: All | Developers | Marketers | Managers | Unassigned | Ready for Promotion

**Content:**
- Founder card (always first)
- Scrollable list of employee cards
- Empty state: "No employees. Hire your first developer!"

**Employee Card:**
```
┌─────────────────────────────┐
│ John Smith          [v]     │
│ Junior Developer            │
│ 💼 1.2 efficiency           │
│ $3,500/mo                   │
│                             │
│ [Expanded State]            │
│ Experience: 12 months       │
│ Assigned to: Task Manager   │
│ Team Penalty: 6% (2 people) │
│                             │
│ 🎖️ Ready for Promotion!     │
│                             │
│ [Promote] [Fire] [Unassign] │
└─────────────────────────────┘
```

**Special Badges:**
- 🎖️ Ready for Promotion (green badge)
- ⚠️ Unassigned (red badge)
- 👔 Manager (purple badge)
- ⭐ Founder (gold badge)

---

### 5. Finances Panel

**Header:**
- Title: "Finances"
- Actions: "Upgrade Office" | "Upgrade Server"

**Content:**
```
┌─────────────────────────────┐
│ Current Balance             │
│ $25,000                     │
│                             │
│ Next Billing (10 days)      │
│ Revenue: $10,000            │
│ Expenses: $15,000           │
│ Net: -$5,000 ⚠️             │
│                             │
│ ─────────────────────       │
│                             │
│ Infrastructure              │
│ • Office: Home (Cap: 3)     │
│   [Upgrade Office]          │
│                             │
│ • Server: Basic (Cap: 1K)   │
│   [Upgrade Server]          │
│                             │
│ ─────────────────────       │
│                             │
│ Milestone Progress          │
│ 🌱 Startup                  │
│ [████████████░░░░░░░] 60%   │
│ $60K / $100K to Small Biz   │
└─────────────────────────────┘
```

---

### 6. Event Log Panel

**Header:**
- Title: "Event Log"
- Actions: "Save" | "Reset" buttons

**Content:**
- Auto-scrolling log (newest at bottom)
- Shows last 50 events
- Color-coded by type:
  - 💵 Green: Revenue, hiring
  - ⚠️ Yellow: Warnings
  - ❌ Red: Errors, firing
  - 🎉 Purple: Achievements, unlocks

**Event Format:**
```
Day 15: 💵 Hired Junior Developer: John Smith ($3,500/mo)
Day 20: ⚠️ Server approaching capacity (800/1000)
Day 30: 💰 Monthly Income: $10,000
Day 30: 💸 Monthly Expenses: $15,000
Day 45: 🎉 "Task Manager" is now published!
```

---

## 🎯 Responsive Breakpoints

### Desktop (1024px+)
- 3-column grid layout
- All panels visible
- Fixed header (130px height)
- No mobile navigation

### Tablet (768px-1024px)
- 2-column grid layout
- Panels wrap
- Smaller header
- No mobile navigation

### Mobile (<768px)
- Single panel view
- Bottom navigation bar
- Much smaller header (70px)
- Panel switching via bottom nav

---

## 🎨 Panel Transitions (Mobile)

### Panel Switching Animation
```javascript
function switchToPanel(panelName) {
  // Hide all panels
  panels.forEach(p => {
    p.classList.add('hidden')
    p.classList.remove('fade-in')
  })
  
  // Show selected panel with fade-in
  selectedPanel = document.getElementById(panelName)
  selectedPanel.classList.remove('hidden')
  selectedPanel.classList.add('fade-in')
  
  // Update navigation buttons
  updateNavButtons(panelName)
}
```

### Fade Animation
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in {
  animation: fadeIn 0.3s ease-out;
}
```

---

## 🔄 Update History
- **v1.0** (2026-01-24): Initial screen layout documentation
