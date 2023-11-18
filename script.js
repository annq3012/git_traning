const doAsync = (url, onSuccess, onError) => {
  const request = new XMLHttpRequest();
  request.open("GET", url);
  // request.onload = () => onSuccess(JSON.parse(request.response));
  request.onload = () => onSuccess(request.response);
  request.onerror = () => onError(request.statusText);
  request.send();
};

const loadDataToHTML = (data) => {
  let title = document.getElementById("title");
  let body = document.getElementById("data");
  let keys = [];
  if (data[0].id) {
    Object.keys(data[0]).forEach((key) => {
      const th = document.createElement("th");
      const textTh = document.createTextNode(key);
      keys.push(key);
      th.appendChild(textTh);
      title.appendChild(th);
    });
  }
  data.forEach((post) => {
    const tr = document.createElement("tr");
    keys.forEach((key) => {
      const td = document.createElement("td");
      const textTd = document.createTextNode(post[key]);
      td.appendChild(textTd);
      tr.appendChild(td);
    });
    body.appendChild(tr);
  });
};

// Usage:
doAsync(
  "https://jsonplaceholder.typicode.com/posts",
  (data) => {
    // 'value' is corresponding with 'xhr.responseText'
    console.log("--- value", typeof data);
    document.getElementById("data_area").textContent = data;
    // loadDataToHTML(data);
  },
  (error) => {
    // 'error' is corresponding with 'xhr.statusText'
    console.log("--- error", error);
  }
);

// Call multiple api serially

doAsync(
  "https://jsonplaceholder.typicode.com/posts",
  (posts) => {
    // 'value' is corresponding with 'xhr.responseText'
    console.log("--- posts", posts);
    document.getElementById("data_area").textContent = posts;

    // Call Api weather
    doAsync(
      "https://fcc-weather-api.glitch.me/api/current?lat=21&lon=105",
      (weather) => {
        // 'value' is corresponding with 'xhr.responseText'
        console.log("--- weather", weather);
      },
      (error) => {
        // 'error' is corresponding with 'xhr.statusText'
        console.log("--- error", error);
      }
    );
  },
  (error) => {
    // 'error' is corresponding with 'xhr.statusText'
    console.log("--- error", error);
  }
);
