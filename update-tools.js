const fs = require('fs');
const path = require('path');

const map = {
  "age-calculator": "calculator",
  "insurance-cost": "calculator",
  "pet-bmi": "calculator",
  "pet-sitter-cost": "calculator",
  "sitting-comparison": "calculator",
  "best-cat-quiz": "quiz",
  "best-dog-quiz": "quiz",
  "first-aid-quiz": "quiz",
  "pet-health-quiz": "quiz",
  "pet-owner-quiz": "quiz",
  "first-aid": "health",
  "symptom-checker": "health",
  "vaccine-tracker": "health",
  "feeding-calculator": "food",
  "toxic-food": "food",
  "gps-tracker": "map",
  "walk-tracker": "map",
  "packing-checklist": "travel",
  "birthday-countdown": "calendar",
  "photo-tips": "camera",
  "name-generator": "text",
  "breed-compare": "search"
};

const toolsDir = path.join(__dirname, 'app/tools');
const entries = fs.readdirSync(toolsDir, { withFileTypes: true });

for (const entry of entries) {
  if (entry.isDirectory()) {
    const type = map[entry.name];
    if (!type) continue;
    
    const pageFile = path.join(toolsDir, entry.name, 'page.tsx');
    if (fs.existsSync(pageFile)) {
      let content = fs.readFileSync(pageFile, 'utf8');
      
      // Prevent double adding
      if (!content.includes('ToolIllustration')) {
        content = content.replace(/(import ToolLayout from "[^"]+";)/, '$1\nimport ToolIllustration from "../../components/ToolIllustration";');
        
        // Find <ToolLayout and add illustration before >
        content = content.replace(/(<ToolLayout[\s\S]*?)>/, '$1  illustration={<ToolIllustration type="' + type + '" />}\n    >');
        
        fs.writeFileSync(pageFile, content, 'utf8');
        console.log(`Updated ${entry.name}`);
      }
    }
  }
}
console.log("Done");
