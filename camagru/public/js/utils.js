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

function putButton () {
  var body = document.querySelector('.body');
  var button = document.querySelector('.buttonScreen');

  if (button == null) {
    body.appendChild(createButton('buttonScreen', 'screenshot', 'Screenshot', () => {
      var video = document.querySelector('#video');
      var filter = document.querySelector('.filterOn');
      var div = document.querySelector('.screenshot');
      if (div == null) {
        div = document.createElement('div');
        div.className = 'screenshot';
      }

      var canvasScreen = document.createElement('canvas');
      var ctxScreen = canvasScreen.getContext('2d');
      canvasScreen.width = video.videoWidth / 2;
      canvasScreen.height = video.videoHeight / 2;
      ctxScreen.drawImage(video, 0, 0, video.videoWidth / 2, video.videoHeight / 2);
      var imgData = canvasScreen.toDataURL();
      ctxScreen.drawImage(filter, 0, 0, video.videoWidth / 2, video.videoHeight / 2);
      var filterData = canvasScreen.toDataURL();
      var params = 'token=' + localStorage.getItem('id') + '&data=' + imgData + '&filter=' + filterData;
      request('POST', 'controllers/post.php', params, (res) => {
        res = JSON.parse(res);
        if (res.err === '') {
          var img = document.createElement('img');
          var containerImg = document.createElement('div');

          containerImg.className = 'containerImg';
          img.src = './public/assets/pictures/' + res.data.uuidFile + '.png';
          img.className = 'screenCanvas';
          img.style.width = video.videoWidth / 2;
          img.style.height = video.videoHeight / 2;
          containerImg.appendChild(img);
          containerImg.appendChild(createButton('delImg', 'delImg', 'Delete', () => { 
            div.removeChild(containerImg);
            request('DELETE', 'controllers/post.php', 'token=' + localStorage.getItem('id') + '&id=' + res.data.uuidDb, (r) => {});
          }));
          div.appendChild(containerImg);
          body.appendChild(div);
          div.scrollTop = div.scrollHeight;
        }
      });
    }));
  }
}

function showFilter(mountingDiv) {
  var filter = document.createElement('div');
  var filterOn = document.querySelector('.filterOn');
  if (filterOn == null) {
    filterOn = document.createElement('img');
  }
  filterOn.className = 'filterOn';
  mountingDiv.appendChild(filterOn);

  filter.className = 'filterDiv';
  for (var count = 1; count < 11; ++count) {
    var filterImg = document.createElement('img');
    filterImg.src = 'public/assets/filter/chap' + count + '.png';
    filterImg.className = 'filterChoose';
    filterImg.setAttribute('onclick', 'onClickFilter(' + count + ')');
    filter.appendChild(filterImg);
  }
  return filter;
}

function onClickFilter (count) {
  var filterOn = document.querySelector('.filterOn');
  filterOn.src = 'public/assets/filter/chap' + count + '.png';
  putButton();
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
