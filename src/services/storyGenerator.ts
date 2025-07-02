
import type { StoryFormData } from '@/types/story';

const storyTemplates = {
  funny: {
    titles: [
      "The Giggling {interest} Adventure",
      "{interest} and the Silly Day",
      "The Laughing {interest} Mystery"
    ],
    openings: [
      "Once upon a time, in a land where everything was wonderfully silly,",
      "In a magical place where laughter echoed through the trees,",
      "There once lived a very funny little"
    ]
  },
  adventurous: {
    titles: [
      "The Great {interest} Quest",
      "{interest}'s Amazing Journey",
      "The Secret of the {interest}"
    ],
    openings: [
      "In a land of endless possibilities and brave hearts,",
      "Where mountains touched the clouds and rivers sang songs,",
      "On a bright morning filled with excitement,"
    ]
  },
  magical: {
    titles: [
      "The Enchanted {interest}",
      "{interest} and the Magic Spell",
      "The Wonderful World of {interest}"
    ],
    openings: [
      "In a realm where magic sparkled in every dewdrop,",
      "Where unicorns danced and stars whispered secrets,",
      "In an enchanted forest filled with wonder,"
    ]
  },
  gentle: {
    titles: [
      "The Peaceful {interest} Story",
      "{interest}'s Quiet Adventure",
      "The Gentle {interest} Tale"
    ],
    openings: [
      "In a quiet meadow where flowers swayed gently,",
      "Where soft winds carried the sweetest dreams,",
      "In a cozy little place filled with warmth,"
    ]
  },
  educational: {
    titles: [
      "Learning with {interest}",
      "The Wise {interest}'s Lesson",
      "{interest} Discovers Something Amazing"
    ],
    openings: [
      "In a world full of curious minds and wonderful discoveries,",
      "Where every question led to an amazing answer,",
      "In a place where learning was the greatest adventure,"
    ]
  },
  mysterious: {
    titles: [
      "The Mystery of the {interest}",
      "{interest} and the Hidden Secret",
      "The Puzzling {interest} Adventure"
    ],
    openings: [
      "When the moon cast long shadows and mysteries unfolded,",
      "In a place where secrets waited to be discovered,",
      "Where curious minds solved the most interesting puzzles,"
    ]
  }
};

export const generateMockStory = (formData: StoryFormData): { title: string; content: string } => {
  const style = formData.style as keyof typeof storyTemplates;
  const template = storyTemplates[style] || storyTemplates.gentle;
  const mainInterest = formData.interests[0] || 'friend';
  
  // Generate title
  const titleTemplate = template.titles[Math.floor(Math.random() * template.titles.length)];
  const title = titleTemplate.replace('{interest}', mainInterest);
  
  // Generate story content
  const opening = template.openings[Math.floor(Math.random() * template.openings.length)];
  
  const pronouns = formData.gender === 'boy' ? { subject: 'he', object: 'him', possessive: 'his' } :
                   formData.gender === 'girl' ? { subject: 'she', object: 'her', possessive: 'her' } :
                   { subject: 'they', object: 'them', possessive: 'their' };
  
  const content = `${opening} there lived a wonderful ${formData.age}-year-old who loved ${formData.interests.join(', ')}.

Every day, ${pronouns.subject} would dream of amazing adventures involving ${pronouns.possessive} favorite things. One special evening, something magical happened that would teach ${pronouns.object} an important lesson about ${formData.lesson}.

As ${pronouns.subject} discovered the true meaning of ${formData.lesson}, ${pronouns.possessive} heart filled with joy and understanding. The adventure showed ${pronouns.object} that being kind, brave, and curious can lead to the most wonderful discoveries.

From that day forward, whenever ${pronouns.subject} faced a challenge, ${pronouns.subject} remembered this magical adventure and the important lesson about ${formData.lesson}. And every night, as ${pronouns.subject} drifted off to sleep, ${pronouns.subject} knew that tomorrow would bring new opportunities to be the amazing person ${pronouns.subject} was meant to be.

The end. Sweet dreams! 🌙✨`;

  return { title, content };
};
