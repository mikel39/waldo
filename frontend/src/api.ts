const baseUrl = import.meta.env.VITE_BE_URL;

async function initUser() {
  const user = localStorage.getItem("utoken");

  if (!user) {
    const res = await fetch(baseUrl + "user", { method: "POST" });
    const dt = await res.json();
    localStorage.setItem("utoken", dt.data.token);
  }
}

export { initUser };
