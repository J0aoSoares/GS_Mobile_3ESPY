// src/services/api.ts
import axios from 'axios';
import type { Skill, SkillPayload } from '../src/types/skills';

const api = axios.create({
  baseURL: 'http://10.0.2.2:8080/api',
  timeout: 5000,
});

export async function getSkills(): Promise<Skill[]> {
  const response = await api.get<Skill[]>('/skills');
  return response.data;
}

export async function getSkillById(id: number | string): Promise<Skill> {
  const response = await api.get<Skill>(`/skills/${id}`);
  return response.data;
}

// CREATE
export async function createSkill(payload: SkillPayload): Promise<Skill> {
  const response = await api.post<Skill>('/skills', payload);
  return response.data;
}

// UPDATE
export async function updateSkill(
  id: number | string,
  payload: SkillPayload | Skill
): Promise<Skill> {
  const response = await api.put<Skill>(`/skills/${id}`, payload);
  return response.data;
}

// DELETE
export async function deleteSkill(id: number | string): Promise<void> {
  await api.delete(`/skills/${id}`);
}

export default api;
