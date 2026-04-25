"use client";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

import type { Clue } from "@/db/types";
import styles from "./ClueDialog.module.css";

export type ClueDialogHandle = { open: (origin: DOMRect) => void };

const ClueDialog = forwardRef<ClueDialogHandle, { clue: Clue; onAnswered: () => void }>(
    function ClueDialog({ clue, onAnswered }, ref) {
        const dialogRef = useRef<HTMLDialogElement>(null);
        const [showAnswer, setShowAnswer] = useState(false);

        useImperativeHandle(ref, () => ({
            open(origin: DOMRect) {
                setShowAnswer(false);
                const el = dialogRef.current;
                if (!el) return;
                el.style.setProperty("--origin-x", `${origin.left}px`);
                el.style.setProperty("--origin-y", `${origin.top}px`);
                el.style.setProperty("--origin-scale-x", String(origin.width / window.innerWidth));
                el.style.setProperty("--origin-scale-y", String(origin.height / window.innerHeight));
                el.showModal();
            },
        }));

        const handleClick = (e: React.MouseEvent) => {
            e.stopPropagation();
            if (!showAnswer) {
                setShowAnswer(true);
            } else {
                dialogRef.current?.close();
                onAnswered();
            }
        };

        return (
            <dialog ref={dialogRef} className={styles.dialog} onClick={handleClick} aria-label="Clue">
                <p className={styles.content}>
                    {showAnswer ? clue.response : clue.text}
                </p>
            </dialog>
        );
    }
);

export default ClueDialog;
