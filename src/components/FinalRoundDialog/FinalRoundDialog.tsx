"use client";
import { useEffect, useId, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";

import type { Category } from "@/db/types";
import styles from "./FinalRoundDialog.module.css";

export default function FinalRoundDialog({ category }: { category: Category }) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const categoryId = useId();
    const clueId = useId();
    const [showAnswer, setShowAnswer] = useState(false);
    const clue = category.clues[0];

    useEffect(() => {
        dialogRef.current?.showModal();
    }, []);

    const revealAnswer = () => {
        if (!showAnswer) setShowAnswer(true);
    };

    const handleClick = (e: MouseEvent<HTMLDialogElement>) => {
        e.stopPropagation();
        revealAnswer();
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            revealAnswer();
        }
    };

    return (
        <dialog
            ref={dialogRef}
            className={styles.dialog}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            aria-labelledby={categoryId}
            aria-describedby={clueId}
        >
            <h2 id={categoryId} className={styles.category}>{category.name}</h2>
            <p id={clueId} className={styles.clue}>
                {showAnswer ? clue?.response : clue?.text}
            </p>
        </dialog>
    );
}
