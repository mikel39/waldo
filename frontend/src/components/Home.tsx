import type { Dispatch, SetStateAction } from "react";
import type { Data, Page } from "../types/types";
import type React from "react";
import styles from "../styles/home.module.css";

interface Props {
  setPage: Dispatch<SetStateAction<Page>>;
  data: Data[];
  setGame: Dispatch<SetStateAction<Data | null>>;
}

function Home({ setPage, data, setGame }: Props) {
  const handleOnClick = (event: React.MouseEvent) => {
    setPage("game");
    const id = event.currentTarget.getAttribute("data-game");
    const game = data.find((dt) => dt.id === Number(id)) as Data;
    setGame(game);
  };

  return (
    <div className={styles.home}>
      {data?.map((dt) => {
        return (
          <div
            className={styles.gamePreview}
            key={dt.id}
            onClick={handleOnClick}
            data-game={dt.id}
            tabIndex={0}
          >
            <span className={styles.title}>{dt.name}</span>
            <img src={dt.url} />
          </div>
        );
      })}
    </div>
  );
}

export default Home;
