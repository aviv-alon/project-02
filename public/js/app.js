window.addEventListener('DOMContentLoaded', function () {

  (function() {
    var burger = document.querySelector('.burger');
    var nav = document.querySelector('#navMenu');

    burger.addEventListener('click', function(){
      console.log('vvvfff');
      burger.classList.toggle('is-active');
      nav.classList.toggle('is-active');
    });
  })();


  // Set up the picker
  const apikey = 'AGsuGjBiLSfqfxuIPUT1Uz';
  const client = filestack.init(apikey);
  const options = {
    onUploadDone: updateForm,
    maxSize: 10 * 1024 * 1024,
    accept: 'image/*',
    uploadInBackground: false
  };
  const picker = client.picker(options);

  //References to the DOM elements
  const btn = document.getElementById('picker');
  const fileInput = document.getElementById('picture');
  const nameBox = document.getElementById('fileupload');

  // Event listeners
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    picker.open();
  });

  function updateForm(result) {
    const fileData = result.filesUploaded[0];
    fileInput.value = fileData.url;
    console.log(fileInput.value);
    console.log(fileData);

    const name = document.createTextNode( fileData.filename);
    nameBox.appendChild(name);

  }

  (function() {
  // popup model
    const btnAddPhoto = document.getElementById('addPhoto');
    const modal = document.querySelector('.modal');
    const btnCloseModel = document.querySelector('.modal-close');

    btnAddPhoto.addEventListener('click', () => {
      modal.classList.add('is-active');
    });

    btnCloseModel.addEventListener('click', () => {
      modal.classList.remove('is-active');
    });
  })();
});
