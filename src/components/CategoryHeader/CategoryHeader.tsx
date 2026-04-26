"use client";

import { useLayoutEffect, useRef } from "react";
import styles from "./CategoryHeader.module.css";

export default function CategoryHeader({ title }: { title: string }) {
    const headerRef = useRef<HTMLTableCellElement>(null);

    useLayoutEffect(() => {
        const header = headerRef.current;
        if (!header) return;

        const measure = () => {
            header.style.removeProperty("--category-scale");
            const range = document.createRange();
            range.selectNodeContents(header);
            let textWidth = 0;
            for (const rect of range.getClientRects()) textWidth = Math.max(textWidth, rect.width);
            if (!textWidth) return;
            const { paddingLeft, paddingRight } = getComputedStyle(header);
            const availableWidth = (header.clientWidth - parseFloat(paddingLeft) - parseFloat(paddingRight)) * 0.985;
            header.style.setProperty("--category-scale", (availableWidth / textWidth).toFixed(4));
        };

        measure();
        if (document.fonts.status !== "loaded") document.fonts.ready.then(measure).catch(() => { });

        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, [title]);

    return (
        <th ref={headerRef} className={styles.header} scope="col">
            {title}
        </th>
    );
}
