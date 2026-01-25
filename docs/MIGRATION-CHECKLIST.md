# Migration Checklist - HTML to React/Next.js

> **Step-by-step checklist for migrating Software Company Simulator**

---

## 📋 Phase 1: Documentation (In Progress)

### Core Documentation ✅
- [x] Extract all formulas → `formulas.md`
- [x] Document economy system → `economy.md`
- [x] Document product lifecycle → `products.md`
- [x] Document employee system → `employees.md`
- [x] Create TypeScript state schema → `state-schema.ts`
- [ ] Document manager system → `managers.md`
- [ ] Document R&D system → `rnd.md`
- [ ] Document milestone system → `milestones.md`

### UI Documentation
- [ ] Extract all modal designs → `modals.md`
- [ ] Document screen layouts → `screens.md`
- [ ] List reusable components → `components.md`
- [ ] Map user interaction flows → `flows.md`
- [ ] Document animations → `animations.md`

### Configuration Extraction
- [ ] Extract all product templates
- [ ] Extract all employee tier configs
- [ ] Extract all office/server tiers
- [ ] Extract all R&D project definitions
- [ ] Extract all name databases (nationalities)
- [ ] Extract all milestone thresholds

---

## 📋 Phase 2: Project Setup

### Initialize Next.js Project
- [ ] Create Next.js 15 app with TypeScript
- [ ] Set up Tailwind CSS
- [ ] Install Lucide React (icons)
- [ ] Configure ESLint & Prettier
- [ ] Set up Vitest for testing
- [ ] Configure Husky (pre-commit hooks)

### Project Structure
```
/app
  /page.tsx              # Game root
  /layout.tsx            # Root layout
  /api                   # Future: API routes
/components
  /game                  # Game-specific components
  /ui                    # Reusable UI components
  /modals                # All modal components
/lib
  /store                 # State management
  /game-logic            # Core game logic
  /calculations          # Formula implementations
  /constants             # All config constants
/types
  /game.ts               # TypeScript types
/hooks
  /useGameLoop.ts        # Game tick logic
  /useNotifications.ts   # Notification system
/utils
  /format.ts             # Formatting utilities
  /validation.ts         # Input validation
```

### Environment Setup
- [ ] Set up development environment
- [ ] Configure build pipeline
- [ ] Set up testing infrastructure
- [ ] Configure Vercel deployment (optional)

---

## 📋 Phase 3: State Management Implementation

### Create Store Structure
- [ ] Initialize Redux Toolkit or Zustand store
- [ ] Define root state type (from `state-schema.ts`)
- [ ] Create slices for each domain:
  - [ ] `gameSlice` (core game state)
  - [ ] `productSlice` (products management)
  - [ ] `employeeSlice` (employees management)
  - [ ] `rndSlice` (R&D projects)
  - [ ] `uiSlice` (UI state, modals)

### Implement Core Actions
- [ ] **Game Control**
  - [ ] `startGame()`
  - [ ] `pauseGame()`
  - [ ] `setGameSpeed(speed)`
  - [ ] `tick()` (main game loop)
  - [ ] `resetGame()`
- [ ] **Product Actions**
  - [ ] `createProduct(template)`
  - [ ] `assignDeveloperToProduct(devId, productId)`
  - [ ] `assignMarketerToProduct(mktId, productId)`
  - [ ] `publishProduct(productId)` (auto-triggered)
  - [ ] `deprecateProduct(productId)`
- [ ] **Employee Actions**
  - [ ] `hireEmployee(tier, role, name)`
  - [ ] `fireEmployee(employeeId)`
  - [ ] `promoteEmployee(employeeId)`
  - [ ] `assignToProduct(employeeId, productId)`
  - [ ] `unassignFromProduct(employeeId)`
- [ ] **R&D Actions**
  - [ ] `startRndProject(projectId)`
  - [ ] `assignDeveloperToRnd(devId, projectId)`
  - [ ] `completeRndProject(projectId)`
- [ ] **Billing Actions**
  - [ ] `collectRevenue()`
  - [ ] `payExpenses()`
  - [ ] `gainExperience()`

### Implement Calculation Functions
Test each formula from `formulas.md`:

- [ ] **Team Overhead**
  - [ ] `getTeamOverheadPenalty(teamSize)`
  - [ ] `getEffectiveEfficiency(baseEff, teamSize)`
- [ ] **Development**
  - [ ] `calculateDailyProgress(developers, teamSize)`
  - [ ] `estimateCompletionDays(product, developers)`
- [ ] **Marketing**
  - [ ] `calculateDailyGrowth(marketers, teamSize)`
  - [ ] `calculateChurn(subscribers, status)`
- [ ] **Revenue**
  - [ ] `calculateProductRevenue(product)`
  - [ ] `calculateTotalRevenue(products)`
- [ ] **Expenses**
  - [ ] `calculateOfficeCost(tier, teamSize)`
  - [ ] `calculateInsurance(revenue, employeeCount)`
  - [ ] `calculateSalaries(employees, managers)`
  - [ ] `calculateServerCost(tier)`
- [ ] **Employee**
  - [ ] `calculateEfficiency(employee)`
  - [ ] `canPromote(employee)`
  - [ ] `calculatePromotionSalary(employee)`
- [ ] **Manager**
  - [ ] `calculateManagerCapacity(efficiency)`
  - [ ] `calculateManagerSalary(capacity)`

---

## 📋 Phase 4: Formula Testing (Critical!)

### Unit Tests for Each Formula
Write tests for each calculation from `formulas.md`:

#### Team Overhead Tests
- [ ] Test: Solo work (teamSize=1) returns 0% penalty
- [ ] Test: 2-person team returns 6% penalty
- [ ] Test: 10-person team returns 54% penalty
- [ ] Test: 16+ person team caps at 90% penalty

#### Development Progress Tests
- [ ] Test: 1.0 efficiency dev → 1% per day
- [ ] Test: 2.0 efficiency dev → 2% per day
- [ ] Test: 2 devs (1.5 each) → correct progress with penalty
- [ ] Test: Product completes at exactly 100%
- [ ] Test: Progress caps at 100% (doesn't exceed)

#### Subscriber Growth Tests
- [ ] Test: 1.0 efficiency marketer → 5 subs/day (average)
- [ ] Test: Random factor stays in 80%-120% range
- [ ] Test: Server capacity respected (hard cap)
- [ ] Test: Growth stops when server full

#### Churn Tests
- [ ] Test: Published products churn 1-2% daily
- [ ] Test: Deprecated products churn 5-10% daily
- [ ] Test: Churn only applies if subscribers > 10
- [ ] Test: R&D churn reduction applies correctly

#### Revenue Tests
- [ ] Test: Revenue = subscribers × price
- [ ] Test: Deprecated products generate revenue
- [ ] Test: In-development products generate $0

#### Expense Tests
- [ ] Test: Office costs calculate correctly
- [ ] Test: Insurance = 2% revenue + $100/employee
- [ ] Test: Salaries sum correctly
- [ ] Test: Server costs based on tier

#### Experience Tests
- [ ] Test: +5% efficiency per month assigned
- [ ] Test: No gain if unassigned
- [ ] Test: Efficiency caps respected (2.0, 3.0, 3.5, 4.0)
- [ ] Test: Promotion readiness triggers correctly

#### Manager Tests
- [ ] Test: Capacity = efficiency / 0.25 (floored)
- [ ] Test: Salary = capacity × $2,000 ± 15%

---

## 📋 Phase 5: UI Components Library

### Base Components (Atoms)
- [ ] `Button` (primary, secondary, danger)
- [ ] `Card` (with expand/collapse)
- [ ] `Badge` (status indicators)
- [ ] `ProgressBar` (with percentage)
- [ ] `FilterPill` (active/inactive states)
- [ ] `Icon` (Lucide wrapper)
- [ ] `Notification` (toast system)
- [ ] `Dialog` (modal wrapper)

### Complex Components (Molecules)
- [ ] `EmployeeCard` (dev/marketer display)
- [ ] `ProductCard` (status, progress, subscribers)
- [ ] `RndCard` (R&D project card)
- [ ] `StatDisplay` (cash, day, metrics)
- [ ] `AssignmentButton` (assign employees)
- [ ] `PromotionBadge` (ready indicator)
- [ ] `PenaltyIcon` (team overhead indicator)

### Layout Components (Organisms)
- [ ] `GameHeader` (cash, day, controls)
- [ ] `MobileNav` (bottom navigation)
- [ ] `Panel` (generic panel with filters)
- [ ] `FilterBar` (filter pills row)
- [ ] `EventLog` (scrollable log)

### Modal Components
- [ ] `NewGameModal` (company name, currency)
- [ ] `HireEmployeeModal` (tier selection, name)
- [ ] `CreateProductModal` (template selection)
- [ ] `AssignDeveloperModal` (checkbox list)
- [ ] `AssignMarketerModal` (checkbox list)
- [ ] `PromoteEmployeeModal` (confirmation, salary)
- [ ] `FireEmployeeModal` (confirmation)
- [ ] `DeprecateProductModal` (confirmation)
- [ ] `UpgradeOfficeModal` (tier selection)
- [ ] `UpgradeServerModal` (tier selection)
- [ ] `RndProjectModal` (project details, start)
- [ ] `SaveLoadModal` (save slots, load)
- [ ] `SettingsModal` (game settings)

---

## 📋 Phase 6: Game Loop Implementation

### Core Game Loop
- [ ] Implement `useGameLoop` hook
  - [ ] Track `gameSpeed` (1x, 2x, 4x)
  - [ ] Handle pause/unpause
  - [ ] Call `tick()` at correct intervals
  - [ ] Stop when game paused
- [ ] Implement `tick()` function:
  - [ ] Increment `currentDay`
  - [ ] Update product progress (if developers assigned)
  - [ ] Update subscriber growth (if marketers assigned)
  - [ ] Update R&D progress (if developers assigned)
  - [ ] Apply churn to published/deprecated products
  - [ ] Check for product completion (auto-publish)
  - [ ] Check for R&D completion (apply effects)
  - [ ] Update experience (every 30 days)
  - [ ] Run monthly billing (every 30 days)
  - [ ] Clean up old deprecated products (365+ days)
  - [ ] Update UI displays

### Billing Cycle
- [ ] Detect billing day (day % 30 === 0)
- [ ] Collect revenue from all products
- [ ] Calculate and deduct expenses
- [ ] Update cash balance
- [ ] Trigger game over if cash < 0 and can't recover
- [ ] Log billing results

### Experience System
- [ ] Runs every 30 days
- [ ] For each assigned employee:
  - [ ] Increment `experienceMonths`
  - [ ] Recalculate `efficiency`
  - [ ] Check `readyForPromotion`
- [ ] Show notification for promotions available

---

## 📋 Phase 7: Save/Load System

### Save System
- [ ] Create `saveGame()` function:
  - [ ] Serialize entire game state
  - [ ] Add version number
  - [ ] Add timestamp
  - [ ] Save to localStorage
- [ ] Create multiple save slots (3 slots)
- [ ] Auto-save every 60 seconds (optional)
- [ ] Show save confirmation notification

### Load System
- [ ] Create `loadGame(saveData)` function:
  - [ ] Deserialize game state
  - [ ] Run version migrations if needed
  - [ ] Validate data integrity
  - [ ] Restore game state
- [ ] List available saves with metadata
- [ ] Handle corrupted saves gracefully
- [ ] Show load confirmation

### Migration System
- [ ] Define save version format (`v1.0.0`)
- [ ] Create migration functions:
  - [ ] `migratev1_to_v2()` (if needed)
  - [ ] `migratev2_to_v3()` (if needed)
- [ ] Test migrations with old save data

---

## 📋 Phase 8: Feature Parity Testing

### Core Gameplay
- [ ] Can start new game with name and currency
- [ ] Can hire developers (all tiers)
- [ ] Can hire marketers (all tiers)
- [ ] Can create products (all templates)
- [ ] Can assign developers to products
- [ ] Can assign marketers to products
- [ ] Products complete and auto-publish at 100%
- [ ] Subscribers grow with marketers
- [ ] Products can be deprecated
- [ ] Deprecated products eventually die

### Employee Management
- [ ] Experience gains monthly (when assigned)
- [ ] Efficiency increases with experience
- [ ] Promotion becomes available at thresholds
- [ ] Employees can be promoted (salary increases)
- [ ] Employees can be fired
- [ ] Founder cannot be fired
- [ ] Team overhead penalty applies correctly

### R&D System
- [ ] R&D projects can be started
- [ ] Developers can be assigned to R&D
- [ ] R&D projects complete at 100%
- [ ] Completion unlocks products/features
- [ ] Effects apply correctly (churn reduction, etc.)
- [ ] Unlocked products appear in product list

### Billing & Economy
- [ ] Revenue collected every 30 days
- [ ] Expenses deducted every 30 days
- [ ] Cash flow projected correctly
- [ ] Insurance scales with revenue and team
- [ ] Office costs scale with team size
- [ ] Server capacity enforced (hard cap)

### Infrastructure
- [ ] Can upgrade office (capacity increases)
- [ ] Cannot exceed office capacity
- [ ] Can upgrade server (subscriber cap increases)
- [ ] Cannot gain subscribers when server full
- [ ] Warning shown when server full

### UI/UX
- [ ] Notifications appear for key events
- [ ] Event log shows all important events
- [ ] Filters work (products, employees, R&D)
- [ ] Modals open/close correctly
- [ ] Mobile navigation works
- [ ] Game speed controls work (1x, 2x, 4x)
- [ ] Pause/unpause works
- [ ] All panels scroll correctly

### Save/Load
- [ ] Can save game
- [ ] Can load game
- [ ] Multiple save slots work
- [ ] Save data persists across sessions
- [ ] Migrations work (if applicable)

---

## 📋 Phase 9: Performance Optimization

### Rendering Optimization
- [ ] Use `React.memo()` for expensive components
- [ ] Implement virtual scrolling for long lists
- [ ] Optimize re-renders (check with React DevTools)
- [ ] Lazy load modals (code splitting)
- [ ] Debounce frequent updates

### State Optimization
- [ ] Use selectors to prevent unnecessary re-renders
- [ ] Normalize state (avoid nested arrays)
- [ ] Batch state updates
- [ ] Use immer for immutable updates

### Asset Optimization
- [ ] Optimize images (if any)
- [ ] Code split routes
- [ ] Tree-shake unused code
- [ ] Minimize bundle size

### Performance Testing
- [ ] Test with 100+ products
- [ ] Test with 50+ employees
- [ ] Test with 10+ R&D projects
- [ ] Measure frame rate (should stay 60fps)
- [ ] Measure memory usage

---

## 📋 Phase 10: Polish & Launch

### Bug Fixes
- [ ] Fix all critical bugs
- [ ] Fix all high-priority bugs
- [ ] Address known issues from HTML version
- [ ] Test edge cases (negative cash, etc.)

### Quality of Life Improvements
- [ ] Add keyboard shortcuts (space = pause, etc.)
- [ ] Add confirmation for destructive actions
- [ ] Improve error messages
- [ ] Add loading states
- [ ] Add empty states (no employees, etc.)

### Documentation
- [ ] Write user guide (how to play)
- [ ] Document known issues
- [ ] Create changelog
- [ ] Add credits

### Launch Preparation
- [ ] Final testing pass
- [ ] Performance audit
- [ ] Accessibility audit
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Prepare marketing materials

### Deployment
- [ ] Deploy to Vercel/Netlify
- [ ] Set up custom domain (optional)
- [ ] Enable analytics (optional)
- [ ] Monitor error tracking (Sentry, etc.)

---

## ✅ Definition of Done

### Phase 1 (Documentation) Complete When:
- All game mechanics documented
- All formulas extracted and verified
- All UI patterns documented
- State schema complete with types

### Phase 2-3 (Setup + State) Complete When:
- Project structure established
- All formulas implemented with tests
- 100% test coverage on calculations
- State management working

### Phase 4-6 (UI + Game Loop) Complete When:
- All components built
- Game loop functional
- Feature parity with HTML version
- No visual regressions

### Phase 7-8 (Save/Polish) Complete When:
- Save/load system working
- All edge cases handled
- Performance optimized
- Ready for user testing

### Phase 9-10 (Launch) Complete When:
- All bugs fixed
- User testing complete
- Documentation published
- Deployed to production

---

## 🎯 Success Metrics

- **Code Quality:** 90%+ test coverage
- **Performance:** 60fps sustained
- **Bundle Size:** < 500KB initial load
- **Accessibility:** WCAG 2.1 AA compliant
- **Mobile:** Perfect score on Lighthouse
- **User Feedback:** 4.5+ stars (after launch)

---

## 🚨 Risk Mitigation

### High-Risk Items
1. **Formula bugs** → Write tests BEFORE coding
2. **State complexity** → Use normalized state structure
3. **Performance issues** → Profile early and often
4. **Feature creep** → Stick to parity first, enhancements later

### Mitigation Strategies
- Test formulas against HTML version (compare outputs)
- Keep state flat and normalized
- Use React DevTools Profiler
- Create feature freeze after Phase 8

---

## 📞 Need Help?

- Review documentation in `/docs/`
- Check `formulas.md` for calculation questions
- Check `state-schema.ts` for data structure questions
- Refer to HTML file for visual reference

---

**Last Updated:** 2026-01-24  
**Version:** 1.0  
**Status:** Phase 1 (Documentation) in progress
