import styles from "./CategoryHeader.module.css";

export default function CategoryHeader({ title }: { title: string }) {
    return (
        <th className={styles.header} scope="col">
            {title}
        </th>
    );
}
