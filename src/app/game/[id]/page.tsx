import db from "@/db";
import scrape from "@/db/scrape";
import GameBoard from "@/component/GameBoard";
import { notFound } from "next/navigation";

export default async function Game({ params }: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    if (!Number.isFinite(id)) notFound();

    let game = await db.game.findUnique({ where: { id } });
    if (!game) {
        try {
            const data = await scrape(id);
            game = await db.game.upsert({
                where: { id },
                create: { id, data },
                update: {},
            });
        } catch {
            notFound();
        }
    }

    return (
        <GameBoard gameData={game.data}/>
    )
}
