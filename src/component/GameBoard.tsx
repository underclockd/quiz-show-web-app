"use client";
import { useState } from "react";

import styles from "@/app/game/[id]/board.module.css";
import { Category } from "@/db/types";
import { Board } from "@/db/types";
import CategoryColumn from "@/component/CategoryColumn";

export default function GameBoard({ gameData }: {gameData: Board}) {
    // Current round of the game
    const [currentRound, setCurrentRound] = useState<'single' | 'double' | 'final'>('single');

    // Number of clues fully revealed (answer shown)
    const [revealedCount, setRevealedCount] = useState(0);

    // Total number of clues for the given round.
    const totalClues = gameData[currentRound]?.categories?.reduce(
        (total: number, cat: Category) => total + cat.clues.length, 0
    ) || 0;

    // Passed to children to manage state.
    // When the revealed count >= total clues in the round, advance the round.
    // Otherwise, increment the revealedCount.
    const handleClueComplete = () => {
        setRevealedCount((prevCount) => {
            const newCount = prevCount + 1;
            if (newCount >= totalClues)
            {
                switch (currentRound)
                {
                    case 'single':
                        setCurrentRound('double');
                        return 0;
                    case 'double':
                        setCurrentRound('final');
                        return 0;
                }
            }
            return newCount;
        });
    };

    return (
        <div className={styles.boardContainer}>
            {/* Construct the category columns. Clues are created when each column is created. */}
            {gameData[currentRound]?.categories?.map((data, index) => {
                return (
                    <CategoryColumn key={data.name || index} categoryData={data} clueCompleteHandler={handleClueComplete} />
                );
            })}
        </div>
    );
}
