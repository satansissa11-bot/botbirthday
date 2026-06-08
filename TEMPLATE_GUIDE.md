# Template System Guide

Complete guide for creating and managing templates in the Birthday Gift Generator.

## Architecture Overview

The template system is now fully modular and scalable:

```
templates/
├── anime/
│   └── config.ts
├── gaming/
│   └── config.ts
├── luxury/
│   └── config.ts
├── romantic/
│   └── config.ts
├── dark/
│   └── config.ts
├── naruto/          # Future template
│   └── config.ts
├── onepiece/        # Future template
│   └── config.ts
└── index.ts         # Template registry
```

## Template Registry System

The template registry (`lib/templateRegistry.ts`) allows unlimited templates to be added without modifying existing code.

**Key Features:**
- Each template is self-contained in its own folder
- Templates are registered in `templates/index.ts`
- No need to modify existing templates when adding new ones
- Supports unlimited future templates

## Template Configuration Structure

Each template has a `config.ts` file with the following structure:

```typescript
import { TemplateConfig } from '@/lib/types';

const templateName: TemplateConfig = {
  id: 'unique-template-id',
  name: 'Template Display Name',
  description: 'Template description',
  category: 'anime' | 'gaming' | 'luxury' | 'romantic' | 'dark' | 'wedding' | 'graduation' | 'kpop' | 'minecraft' | 'roblox' | 'custom',
  colors: {
    primary: '#hex-color',
    secondary: '#hex-color',
    accent: '#hex-color',
    background: 'gradient or color',
    text: '#hex-color',
    overlay: 'rgba-color (optional)',
  },
  fonts: {
    heading: 'font-family',
    body: 'font-family',
  },
  animations: {
    fadeIn: 'css-animation',
    slideUp: 'css-animation',
    bounce: 'css-animation',
    pulse: 'css-animation',
    custom: 'custom-animation (optional)',
  },
  backgroundEffects: {
    type: 'gradient' | 'image' | 'pattern' | 'particles' | 'none',
    value: 'gradient-value or image-url',
    opacity: 0-1,
  },
  music: {
    defaultUrl: 'https://example.com/music.mp3 (optional)',
    autoplay: false,
  },
  introScreen: {
    enabled: true,
    duration: 2000,
    message: 'Custom intro message',
  },
  decorativeElements: {
    enabled: true,
    type: 'stars' | 'hearts' | 'confetti' | 'baloons' | 'custom',
  },
};

export default templateName;
```

## How to Add a New Template

### Step 1: Create Template Folder

Create a new folder in `templates/` directory:

```bash
mkdir templates/your-template-name
```

### Step 2: Create Config File

Create `config.ts` in the new folder:

```typescript
import { TemplateConfig } from '@/lib/types';

const yourTemplate: TemplateConfig = {
  id: 'your-template-id',
  name: 'Your Template Name',
  description: 'Your template description',
  category: 'custom',
  colors: {
    primary: '#FF0000',
    secondary: '#00FF00',
    accent: '#0000FF',
    background: 'linear-gradient(135deg, #FF0000 0%, #00FF00 50%, #0000FF 100%)',
    text: '#FFFFFF',
    overlay: 'rgba(255, 255, 255, 0.1)',
  },
  fonts: {
    heading: 'Arial, sans-serif',
    body: 'Arial, sans-serif',
  },
  animations: {
    fadeIn: 'fadeIn 0.5s ease-in',
    slideUp: 'slideUp 0.5s ease-out',
    pulse: 'pulse 2s infinite',
  },
  backgroundEffects: {
    type: 'gradient',
    value: 'linear-gradient(135deg, #FF0000 0%, #00FF00 50%, #0000FF 100%)',
    opacity: 1,
  },
  music: {
    autoplay: false,
  },
  introScreen: {
    enabled: true,
    duration: 2000,
    message: '🎉 Happy Birthday! 🎉',
  },
  decorativeElements: {
    enabled: true,
    type: 'stars',
  },
};

export default yourTemplate;
```

### Step 3: Register Template

Add the template to `templates/index.ts`:

```typescript
import { registerTemplate } from '@/lib/templateRegistry';
import animeTemplate from './anime/config';
import gamingTemplate from './gaming/config';
import luxuryTemplate from './luxury/config';
import romanticTemplate from './romantic/config';
import darkTemplate from './dark/config';
import yourTemplate from './your-template-name/config'; // Add this line

registerTemplate(animeTemplate);
registerTemplate(gamingTemplate);
registerTemplate(luxuryTemplate);
registerTemplate(romanticTemplate);
registerTemplate(darkTemplate);
registerTemplate(yourTemplate); // Add this line

export { getTemplate, getAllTemplates, getTemplatesByCategory } from '@/lib/templateRegistry';
```

### Step 4: Test the Template

1. Run the development server: `npm run dev`
2. Go to `/admin` to create a new card
3. Select your new template from the dropdown
4. Create the card and view it at `/card/[slug]`

## Template Categories

Available categories for organization:

- `anime` - Anime-inspired designs
- `gaming` - Gaming and esports themes
- `luxury` - Premium and elegant designs
- `romantic` - Love and romance themes
- `dark` - Dark mode designs
- `wedding` - Wedding celebration themes
- `graduation` - Graduation themes
- `kpop` - K-Pop inspired designs
- `minecraft` - Minecraft themed
- `roblox` - Roblox themed
- `custom` - Custom/other themes

## Template Features

### Colors

Define the color scheme for your template:

```typescript
colors: {
  primary: '#FF6B9D',      // Primary brand color
  secondary: '#C44569',    // Secondary color
  accent: '#FFD93D',       // Accent/highlight color
  background: 'gradient',  // Background (gradient or solid color)
  text: '#FFFFFF',         // Text color
  overlay: 'rgba(255, 255, 255, 0.1)', // Optional overlay color
}
```

### Fonts

Define typography for headings and body text:

```typescript
fonts: {
  heading: 'Georgia, serif',  // Font for headings
  body: 'Arial, sans-serif',   // Font for body text
}
```

### Animations

Define CSS animations for elements:

```typescript
animations: {
  fadeIn: 'fadeIn 0.5s ease-in',
  slideUp: 'slideUp 0.5s ease-out',
  bounce: 'bounce 2s infinite',
  pulse: 'pulse 2s infinite',
  custom: 'customAnimation 1s ease-in-out', // Optional custom animation
}
```

### Background Effects

Choose the type of background effect:

```typescript
backgroundEffects: {
  type: 'gradient',  // Options: gradient, image, pattern, particles, none
  value: 'linear-gradient(135deg, #FF6B9D 0%, #C44569 50%, #FFD93D 100%)',
  opacity: 1,  // 0-1
}
```

### Music

Configure default background music:

```typescript
music: {
  defaultUrl: 'https://example.com/music.mp3', // Optional default music
  autoplay: false,  // Auto-play music
}
```

### Intro Screen

Configure an intro screen animation:

```typescript
introScreen: {
  enabled: true,  // Enable/disable intro screen
  duration: 2000,  // Duration in milliseconds
  message: '✨ Happy Birthday! ✨',  // Intro message
}
```

### Decorative Elements

Add decorative elements to the card:

```typescript
decorativeElements: {
  enabled: true,  // Enable/disable decorative elements
  type: 'stars',  // Options: stars, hearts, confetti, baloons, custom
}
```

## Example: Creating a Naruto Template

### Step 1: Create Folder

```bash
mkdir templates/naruto
```

### Step 2: Create Config

```typescript
// templates/naruto/config.ts
import { TemplateConfig } from '@/lib/types';

const narutoTemplate: TemplateConfig = {
  id: 'naruto',
  name: 'Naruto Theme',
  description: 'Inspired by the anime Naruto with orange and black colors',
  category: 'anime',
  colors: {
    primary: '#FF6600',
    secondary: '#FF8C00',
    accent: '#FFD700',
    background: 'linear-gradient(135deg, #FF6600 0%, #1a1a1a 50%, #FF8C00 100%)',
    text: '#FFFFFF',
    overlay: 'rgba(255, 102, 0, 0.1)',
  },
  fonts: {
    heading: 'Arial Black, sans-serif',
    body: 'Arial, sans-serif',
  },
  animations: {
    fadeIn: 'fadeIn 0.4s ease-in',
    slideUp: 'slideUp 0.4s ease-out',
    pulse: 'pulse 1.5s infinite',
  },
  backgroundEffects: {
    type: 'gradient',
    value: 'linear-gradient(135deg, #FF6600 0%, #1a1a1a 50%, #FF8C00 100%)',
    opacity: 1,
  },
  music: {
    autoplay: false,
  },
  introScreen: {
    enabled: true,
    duration: 2500,
    message: '🍥 Believe It! Happy Birthday! 🍥',
  },
  decorativeElements: {
    enabled: true,
    type: 'stars',
  },
};

export default narutoTemplate;
```

### Step 3: Register in Index

```typescript
// templates/index.ts
import { registerTemplate } from '@/lib/templateRegistry';
import animeTemplate from './anime/config';
import gamingTemplate from './gaming/config';
import luxuryTemplate from './luxury/config';
import romanticTemplate from './romantic/config';
import darkTemplate from './dark/config';
import narutoTemplate from './naruto/config'; // Add this

registerTemplate(animeTemplate);
registerTemplate(gamingTemplate);
registerTemplate(luxuryTemplate);
registerTemplate(romanticTemplate);
registerTemplate(darkTemplate);
registerTemplate(narutoTemplate); // Add this

export { getTemplate, getAllTemplates, getTemplatesByCategory } from '@/lib/templateRegistry';
```

## Example: Creating a Wedding Template

```typescript
// templates/wedding/config.ts
import { TemplateConfig } from '@/lib/types';

const weddingTemplate: TemplateConfig = {
  id: 'wedding',
  name: 'Wedding Theme',
  description: 'Elegant wedding celebration theme',
  category: 'wedding',
  colors: {
    primary: '#E8D5B7',
    secondary: '#D4AF37',
    accent: '#FFD700',
    background: 'linear-gradient(135deg, #E8D5B7 0%, #D4AF37 50%, #E8D5B7 100%)',
    text: '#4A4A4A',
    overlay: 'rgba(212, 175, 55, 0.1)',
  },
  fonts: {
    heading: 'Georgia, serif',
    body: 'Arial, sans-serif',
  },
  animations: {
    fadeIn: 'fadeIn 0.8s ease-in',
    slideUp: 'slideUp 0.6s ease-out',
    pulse: 'pulse 3s infinite',
  },
  backgroundEffects: {
    type: 'gradient',
    value: 'linear-gradient(135deg, #E8D5B7 0%, #D4AF37 50%, #E8D5B7 100%)',
    opacity: 1,
  },
  music: {
    autoplay: false,
  },
  introScreen: {
    enabled: true,
    duration: 3000,
    message: '💒 Happy Birthday! 💒',
  },
  decorativeElements: {
    enabled: true,
    type: 'hearts',
  },
};

export default weddingTemplate;
```

## Example: Creating a Minecraft Template

```typescript
// templates/minecraft/config.ts
import { TemplateConfig } from '@/lib/types';

const minecraftTemplate: TemplateConfig = {
  id: 'minecraft',
  name: 'Minecraft Theme',
  description: 'Pixelated Minecraft-inspired design',
  category: 'minecraft',
  colors: {
    primary: '#5CD65C',
    secondary: '#3D3D3D',
    accent: '#FF5555',
    background: 'linear-gradient(135deg, #5CD65C 0%, #3D3D3D 50%, #5CD65C 100%)',
    text: '#FFFFFF',
    overlay: 'rgba(92, 214, 92, 0.1)',
  },
  fonts: {
    heading: 'Courier New, monospace',
    body: 'Courier New, monospace',
  },
  animations: {
    fadeIn: 'fadeIn 0.3s ease-in',
    slideUp: 'slideUp 0.3s ease-out',
    pulse: 'pulse 2s infinite',
  },
  backgroundEffects: {
    type: 'gradient',
    value: 'linear-gradient(135deg, #5CD65C 0%, #3D3D3D 50%, #5CD65C 100%)',
    opacity: 1,
  },
  music: {
    autoplay: false,
  },
  introScreen: {
    enabled: true,
    duration: 2000,
    message: '⛏️ Happy Birthday! ⛏️',
  },
  decorativeElements: {
    enabled: true,
    type: 'stars',
  },
};

export default minecraftTemplate;
```

## Best Practices

### 1. Unique IDs
Always use unique template IDs. If you're creating a template for a specific character or theme, use a descriptive ID:
- ✅ `naruto-shippuden`
- ✅ `minecraft-diamond`
- ✅ `kpop-bts`
- ❌ `template1`
- ❌ `my-template`

### 2. Color Accessibility
Ensure your color combinations have good contrast:
- Use tools like WebAIM Contrast Checker
- Test with different screen brightness levels
- Consider colorblind users

### 3. Font Selection
Choose fonts that are:
- Readable on all devices
- Available on most systems (web-safe fonts)
- Appropriate for the theme

### 4. Performance
- Keep animations simple and performant
- Avoid heavy image backgrounds
- Use CSS gradients instead of images when possible

### 5. Mobile Responsiveness
- Test templates on mobile devices
- Ensure text is readable on small screens
- Consider touch targets for interactive elements

## Template Categories for Future Expansion

The system supports unlimited categories. Here are some ideas:

### Anime Subcategories
- `naruto` - Naruto themed
- `onepiece` - One Piece themed
- `dragonball` - Dragon Ball themed
- `pokemon` - Pokemon themed

### Gaming Subcategories
- `minecraft` - Minecraft themed
- `roblox` - Roblox themed
- `fortnite` - Fortnite themed
- `valorant` - Valorant themed

### K-Pop Subcategories
- `bts` - BTS themed
- `blackpink` - BlackPink themed
- `twice` - TWICE themed
- `exo` - EXO themed

### Celebration Subcategories
- `wedding` - Wedding themed
- `graduation` - Graduation themed
- `anniversary` - Anniversary themed
- `baby-shower` - Baby shower themed

## Troubleshooting

### Template Not Showing Up

**Problem:** New template doesn't appear in the dropdown

**Solution:**
1. Ensure template is registered in `templates/index.ts`
2. Check that the template ID is unique
3. Verify the config file exports default
4. Restart the development server

### Colors Not Applying

**Problem:** Template colors aren't showing correctly

**Solution:**
1. Check color values are valid hex codes
2. Ensure background gradient syntax is correct
3. Verify template is being loaded correctly
4. Check browser console for errors

### Animations Not Working

**Problem:** Animations aren't playing

**Solution:**
1. Ensure animations are defined in `tailwind.config.ts`
2. Check animation names match between config and CSS
3. Verify animation syntax is correct
4. Test in different browsers

## Advanced Features

### Custom Animations

Add custom animations in `tailwind.config.ts`:

```typescript
animation: {
  'your-animation': 'yourAnimation 1s ease-in-out',
},
keyframes: {
  yourAnimation: {
    '0%': { /* start state */ },
    '100%': { /* end state */ },
  },
},
```

### Image Backgrounds

Use image backgrounds instead of gradients:

```typescript
backgroundEffects: {
  type: 'image',
  value: 'https://example.com/background.jpg',
  opacity: 0.8,
}
```

### Pattern Backgrounds

Use CSS patterns:

```typescript
backgroundEffects: {
  type: 'pattern',
  value: 'repeating-linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc)',
  opacity: 0.3,
}
```

## Migration from Old System

If you have cards created with the old template system, they will continue to work because:

1. The `lib/templates.ts` file maintains backward compatibility
2. Old template IDs are preserved
3. The registry system supports both old and new templates

## Support

For template-related issues:
- Check this guide first
- Review existing template configs in `templates/` folder
- Test with the development server
- Check browser console for errors
