const doAsync = (url) => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("GET", url);
    //   request.onload = () => onSuccess(JSON.parse(request.response));
    request.onload = () => resolve(request.response);
    request.onerror = () => reject(request.statusText);
    request.send();
  });
};

const callAllApi = async () => {
  try {
    const posts = await doAsync("https://jsonplaceholder.typicode.com/posts");
    const weathers = await doAsync(
      "https://fcc-weather-api.glitch.me/api/current?lat=21&lon=105"
    );

    console.log("------- posts", posts);
    console.log("------- weathers", weathers);
  } catch (error) {
    console.log("----- error", error);
  }
};

callAllApi();
