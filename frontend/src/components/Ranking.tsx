import useFetch from "../hooks/useFetch";
import type { GameData } from "../types/types";
import { diffTime } from "../utils/utils";
import styles from "../styles/ranking.module.css";

interface Data {
  id: number;
  name: string;
  game: GameData[];
}

function Ranking() {
  const { response } = useFetch("game/records");

  if (response?.status === "success") {
    const data = response.data as Data[];
    return (
      <div className={styles.rankingContainer}>
        {data.map((dt) => {
          return (
            <div key={dt.id}>
              <h2 className={styles.title}>{dt.name}</h2>
              {dt.game.map((gm) => {
                return (
                  <div key={gm.id} className={styles.rows}>
                    <p>{gm.user.username ? gm.user.username : "unknow"}</p>
                    <p>{diffTime(gm.start, gm.end as string)}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Ranking;
