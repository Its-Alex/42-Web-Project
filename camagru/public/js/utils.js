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

function putButton() {
  var body = document.querySelector('.body');
  var button = document.querySelector('.buttonScreen');

  if (button == null) {
    body.appendChild(createButton('buttonScreen', 'screenshot', 'Screenshot', () => {
      var body = document.querySelector('.body');
      var video = document.querySelector('#video');
      var filter = document.querySelector('.filterOn');
      var div = document.querySelector('.screenshot')
      if (div == null) {
        div = document.createElement('div');
        div.className = 'screenshot';
      }

      var canvas_screen = document.createElement('canvas');
      canvas_screen.className = 'screenCanvas';
      var ctx_screen = canvas_screen.getContext('2d');
      canvas_screen.width = video.videoWidth / 2;
      canvas_screen.height = video.videoHeight / 2;
      ctx_screen.drawImage(video, 0, 0, video.videoWidth / 2, video.videoHeight / 2);
      var canvas_filter = document.createElement('canvas');
      canvas_filter.className = 'screenCanvas';
      var ctx_filter = canvas_filter.getContext('2d');
      canvas_filter.width = video.videoWidth / 2;
      canvas_filter.height = video.videoHeight / 2;
      ctx_filter.drawImage(filter, 0, 0, video.videoWidth / 2, video.videoHeight / 2);
      request('POST', 'controllers/mounting.php', 'data=' + canvas_screen.toDataURL() + '&filter=' + canvas_filter.toDataURL() + '&author=' + localStorage.getItem('id'), (res) => {
        res = JSON.parse(res);
        if (res.err === '') {
          var img = document.createElement('img');
          img.src = './public/assets/pictures/' + res.data.uuid + '.png';
          img.className = 'screenCanvas';
          img.style.width = video.videoWidth / 2;
          img.style.height = video.videoHeight / 2;
          div.appendChild(img);
          body.appendChild(div);
          div.scrollTop = div.scrollHeight;
          var params = 'author=' + localStorage.getItem('id') + '&link=./public/assets/pictures/' + res.data.uuid + '.png';
          request('POST', 'controllers/post.php', params, (ret) => {
          });
        }
      });
    }));
  }
}

function showFilter(mountingDiv) {
  var filter = document.createElement('div');
  filter.className = 'filterDiv';

  var filterChap1 = document.createElement('img');
  filterChap1.src = 'public/assets/filter/chap1.png';
  filterChap1.className = 'filterChoose';
  filterChap1.onclick = () => {
    var filterOn  = document.querySelector('.filterOn');
    if (filterOn == null) {
      filterOn = document.createElement('img');
    }
    filterOn.src = 'public/assets/filter/chap1.png';
    filterOn.className = 'filterOn';
    mountingDiv.appendChild(filterOn);
    putButton();
  };
  var filterChap2 = document.createElement('img');
  filterChap2.src = 'public/assets/filter/chap2.png';
  filterChap2.className = 'filterChoose';
  filterChap2.onclick = () => {
    var filterOn  = document.querySelector('.filterOn');
    if (filterOn == null) {
      filterOn = document.createElement('img');
    }
    filterOn.src = 'public/assets/filter/chap2.png';
    filterOn.className = 'filterOn';
    mountingDiv.appendChild(filterOn);
    putButton();
  };
  var filterChap3 = document.createElement('img');
  filterChap3.src = 'public/assets/filter/chap3.png';
  filterChap3.className = 'filterChoose';
  filterChap3.onclick = () => {
    var filterOn  = document.querySelector('.filterOn');
    if (filterOn == null) {
      filterOn = document.createElement('img');
    }
    filterOn.src = 'public/assets/filter/chap3.png';
    filterOn.className = 'filterOn';
    mountingDiv.appendChild(filterOn);
    putButton();
  };
  var filterChap4 = document.createElement('img');
  filterChap4.src = 'public/assets/filter/chap4.png';
  filterChap4.className = 'filterChoose';
  filterChap4.onclick = () => {
    var filterOn  = document.querySelector('.filterOn');
    if (filterOn == null) {
      filterOn = document.createElement('img');
    }
    filterOn.src = 'public/assets/filter/chap4.png';
    filterOn.className = 'filterOn';
    mountingDiv.appendChild(filterOn);
    putButton();
  };
  var filterChap5 = document.createElement('img');
  filterChap5.src = 'public/assets/filter/chap5.png';
  filterChap5.className = 'filterChoose';
  filterChap5.onclick = () => {
    var filterOn  = document.querySelector('.filterOn');
    if (filterOn == null) {
      filterOn = document.createElement('img');
    }
    filterOn.src = 'public/assets/filter/chap5.png';
    filterOn.className = 'filterOn';
    mountingDiv.appendChild(filterOn);
    putButton();
  };
  var filterChap6 = document.createElement('img');
  filterChap6.src = 'public/assets/filter/chap6.png';
  filterChap6.className = 'filterChoose';
  filterChap6.onclick = () => {
    var filterOn  = document.querySelector('.filterOn');
    if (filterOn == null) {
      filterOn = document.createElement('img');
    }
    filterOn.src = 'public/assets/filter/chap6.png';
    filterOn.className = 'filterOn';
    mountingDiv.appendChild(filterOn);
    putButton();
  };
  var filterChap7 = document.createElement('img');
  filterChap7.src = 'public/assets/filter/chap7.png';
  filterChap7.className = 'filterChoose';
  filterChap7.onclick = () => {
    var filterOn  = document.querySelector('.filterOn');
    if (filterOn == null) {
      filterOn = document.createElement('img');
    }
    filterOn.src = 'public/assets/filter/chap7.png';
    filterOn.className = 'filterOn';
    mountingDiv.appendChild(filterOn);
    putButton();
  };
  var filterChap8 = document.createElement('img');
  filterChap8.src = 'public/assets/filter/chap8.png';
  filterChap8.className = 'filterChoose';
  filterChap8.onclick = () => {
    var filterOn  = document.querySelector('.filterOn');
    if (filterOn == null) {
      filterOn = document.createElement('img');
    }
    filterOn.src = 'public/assets/filter/chap8.png';
    filterOn.className = 'filterOn';
    mountingDiv.appendChild(filterOn);
    putButton();
  };
  var filterChap9 = document.createElement('img');
  filterChap9.src = 'public/assets/filter/chap9.png';
  filterChap9.className = 'filterChoose';
  filterChap9.onclick = () => {
    var filterOn  = document.querySelector('.filterOn');
    if (filterOn == null) {
      filterOn = document.createElement('img');
    }
    filterOn.src = 'public/assets/filter/chap9.png';
    filterOn.className = 'filterOn';
    mountingDiv.appendChild(filterOn);
    putButton();
  };
  var filterChap10 = document.createElement('img');
  filterChap10.src = 'public/assets/filter/chap10.png';
  filterChap10.className = 'filterChoose';
  filterChap10.onclick = () => {
    var filterOn  = document.querySelector('.filterOn');
    if (filterOn == null) {
      filterOn = document.createElement('img');
    }
    filterOn.src = 'public/assets/filter/chap10.png';
    filterOn.className = 'filterOn';
    mountingDiv.appendChild(filterOn);
    putButton();
  };

  filter.appendChild(filterChap1);
  filter.appendChild(filterChap2);
  filter.appendChild(filterChap3);
  filter.appendChild(filterChap4);
  filter.appendChild(filterChap5);
  filter.appendChild(filterChap6);
  filter.appendChild(filterChap7);
  filter.appendChild(filterChap8);
  filter.appendChild(filterChap9);
  filter.appendChild(filterChap10);
  return filter;
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
