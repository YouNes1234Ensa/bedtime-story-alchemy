
export interface StoryFormData {
  age: number;
  gender: string;
  interests: string[];
  style: string;
  lesson: string;
}

export interface GeneratedStory {
  title: string;
  content: string;
  formData: StoryFormData;
}
