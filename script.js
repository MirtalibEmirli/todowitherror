const showLogin = () => {
  document.getElementById("registerContainer").style.display = "none";
  document.getElementById("loginContainer").style.display = "block";
};

const showRegister = () => {
  document.getElementById("registerContainer").style.display = "block";
  document.getElementById("loginContainer").style.display = "none";
};
let dataArray = [];

const login = async () => {
  const loginEmail = document.getElementById("loginEmail").value;
  const loginPassword = document.getElementById("loginPassword").value;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  await fetch("http://localhost:5001/users/login", {
    method: "POST",
    body: JSON.stringify({
      email: loginEmail,
      password: loginPassword,
    }),
    headers: myHeaders,
  })
    .then((response) => {
      if (!response.ok) throw new Error("Login Fail");

      return response.json();
    })
    .then((data) => {
      document.cookie = `token=${data.token}; path=/; max-age=3600`;
      window.location.href = "ToDoFront/ToDo.html";
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
};

async function register() {
  try {
    const username = document.getElementById("registerUsername").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    console.log("Registering:", { username, email, password });

    const response = await fetch("http://localhost:5001/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
      }),
    });
    let data = await response.json();

    if (data.token) {
      document.cookie = `access_token=${data.token}`;
      console.log("Access token set in cookie:", document.cookie);
      setTimeout(() => {
        window.location.href = "ToDoFront/ToDo.html";
      }, 100);
    }
  } catch (error) {
    console.error(error);
  }
}
