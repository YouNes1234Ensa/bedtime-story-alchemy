
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
  const allInterests = formData.interests.join(', ');
  
  // Generate title
  const titleTemplate = template.titles[Math.floor(Math.random() * template.titles.length)];
  const title = titleTemplate.replace('{interest}', mainInterest);
  
  // Generate story content
  const opening = template.openings[Math.floor(Math.random() * template.openings.length)];
  
  const pronouns = formData.gender === 'boy' ? { subject: 'he', object: 'him', possessive: 'his' } :
                   formData.gender === 'girl' ? { subject: 'she', object: 'her', possessive: 'her' } :
                   { subject: 'they', object: 'them', possessive: 'their' };

  // Create a much longer, more detailed story
  const content = `${opening} there lived a wonderful ${formData.age}-year-old who had the most amazing imagination. ${pronouns.subject} loved spending time with ${allInterests}, and every day brought new discoveries and adventures.

One beautiful morning, as golden sunlight streamed through ${pronouns.possessive} bedroom window, something extraordinary happened. ${pronouns.subject} heard a gentle whisper coming from ${pronouns.possessive} favorite spot in the house. Curious and excited, ${pronouns.subject} tiptoed closer to investigate.

To ${pronouns.possessive} amazement, ${pronouns.subject} discovered a magical doorway that shimmered like rainbow bubbles! The doorway seemed to pulse with warm, inviting light, and ${pronouns.subject} could hear the faint sound of laughter and music coming from the other side.

Taking a deep breath and feeling brave, ${pronouns.subject} stepped through the magical doorway and found ${pronouns.object}self in the most wonderful place imaginable. It was a land where ${allInterests} came to life in the most spectacular ways! Trees grew in spirals of every color, flowers sang sweet melodies, and the very air sparkled with possibilities.

As ${pronouns.subject} explored this enchanting world, ${pronouns.subject} met many new friends who were just as curious and kind as ${pronouns.subject} was. There was a wise old owl who wore tiny spectacles and knew everything about ${mainInterest}, a playful rabbit who could hop from cloud to cloud, and a gentle deer who spoke in whispers and always knew the right thing to say.

Together, they embarked on an incredible journey through valleys of cotton candy clouds, across bridges made of rainbow light, and into a forest where the trees told stories of long ago. Along the way, they encountered a challenge that would test everything they had learned about ${formData.lesson}.

The friends discovered that a sad, lonely creature had been hiding in the shadows, feeling forgotten and unloved. This creature had been causing mischief throughout the magical land, not because it was mean, but because it didn't know how to ask for friendship and kindness.

Our brave little hero remembered all the important lessons about ${formData.lesson} that ${pronouns.subject} had learned from ${pronouns.possessive} family and friends. With a heart full of compassion, ${pronouns.subject} approached the lonely creature slowly and gently.

"Hello," ${pronouns.subject} said softly, "would you like to be our friend? We'd love to show you all the wonderful things in this magical place, and we think you might enjoy playing with us."

The creature's eyes filled with tears of joy, and suddenly its sad appearance began to change. Colors bloomed across its fur, its frown turned into the biggest smile, and it began to glow with happiness. The creature explained that it had been alone for so long that it had forgotten how good it felt to have friends who cared.

From that moment on, the magical land became even more beautiful and bright. The new friend showed them secret paths to hidden waterfalls, taught them songs that made flowers dance, and shared stories that made everyone laugh until their bellies hurt.

As the day in the magical land came to an end, our little hero realized something very important: the real magic wasn't in the sparkling doorway or the singing flowers – it was in the kindness, friendship, and understanding that lived inside ${pronouns.possessive} own heart.

The wise owl with spectacles flew down and perched gently on ${pronouns.possessive} shoulder. "You have learned the most important lesson of all," the owl said with a warm smile. "When we practice ${formData.lesson}, we create magic everywhere we go. This magic doesn't need special doorways or enchanted lands – it lives inside you always."

${pronouns.subject} hugged all of ${pronouns.possessive} new friends goodbye, promising to visit again soon, and stepped back through the shimmering doorway into ${pronouns.possessive} own room. But now everything looked a little more magical than before, because ${pronouns.subject} was seeing the world through eyes filled with the wisdom of ${formData.lesson}.

That night, as ${pronouns.subject} snuggled under ${pronouns.possessive} cozy blankets, ${pronouns.subject} smiled thinking about the wonderful adventure and all the friends ${pronouns.subject} had made. ${pronouns.subject} knew that tomorrow would bring new opportunities to practice ${formData.lesson} and spread kindness wherever ${pronouns.subject} went.

And you know what the most wonderful part was? Every time ${pronouns.subject} was kind to others, helped someone in need, or showed the true meaning of ${formData.lesson}, ${pronouns.subject} could almost hear the gentle whisper of that magical doorway, reminding ${pronouns.object} that the real adventure is in the love and kindness we share with the world around us.

From that day forward, our little hero carried the magic of that special place wherever ${pronouns.subject} went, making the world a little brighter and more wonderful for everyone ${pronouns.subject} met. And every night, as ${pronouns.subject} drifted off to sleep, ${pronouns.subject} dreamed of new adventures and the many ways ${pronouns.subject} could continue to practice ${formData.lesson} in ${pronouns.possessive} everyday life.

The end. Sweet dreams, little one! 🌙✨💫`;

  return { title, content };
};
