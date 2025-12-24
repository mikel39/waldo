import type { Dispatch, SetStateAction } from "react";
import type { Page } from "../types/types";
import styles from "../styles/bar.module.css";

interface Props {
  setPage: Dispatch<SetStateAction<Page>>;
}

function Bar({ setPage }: Props) {
  return (
    <nav className={styles.bar}>
      <span
        onClick={() => {
          setPage("home");
        }}
        className={styles.title}
        tabIndex={1}
      >
        Search&Find
      </span>
      <button
        onClick={() => {
          setPage("ranking");
        }}
      >
        Ranking
      </button>
    </nav>
  );
}

export default Bar;
