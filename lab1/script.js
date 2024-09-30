window.onload = function() {
    document.getElementById("subscribe-form").addEventListener("submit", form_submit)
}

function form_submit() {
    alert("Thanks for subscribing! We'll send the newsletter to " + document.getElementById("email").value);
}
