window.onkeyup = (e) => {
  var v = document.querySelector(`#video`);

  if (e.keyCode === 13) {
    if (v === null) {
      var body = document.querySelector(`body`);
      var video = document.createElement(`video`);
      video.id = `video`;

      if (navigator.getUserMedia) {
        navigator.getUserMedia({
          audio: false,
          video: {
            width: 10,
            height: 10
          }}, (stream) => {
            video.src = window.URL.createObjectURL(stream);
            video.onloadedmetadata = (e) => {
              video.play();
            };
          }, (err) => {
            console.error(`L'erreur suivante est apparu: $(err.name)`);
          });
      } else {
         console.error(`Votre navigateur ne supporte pas GetUserMedia`);
      }
      body.append(video);
    } else {
      v.remove();
    }
  }
}