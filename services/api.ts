import type { Skill, SkillPayload } from '../src/types/skills';

const BASE_URL = 'http://10.0.2.2:5283/api'; // ajuste para sua API

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Erro HTTP ${res.status}`);
  }
  return (await res.json()) as T;
}

export async function getSkills(): Promise<Skill[]> {
  const res = await fetch(`${BASE_URL}/skills`);
  return handleResponse<Skill[]>(res);
}

export async function getSkillById(id: number | string): Promise<Skill> {
  const res = await fetch(`${BASE_URL}/skills/${id}`);
  return handleResponse<Skill>(res);
}

export async function createSkill(payload: SkillPayload): Promise<Skill> {
  const res = await fetch(`${BASE_URL}/skills`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse<Skill>(res);
}

export async function updateSkill(
  id: number | string,
  payload: SkillPayload | Skill
): Promise<Skill> {
  const res = await fetch(`${BASE_URL}/skills/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse<Skill>(res);
}

export async function deleteSkill(id: number | string): Promise<void> {
  const res = await fetch(`${BASE_URL}/skills/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Erro HTTP ${res.status}`);
  }
}
