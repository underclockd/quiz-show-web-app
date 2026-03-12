// This specifies the structure of the JSON we store in the database.

declare global {
    namespace PrismaJson {
        type GameData = Board;
    }
}

export interface Board {
    single: Round
    double: Round
    final: Round
}

export interface Round {
    categories: Category[]
}

export interface Category {
    name: string
    clues: Clue[]
}

export interface Clue {
    text: string
    response: string
    media?: string[]
}