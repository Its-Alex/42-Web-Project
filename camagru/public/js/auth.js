function signup () {
  request('POST', 'controllers/signup.php', getElemForm('.signup'), (res) => {
    try {
      res = JSON.parse(res);
      console.log(res);      
    } catch (error) {
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
  request('POST', 'controllers/signin.php', getElemForm('.signin'), (res) => {
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

function forgetPwd () {
  request('POST', 'controllers/forgetPwd.php', getElemForm('.forgetPwd'), (res) => {
    console.log(res);
    res = JSON.parse(res);
    if (res.err !== '') {
      var form = document.querySelector('.forgetPwd');
      var error = document.createElement('p');

      if (form.firstChild.nodeName === 'P') form.removeChild(form.firstChild);
      error.className = 'error';
      error.innerHTML = res.err;
      form.insertBefore(error, form.firstChild);
    }
  });
}