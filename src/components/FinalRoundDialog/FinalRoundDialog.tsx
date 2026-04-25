"use client";
import { useEffect, useRef, useState } from "react";

import type { Category } from "@/db/types";
import styles from "./FinalRoundDialog.module.css";

export default function FinalRoundDialog({ category }: { category: Category }) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const clue = category.clues[0];

    useEffect(() => {
        dialogRef.current?.showModal();
    }, []);

    const handleClick = () => {
        if (!showAnswer) {
            setShowAnswer(true);
        }
    };

    return (
        <dialog ref={dialogRef} className={styles.dialog} onClick={handleClick}>
            <div className={styles.category}>{category.name}</div>
            <div className={styles.clue}>
                {showAnswer ? clue?.response : clue?.text}
            </div>
        </dialog>
    );
}
