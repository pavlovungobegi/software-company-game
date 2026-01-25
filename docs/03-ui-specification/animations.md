# Animations & Transitions

> **Visual feedback, transitions, and animation system**

---

## 🎬 Animation Overview

The game uses **CSS animations** and **JavaScript transitions** for smooth, responsive feedback.

### Animation Principles
- **Subtle and functional** - Not distracting
- **Fast feedback** - 200-300ms for most transitions
- **Meaningful motion** - Animations convey state changes
- **Performance-first** - Use transform/opacity (GPU-accelerated)

---

## ✨ Core Animations

### 1. Notification Toast Animations

**Slide Down (Entry):**
```css
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

.notification {
  animation: slideDown 0.3s ease-out;
}
```

**Slide Up (Exit):**
```css
@keyframes slideUp {
  from {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  to {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px);
  }
}

.notification {
  animation: 
    slideDown 0.3s ease-out,
    slideUp 0.3s ease-in 2.7s forwards;
}
```

**Timeline:**
- 0.0s: Slide down (enter)
- 0.3s-2.7s: Visible
- 2.7s-3.0s: Slide up (exit)
- 3.0s: Remove from DOM

---

### 2. Milestone Achievement Animation

**Dramatic Entrance:**
```css
@keyframes milestoneAppear {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.0);
  }
}

.milestone-notification {
  animation: milestoneAppear 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
```

**Features:**
- Centered on screen
- Scale + fade effect
- Elastic easing (bounces slightly)
- Auto-dismiss after 5 seconds

---

### 3. Modal Animations

**Overlay Fade:**
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-overlay {
  animation: fadeIn 0.2s ease-out;
}
```

**Modal Slide:**
```css
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal {
  animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

### 4. Card Expand/Collapse

**Expand:**
```javascript
// Smooth height transition
card.style.transition = 'max-height 0.3s ease-out'
card.style.maxHeight = '0'  // Start

// Expand
card.style.maxHeight = card.scrollHeight + 'px'
```

**Collapse:**
```javascript
// Smooth height transition
card.style.maxHeight = card.scrollHeight + 'px'  // Start

// Force reflow
card.offsetHeight

// Collapse
card.style.maxHeight = '0'
```

**Duration:** 300ms

---

### 5. Button Hover/Active States

**Hover:**
```css
.btn:hover {
  transform: translateY(-1px);
  transition: all 0.2s ease;
}
```

**Active (Pressed):**
```css
.btn:active {
  transform: translateY(0);
}
```

**Duration:** 200ms

---

### 6. Cash Display Flash (Low Balance)

**Flashing Red Animation:**
```css
@keyframes flash {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

.cash-display.flashing-red {
  animation: flash 1s ease-in-out infinite;
}
```

**Trigger:** When cash < $0

---

### 7. Filter Pill Transitions

**Color Transition:**
```css
.filter-pill {
  transition: all 0.2s ease;
}

.filter-pill:not(.active) {
  background: #f3f4f6;
  color: #374151;
}

.filter-pill.active {
  background: #2563eb;
  color: white;
}
```

**Duration:** 200ms

---

### 8. Pause Border Overlay

**Fade In/Out:**
```css
.pause-border-overlay {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.pause-border-overlay.active {
  opacity: 1;
}
```

**Visual:**
- Yellow border around entire screen
- Subtle glow effect
- Indicates paused state

---

### 9. Progress Bar Fill

**Smooth Fill:**
```css
.progress-fill {
  transition: width 0.5s ease-out;
}
```

**Example:**
```javascript
// Update progress
progressBar.style.width = '45%'  // Animates from previous width
```

**Duration:** 500ms

---

### 10. Panel Height Calculation (Mobile)

**Dynamic Resize:**
```javascript
// Calculate heights after DOM ready
function calculatePanelHeights() {
  headerHeight = document.querySelector('.header-wrapper').offsetHeight
  navHeight = document.querySelector('.mobile-nav').offsetHeight
  
  availableHeight = window.innerHeight - headerHeight - navHeight
  
  panels.forEach(panel => {
    panel.style.minHeight = availableHeight + 'px'
  })
}

// Recalculate on resize
window.addEventListener('resize', debounce(calculatePanelHeights, 200))
```

---

## 🎯 Animation Timing Reference

| Animation | Duration | Easing | Use Case |
|-----------|----------|--------|----------|
| Notification enter | 300ms | ease-out | Toast slide down |
| Notification exit | 300ms | ease-in | Toast slide up |
| Modal overlay | 200ms | ease-out | Fade in |
| Modal content | 300ms | cubic-bezier | Slide up with bounce |
| Milestone | 500ms | cubic-bezier | Dramatic entrance |
| Button hover | 200ms | ease | Lift effect |
| Card expand | 300ms | ease-out | Height transition |
| Filter switch | 200ms | ease | Color transition |
| Progress bar | 500ms | ease-out | Fill animation |
| Cash flash | 1000ms | ease-in-out | Infinite loop |

---

## 🎨 Easing Functions

### Standard Easings
```css
/* Ease Out - Fast start, slow end (entrances) */
cubic-bezier(0, 0, 0.2, 1)

/* Ease In - Slow start, fast end (exits) */
cubic-bezier(0.4, 0, 1, 1)

/* Ease In-Out - Smooth both ends (transitions) */
cubic-bezier(0.4, 0, 0.2, 1)

/* Elastic - Bounce effect (special moments) */
cubic-bezier(0.34, 1.56, 0.64, 1)
```

---

## 💫 Special Effects

### Milestone Achievement Sequence
```
1. Game pauses automatically
   ↓
2. Overlay fades in (200ms)
   ↓
3. Milestone card scales up + fades in (500ms)
   ↓
4. Confetti effect (optional, future)
   ↓
5. Hold for 5 seconds
   ↓
6. Card scales down + fades out (300ms)
   ↓
7. Overlay fades out (200ms)
   ↓
8. Game remains paused (user controls)
```

---

### Product Published Celebration
```
1. Progress reaches 100%
   ↓
2. Product card border flashes green (3 times)
   ↓
3. Status badge animates (orange → green)
   ↓
4. Success notification slides down
   ↓
5. Optional: Celebration sound plays
   ↓
6. Card updates to show new state
```

---

### Low Cash Warning
```
1. Cash drops below $10,000
   ↓
2. Cash display color: green → yellow
   ↓
3. Smooth color transition (500ms)

1b. Cash drops below $0
    ↓
2b. Cash display color: yellow → red
    ↓
3b. Start flashing animation (infinite)
    ↓
4b. Warning notification appears
```

---

## 🎮 Interactive Feedback

### Click Feedback
```css
/* All clickable elements */
.clickable {
  cursor: pointer;
  transition: transform 0.1s ease;
}

.clickable:active {
  transform: scale(0.98);
}
```

### Hover Feedback
```css
/* Lift effect for cards and buttons */
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
}
```

### Selection Feedback
```css
/* Checkbox selection in modals */
.checkbox:checked + label {
  background: #dbeafe;
  border-color: #2563eb;
  transition: all 0.2s ease;
}
```

---

## 📱 Mobile-Specific Animations

### Panel Switching
```javascript
function switchPanel(newPanelId) {
  // Fade out current panel
  currentPanel.style.transition = 'opacity 0.2s ease-out'
  currentPanel.style.opacity = '0'
  
  setTimeout(() => {
    currentPanel.style.display = 'none'
    
    // Fade in new panel
    newPanel.style.display = 'block'
    newPanel.style.opacity = '0'
    newPanel.style.transition = 'opacity 0.2s ease-in'
    
    // Force reflow
    newPanel.offsetHeight
    
    newPanel.style.opacity = '1'
  }, 200)
}
```

---

### Bottom Nav Button Feedback
```css
.mobile-nav-btn {
  transition: all 0.2s ease;
}

.mobile-nav-btn.active {
  background: #2563eb;
  color: white;
  transform: scale(1.05);
}
```

---

### Notification Dot Pulse
```css
@keyframes pulse-notification {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}

.nav-notification-dot {
  animation: pulse-notification 2s ease-in-out infinite;
}
```

---

## 🎨 Loading States (Future Feature)

### Skeleton Loaders (Planned)
```css
@keyframes skeleton-loading {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}

.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: skeleton-loading 1.5s ease-in-out infinite;
}
```

---

### Spinner (Planned)
```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinner {
  animation: spin 1s linear infinite;
}
```

---

## ⚠️ Performance Considerations

### Do's ✅
- Use `transform` and `opacity` for animations (GPU-accelerated)
- Use `will-change` for complex animations
- Debounce resize/scroll events
- Remove animations on slow devices (prefers-reduced-motion)

### Don'ts ❌
- Don't animate `width`, `height`, `top`, `left` (causes reflow)
- Don't animate during game ticks (expensive)
- Don't stack too many animations
- Don't use JavaScript for simple transitions (use CSS)

---

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🎯 Animation Checklist

### Essential Animations ✅
- [x] Notification slide in/out
- [x] Modal fade + slide
- [x] Card expand/collapse
- [x] Button hover/active
- [x] Filter pill transitions
- [x] Progress bar fill
- [x] Cash flash (low balance)
- [x] Milestone achievement
- [x] Pause border overlay

### Nice-to-Have (Future) ⏳
- [ ] Confetti effect (celebrations)
- [ ] Number count-up (cash, subscribers)
- [ ] Card shuffle (sorting)
- [ ] Skeleton loaders (loading states)
- [ ] Ripple effect (material design)
- [ ] Parallax effects (background)

---

## 🔄 Update History
- **v1.0** (2026-01-24): Initial animation documentation
