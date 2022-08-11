export default class Api {
  constructor() {
    this.baseURL = "http://localhost:3000/api";
  }

  getAll() {
    return fetch(this.baseURL).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Erro no getAll");
    });
  }

  save(record) {
    return fetch(this.baseURL, {
      method: "POST",
      body: JSON.stringify(record),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      res.text().then((err) => console.error(err));
      return Promise.reject("Erro no save");
    });
  }

  remove(id) {
    return fetch(`${this.baseURL}/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        return;
      }

      return Promise.reject("Erro no remove");
    });
  }
}
