async function fetchData(url, accessToken) {
  const res = await fetch(url, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': accessToken,
    }),
  });
  return res.json();
}

async function getData(city) {
  const url = `/api/1.0/city/${city}`;
  const result = await fetchData(url);
  $('#date').text(result.data[0].date);
  $('#weather').text(result.data[0].description);
  $('#temp').text(result.data[0].temp);
}



async function checkAccess () {
  const accessString = localStorage.getItem('access_token');
  if (accessString) {
    const url = '/api/1.0/checkToken';
    const accessParser = JSON.parse(accessString);
    const accessToken = accessParser.data.access_token;
    const checkToken = await fetchData(url, accessToken);
    $('.user_name').text('Hi ' + checkToken.data.name);
    await getData('taipei');
  } else {
    window.location.replace('/login');
  }
}

checkAccess();

function logOut() {
  console.log('OK');
  localStorage.removeItem('access_token');
  window.location.replace('/login');
}