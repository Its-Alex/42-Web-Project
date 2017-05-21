var xhr = null;

function getXMLHttpRequest () {
  xhr = null;

  if (window.XMLHttpRequest || window.ActiveXObject) {
    if (window.ActiveXObject) {
      try {
        xhr = new ActiveXObject('Msxml2.XMLHTTP');
      } catch (e) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
      }
    } else {
      xhr = new window.XMLHttpRequest();
    }
  } else {
    console.error('Votre navigateur ne supporte pas l\'objet XMLHTTPRequest...');
    return null;
  }
  return xhr;
}

function request (method, url, variable, cb) {
  if (xhr && xhr.readyState !== 0) {
    xhr.abort(); // On annule la requête en cours !
  }

  xhr = getXMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 0)) {
      if (xhr.responseText) {
        cb(xhr.responseText);
      }
    }
  };

  xhr.open(method, url, true);
  if (method === 'POST' || method === 'DELETE') {
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  }
  xhr.send(variable);
}

function getElemForm (className) {
  var input = document.querySelectorAll(className);
  var str = '';

  for (var i = 0; i < input.length - 1; i++) {
    if (input[i].value !== undefined) {
      if (i !== input.length - 2) {
        str += input[i].name + '=' + input[i].value + '&';
      } else if (input[i].name) {
        str += input[i].name + '=' + input[i].value;
      }
    }
  }
  return str;
}

function deleteUser(id) {
  var params = 'token=' + localStorage.getItem('id');
  params += '&id=' + id;

  request('DELETE', 'controllers/user.php', params, (res) => {
    console.log(res);
    adminView ();
  });
}

function updateUser(user) {
  var params = 'token=' + localStorage.getItem('id') + '&id=' + user.id + '&' + getElemForm('.updateUserInput');
  request('PUT', 'controllers/user.php', params, (res) => {
    res = JSON.parse(res);
    if (res.err != '') {
      var body = document.querySelector('.body');
      var p = document.createElement('p');
      var oldP = document.querySelector('.error');
      if (oldP != null) {
        body.removeChild(oldP);
      }
      p.className = 'error';
      p.innerHTML = res.err;
      body.insertBefore(p, body.firstChild);
    } else {
      adminView();
    }
  });
}

function updateSelfUser(user) {
  var params = 'token=' + localStorage.getItem('id') + '&id=' + localStorage.getItem('id') + '&' + getElemForm('.updateUserInput');
  request('PUT', 'controllers/user.php', params, (res) => {
    res = JSON.parse(res);
    console.log(res);
    if (res.err != '') {
      var body = document.querySelector('.body');
      var p = document.createElement('p');
      var oldP = document.querySelector('.error');
      if (oldP != null) {
        body.removeChild(oldP);
      }
      p.className = 'error';
      p.innerHTML = res.err;
      body.insertBefore(p, body.firstChild);
    } else {
      createImgView();
    }
  });
}

function putFilter(filter) {
  console.log(filter);
}

window.onkeyup = (e) => {
  if (e.keyCode === 46) {
    HeadBar();
  }
  if (e.keyCode === 13) {
    if (document.activeElement.className === 'searchBar') {
      var searchBar = document.activeElement;

      searchBar.value = null;
      searchView();
    }
  }
};
