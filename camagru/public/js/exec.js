function auth() {
	var input = document.getElementsByClassName('connect');
	var str = "";

	for (var i = 0; i < input.length - 1; i++) {
		if (i != input.length - 2 && input[i].name !== 'confirmPassword')
			str += input[i].name + '=' + input[i].value + '&';
		else if (input[i].name !== 'confirmPassword')
			str += input[i].name + '=' + input[i].value;
	}

	if (input.password.value === input.confirmPassword.value) {
	  request(`POST`, `controllers/signup.php`, str, (res) => {
	    try {
        console.log(JSON.parse(res));
    } catch(e) {
        console.error(e);
        console.log(res)
    }
	  });
	}
}

window.onkeyup = (e) => {
  if (e.keyCode === 32) {
	  request(`POST`, `/Users/malexand/http/MyWebSite/controllers/signin.php`, `username=Alex&password=Apwn789123`, (res) => {
	    try {
        console.log(JSON.parse(res));
    } catch(e) {
        console.error(e);
        console.log(res)
    }
	  });
  }
}