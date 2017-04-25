var docs = document.querySelectorAll(".hide");
docs.forEach((elem) => {
  elem.hidden = true;
});

function signup() {
	var input = document.getElementsByClassName('signup');
	var str = "";

	for (var i = 0; i < input.length - 1; i++) {
		if (i != input.length - 2)
			str += input[i].name + '=' + input[i].value + '&';
		else if (input[i].name)
			str += input[i].name + '=' + input[i].value;
	}
  request(`POST`, `controllers/signup.php`, str, (res) => {
    try {
      console.log(JSON.parse(res));
  	} catch(e) {
      console.error(e);
      console.log(res)
  	}
  });
}

function signin() {
  var input = document.getElementsByClassName('signin');
  var str = "";

  for (var i = 0; i < input.length - 1; i++) {
    if (i != input.length - 2)
      str += input[i].name + '=' + input[i].value + '&';
    else if (input[i].name)
      str += input[i].name + '=' + input[i].value;
  }
  request(`POST`, `controllers/signin.php`, str, (res) => {
    try {
      console.log(JSON.parse(res));
    } catch(e) {
      console.error(e);
      console.log(res)
    }
  });
}