import { JSDOM } from "jsdom";
import { Board, Category, Clue, Round } from "./types";

export default async function getGame(gameID: number): Promise<Board> {
    const page = await fetch(`https://www.j-archive.com/showgame.php?game_id=${gameID}`);
    const html = await page.text();
    const dom = new JSDOM(html);
    return parseGame(dom);
}

function parseGame(dom: JSDOM): Board {
    const document = dom.window.document;

    const singleDiv = document.querySelector("div#jeopardy_round");
    if (!singleDiv) throw new Error("Could not find normal round div");

    const doubleDiv = document.querySelector("div#double_jeopardy_round");
    if (!doubleDiv) throw new Error("Could not find double round div");

    const finalDiv = document.querySelector("div#final_jeopardy_round");
    if (!finalDiv) throw new Error("Could not find final round div");

    return {
        single: parseRound(singleDiv),
        double: parseRound(doubleDiv),
        final: parseRound(finalDiv),
    }
}

function parseRound(div: Element): Round {
    const categoryTD = div.querySelectorAll(".category_name");
    const cluesTD = div.querySelectorAll("td.clue");

    const categoryNames: string[] = [];
    categoryTD.forEach((category) =>
        categoryNames.push(category.textContent ?? "")
    );

    const clues: Clue[] = [];
    cluesTD.forEach((clue) => clues.push(parseClue(clue)));

    let categories: Category[] = [];
    categoryNames.forEach((name, categoryIndex) => categories.push(
        {
            name,
            clues: clues.filter((_, clueIndex) => clueIndex % categoryNames.length === categoryIndex)
        }
    ))

    return { categories };
}

function parseClue(td: Element): Clue {
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