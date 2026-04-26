"use client";
import { useRef, useState } from "react";

import ClueDialog, { type ClueDialogHandle } from "@/components/ClueDialog/ClueDialog";
import type { Clue } from "@/db/types";
import styles from "./ClueCard.module.css";

export default function ClueCard({ value, clue, categoryName, roundLabel, onClueFinished }: { value: number, clue: Clue, categoryName: string, roundLabel: string, onClueFinished: () => void }) {
    const [answered, setAnswered] = useState(false);
    const dialogRef = useRef<ClueDialogHandle>(null);
    const clueLabel = `${roundLabel}, ${categoryName}, $${value} clue`;

    const handleAnswered = () => {
        setAnswered(true);
        onClueFinished();
    };

    return (
        <>
            {answered ? (
                <td aria-hidden="true" style={{ visibility: "hidden" }}>${value}</td>
            ) : (
                <td>
                    <button
                        className={styles.clueCard}
                        aria-label={clueLabel}
                        onClick={(e) => {
                            dialogRef.current?.open(e.currentTarget.getBoundingClientRect());
                        }}
                    >
                        ${value}
                    </button>
                    <ClueDialog ref={dialogRef} clue={clue} label={clueLabel} onAnswered={handleAnswered} />
                </td>
            )}
        </>
    );
}
