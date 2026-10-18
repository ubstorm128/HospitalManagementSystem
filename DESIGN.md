---
name: Hospital Management System
description: The Clinical Ledger — High-efficiency, crisp, trustworthy data clarity for hospital operations
colors:
  primary: "#2563eb"
  primary-hover: "#1d4ed8"
  secondary: "#64748b"
  neutral-bg: "#f8fafc"
  neutral-surface: "#ffffff"
  neutral-text: "#1e293b"
  neutral-muted: "#6b7280"
  neutral-border: "#e2e8f0"
  neutral-input-border: "#d1d5db"
  neutral-input-bg: "#f9fafb"
  error: "#dc2626"
  error-bg: "#fef2f2"
  success: "#047857"
  success-bg: "#ecfdf5"
  success-border: "#a7f3d0"
typography:
  display:
    fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, "Inter", sans-serif'
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  headline:
    fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, "Inter", sans-serif'
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  title:
    fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, "Inter", sans-serif'
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "normal"
  body:
    fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, "Inter", sans-serif'
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, "Inter", sans-serif'
    fontSize: "0.85rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.02em"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-surface}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.neutral-surface}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
  input-field:
    backgroundColor: "{colors.neutral-input-bg}"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.md}"
    padding: "10px 12px"
  card-container:
    backgroundColor: "{colors.neutral-surface}"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.md}"
    padding: "16px"
  badge-pill:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-surface}"
    rounded: "{rounded.lg}"
    padding: "2px 8px"
---

# Design System: Hospital Management System

## Overview

**Creative North Star: "The Clinical Ledger"**

The Hospital Management System interface is conceived as an uncompromising digital ledger designed for the rigorous demands of hospital front-desk receptionists, administrators, and doctors. It balances high-velocity data intake with calm, unmistakable clarity. In an operational healthcare environment where confusion costs critical time, the interface delivers immediate legibility, unambiguous hierarchy, and zero decorative fluff.

The aesthetic philosophy centers on **Flat & Tonal Layering**. Rather than relying on heavy drop shadows or decorative glassmorphism, depth and structure are established through crisp tonal containment—clean white workspaces resting on a sterile cool-slate background, framed by hairline 1px borders. Interactive elements communicate purpose through crisp contrast, deliberate keyboard focus states, and restrained micro-transitions.

**Key Characteristics:**
- **Zero Decorative Fluff:** No gradients, cartoon mascots, blur spheres, or non-functional animations.
- **Tonal Contrast Over Shadows:** Flat-at-rest surfaces separated by hairline structural borders and tonal depth.
- **High Scanability:** Monospaced and tabular numerical figures for billing amounts, dates, and patient IDs.
- **Utilitarian Density:** Compact, efficient form inputs and tables engineered for high-throughput entry.

## Colors

The palette is rooted in authoritative clinical cobalt blue paired with cool sterile slate neutrals, ensuring high contrast and immediate recognition under varied hospital lighting.

### Primary
- **Clinical Cobalt** (`#2563eb`): Used exclusively for primary interactive actions, selected navigation routes, active tab indicators, and critical workflow triggers.
- **Cobalt Deep** (`#1d4ed8`): Dedicated hover and active state for primary action buttons.

### Secondary
- **Sterile Slate** (`#64748b`): Structural administrative accents, secondary button borders, table headers, and auxiliary navigation bars.

### Neutral
- **Sterile Paper** (`#f8fafc`): Universal viewport background providing a clean, non-glare canvas.
- **Clean Surface** (`#ffffff`): Dedicated background for cards, data tables, modal dialogs, and active forms.
- **Deep Slate Charcoal** (`#1e293b`): Primary high-contrast typography color for optimal legibility.
- **Muted Slate Gray** (`#6b7280`): Secondary copy, timestamps, input placeholders, and inactive labels.
- **Hairline Border Gray** (`#e2e8f0`): 1px structural gridlines, table cell borders, and card outlines.
- **Input Border Gray** (`#d1d5db`): Form field resting borders.
- **Input Field Background** (`#f9fafb`): Subtle tint for resting input containers to distinguish them from card surfaces.

### Semantic Status
- **Alert Crimson** (`#dc2626`): Unambiguous error states, required field indicators, overdue bills, and appointment cancellations.
- **Alert Light Tint** (`#fef2f2`): Background wash for critical alert banners.
- **Clinical Emerald** (`#047857`): Confirmed appointments, paid bills, and successful intake confirmations.
- **Success Light Tint** (`#ecfdf5`): Background wash for positive notification toasts and confirmed status chips.
- **Success Border** (`#a7f3d0`): Subtle green structural border for success messages.

### Named Rules
**The Ten Percent Accent Rule.** Clinical Cobalt (`#2563eb`) is strictly confined to ≤10% of any screen viewport. Its authority and guidance value depend on its scarcity.

**The Multi-Signal Status Rule.** Status indicators must never rely on color alone. Every appointment status, bed status, and billing receipt must combine color with explicit text labels and clear shape cues.

## Typography

**Display Font:** "Segoe UI", -apple-system, BlinkMacSystemFont, "Inter", sans-serif  
**Body Font:** "Segoe UI", -apple-system, BlinkMacSystemFont, "Inter", sans-serif  
**Label/Mono Font:** "Segoe UI", "SFMono-Regular", Consolas, monospace  

**Character:** A crisp, utilitarian humanist sans-serif stack engineered for maximum legibility in high-density tables and intake forms.

### Hierarchy
- **Display** (Bold 700, `1.875rem` / `30px`, line-height `1.2`): Page titles and primary dashboard metrics.
- **Headline** (Bold 700, `1.5rem` / `24px`, line-height `1.25`): Card headers, section dividers, and modal titles.
- **Title** (Semi-bold 600, `1.125rem` / `18px`, line-height `1.35`): Table group headings and card sub-headers.
- **Body** (Regular 400, `0.95rem` / `15px`, line-height `1.5`): General descriptive text, table cells, and form entries (max line length: 70ch).
- **Label** (Semi-bold 600, `0.85rem` / `13.5px`, line-height `1.3`, uppercase or title case): Form field labels, table header titles, and status pills.

### Named Rules
**The Tabular Numbers Rule.** All timestamps, appointment dates, room numbers, and financial billing figures must be rendered with tabular numbers (`font-variant-numeric: tabular-nums`) to ensure vertical alignment across data columns.

## Layout

The spatial model relies on a responsive flex and grid system with a fixed structural sidebar, top administrative utility bar, and fluid main canvas.

- **Desktop (>1024px):** Fixed 240px slate sidebar navigation with fluid content canvas padded at `24px` (`1.5rem`). Multi-column form layouts (`1fr 1fr`).
- **Tablet (601px - 1024px):** Condensed sidebar or horizontal bar with content padded at `20px` (`1.25rem`).
- **Mobile (≤600px):** Single-column stacked layouts (`1fr`), collapsible mobile drawer, and edge-to-edge touch targets padded at `16px` (`1rem`).
- **Spacing Rhythm:** Rigid 4px/8px scale (`4px`, `8px`, `16px`, `24px`, `32px`). Never introduce arbitrary margins outside the grid scale.

## Elevation & Depth

Depth in this system is conveyed through **Flat Tonal Containment** rather than simulated 3D physical elevation.

- **At-Rest Surfaces:** Strictly flat (`box-shadow: none`). Containers rely on `#ffffff` backgrounds framed by 1px `#e2e8f0` borders over the `#f8fafc` canvas.
- **Active Focus Rings:** `0 0 0 3px rgba(37, 99, 235, 0.15)` — high-visibility accessibility focus indicator.
- **Error Focus Rings:** `0 0 0 3px rgba(220, 38, 38, 0.15)`.
- **Floating Overlays (Modals & Drawers only):** `box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08)` to softly decouple urgent overlay dialogs from the underlying operational canvas.

### Named Rules
**The Flat-At-Rest Rule.** Tables, cards, and input fields never use drop shadows in their default resting state. Tonal boundary lines deliver cleaner scanability without optical clutter.

## Shapes

- **Base Radius:**
  - `4px` (`rounded.sm`): Action buttons, input elements, and search bars.
  - `8px` (`rounded.md`): Content cards, form groups, and alert banners.
  - `12px` (`rounded.lg`): Status pill badges and metric indicators.
  - `16px` (`rounded.xl`): Central login/auth card containers.
- **Borders:** Continuous 1px solid borders on all cards (`#e2e8f0`) and inputs (`#d1d5db`). No thick or decorative borders.

## Components

### Buttons
- **Shape:** Crisp rectangular with subtle 4px radius (`border-radius: 4px`).
- **Primary:** Background `var(--color-primary)` (`#2563eb`), white bold text, padding `8px 16px` (`0.5rem 1rem`). Hover state darkens to `#1d4ed8` with immediate transition (150ms).
- **Secondary / Ghost:** Transparent background, 1px solid `#2563eb` border, `#2563eb` text, hover background `rgba(37, 99, 235, 0.05)`.

### Cards / Containers
- **Corner Style:** Clean 8px radius (`border-radius: 8px`).
- **Background:** Crisp white (`#ffffff`).
- **Border:** 1px solid `#e2e8f0`.
- **Internal Padding:** `16px` (`1rem`) on standard cards, `32px` (`2rem`) on central auth panels.

### Inputs / Form Fields
- **Style:** 8px radius (`border-radius: 8px`), 1px solid `#d1d5db` border, background `#f9fafb`, padding `10px 12px` (`0.6rem 0.75rem`).
- **Focus:** Border shifts to `#2563eb` with a 3px soft focus ring (`box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15)`), background shifts to pure white.
- **Error State:** Border shifts to `#dc2626` with red focus ring (`box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15)`).

### Status Pills & Badges
- **Style:** Pill shape with 12px radius (`border-radius: 12px`), padding `2px 8px` (`0.1rem 0.5rem`), font size `0.85rem`, font weight 600.
- **Variants:**
  - Primary badge: `#2563eb` background, white text.
  - Success badge: `#ecfdf5` background, `#047857` text, `#a7f3d0` border.
  - Error badge: `#fef2f2` background, `#dc2626` text.

### Navigation Bars
- **Navbar:** `#2563eb` primary background, white bold branding, 1.5rem link gap, underlined active routes.
- **Sidebar:** `#64748b` slate background, white navigation links, structured vertical padding.

## Do's and Don'ts

### Do:
- **Do** use tabular figures (`font-variant-numeric: tabular-nums`) for all numbers, dates, times, and currency amounts.
- **Do** maintain a strict 4px/8px spatial rhythm across all layouts, margins, and paddings.
- **Do** provide clear focus rings (`0 0 0 3px rgba(37, 99, 235, 0.15)`) for full keyboard accessibility during data intake.
- **Do** pair color changes with text labels and status icons for all medical, appointment, and billing states.
- **Do** keep cards and tables flat at rest, utilizing 1px borders and white-on-slate contrast for visual boundaries.

### Don't:
- **Don't** use decorative gradients, glassmorphism, or floating blur orbs anywhere in the interface.
- **Don't** use heavy drop shadows on resting data cards or table rows.
- **Don't** allow accent color coverage to exceed 10% of any viewport.
- **Don't** create borderless, unpadded tables that mimic raw spreadsheet clutter.
- **Don't** hide critical actions (Save, Cancel, Book Appointment) behind nested menus or ambiguous icons without labels.
