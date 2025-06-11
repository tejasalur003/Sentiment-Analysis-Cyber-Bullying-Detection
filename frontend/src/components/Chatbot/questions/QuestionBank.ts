export interface MentalHealthQuestion {
  question: string;
  category: 'depression' | 'anxiety' | 'harassment' | 'frustration';
  weight?: number;
}

const questions: MentalHealthQuestion[] = [
  { 
    question: 'When scrolling through social media recently, have you found yourself feeling unusually hopeless or down?', 
    category: 'depression',
    weight: 1.2 
  },
  { 
    question: 'Compared to last month, would you say everyday situations now make you feel more anxious or on edge?', 
    category: 'anxiety' 
  },
  { 
    question: 'In the past week, have you received any online messages or comments that made you feel uncomfortable or threatened?', 
    category: 'harassment',
    weight: 1.5 
  },
  { 
    question: 'How often has technology (slow devices, notifications, online arguments) made you feel frustrated recently?', 
    category: 'frustration' 
  },
  { 
    question: 'When you try to enjoy your favorite online activities now, do they bring you less pleasure than they used to?', 
    category: 'depression' 
  },
  { 
    question: 'Do you find yourself worrying about your online reputation or digital footprint more than you think is healthy?', 
    category: 'anxiety',
    weight: 1.3 
  },
  { 
    question: 'Has anyone used your personal information or identity in ways that felt invasive or disrespectful online?', 
    category: 'harassment' 
  },
];

export default questions;