export interface Skill {
  id: number;
  name: string;
  category?: string;
  level: number;       // 1 = iniciante, 2 = intermediário, 3 = avançado
  targetLevel: number;
  deadline?: string;   // "YYYY-MM-DD"
  notes?: string;
}

export type SkillPayload = Omit<Skill, 'id'>;
