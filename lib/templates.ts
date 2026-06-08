// This file is kept for backward compatibility
// The new template system uses the template registry in lib/templateRegistry.ts
// and individual template configs in templates/ folder

import { getAllTemplates } from './templateRegistry';
import '@/templates'; // Import to register templates

// Re-export for backward compatibility
export const templates = getAllTemplates().reduce((acc, template) => {
  acc[template.id] = template;
  return acc;
}, {} as Record<string, any>);
