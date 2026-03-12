// This specifies the structure of the JSON we store in the database.

declare global {
    namespace PrismaJson {
        type GameData = Board;
    }
}

export { };

interface Board {
    single: Round & { dailyDouble: number }
    double: Round & { dailyDoubles: [number, number] }
    final: {
        categoryName: string
        clue: string
        answer: string
    }
}

interface Round {
    category1: Category
    category2: Category
    category3: Category
    category4: Category
    category5: Category
    category6: Category
}

interface Category {
    name: string
    clue1: Clue[]
    clue2: Clue[]
    clue3: Clue[]
    clue4: Clue[]
    clue5: Clue[]
}

interface Clue {
    text: string
    answer: string
}