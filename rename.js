const fs = require('fs');
const path = require('path');

const renames = [
  { old: 'MinimalHeader', new: 'SectionHeader' },
  { old: 'DecodeTitle', new: 'ScrambledTitle' },
  { old: 'ScrollVelocity', new: 'ScrollingTicker' },
  { old: 'TextType', new: 'TypingAnimation' }
];

const filesToProcess = [
  'src/sections/TechStackSection.tsx',
  'src/sections/ProjectsSection.tsx',
  'src/sections/KnowledgeSection.tsx',
  'src/sections/EducationSection.tsx',
  'src/sections/ExperienceSection.tsx',
  'src/sections/ContactSection.tsx',
  'src/sections/CertificationsSection.tsx',
  'src/sections/HomeSection.tsx',
  'src/components/index.ts',
  'src/components/MinimalHeader.tsx',
  'src/components/SectionHeader.tsx',
  'src/components/DecodeTitle.tsx',
  'src/components/ScrambledTitle.tsx',
  'src/components/TextType.tsx',
  'src/components/TypingAnimation.tsx',
  'src/components/ScrollVelocity.tsx',
  'src/components/ScrollingTicker.tsx'
];

filesToProcess.forEach(f => {
  const p = path.join(process.cwd(), f);
  if(fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    renames.forEach(r => {
      content = content.split(r.old).join(r.new);
    });
    fs.writeFileSync(p, content);
  }
});

// Now rename the actual files
renames.forEach(r => {
  const oldPath = path.join(process.cwd(), 'src/components', `${r.old}.tsx`);
  const newPath = path.join(process.cwd(), 'src/components', `${r.new}.tsx`);
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed ${r.old} to ${r.new}`);
  }
});
