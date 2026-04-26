import { appName } from "@/app/site";
import GameBoard from "@/components/GameBoard/GameBoard";
import db from "@/db";
import scrape from "@/db/scrape";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(
    { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
    const number = (await params).id;
    const title = `Game #${number}`;
    const description = `Play trivia game #${number}`;
    const path = `/game/${number}`;

    return {
        title,
        description,
        alternates: {
            canonical: path,
        },
        openGraph: {
            type: "website",
            locale: "en_US",
            url: path,
            siteName: appName,
            title,
            description,
        },
        twitter: {
            card: "summary",
            title,
            description,
        },
    };
}

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
        <main id="main-content">
            <GameBoard gameData={game.data} />
        </main>
    );
}
