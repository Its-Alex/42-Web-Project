function readSession() {
    request(`POST`, `controllers/getSession.php`, "", (res) => {
    try {
      return JSON.parse(res);
  	} catch(e) {
      console.error(e);
      console.log(res)
  	}
  });
}

function writeSession(str) {
    request(`POST`, `controllers/writeSession.php`, str, (res) => {
    try {
      return JSON.parse(res);
  	} catch(e) {
      console.error(e);
      console.log(res)
  	}
  });
}