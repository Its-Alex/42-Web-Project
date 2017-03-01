function auth() {
  request(`POST`, `controllers/auth.php`, `left=1&rigth=1&salut="true"`, (res) => {
    console.log(res);
  })
}