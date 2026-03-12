import db from "@/db";
import scrape from "@/db/scrape";

export default async function Game({ params }: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const game = await db.game.findUnique({ where: { id } }) ?? await db.game.create({ data: { id, data: await scrape(id) } });

    return (
        <div>
            <main>
                {
                    JSON.stringify(game)
                }
            </main>
        </div>
    )
}
