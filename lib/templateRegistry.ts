import { TemplateConfig } from './types';

// Template Registry System
// This system allows unlimited templates to be added without modifying existing code
// Each template is self-contained in its own folder

class TemplateRegistry {
  private templates: Map<string, TemplateConfig> = new Map();

  register(template: TemplateConfig): void {
    this.templates.set(template.id, template);
  }

  get(id: string): TemplateConfig | undefined {
    return this.templates.get(id);
  }

  getAll(): TemplateConfig[] {
    return Array.from(this.templates.values());
  }

  getByCategory(category: string): TemplateConfig[] {
    return Array.from(this.templates.values()).filter(
      (t) => t.category === category
    );
  }

  exists(id: string): boolean {
    return this.templates.has(id);
  }

  unregister(id: string): boolean {
    return this.templates.delete(id);
  }
}

// Create singleton instance
const registry = new TemplateRegistry();

// Register templates manually (templates will be imported from their individual folders)
// This approach is more reliable than dynamic imports for TypeScript
export function registerTemplate(template: TemplateConfig): void {
  registry.register(template);
}

// Export registry instance
export { registry };

// Helper function to get template
export function getTemplate(id: string): TemplateConfig | undefined {
  return registry.get(id);
}

// Helper function to get all templates
export function getAllTemplates(): TemplateConfig[] {
  return registry.getAll();
}

// Helper function to get templates by category
export function getTemplatesByCategory(category: string): TemplateConfig[] {
  return registry.getByCategory(category);
}
