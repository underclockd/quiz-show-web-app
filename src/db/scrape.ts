import { HTMLElement, parse } from "node-html-parser";
import { Board, Category, Clue, Round } from "./types";

export default async function getGame(gameID: number): Promise<Board> {
    const page = await fetch(`https://www.j-archive.com/showgame.php?game_id=${gameID}`);
    const html = await page.text();
    const root = parse(html);

    return parseGame(root);
}

function parseGame(root: HTMLElement): Board {
    const singleDiv = root.querySelector("div#jeopardy_round");
    if (!singleDiv) throw new Error("Could not find normal round div");

    const doubleDiv = root.querySelector("div#double_jeopardy_round");
    if (!doubleDiv) throw new Error("Could not find double round div");

    const finalDiv = root.querySelector("div#final_jeopardy_round");
    if (!finalDiv) throw new Error("Could not find final round div");

    return {
        single: parseRound(singleDiv),
        double: parseRound(doubleDiv),
        final: parseRound(finalDiv),
    }
}

function parseRound(div: HTMLElement): Round {
    const categoryTD = div.querySelectorAll(".category_name");
    const cluesTD = div.querySelectorAll("td.clue");

    const categoryNames: string[] = categoryTD.map((category) => category.textContent ?? "");

    const clues: Clue[] = cluesTD.map((clue) => parseClue(clue));

    const categories: Category[] = categoryNames.map((name, categoryIndex) => ({
        name,
        clues: clues.filter((_, clueIndex) => clueIndex % categoryNames.length === categoryIndex)
    }));

    return { categories };
}

function parseClue(td: HTMLElement): Clue {
    const clueTD = td.querySelector("td.clue_text");
    const clueEm = td.querySelector("td.clue_text em");
    const clueA = td.querySelectorAll("td.clue_text a");

    if (!clueTD) throw new Error("Could not find clue text");
    if (!clueEm) throw new Error("Could not find clue answer");

    const text = clueTD.textContent;
    const response = clueEm.textContent;
    const media: string[] = [];

    if (!text) throw new Error("Could not find clue text content");
    if (!response) throw new Error("Could not find clue answer content");

    clueA.forEach((m) => {
        const href = m.getAttribute("href");
        if (href) media.push(href);
    });

    return { text, response, media };
}
