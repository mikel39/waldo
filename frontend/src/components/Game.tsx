import React, {
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { Data, GameData, Page } from "../types/types";
import useFetch from "../hooks/useFetch";
import { prettyTime } from "../utils/utils";
import WinnerPage from "./WinnerPage";
import styles from "../styles/game.module.css";

interface Props {
  data: Data;
  setPage: Dispatch<SetStateAction<Page>>;
}

function Game({ data, setPage }: Props) {
  const stdt = useMemo(
    () => ({
      uuid: localStorage.getItem("utoken"),
      imageid: data.id,
    }),
    [data.id],
  );

  const start = useFetch("game/start", "POST", stdt);
  const [gameData, setGameData] = useState({
    gameuuid: "",
    width: 0,
    height: 0,
    name: "",
    x: 0,
    y: 0,
  });
  const { response, setExecute, loading } = useFetch(
    "game/play",
    "POST",
    gameData,
    false,
  );

  const [options, setOptions] = useState({
    show: false,
    x: 0,
    y: 0,
  });

  const [notification, setNotification] = useState(false);

  const [time, setTiming] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNotification(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [notification]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTiming((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleOnClick = (event: React.MouseEvent) => {
    const img = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - img.x;
    const y = event.clientY - img.y;
    const { height, width } = img;
    setGameData((prev) => ({
      ...prev,
      x,
      y,
      height,
      width,
    }));
    setOptions({ show: !options.show, x, y });
  };

  const handleOnSubmit = (event: React.MouseEvent) => {
    const name = event.currentTarget.getAttribute("data-name") as string;
    const game = start.response?.data as GameData;
    setOptions({ x: 0, y: 0, show: false });
    setGameData((prev) => ({
      ...prev,
      name,
      gameuuid: game.uuid,
    }));
    setExecute(true);
    setNotification(true);
  };

  if (response?.data) {
    const data = response.data as GameData;
    if (data.end) {
      return <WinnerPage data={data} setPage={setPage} />;
    }
  }

  if (start.response?.status === "success") {
    const gameData = response?.data as GameData;
    return (
      <div className={styles.game}>
        <div className={styles.bar}>
          <div className={styles.pfpContainer}>
            {data.chars.map((char) => {
              let isFound = false;

              if (gameData) {
                isFound = gameData.foundIds.includes(char.id);
              }

              return (
                <div
                  key={char.id}
                  className={isFound ? `${styles.found}` : undefined}
                >
                  <img src={char.url} />
                </div>
              );
            })}
          </div>
          <div>
            <span className={styles.timer}>{prettyTime(time)}</span>
          </div>
        </div>
        <div className={styles.gameContainer}>
          {notification && (
            <div className={styles.notification}>
              <p>
                {loading
                  ? "loading..."
                  : response?.data
                    ? "Nice one"
                    : "Keep looking! :("}
              </p>
            </div>
          )}
          {options.show && (
            <div
              className={styles.options}
              style={{
                left: options.x,
                top: options.y,
              }}
            >
              <ul>
                {data.chars
                  .filter((char) => {
                    if (response?.data) {
                      const data = response.data as GameData;
                      if (data.foundIds.includes(char.id)) return;
                    }
                    return char;
                  })
                  .map((char) => {
                    return (
                      <li
                        data-name={char.name}
                        key={char.id}
                        onClick={handleOnSubmit}
                      >
                        <img src={char.url} />
                        <span>
                          {char.name[0].toUpperCase() + char.name.slice(1)}
                        </span>
                      </li>
                    );
                  })}
              </ul>
            </div>
          )}
          <img className={styles.main} src={data.url} onClick={handleOnClick} />
        </div>
      </div>
    );
  }
}

export default Game;
