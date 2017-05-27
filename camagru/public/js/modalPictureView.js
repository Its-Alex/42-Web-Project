function viewPicture (id) {
  deleteAllElem();

  var body = document.querySelector('.body');
  var modal = document.getElementsByClassName('modal');
  var name = document.createElement('p');
  var imgView = document.createElement('div');
  var likeDiv;
  var commentDiv = document.createElement('div');
  var img = document.createElement('img');

  body.style.justifyContent = 'flex-start';
  body.style.marginTop = '20px';
  body.style.height = 'calc(100% - 70px)';
  imgView.className = 'imgView';
  name.className = 'pictureAuthor';
  img.className = 'picture';
  commentDiv.className = 'commentDiv';

  imgView.appendChild(name);
  imgView.appendChild(img);
  request('GET', 'controllers/post.php?id=' + id, '', (res) => {
    res = JSON.parse(res);

    // Name of author
    name.innerHTML = res.data.author;

    // Like view
    likeDiv = like(res);
    imgView.appendChild(likeDiv);

    // Comment view
    imgView.appendChild(commentDiv);

    img.src = res.data.post.link;
  });
  modal[0].appendChild(imgView);
  modal[0].style.display = 'block';
}

/*
**
** Like View :
**
*/

function like(res) {
  var likeDiv = document.createElement('div');
  likeDiv.className = 'likeDiv';


  request('GET', 'controllers/like.php?id=' + res.data.post.id, '', (resLike) => {
    resLike = JSON.parse(resLike);

    var likeLogo = document.createElement('img');
    var likeText = document.createElement('p');

    likeLogo.className = 'likeLogo';
    request('PUT', 'controllers/like.php', 'token=' + localStorage.getItem('id') + '&id=' + res.data.post.id, (resLogo) => {
      resLogo = JSON.parse(resLogo);
      if (resLogo.data === true) {
        likeLogo.src = './public/assets/liked.svg';
      } else {
        likeLogo.src = './public/assets/like.svg';
      }
      likeLogo.onclick = () => {
        request('PUT', 'controllers/like.php', 'token=' + localStorage.getItem('id') + '&id=' + res.data.post.id, (resLikeLogo) => {
          resLikeLogo = JSON.parse(resLikeLogo);
          var likeLogo = document.getElementsByClassName('likeLogo');

          if (resLikeLogo.data === false) {
            request('POST', 'controllers/like.php', 'id=' + res.data.post.id, (resIfLike) => {
              request('GET', 'controllers/like.php?id=' + res.data.post.id, '', (resLike1) => {
                resLike1 = JSON.parse(resLike1);

                likeTextShow(likeText, resLike1);
              });
            });
            likeLogo[0].src = './public/assets/liked.svg';
          } else {
            request('DELETE', 'controllers/like.php', 'id=' + res.data.post.id, (resIfLike) => {
              request('GET', 'controllers/like.php?id=' + res.data.post.id, '', (resLike1) => {
                resLike1 = JSON.parse(resLike1);

                likeTextShow(likeText, resLike1);
              });
            });
            likeLogo[0].src = './public/assets/like.svg';
          }
        });
      };
    });

    likeText.className = 'likeText';
    likeTextShow(likeText, resLike);

    likeDiv.appendChild(likeLogo);
    likeDiv.appendChild(likeText);
  });
  return (likeDiv);
}

function likeTextShow (likeText, res) {
  if (res.data.count === 0) {
    likeText.innerHTML = '0 Likes';
  } else if (res.data.count === 1) {
    likeText.innerHTML = res.data.likes[0].username + ', ' + res.data.count + ' Like';
  } else if (res.data.count === 2) {
    likeText.innerHTML = res.data.likes[0].username + ', ' + res.data.likes[1].username + ', ' + res.data.count + ' Like';
  } else if (res.data.count === 3) {
    likeText.innerHTML = res.data.likes[0].username + ', ' + res.data.likes[1].username + ', ' + res.data.likes[2].username + ', ' + res.data.count + ' Likes';
  } else if (res.data.count > 3) {
    likeText.innerHTML = res.data.likes[0].username + ', ' + res.data.likes[1].username + ', ' + res.data.likes[2].username + '... ' + res.data.count + ' Likes';
  }
}
