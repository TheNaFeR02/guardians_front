export interface Villain {
  id: number;
  name: string;
  age: number;
  image_url: string;
  image_screen_large_url: string;
  description: string;
  character_enemies: CharacterEnemies;
  powers: Powers;
  weaknesses: Weaknesses;
}

export interface CharacterEnemies {
  [key: string]: string;
}

interface Power {
  [key: string]: string;
}

interface Weaknesses {
  [key: string]: string;
}