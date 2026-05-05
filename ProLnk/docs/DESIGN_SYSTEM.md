# Design System

**Shared design system across all 5 ProLnk brands for consistency and efficiency.**

---

## Color Palette

### ProLnk (Primary Brand)

```
Primary Blue: #0066CC
  - Buttons, links, primary actions
  - Hex: 0066CC | RGB: 0, 102, 204 | HSL: 210°, 100%, 40%

Secondary Orange: #F26419
  - Accents, highlights, success states
  - Hex: F26419 | RGB: 242, 100, 25 | HSL: 20°, 94%, 52%

Dark Gray: #333333
  - Body text, dark backgrounds
  - Hex: 333333 | RGB: 51, 51, 51 | HSL: 0°, 0%, 20%

Light Gray: #F5F5F5
  - Card backgrounds, subtle backgrounds
  - Hex: F5F5F5 | RGB: 245, 245, 245 | HSL: 0°, 0%, 96%

White: #FFFFFF
  - Primary background
  - Hex: FFFFFF | RGB: 255, 255, 255 | HSL: 0°, 0%, 100%
```

### Semantic Colors (All Brands)

```
Success: #10B981 (Green)
Warning: #F59E0B (Amber)
Error: #EF4444 (Red)
Info: #3B82F6 (Blue)
Disabled: #D1D5DB (Gray)
```

### Brand Color Overrides

**TrustyPro**:
- Primary: #1B365D (Deep Navy)
- Secondary: #F9A825 (Gold)

**Home Health Vault**:
- Primary: #059669 (Teal)
- Secondary: #7C3AED (Purple)

---

## Typography

### Font Families

```css
/* Headlines */
font-family: 'Montserrat', 'Inter', sans-serif;
font-weight: 600-700 (bold);

/* Body Text */
font-family: 'Open Sans', 'Roboto', sans-serif;
font-weight: 400-500 (regular);
```

### Font Sizes & Line Heights

| Usage | Size | Weight | Line Height | Letter Spacing |
|-------|------|--------|------------|----------------|
| H1 (Page title) | 32px | 700 | 1.2 | -0.02em |
| H2 (Section) | 24px | 700 | 1.3 | -0.01em |
| H3 (Subsection) | 20px | 600 | 1.4 | 0em |
| H4 (Heading) | 18px | 600 | 1.4 | 0em |
| Body (Default) | 16px | 400 | 1.5 | 0em |
| Body Small | 14px | 400 | 1.5 | 0em |
| Label | 12px | 500 | 1.4 | 0.05em |
| Caption | 12px | 400 | 1.4 | 0.02em |

### CSS Classes

```css
.text-h1 { font-size: 32px; font-weight: 700; line-height: 1.2; }
.text-h2 { font-size: 24px; font-weight: 700; line-height: 1.3; }
.text-h3 { font-size: 20px; font-weight: 600; line-height: 1.4; }
.text-h4 { font-size: 18px; font-weight: 600; line-height: 1.4; }
.text-body { font-size: 16px; font-weight: 400; line-height: 1.5; }
.text-small { font-size: 14px; font-weight: 400; line-height: 1.5; }
.text-label { font-size: 12px; font-weight: 500; line-height: 1.4; }
.text-caption { font-size: 12px; font-weight: 400; line-height: 1.4; }
```

---

## Spacing System

**Base unit**: 8px

```
xs: 4px
sm: 8px      (1x)
md: 16px     (2x)
lg: 24px     (3x)
xl: 32px     (4x)
xxl: 48px    (6x)
```

### Usage

```
Margin/Padding: padding: 16px (md)
Gap (flexbox): gap: 16px (md)
Border radius: border-radius: 8px (sm)
Spacing between sections: margin-bottom: 32px (xl)
```

---

## Shadows

```
Elevation 1 (Card hover): 
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);

Elevation 2 (Modal):
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);

Elevation 3 (Dropdown):
  box-shadow: 0 20px 50px rgba(0,0,0,0.2);
```

---

## Border Radius

```
xs: 2px (input borders)
sm: 4px (small elements)
md: 8px (cards, buttons)
lg: 12px (large components)
full: 999px (pill buttons, avatars)
```

---

## Component Library

### Button

```tsx
// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// States
<Button disabled>Disabled</Button>
<Button loading>Loading...</Button>
<Button fullWidth>Full Width</Button>
```

**Specs**:
- Primary: Blue (#0066CC) background, white text
- Secondary: Gray (#F5F5F5) background, dark text
- Ghost: Transparent, blue text
- Padding: sm=8px 12px, md=12px 16px, lg=16px 24px
- Border radius: 8px
- Font weight: 600

### Input

```tsx
<Input 
  type="email"
  placeholder="Email address"
  label="Email"
  required
  error="This field is required"
/>
```

**Specs**:
- Border: 1px solid #D1D5DB
- Border radius: 8px
- Padding: 12px 16px
- Font size: 14px
- Focus: Blue outline (#0066CC), border color: #0066CC
- Error: Red border (#EF4444), error message below

### Form

```tsx
<Form onSubmit={handleSubmit}>
  <FormField label="Name" required>
    <Input name="name" />
  </FormField>
  <FormField label="Email" required>
    <Input type="email" name="email" />
  </FormField>
  <Button type="submit">Submit</Button>
</Form>
```

### Card

```tsx
<Card>
  <CardHeader title="Card Title" subtitle="Subtitle" />
  <CardBody>Content here</CardBody>
  <CardFooter>Footer content</CardFooter>
</Card>
```

**Specs**:
- Background: White (#FFFFFF)
- Border: 1px solid #E5E7EB
- Border radius: 8px
- Padding: 16px
- Shadow: Elevation 1

### Modal

```tsx
<Modal open={open} onClose={setOpen}>
  <Modal.Header title="Modal Title" />
  <Modal.Body>Content</Modal.Body>
  <Modal.Footer>
    <Button variant="ghost">Cancel</Button>
    <Button>Confirm</Button>
  </Modal.Footer>
</Modal>
```

**Specs**:
- Background: White
- Max width: 500px (md), 600px (lg), 900px (xl)
- Border radius: 12px
- Padding: 24px
- Shadow: Elevation 2
- Overlay: Black with 40% opacity

### Dropdown

```tsx
<Dropdown>
  <DropdownTrigger>Menu</DropdownTrigger>
  <DropdownMenu>
    <DropdownItem>Option 1</DropdownItem>
    <DropdownItem>Option 2</DropdownItem>
  </DropdownMenu>
</Dropdown>
```

**Specs**:
- Background: White
- Border: 1px solid #E5E7EB
- Border radius: 8px
- Padding: 8px 0
- Shadow: Elevation 1
- Item padding: 12px 16px
- Hover: Background #F9FAFB

### Badge

```tsx
<Badge color="blue">New</Badge>
<Badge color="green">Success</Badge>
<Badge color="red">Error</Badge>
```

**Specs**:
- Font size: 12px
- Font weight: 500
- Padding: 4px 8px
- Border radius: 4px
- Background: Color @ 10% opacity, text: Color @ 100%

### Pagination

```tsx
<Pagination 
  current={1}
  total={10}
  onPageChange={setPage}
/>
```

**Specs**:
- Button size: 40px × 40px
- Border radius: 4px
- Gap: 8px
- Active: Blue background, white text
- Disabled: Gray background, gray text

### Tabs

```tsx
<Tabs defaultValue="tab1">
  <TabList>
    <Tab value="tab1">Tab 1</Tab>
    <Tab value="tab2">Tab 2</Tab>
  </TabList>
  <TabContent value="tab1">Content 1</TabContent>
  <TabContent value="tab2">Content 2</TabContent>
</Tabs>
```

**Specs**:
- Tab padding: 12px 16px
- Border bottom: 3px solid (blue for active, transparent for inactive)
- Font weight: 600
- Color: Dark for active, gray for inactive

---

## Animations

**Default Duration**: 200ms
**Default Easing**: ease-in-out

```css
/* Fade in/out */
transition: opacity 200ms ease-in-out;

/* Slide */
transition: transform 200ms ease-in-out;

/* Color change */
transition: background-color 200ms ease-in-out;
```

### Animation Timing

| Effect | Duration | Easing |
|--------|----------|--------|
| Button hover | 150ms | ease-out |
| Modal enter | 300ms | ease-in-out |
| Dropdown open | 150ms | ease-out |
| Page transition | 400ms | ease-in-out |
| Loading spinner | 1000ms | linear |

---

## Responsive Design

### Breakpoints

```
Mobile: 0px
Tablet: 640px (sm)
Desktop: 1024px (md)
Large Desktop: 1280px (lg)
Extra Large: 1536px (xl)
```

### Responsive Utilities

```css
@media (min-width: 640px) { ... }  /* Tablet and up */
@media (min-width: 1024px) { ... } /* Desktop and up */
@media (min-width: 1280px) { ... } /* Large and up */
```

### Layout

**Mobile**: 1 column
**Tablet** (640px+): 2 columns
**Desktop** (1024px+): 3 columns
**Large** (1280px+): 4 columns

---

## Accessibility (a11y)

### WCAG AA Compliance

- **Color Contrast**: 4.5:1 minimum for text, 3:1 for UI components
- **Font Size**: Minimum 14px for body text
- **Touch Targets**: 44px × 44px minimum
- **Focus Indicator**: 2px solid blue outline
- **Focus Order**: Logical (left to right, top to bottom)

### Keyboard Navigation

- Tab: Focus next element
- Shift+Tab: Focus previous element
- Enter: Activate button/link
- Space: Toggle checkbox/button
- Escape: Close modal/dropdown
- Arrow keys: Navigate select options

### ARIA Attributes

```html
<!-- Buttons -->
<button aria-label="Close dialog">×</button>

<!-- Forms -->
<input aria-required="true" aria-invalid="false" />

<!-- Headings -->
<h1 id="page-title">Page Title</h1>
<div role="region" aria-labelledby="page-title">

<!-- Links -->
<a href="/" aria-current="page">Home</a>
```

---

## Dark Mode (Planned - Month 2)

When dark mode support is added:

```css
/* Light mode (default) */
--bg-primary: #FFFFFF;
--text-primary: #333333;
--text-secondary: #666666;

/* Dark mode */
@media (prefers-color-scheme: dark) {
  --bg-primary: #1F2937;
  --text-primary: #F3F4F6;
  --text-secondary: #D1D5DB;
}
```

---

## Usage Examples

### Form Layout

```tsx
<form>
  <h2>Sign Up</h2>
  <div className="space-y-md">
    <Input label="Email" placeholder="you@example.com" required />
    <Input label="Password" type="password" required />
    <Button fullWidth>Sign Up</Button>
  </div>
</form>
```

### Card Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
  {items.map(item => (
    <Card key={item.id}>
      <CardHeader title={item.title} />
      <CardBody>{item.description}</CardBody>
    </Card>
  ))}
</div>
```

### Modal Form

```tsx
<Modal open={open} onClose={setOpen}>
  <Modal.Header title="Create New Lead" />
  <Modal.Body>
    <Form onSubmit={handleSubmit}>
      <FormField label="Service Type">
        <Select options={services} />
      </FormField>
      <FormField label="Description">
        <Textarea />
      </FormField>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
    <Button onClick={handleSubmit}>Create</Button>
  </Modal.Footer>
</Modal>
```

---

## File Organization

```
client/src/
├── styles/
│   ├── globals.css          # Base styles, variables
│   ├── design-system.css    # Design tokens (colors, spacing)
│   └── animations.css       # Animation definitions
│
├── components/
│   ├── Button.tsx           # Shared button component
│   ├── Input.tsx            # Shared input component
│   ├── Modal.tsx            # Shared modal component
│   ├── Card.tsx             # Shared card component
│   ├── Form/
│   │   ├── Form.tsx
│   │   ├── FormField.tsx
│   │   └── FormError.tsx
│   └── common/              # Other shared components
│
└── pages/
    ├── ProLnk/              # ProLnk-specific pages
    ├── TrustyPro/           # TrustyPro-specific pages
    └── shared/              # Shared page layouts
```

---

## Component Checklist

When creating new components, ensure:

- [ ] Accessible (WCAG AA)
- [ ] Responsive (mobile-first)
- [ ] Dark mode ready (CSS variables)
- [ ] TypeScript types defined
- [ ] Storybook documentation (future)
- [ ] PropTypes or Zod validation
- [ ] Keyboard navigation support
- [ ] Consistent spacing (8px base unit)
- [ ] Semantic HTML
- [ ] Error states handled

---

## Export Targets

When exporting designs for different formats:

- **Web**: 1x resolution
- **High-DPI Screens**: 2x resolution
- **Logos**: SVG (vector)
- **Icons**: SVG (consistent sizing)
- **Images**: WebP (primary), PNG (fallback)

---

## Version History

**Version 1.0** - May 2026 (Launch)
- 5 core brands
- 30+ components
- WCAG AA compliance
- Mobile-first responsive design

**Future Enhancements**:
- Dark mode support
- Additional color palettes
- Component library (Storybook)
- Animation guidelines
- Voice & tone guidelines
