let submitBtn = document.querySelector("button#contact-submit");
let toastEl = document.getElementById("liveToast");

window.onload = () => {
    document.getElementById("emailInput").value =
        sessionStorage.getItem("email");
    document.getElementById("subjectInput").value =
        sessionStorage.getItem("subject");
    document.getElementById("messageInput").value =
        sessionStorage.getItem("message");
};

if (submitBtn) {
    submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        let toast = new bootstrap.Toast(toastEl);
        let email = document.getElementById("emailInput").value;
        let sub = document.getElementById("subjectInput").value;
        let msg = document.getElementById("messageInput").value;
        console.log(email, sub, msg);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("subject", sub);
        sessionStorage.setItem("message", msg);

        toast.show();
    });
}
