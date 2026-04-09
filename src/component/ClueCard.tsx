"use client";
import { useState } from "react";
import styles from "@/app/game/[id]/board.module.css";
import type { Clue } from "@/db/types";

export default function ClueCard({value, clue}: {value: number, clue: Clue}) {
    // 0: Dollar value displayed
    // 1: Prompt displayed
    // 2: Answer displayed
    const [clickStage, setClickState] = useState(0);

    const handleClick = () => {
        if (clickStage < 2)
            setClickState(clickStage+1);
    };

    let displayContent;
    switch (clickStage) {
        case 0:
            displayContent = `$${value}`;
            break;
        case 1:
            displayContent = clue.text;
            break;
        default:
            displayContent = clue.response;
            break;
    }
    return (
        <div 
            className={styles.clueCard}
            onClick={handleClick}
            style={{
                cursor: clickStage < 2 ? "pointer" : "default",
                fontSize: clickStage > 0 ? "1rem" : "2rem"
            }}
        >
            {displayContent}
        </div>
    );
}