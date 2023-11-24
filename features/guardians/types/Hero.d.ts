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

export interface CharacterFriends {
    [key: string]: string;
}

export interface Power {
    [key: string]: string;
}

export interface Sponsor {
    [key: string]: string;
}