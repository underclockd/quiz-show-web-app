import db from "@/db";
import scrape from "@/db/scrape";
import GameBoard from "@/component/GameBoard";

export default async function Game({ params }: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const game = await db.game.findUnique({ where: { id } }) ?? await db.game.create({ data: { id, data: await scrape(id) } });
    const gameData = game.data;

    return (
        <GameBoard gameData={gameData}/>
    )
}
