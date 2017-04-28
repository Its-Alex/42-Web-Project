HeadBar();

function showSignUpForm() {
  var docs = document.querySelectorAll('.hide');
  docs.forEach((elem, index) => {
    elem.style.visibility = 'hidden';
    elem.hidden = true;
  });
  document.querySelector('.signup').style.visibility = 'visible';
  document.querySelector('.signup').hidden = false;
}

function showSignInForm() {
  var docs = document.querySelectorAll('.hide');
  docs.forEach((elem, index) => {
    elem.style.visibility = 'hidden';
  });
  document.querySelector('.signin').style.visibility = 'visible';
}
