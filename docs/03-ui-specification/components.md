# Reusable Components

> **Component library and design system**

---

## 🎨 Component Overview

The game uses a **custom component system** with consistent styling and behavior.

### Component Categories
1. **Base Components** (buttons, badges, inputs)
2. **Card Components** (product cards, employee cards)
3. **Interactive Components** (filters, sliders, dropdowns)
4. **Feedback Components** (notifications, tooltips, progress bars)
5. **Layout Components** (panels, headers, navigation)

---

## 🔘 Base Components

### Button
**Variants:**
- **Primary:** Blue gradient, white text (main actions)
- **Secondary:** White background, gray border (cancel actions)
- **Danger:** Red gradient, white text (destructive actions)
- **Icon Button:** Icon + text, various colors

**States:**
- Default
- Hover (lift effect)
- Active (pressed state)
- Disabled (grayed out, no interaction)

**Usage:**
```html
<!-- Primary -->
<button class="btn-primary">Start Game</button>

<!-- Secondary -->
<button class="btn">Cancel</button>

<!-- Danger -->
<button class="btn-danger">Fire Employee</button>

<!-- Icon Button -->
<button class="btn-icon">
  <i data-lucide="save"></i>
  <span>Save</span>
</button>
```

---

### Badge
**Types:**
- **Status Badge:** Product status (in dev, published, deprecated)
- **Count Badge:** Notification dots (red dot with count)
- **Info Badge:** Founder badge, milestone badge

**Colors:**
- Orange: In development, warning
- Green: Published, success
- Red: Deprecated, error, urgent
- Purple: Manager, special
- Gold: Founder, premium

**Usage:**
```html
<span class="badge badge-success">Published</span>
<span class="badge badge-warning">In Development</span>
<span class="badge badge-danger">Deprecated</span>
<span class="badge badge-info">Founder ⭐</span>
```

---

### Progress Bar
**Features:**
- Percentage display
- Color-coded (based on progress %)
- Smooth animations
- Optional label

**Usage:**
```html
<div class="progress-container">
  <div class="progress-label">
    <span>Development Progress</span>
    <span>45%</span>
  </div>
  <div class="progress-bar">
    <div class="progress-fill" style="width: 45%; background: #f59e0b;"></div>
  </div>
</div>
```

**Color Scheme:**
- 0-30%: Red
- 31-70%: Orange
- 71-99%: Yellow
- 100%: Green

---

### Filter Pill
**States:**
- Inactive: Gray background
- Active: Colored background (based on filter type)

**Colors (Active):**
- Blue: Default (developers, all)
- Orange: In development
- Green: Published, live
- Red: Deprecated, unassigned
- Purple: Marketers
- Gold: Promotion ready

**Usage:**
```html
<div class="filter-pills">
  <button class="filter-pill active" data-filter="all">
    All (25)
  </button>
  <button class="filter-pill" data-filter="in_development">
    In Development (5)
  </button>
  <button class="filter-pill" data-filter="published">
    Published (15)
  </button>
</div>
```

---

## 📇 Card Components

### Product Card
**Structure:**
- Header: Name + Expand/Collapse icon
- Status badge
- Key metrics (subscribers, revenue, progress)
- Expanded state:
  - Detailed stats
  - Assigned team
  - Action buttons

**Expanded vs Collapsed:**
```
Collapsed (60px height):
┌─────────────────────────────┐
│ Task Manager         [v]    │
│ 📦 Published | 500 subs     │
└─────────────────────────────┘

Expanded (200px+ height):
┌─────────────────────────────┐
│ Task Manager         [^]    │
│ 📦 Published | 500 subs     │
│ $5,000/mo revenue           │
│                             │
│ Marketers (2):              │
│ • John Smith (1.2 eff)      │
│ • Jane Doe (0.8 eff)        │
│                             │
│ Daily Growth: ~12 subs/day  │
│ Team Penalty: 6%            │
│                             │
│ [Assign Marketers]          │
│ [Deprecate Product]         │
└─────────────────────────────┘
```

---

### Employee Card
**Structure:**
- Header: Name + Expand/Collapse icon
- Tier and role
- Efficiency display
- Salary
- Badges (promotion, unassigned)
- Expanded state:
  - Experience months
  - Assigned product
  - Team penalty info
  - Action buttons

**Founder Card (Special):**
```
┌─────────────────────────────┐
│ Founder ⭐          [v]     │
│ Intermediate Developer      │
│ 💼 1.5 efficiency           │
│ $0/mo (No salary)           │
│                             │
│ [Expanded State]            │
│ Experience: 24 months       │
│ Assigned to: CRM Software   │
│                             │
│ ℹ️ Founder cannot be fired  │
│                             │
│ [Unassign]                  │
└─────────────────────────────┘
```

---

### R&D Card
**Structure:**
- Header: Name + Category icon
- Progress bar
- Assigned developers
- Estimated completion
- Action buttons

**Completed R&D Card:**
```
┌─────────────────────────────┐
│ ✅ SEO & Content Marketing   │
│ 🚀 Growth Category          │
│                             │
│ Effect: +5% organic growth  │
│ Completed: Day 45           │
└─────────────────────────────┘
```

---

## 🎯 Interactive Components

### Salary Slider (Promotion Modal)
**Features:**
- Min/Max range display
- Real-time offer update
- Acceptance probability calculation
- Color-coded probability

**UI:**
```
┌─────────────────────────────┐
│ Your Offer: $5,500/mo       │
│                             │
│ [=====|=====]               │
│ $4,400    $6,600            │
│                             │
│ 📊 Acceptance: 92% ✅       │
└─────────────────────────────┘
```

---

### Checkbox List (Assignment Modal)
**Features:**
- Multi-select checkboxes
- Individual item display (name, efficiency, tier)
- Selection summary (count, team penalty)
- Select/Deselect all (future feature)

**UI:**
```
┌─────────────────────────────┐
│ Select developers to assign │
│                             │
│ [✓] Founder (1.0 eff)       │
│ [ ] John Smith (0.5 eff)    │
│ [✓] Jane Doe (1.2 eff)      │
│                             │
│ Selected: 2 | Penalty: 6%   │
└─────────────────────────────┘
```

---

### Dropdown Select (Future Feature)
**Planned for:**
- Currency selection
- Speed selection
- Filter selection (alternative to pills)

---

## 💬 Feedback Components

### Notification Toast
**Types:**
- Success (green gradient)
- Warning (orange gradient)
- Error (red gradient)
- Info (purple gradient)

**Features:**
- Fixed position (top center)
- Auto-dismiss after 3 seconds
- Slide in/out animations
- Icon + message
- Stack multiple notifications

**UI:**
```
┌─────────────────────────────┐
│ ✅ Game saved successfully! │
└─────────────────────────────┘

┌─────────────────────────────┐
│ ⚠️ Server capacity full!    │
└─────────────────────────────┘

┌─────────────────────────────┐
│ ❌ Not enough cash to hire! │
└─────────────────────────────┘
```

---

### Milestone Achievement Notification
**Special Notification:**
- Large centered modal
- Fancy animation
- Shows milestone name, badge, description
- Auto-dismiss after 5 seconds

**UI:**
```
┌─────────────────────────────┐
│                             │
│      🏆 Milestone!          │
│                             │
│    📈 Small Business        │
│                             │
│  Growing Talent Pool        │
│                             │
└─────────────────────────────┘
```

---

### Team Penalty Icon
**Features:**
- Small "?" icon
- Color-coded (grey/orange/red)
- Shows tooltip on click
- Explains team overhead

**Colors:**
- Grey: <15% penalty (minimal)
- Orange: 15-30% penalty (moderate)
- Red: 30%+ penalty (severe)

**Tooltip:**
```
┌─────────────────────────────┐
│ Team Penalty: 24%           │
│                             │
│ Team Size: 5 people         │
│ (5-1) × 6% = 24%            │
│                             │
│ Each team member is 24%     │
│ less efficient due to       │
│ communication overhead.     │
└─────────────────────────────┘
```

---

## 🎨 Design System

### Color Palette

**Primary Colors:**
- Blue: `#2563eb` (primary actions, default active)
- Indigo: `#4f46e5` (header gradient)

**Status Colors:**
- Green: `#059669` (success, published)
- Orange: `#f59e0b` (warning, in development)
- Red: `#dc2626` (error, deprecated, critical)
- Purple: `#8b5cf6` (special, marketer, achievement)

**Neutrals:**
- Gray 50: `#f9fafb` (background)
- Gray 200: `#e5e7eb` (borders)
- Gray 700: `#374151` (text)
- Gray 900: `#111827` (headings)

---

### Typography

**Font Stack:**
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
             Oxygen, Ubuntu, Cantarell, sans-serif;
```

**Sizes:**
- Heading 1: 1.5rem (24px)
- Heading 2: 1.25rem (20px)
- Body: 0.875rem (14px)
- Small: 0.75rem (12px)
- Tiny: 0.7rem (11px)

**Weights:**
- Normal: 400
- Medium: 500
- Semibold: 600
- Bold: 700

---

### Spacing

**Scale (rem):**
- 0.25rem (4px)
- 0.5rem (8px)
- 0.75rem (12px)
- 1rem (16px)
- 1.5rem (24px)
- 2rem (32px)

**Usage:**
- Padding inside cards: 1rem (16px)
- Gap between cards: 0.5rem (8px)
- Panel padding: 1rem (16px)
- Modal padding: 1.5rem (24px)

---

### Borders & Shadows

**Border Radius:**
- Small: 4px (badges, small buttons)
- Medium: 8px (cards, modals)
- Large: 12px (panels, large modals)
- Full: 9999px (pills, circular badges)

**Box Shadows:**
```css
/* Cards */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

/* Modals */
box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

/* Header */
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
```

---

## 🎯 Component States

### Interactive States (All Clickable Elements)

**Default:**
- Normal appearance
- Cursor: pointer

**Hover:**
- Slight background color change
- Lift effect (translateY(-1px))
- Border color change

**Active (Pressed):**
- Pressed down effect (translateY(0))
- Slightly darker background

**Disabled:**
- Grayed out (opacity: 0.5)
- Cursor: not-allowed
- No hover effects

---

### Card States

**Collapsed:**
- Height: ~60-80px
- Shows summary only
- Chevron down icon (v)

**Expanded:**
- Height: auto (200-400px)
- Shows all details
- Action buttons visible
- Chevron up icon (^)

---

## 📱 Mobile Adaptations

### Component Adjustments (<1024px)

**Buttons:**
- Smaller padding (0.5rem instead of 0.75rem)
- Smaller font size (0.875rem instead of 1rem)
- Full width on mobile (except in groups)

**Cards:**
- Larger touch targets (min 44px height)
- More padding for readability
- Simpler layouts (stack instead of grid)

**Filter Pills:**
- Smaller size (0.7rem font)
- Wrap to multiple rows if needed

**Text:**
- Slightly smaller overall
- More line height for readability
- Truncate long text with ellipsis

---

## 🎨 Icon System

### Lucide Icons
The game uses **Lucide** icons for consistent iconography.

**Common Icons:**
```javascript
Icons = {
  // Actions
  'save': Save icon,
  'refresh-cw': Reset icon,
  'play': Play icon,
  'pause': Pause icon,
  'plus': Add/Create icon,
  'x': Close/Cancel icon,
  'check': Confirm icon,
  
  // Entities
  'package': Product icon,
  'flask': R&D icon,
  'users': Team icon,
  'user': Employee icon,
  'trending-up': Growth icon,
  'dollar-sign': Money icon,
  
  // Status
  'alert-circle': Warning icon,
  'info': Info icon,
  'check-circle': Success icon,
  'x-circle': Error icon
}
```

**Usage:**
```html
<i data-lucide="save" class="w-4 h-4"></i>
<i data-lucide="user" class="w-5 h-5"></i>
```

---

## 🎯 Component Design Patterns

### Expandable Cards
**Pattern:**
- Click anywhere on card header to expand/collapse
- Icon changes (v → ^)
- Smooth height transition (0.3s)
- Content fades in when expanding

**Implementation:**
```javascript
function toggleCard(cardId) {
  card = document.getElementById(cardId)
  isExpanded = card.dataset.expanded === 'true'
  
  if (isExpanded) {
    // Collapse
    card.dataset.expanded = 'false'
    card.querySelector('.card-content').style.maxHeight = '0'
    card.querySelector('.chevron').textContent = 'v'
  } else {
    // Expand
    card.dataset.expanded = 'true'
    content = card.querySelector('.card-content')
    content.style.maxHeight = content.scrollHeight + 'px'
    card.querySelector('.chevron').textContent = '^'
  }
}
```

---

### Filter System
**Pattern:**
- Pills toggle on click
- Only one active at a time
- Updates counts dynamically
- Filters cards in real-time

**Implementation:**
```javascript
function filterItems(category, filterValue) {
  // Update pills
  pills = document.querySelectorAll('.filter-pill')
  pills.forEach(pill => pill.classList.remove('active'))
  event.target.classList.add('active')
  
  // Filter cards
  cards = document.querySelectorAll('.card')
  cards.forEach(card => {
    if (filterValue === 'all' || card.dataset.status === filterValue) {
      card.style.display = 'block'
    } else {
      card.style.display = 'none'
    }
  })
}
```

---

### Scrollable Lists
**Pattern:**
- Max height constraint
- Vertical scroll
- Fade effect at top/bottom (optional)
- Smooth scrolling

**Usage:**
```css
.scrollable-list {
  max-height: 400px;
  overflow-y: auto;
  padding: 0.5rem;
}

/* Webkit scrollbar styling */
.scrollable-list::-webkit-scrollbar {
  width: 8px;
}

.scrollable-list::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
```

---

## 💡 Component Best Practices

### Do's ✅
- Use consistent spacing (Tailwind scale)
- Apply hover states to all interactive elements
- Show loading states for async actions
- Provide visual feedback for user actions
- Use semantic HTML (button, input, etc.)
- Make touch targets ≥44px on mobile

### Don'ts ❌
- Don't use inline styles (use classes)
- Don't create custom scrollbars (use browser default)
- Don't animate expensive properties (use transform/opacity)
- Don't nest interactive elements (button inside button)
- Don't rely solely on color (add icons/text)

---

## 🔄 Update History
- **v1.0** (2026-01-24): Initial component documentation
