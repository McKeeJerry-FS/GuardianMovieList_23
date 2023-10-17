function displayMessage() {
  // get the text out of input and assign to a variable
  let msg = document.getElementById("message").value;

  Swal.fire({
    backdrop: false,
    title: "MovieLog",
    text: msg, // <-- replace this with the variable
  });
}
