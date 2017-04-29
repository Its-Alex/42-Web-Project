function signup () {
  var input = document.querySelectorAll('.signup');
  var str = '';

  for (var i = 0; i < input.length - 1; i++) {
    if (i !== input.length - 2) {
      str += input[i].name + '=' + input[i].value + '&';
    } else if (input[i].name) {
      str += input[i].name + '=' + input[i].value;
    }
  }
  request('POST', 'controllers/signup.php', str, (res) => {
    try {
      console.log(JSON.parse(res));
    } catch (e) {
      console.error(e);
      console.log(res);
    }
  });
}

function signin () {
  var input = document.querySelectorAll('.signin');
  var str = '';

  for (var i = 0; i < input.length - 1; i++) {
    if (i !== input.length - 2) {
      str += input[i].name + '=' + input[i].value + '&';
    } else if (input[i].name) {
      str += input[i].name + '=' + input[i].value;
    }
  }
  request('POST', 'controllers/signin.php', str, (res) => {
    try {
      console.log(JSON.parse(res));
      request('POST', 'controllers/getSession.php', '', (res) => {
        var session = JSON.parse(res);
        if ('id' in session) {
          window.localStorage.setItem('id', session.id);
        }
        if ('mail' in session) {
          window.localStorage.setItem('mail', session.mail);
        }
        if ('role' in session) {
          window.localStorage.setItem('role', session.role);
        }
        HeadBar();
      });
    } catch (e) {
      console.error(e);
      console.log(res);
    }
  });
}
