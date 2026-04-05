import { existsSync, renameSync } from 'fs';

try {
  if (existsSync('src/components/DecodeTitle.tsx'))
    renameSync('src/components/DecodeTitle.tsx', 'src/components/ScrambledTitle.tsx');

  if (existsSync('src/components/ScrollVelocity.tsx'))
    renameSync('src/components/ScrollVelocity.tsx', 'src/components/ScrollingTicker.tsx');

  if (existsSync('src/components/TextType.tsx'))
    renameSync('src/components/TextType.tsx', 'src/components/TypingAnimation.tsx');

  console.log('Renaming complete!');
} catch (e) {
  console.error(e);
}
