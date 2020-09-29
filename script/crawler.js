const weather = require('../server/models/weather_model');
const got = require('got'); // fetch page in server

// crawler data
async function runCrawler() {
  const rowData = await got(
    'https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-8F8B2E47-8526-4FAA-B344-FC18493E22B3&format=JSON&stationId=466920,466880,467050&elementName=Weather,TEMP,TIME&parameterName=CITY'
  );
  const jsonData = JSON.parse(rowData.body);
  let taipei = new Object();
  let newTaipei = new Object();
  let taoyuan = new Object();
  for (let i = 0; i < jsonData.records.location.length; i++) {
    const rowTime = jsonData.records.location[i].time.obsTime;
    const timeArr = rowTime.split(' ');
    const date = timeArr[0];
    const hr = timeArr[1].split(':')[0];
    let obj = {
      city: jsonData.records.location[i].locationName,
      date: date,
      time: Number(hr),
      temp: Number(jsonData.records.location[i].weatherElement[0].elementValue),
      description: jsonData.records.location[i].weatherElement[1].elementValue,
    };
    switch (obj.city) {
      case '臺北':
        taipei = obj;
        obj = new Object();
        break;
      case '板橋':
        newTaipei = obj;
        obj = new Object();
        break;
      case '新屋':
        taoyuan = obj;
        obj = new Object();
        break;
    }
  }
  await weather.createCityWeather(taipei, newTaipei, taoyuan);
  return;
}

module.exports = {
  runCrawler,
};
