const doAsync = (url) => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = () => resolve(request.response);
    request.onerror = () => reject(request.statusText);
    request.send();
  });
  //   request.onload = () => onSuccess(JSON.parse(request.response));
};

// doAsync("https://jsonplaceholder.typicode.com/posts")
//   .then((data) => {
//     console.log("--- value", typeof data);
//     document.getElementById("data_area").textContent = data;
//   })
//   .catch((error) => {
//     console.log("--- error", error);
//   });

// Call multiple API by promise
doAsync("https://jsonplaceholder.typicode.com/posts")
  .then((posts) => {
    console.log("--- posts", posts);
    document.getElementById("data_area").textContent = posts;
    return doAsync(
      "https://fcc-weather-api.glitch.me/api/current?lat=21&lon=105"
    );
  })
  .then((weather) => {
    console.log("--- weather", weather);
  })
  .catch((error) => {
    console.log("--- error", error);
  });
