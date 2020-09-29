async function fetchPostData (url, data) {
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  });
  return res.json();
}

async function signUp() {
  const name = $('.SignUpName').val();
  const email = $('.SignUpEmail').val();
  const pwd = $('.SignUpPwd').val();
  const userInfo = {
    name: name,
    email: email,
    pwd: pwd,
  };
  const url = '/api/1.0/signUp';
  const result = await fetchPostData(url, userInfo);
  if (result.error) {
    alert(result.error);
    window.location.replace('/login');
  } else {
    localStorage.setItem('access_token', JSON.stringify(result));
    window.location.replace('/');
  }
}

async function logIn() {
  const email = $('.logInEmail').val();
  const pwd = $('.logInPwd').val();
  const userInfo = {
    email: email,
    pwd: pwd
  };
  const url = '/api/1.0/logIn';
  const result = await fetchPostData(url, userInfo);
  if (result.error) {
    alert(result.error);
    window.location.replace('/login');
  } else {
    localStorage.setItem('access_token', JSON.stringify(result));
    window.location.replace('/');
  }
}

