import { registerTemplate } from '@/lib/templateRegistry';
import animeTemplate from './anime/config';
import gamingTemplate from './gaming/config';
import luxuryTemplate from './luxury/config';
import romanticTemplate from './romantic/config';
import darkTemplate from './dark/config';
import narutoTemplate from './naruto/config';
import weddingTemplate from './wedding/config';
import minecraftTemplate from './minecraft/config';

// Register all templates
// New templates can be added by simply importing and registering them here
// without modifying any existing template code
registerTemplate(animeTemplate);
registerTemplate(gamingTemplate);
registerTemplate(luxuryTemplate);
registerTemplate(romanticTemplate);
registerTemplate(darkTemplate);
registerTemplate(narutoTemplate);
registerTemplate(weddingTemplate);
registerTemplate(minecraftTemplate);

// Re-export registry functions for convenience
export { getTemplate, getAllTemplates, getTemplatesByCategory } from '@/lib/templateRegistry';
