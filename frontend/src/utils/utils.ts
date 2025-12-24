function prettyTime(sec: number) {
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;

  const formatter = (num: number) => {
    return num <= 9 ? "0" + String(num) : num;
  };

  return `${formatter(minutes)}:${formatter(seconds)}`;
}

function diffTime(start: string, end: string) {
  const s = new Date(start);
  const e = new Date(end);
  const diff = e.getTime() - s.getTime();
  return prettyTime(Math.round(diff / 1000));
}

export { prettyTime, diffTime };
