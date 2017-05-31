function getXMLHttpRequest () {
  var xhr = null;

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
  var xhr = getXMLHttpRequest();

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

function createInput (className, type, name, placeholder) {
  var input = document.createElement('input');
  input.className = className;
  input.type = type;
  input.name = name;
  input.placeholder = placeholder;
  return (input);
}

function createButton (className, name, value, onclick) {
  var input = document.createElement('input');
  input.className = className;
  input.type = 'button';
  input.name = name;
  input.value = value;
  input.onclick = onclick;
  return (input);
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
    var div = document.createElement('div');
    div.className = 'buttonScreenView';
    var uploadButton = createInput('upload', 'file', 'Upload', '');
    uploadButton.addEventListener('change', handleFileSelect, false);
    uploadButton.style.minHeight = 25;

    div.appendChild(uploadButton);
    div.appendChild(createButton('buttonScreen', 'screenshot', 'Screenshot', () => {
      var video = document.querySelector('#video');
      var filter = document.querySelector('.filterOn');
      var div = document.querySelector('.screenshot');
      if (div == null) {
        div = document.createElement('div');
        div.className = 'screenshot';
        body.appendChild(div);
      }

      var canvasScreen = document.createElement('canvas');
      var ctxScreen = canvasScreen.getContext('2d');
      canvasScreen.width = 640;
      canvasScreen.height = 480;
      ctxScreen.drawImage(video, 0, 0, 640, 480);
      var imgData = canvasScreen.toDataURL();
      ctxScreen.drawImage(filter, 0, 0, 640, 480);
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
          img.style.width = 640;
          img.style.height = 480;
          containerImg.appendChild(img);
          containerImg.appendChild(createButton('delImg', 'delImg', 'Delete', () => { 
            div.removeChild(containerImg);
            request('DELETE', 'controllers/post.php', 'token=' + localStorage.getItem('id') + '&id=' + res.data.uuidDb, (r) => {});
          }));
          div.appendChild(containerImg);
          div.scrollTop = div.scrollHeight;
        }
      });
    }));
    body.appendChild(div);
  }
}

function handleFileSelect (evt) {
  var files = evt.target.files;
  var reader = new FileReader();

  f = files[0];
  if (f.name.substr(-3) !== "png" || f.type !== "image/png" || f.size > 10000000)
    return;
  reader.onload = ((theFile) => {
      return (e) => {
        var video = document.getElementById('video');
        var parent = video.parentElement;
        var img = document.createElement('img');
        img.id = 'video';
        img.src = e.target.result;
        parent.removeChild(video);
        parent.insertBefore(img, document.getElementsByClassName('filterOn')[0]);
      };
    })(f);
  reader.readAsDataURL(f);
}

function showFilter(mountingDiv) {
  var filter = document.createElement('div');
  var filterOn = document.querySelector('.filterOn');
  if (filterOn == null) {
    filterOn = document.createElement('img');
    filterOn.className = 'filterOn';
    mountingDiv.appendChild(filterOn);
  }

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

document.addEventListener('scroll', function (event) {
  if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
    var save = (window.scrollY - window.innerHeight);
    var containerAcceuil = document.getElementsByClassName('ImgAcceuil');

    if (containerAcceuil.length !== 0 && scroll === 0) {
      var number = document.getElementsByClassName('imgAcceuil').length;

      request('GET', 'controllers/posts.php?limit=6&offset=' + number, '', (res) => {
        res = JSON.parse(res);

        if (res.data.length === 0) {
          scroll = 1;
        }

        for (var count = 0; count <= res.data.length - 1; ++count) {
          var containerImg = document.createElement('div');
          var likeDiv = document.createElement('div');
          var name = document.createElement('p');
          var img = document.createElement('img');

          containerImg.className = 'ImgAcceuil';
          likeDiv.className = 'likeDiv';
          name.className = 'nameAcceuil';
          img.className = 'imgAcceuil';

          img.src = res.data[count].link;
          img.alt = res.data[count].id;

          img.onclick = (elem) => { viewPicture(elem.target.alt); };

          // Name of author
          name.innerHTML = res.data[count].author;

          // Like view
          likeDiv = like(res.data[count].id);

          containerImg.appendChild(name);
          containerImg.appendChild(img);
          containerImg.appendChild(likeDiv);
          containerAcceuil[0].appendChild(containerImg);
        }
      });
      window.scrollTo(0, save);
    }
  }
});

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

window.onclick = function (event) {
  var modal = document.getElementsByClassName('modal');

  if (event.target === modal[0]) {
    modal[0].style.display = 'none';
  }
};
