window.addEventListener('DOMContentLoaded', function () {
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

  // form.addEventListener('submit', function (e) {
  //   e.preventDefault();
  //   alert('Submitting: ' + fileInput.value);
  // });


  function updateForm (result) {
    const fileData = result.filesUploaded[0];
    fileInput.value = fileData.url;

    const name = document.createTextNode( fileData.filename);
    nameBox.appendChild(name);

  }
});
