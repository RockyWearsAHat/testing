const usernameEl: HTMLInputElement = document.getElementById('usernameInput') as HTMLInputElement;
const passwordEl: HTMLInputElement = document.getElementById('passwordInput') as HTMLInputElement;
const formEl: HTMLFormElement = document.getElementById('formWrapper') as HTMLFormElement;

const submitBtn: HTMLInputElement = document.getElementById('submitBtn') as HTMLInputElement;

const handleSubmit = async (e: Event) => {
  if (e) e.preventDefault();
  const reqBody = { email: usernameEl.value, password: passwordEl.value };
  try {
    const res = await fetch(`http://localhost:3000/api/user/login`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(reqBody),
    });
    const json = await res.json();
    if (json.error) throw new Error(json.error);
    console.log(json.status);
    if (json.status == 'Logged in user!') {
      window.location.href = '/';
    }
  } catch (err) {
    console.log(err);
  }
};

submitBtn.addEventListener('click', handleSubmit);
formEl.addEventListener('submit', handleSubmit);
