import { useState } from "react";
import Bar from "./components/Bar";
import Home from "./components/Home";
import Game from "./components/Game";
import useFetch from "./hooks/useFetch";
import type { Data, Page } from "./types/types";
import { initUser } from "./api";
import Ranking from "./components/Ranking";
import styles from "./styles/app.module.css";

function App() {
  const { response, loading, error } = useFetch("game/maps");
  const [page, setPage] = useState<Page>("home");
  const [game, setGame] = useState<Data | null>(null);

  const data = response?.data as Data[];
  initUser();

  if (error) {
    return <div>error happened</div>;
  }

  if (loading) {
    return (
      <div className={styles.body}>
        <span>Loading Assets .....</span>
      </div>
    );
  }

  return (
    <div className={styles.body}>
      <Bar setPage={setPage} />
      {page === "home" && (
        <Home setPage={setPage} data={data} setGame={setGame} />
      )}
      {page === "game" && <Game data={game as Data} setPage={setPage} />}
      {page === "ranking" && <Ranking />}
    </div>
  );
}

export default App;
