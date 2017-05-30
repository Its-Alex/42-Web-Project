function viewPicture (id) {
  var modal = document.querySelectorAll('.modal');
  modal.forEach((elem) => {
    while (elem.firstChild) elem.removeChild(elem.firstChild);
  }, this);

  var body = document.querySelector('.body');
  var modal = document.getElementsByClassName('modal');
  var imgView = document.createElement('div');
  var name = document.createElement('p');
  var img = document.createElement('img');
  var likeDiv;
  var commentDiv;

  body.style.justifyContent = 'flex-start';
  body.style.marginTop = '20px';
  body.style.height = 'calc(100% - 70px)';
  imgView.className = 'imgView';
  name.className = 'pictureAuthor';
  img.className = 'picture';

  imgView.appendChild(name);
  imgView.appendChild(img);
  request('GET', 'controllers/post.php?id=' + id, '', (res) => {
    res = JSON.parse(res);

    // Name of author
    name.innerHTML = res.data.author;

    // Comment view
    commentDiv = comment(res);
    imgView.appendChild(commentDiv);

    img.src = res.data.post.link;
    modal[0].appendChild(imgView);
    modal[0].style.display = 'block';
  });
}

/*
**
** Like View :
**
*/

function like (postId) {
  var likeDiv = document.createElement('div');
  likeDiv.className = 'likeDiv';

  request('GET', 'controllers/like.php?id=' + postId, '', (resLike) => {
    resLike = JSON.parse(resLike);

    var likeLogo = document.createElement('img');
    var likeText = document.createElement('p');

    likeLogo.className = 'likeLogo';
    request('PUT', 'controllers/like.php', 'token=' + localStorage.getItem('id') + '&id=' + postId, (resLogo) => {
      resLogo = JSON.parse(resLogo);

      if (resLogo.data === true) {
        likeLogo.src = './public/assets/liked.svg';
      } else {
        likeLogo.src = './public/assets/like.svg';
      }
      likeLogo.onclick = (event) => {
        request('PUT', 'controllers/like.php', 'token=' + localStorage.getItem('id') + '&id=' + postId, (resLikeLogo) => {
          resLikeLogo = JSON.parse(resLikeLogo);

          if (resLikeLogo.data === false) {
            request('POST', 'controllers/like.php', 'id=' + postId, (resIfLike) => {
              request('GET', 'controllers/like.php?id=' + postId, '', (resLike1) => {
                resLike1 = JSON.parse(resLike1);

                likeTextShow(likeText, resLike1);
                event.target.src = './public/assets/liked.svg';
              });
            });
          } else {
            request('DELETE', 'controllers/like.php', 'id=' + postId, (resIfLike) => {
              request('GET', 'controllers/like.php?id=' + postId, '', (resLike1) => {
                resLike1 = JSON.parse(resLike1);

                likeTextShow(likeText, resLike1);
                event.target.src = './public/assets/like.svg';
              });
            });
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

/*
**
** Comment View :
**
*/

function comment(res) {
  var commentDiv = document.createElement('div');

  // Add comment
  var addComment = document.createElement('div');
  var commentText = document.createElement('textarea');
  var putComment = createButton('sendComment', 'sendComment', 'Comment', () => {
    var content = commentText.value;

    request('POST', 'controllers/comment.php', 'id=' + res.data.post.id + '&content=' + content, (r) => {
      commentText.value = '';
      commentText.focus();
      viewPicture(res.data.post.id);
    });
  });

  commentDiv.className = 'commentDiv';
  addComment.className = 'addComment';
  commentText.className = 'commentText';
  putComment.className = 'putComment';

  commentText.placeholder = 'Votre commentaire ici';

  // Show comments
  var comments = document.createElement('div');
  comments.className = 'comments';

  request('GET', 'controllers/comment.php?id=' + res.data.post.id, '', (r) => {
    r = JSON.parse(r);

    r.data.forEach((elem) => {
      var comment = document.createElement('div');
      var author = document.createElement('p');
      var text = document.createElement('p');
      var date = document.createElement('p');

      comment.className = 'commentContainer';
      author.className = 'author';
      text.className = 'content';
      date.className = 'date';

      author.innerHTML = elem.author;
      text.innerHTML = elem.content;
      date.innerHTML = elem.date;

      comment.appendChild(author);
      comment.appendChild(text);
      comment.appendChild(date);
      comments.appendChild(comment);
    }, this);
  });

  addComment.appendChild(commentText);
  addComment.appendChild(putComment);
  commentDiv.appendChild(addComment);
  commentDiv.appendChild(comments);
  return (commentDiv);
}
