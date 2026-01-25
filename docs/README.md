# Software Company Simulator - Documentation

> **Complete game design documentation for framework migration**

This documentation is the **single source of truth** for migrating the game from a single HTML file to a proper React/Next.js application.

---

## 📚 Documentation Structure

### 📁 `/01-game-mechanics/`
Core game mechanics and rules (business logic layer)

- **[economy.md](01-game-mechanics/economy.md)** ✅ - Cash flow, billing cycles, revenue, expenses
- **[products.md](01-game-mechanics/products.md)** ✅ - Product lifecycle, development, subscribers
- **[employees.md](01-game-mechanics/employees.md)** ✅ - Hiring, tiers, efficiency, promotions
- **[managers.md](01-game-mechanics/managers.md)** ✅ - Manager system, capacity, optimization
- **[rnd.md](01-game-mechanics/rnd.md)** ✅ - R&D projects, unlocks, tech tree
- **[milestones.md](01-game-mechanics/milestones.md)** ✅ - Achievement thresholds, unlock conditions

### 📁 `/02-state-management/`
State schema and calculations (data layer)

- **[formulas.md](02-state-management/formulas.md)** ✅ - ⚠️ **CRITICAL** - All mathematical formulas
- **[state-schema.ts](02-state-management/state-schema.ts)** ✅ - TypeScript interfaces for all state
- **[save-load.md](02-state-management/save-load.md)** ✅ - Save format, migrations, versioning

### 📁 `/03-ui-specification/`
UI/UX design and interactions (presentation layer)

- **[screens.md](03-ui-specification/screens.md)** ✅ - All screens/panels layout
- **[modals.md](03-ui-specification/modals.md)** ✅ - Every modal with triggers and flows
- **[components.md](03-ui-specification/components.md)** ✅ - Reusable components catalog
- **[flows.md](03-ui-specification/flows.md)** ✅ - User interaction flows
- **[animations.md](03-ui-specification/animations.md)** ✅ - Transitions, notifications, effects

### 📁 Root Documentation
- **[README.md](README.md)** ✅ - Migration overview and architecture
- **[GETTING-STARTED.md](GETTING-STARTED.md)** ✅ - How to use this documentation
- **[QUICK-REFERENCE.md](QUICK-REFERENCE.md)** ✅ - One-page summary
- **[MIGRATION-CHECKLIST.md](MIGRATION-CHECKLIST.md)** ✅ - Step-by-step tasks
- **[ERRATA.md](ERRATA.md)** ⚠️ - Known corrections needed

---

## 🎯 Migration Strategy

### Phase 1: Documentation ✅ (COMPLETE!)
**Goal:** Extract all game logic, formulas, and state schema from HTML file

**Status:**
- ✅ Core formulas documented (`formulas.md`)
- ✅ Economy system documented (`economy.md`)
- ✅ Product system documented (`products.md`)
- ✅ Employee system documented (`employees.md`)
- ✅ TypeScript state schema created (`state-schema.ts`)
- ✅ Manager system documented (`managers.md`)
- ✅ R&D system documented (`rnd.md`)
- ✅ Milestones documented (`milestones.md`)
- ✅ Save/Load system documented (`save-load.md`)
- ✅ UI specifications documented (`screens.md`, `modals.md`, `components.md`, `flows.md`, `animations.md`)
- ⚠️ Minor corrections needed (see `ERRATA.md`)

**Why This Matters:**
- Prevents bugs during migration (single source of truth)
- Enables parallel development (frontend + backend teams)
- Documents edge cases and special rules
- Creates testable specifications

---

### Phase 2: State Management (Next)
**Goal:** Implement state management layer with tests

**Tasks:**
1. Create Redux/Zustand store based on `state-schema.ts`
2. Implement all calculation functions from `formulas.md`
3. Write unit tests for each formula
4. Implement save/load system
5. Create state migration utilities

**Success Criteria:**
- All formulas pass tests with edge cases
- State can be serialized/deserialized
- 100% formula coverage with tests

---

### Phase 3: UI Components (Future)
**Goal:** Build React components matching current design

**Tasks:**
1. Create component library (buttons, cards, modals)
2. Build layout system (header, panels, mobile nav)
3. Implement animations and transitions
4. Build forms (hiring, product creation, R&D)
5. Mobile-responsive design

**Success Criteria:**
- Visual parity with current HTML version
- All interactions functional
- Mobile experience optimized

---

### Phase 4: Integration (Future)
**Goal:** Connect UI to state management

**Tasks:**
1. Wire up all buttons and actions
2. Implement game loop (tick system)
3. Add notification system
4. Integrate save/load UI
5. Implement game speed controls

**Success Criteria:**
- Full gameplay experience matches original
- No regressions in game mechanics
- Performance optimized (60fps+)

---

### Phase 5: Enhancements (Future)
**Goal:** Add features that were difficult in HTML

**Ideas:**
- Analytics dashboard
- Historical charts (revenue, subscribers, efficiency)
- Advanced filters and search
- Multiplayer/leaderboards
- Steam achievements
- Cloud save sync

---

## 🔧 Technical Stack (Proposed)

### Frontend
- **Framework:** Next.js 15 (App Router)
- **State:** Redux Toolkit or Zustand
- **Styling:** Tailwind CSS (already using)
- **Icons:** Lucide React (already using)
- **Charts:** Recharts or Chart.js
- **Testing:** Vitest + React Testing Library

### Backend (Optional)
- **API:** Next.js API routes
- **Database:** PostgreSQL (for cloud saves)
- **Auth:** NextAuth.js (for multiplayer)
- **Hosting:** Vercel

### Dev Tools
- **TypeScript:** Full type safety
- **ESLint:** Code quality
- **Prettier:** Code formatting
- **Husky:** Git hooks (pre-commit tests)

---

## 📖 How to Use This Documentation

### For Developers
1. **Start with `formulas.md`** - Understand ALL calculations before coding
2. **Use `state-schema.ts`** - Copy TypeScript interfaces directly
3. **Read game mechanics docs** - Understand WHY formulas work this way
4. **Check edge cases** - Every doc lists edge cases and special rules
5. **Write tests first** - Use formulas as test specifications

### For Designers
1. **Read game mechanics docs** - Understand what users need to see
2. **Check UI specifications** - (when available) See existing patterns
3. **Focus on clarity** - Complex formulas need simple explanations
4. **Mobile-first** - Game is currently mobile-responsive

### For Testers
1. **Use formulas as test cases** - Each formula has examples
2. **Test edge cases** - Documented in each section
3. **Check game balance** - Verify strategies work as intended
4. **Validate save/load** - Critical for user trust

---

## ⚠️ Critical Documents to Read First

### Must-Read (Before Writing ANY Code)
1. **[formulas.md](02-state-management/formulas.md)** - Math = bugs if wrong
2. **[state-schema.ts](02-state-management/state-schema.ts)** - Structure of all data
3. **[economy.md](01-game-mechanics/economy.md)** - Money is critical

### Important (Before Building Features)
4. **[products.md](01-game-mechanics/products.md)** - Core gameplay loop
5. **[employees.md](01-game-mechanics/employees.md)** - Player's main resources

---

## 🧪 Testing Strategy

### Unit Tests (State Management)
```typescript
// Example: Test team overhead penalty
describe('getTeamOverheadPenalty', () => {
  it('returns 0 for solo work', () => {
    expect(getTeamOverheadPenalty(1)).toBe(0);
  });
  
  it('returns 6% for 2-person team', () => {
    expect(getTeamOverheadPenalty(2)).toBe(0.06);
  });
  
  it('caps at 90% for large teams', () => {
    expect(getTeamOverheadPenalty(20)).toBe(0.90);
  });
});
```

### Integration Tests (Game Logic)
```typescript
// Example: Test product development flow
describe('Product Development', () => {
  it('completes product after 100 days with 1.0 efficiency dev', () => {
    const game = createNewGame();
    const product = createProduct('Task Manager');
    assignDeveloper(product, game.founder);
    
    for (let i = 0; i < 100; i++) {
      tick(game);  // Simulate one day
    }
    
    expect(product.status).toBe('published');
    expect(product.progress).toBe(100);
  });
});
```

### E2E Tests (Full Gameplay)
```typescript
// Example: Test early game progression
describe('Early Game Flow', () => {
  it('can hire employee and complete first product', async () => {
    await startNewGame();
    await hireEmployee('developer', 'junior');
    await createProduct('Task Manager');
    await assignEmployeeToProduct('Task Manager', 'Junior Dev');
    await simulateDays(100);
    await expectProductStatus('Task Manager', 'published');
  });
});
```

---

## 📊 Current Game Statistics

**Complexity Metrics (from HTML):**
- Total Lines: ~12,300 lines
- JavaScript: ~8,500 lines (69%)
- CSS: ~2,000 lines (16%)
- HTML: ~1,800 lines (15%)

**Code Distribution:**
- Game Logic: ~40% (state, calculations, events)
- UI Components: ~35% (modals, cards, panels)
- Configuration: ~25% (templates, tiers, constants)

**Key Features:**
- 20+ product templates
- 4 employee tiers (junior → expert)
- 5 office tiers
- 4 server tiers
- 15+ R&D projects
- Manager system
- Experience & promotion system
- Save/load with migrations

---

## 🚀 Next Steps

### Immediate (This Week)
- [ ] Complete manager system documentation
- [ ] Complete R&D system documentation
- [ ] Document all UI modals and flows
- [ ] Extract all configuration constants

### Short-term (This Month)
- [ ] Set up Next.js project
- [ ] Implement state management
- [ ] Write formula unit tests
- [ ] Create component library

### Long-term (This Quarter)
- [ ] Full UI implementation
- [ ] Mobile optimization
- [ ] Cloud save system
- [ ] Analytics dashboard

---

## 💡 Key Learnings from HTML Version

### What Worked Well ✅
- Simple game loop (setInterval tick)
- Reusable dialog component system
- Mobile-responsive design
- Save/load with version migrations
- Clear visual feedback (notifications)

### What Needs Improvement ⚠️
- State management (global variables are messy)
- Code organization (one 12,000 line file!)
- Testing (none! dangerous for balance changes)
- Performance (DOM manipulation every tick)
- Scalability (hard to add new features)

### What to Preserve 🎯
- Game balance (tested and tuned)
- Visual design (clean and professional)
- Mobile UX (works great on phones)
- Feature completeness (don't lose functionality)

---

## 🔄 Update History
- **v1.0** (2026-01-24): Initial documentation structure created
- Extracted formulas, economy, products, employees, state schema
- Created migration roadmap and testing strategy

---

## 📞 Questions or Issues?

If you find any discrepancies between documentation and the HTML implementation:
1. Check the HTML file first (source of truth until migration complete)
2. Update documentation to match
3. Add note about the finding
4. If it's a bug, document it as "Known Issue" with planned fix

**Documentation Maintainer:** Update as code evolves  
**Last Verified Against:** `index.html` (2026-01-24)
