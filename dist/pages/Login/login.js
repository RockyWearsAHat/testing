const usernameEl = document.getElementById('usernameInput');
const passwordEl = document.getElementById('passwordInput');
const formEl = document.getElementById('formWrapper');
const submitBtn = document.getElementById('submitBtn');
const handleSubmit = async (e) => {
    if (e)
        e.preventDefault();
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
        if (json.error)
            throw new Error(json.error);
        console.log(json.status);
        if (json.status == 'Logged in user!') {
            window.location.href = '/';
        }
    }
    catch (err) {
        console.log(err);
    }
};
submitBtn.addEventListener('click', handleSubmit);
formEl.addEventListener('submit', handleSubmit);
export {};
//# sourceMappingURL=login.js.map