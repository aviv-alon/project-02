window.addEventListener('DOMContentLoaded', function () {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }




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
});
