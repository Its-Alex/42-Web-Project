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
    res = JSON.parse(res);
    try {
      console.log(res);
    } catch (e) {
      console.error(e);
      console.log(res);
    }
    if (res.err !== '') {
      var form = document.querySelector('.signup');      
      var error = document.createElement('p');

      if (form.firstChild.nodeName === 'P') form.removeChild(form.firstChild);
      error.className = 'error';
      error.innerHTML = res.err;
      form.insertBefore(error, form.firstChild);
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
    res = JSON.parse(res);
    console.log(res);
    request('POST', 'controllers/getSession.php', '', (data) => {
      var session = JSON.parse(data);
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
    if (res.err !== '') {
      var form = document.querySelector('.signin');      
      var error = document.createElement('p');

      if (form.firstChild.nodeName === 'P') form.removeChild(form.firstChild);
      error.className = 'error';
      error.innerHTML = res.err;
      form.insertBefore(error, form.firstChild);
    }
  });
}
