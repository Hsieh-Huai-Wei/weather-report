async function fetchData(url) {
  const res = await fetch(url, {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });
  return res.json();
}

async function getData(city) {
  const url = `/api/1.0/city/${city}`;
  const result = await fetchData(url);
  $("#date").text(result.data[0].date);
  $("#weather").text(result.data[0].description);
  $("#temp").text(result.data[0].temp);
}

getData("taipei");