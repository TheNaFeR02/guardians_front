export interface Hero {
    id: number,
    name: string,
    age: number,
    image_url: string,
    image_screen_large_url: string,
    description: string,
    character_friends: CharacterFriends,
    powers: Power,
    sponsors: Sponsor,
}

interface CharacterFriends {
    [key: string]: string;
}

interface Power {
    [key: string]: string;
}

interface Sponsor {
    [key: string]: string;
}