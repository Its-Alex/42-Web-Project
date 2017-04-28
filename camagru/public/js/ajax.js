var docs = document.querySelectorAll('.hide');
docs.forEach((elem) => {
  elem.hidden = true;
});

HeadBar();

function showSignUpForm() {
  var docs = document.querySelectorAll('.hide');
  docs.forEach((elem, index) => {
    elem.hidden = true;
  });
  document.querySelector('.form-signup').hidden = false;
}

function showSignInForm() {
  var docs = document.querySelectorAll('.hide');
  docs.forEach((elem, index) => {
    elem.hidden = true;
  });
  document.querySelector('.form-signin').hidden = false;
}
