import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { GameData, Page } from "../types/types";
import useFetch from "../hooks/useFetch";
import { diffTime } from "../utils/utils";
import styles from "../styles/winnerpage.module.css";

interface Props {
  data: GameData;
  setPage: Dispatch<SetStateAction<Page>>;
}

function WinnerPage({ data, setPage }: Props) {
  const [dt, setDt] = useState({ utoken: "", username: "" });
  const { setExecute } = useFetch("user/username", "POST", dt, false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPage("home");
    }, 1000 * 10);

    return () => {
      clearTimeout(timeout);
    };
  }, [setPage]);

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDt((prev) => ({
      ...prev,
      utoken: data.user.token,
    }));
    setExecute(true);
    setPage("home");
  };

  return (
    <div className={styles.main}>
      <div className={styles.messageContainer}>
        <p className={styles.time}>
          {diffTime(data.start, data.end as string)}
        </p>
        <div className={styles.message}>
          <p>Congratulations!</p>
          {!data.user.username && (
            <form onSubmit={handleOnSubmit}>
              <input
                value={dt.username}
                placeholder="Username"
                type="text"
                name="username"
                onChange={(event) => {
                  setDt((prev) => ({
                    ...prev,
                    username: event.target.value,
                  }));
                }}
              />
            </form>
          )}
          {data.user.username && <p>{data.user.username}</p>}
        </div>
      </div>
    </div>
  );
}

export default WinnerPage;
