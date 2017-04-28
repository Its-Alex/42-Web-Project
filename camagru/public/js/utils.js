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
  if (method === 'POST') {
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  }
  xhr.send(variable);
}

window.onkeyup = (e) => {
  if (e.keyCode === 46) {
    HeadBar();
  }
  if (e.keyCode === 49) {
  }
  if (e.keyCode === 50) {
  }
};
