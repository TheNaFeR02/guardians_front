interface Villain {
    id: number;
    name: string;
    age: number;
    image_url: string;
    description: string;
    character_enemies: CharacterEnemies[];
    powers: Powers[];
    weaknesses: Weaknesses[];
}

interface CharacterEnemies {
    id: number;
    name: string;
}

interface Powers {
    id: number;
    name: string;
}

interface Weaknesses {
    id: number;
    name: string;
}