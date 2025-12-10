# Design Style Guide - Modern UI/UX Resume

## Design Philosophy

### Visual Language
- **Minimalist Brutalism**: Clean lines with purposeful geometric elements
- **Editorial Sophistication**: Inspired by modern design publications like Kinfolk and Wired
- **Technical Precision**: Reflecting SharePoint development expertise through structured layouts
- **Human-Centered**: Warm accessibility despite technical focus

### Color Palette
- **Primary**: Warm Charcoal (#2D3748) - Professional depth
- **Secondary**: Soft Sage (#68D391) - Growth and innovation
- **Accent**: Warm Amber (#F6AD55) - Energy and creativity
- **Background**: Pure White (#FFFFFF) with subtle warm undertones
- **Text**: Deep Charcoal (#1A202C) for high contrast readability

### Typography
- **Display Font**: Canela (Bold) - For headings and hero text
- **Body Font**: Suisse Int'l (Regular/Medium) - For content and UI elements
- **Monospace**: JetBrains Mono - For technical skills and code snippets

## Visual Effects & Animation

### Core Libraries Used
1. **Anime.js** - Smooth micro-interactions and element animations
2. **ECharts.js** - Skill proficiency radar chart with custom styling
3. **Splide.js** - Project portfolio carousel with seamless transitions
4. **Matter.js** - Subtle physics-based hover effects on skill badges
5. **Shader-park** - Background gradient flow effects
6. **PIXI.js** - Interactive particle system for hero section

### Animation Principles
- **Subtle Entrance**: Elements fade in with slight upward motion (16px)
- **Staggered Reveals**: Content appears in logical sequence with 100ms delays
- **Hover Sophistication**: 3D tilt effects on cards, glow on interactive elements
- **Color Transitions**: Smooth 300ms color morphing on state changes

### Header Background Effect
- **Aurora Gradient Flow**: Subtle animated gradient using shader-park
- **Color Progression**: Sage to Amber with 45-second cycle
- **Opacity**: 15% maximum to maintain text readability

## Layout & Grid System

### Bento Grid Structure
- **Asymmetrical Layout**: 12-column grid with varied cell sizes
- **White Space**: Minimum 40px margins, 24px internal padding
- **Content Hierarchy**: Large hero cells, medium skill blocks, compact contact info
- **Responsive Breakpoints**: Mobile-first with fluid scaling

### Section Design
- **Hero Area**: Full-width with animated background and floating elements
- **Skills Grid**: 3x3 radar chart with surrounding skill badges
- **Experience Timeline**: Horizontal scroll with filter controls
- **Portfolio**: Masonry-style cards with hover reveals

## Interactive Elements

### Skill Radar Chart
- **Design**: Custom ECharts with minimal styling
- **Colors**: Sage primary, Amber secondary, Charcoal text
- **Animation**: 2-second draw-in with elastic easing
- **Interaction**: Hover reveals experience level and years

### Project Cards
- **Layout**: 4:3 aspect ratio with overlay information
- **Hover Effect**: 5-degree tilt with shadow expansion
- **Transition**: 250ms ease-out for all properties
- **Typography**: Title in Canela, details in Suisse

### Navigation
- **Style**: Minimal underline indicators
- **Active State**: Warm Amber accent line
- **Hover**: Subtle color shift without layout changes
- **Mobile**: Hamburger menu with slide-out drawer

## Content Strategy

### Information Architecture
1. **Immediate Impact**: Hero with key metrics and availability
2. **Technical Depth**: Interactive skill visualization
3. **Professional Journey**: Filterable experience timeline
4. **Project Portfolio**: Technology-focused case studies
5. **Personal Connection**: Contact form with availability status

### Content Tone
- **Professional Confidence**: Clear expertise without arrogance
- **Technical Precision**: Accurate terminology and specific achievements
- **Human Accessibility**: Approachable language despite technical depth
- **Visual Storytelling**: Data visualization over text-heavy descriptions