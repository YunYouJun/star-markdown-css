window.onhashchange = function() {
  let curTheme = this.location.hash.slice(1);
  document.querySelector('link[title="theme"]').href =
    "./css/" + curTheme + "-markdown.min.css";
};

let rendererMD = new marked.Renderer();
rendererMD.listitem = function(text) {
  if (text.indexOf('type="checkbox"') !== -1) {
    return `
      <li class="task-list-item">
        ${text}
      </li>`;
  }
  return `
      <li>
        ${text}
      </li>`;
};

axios
  .get("./md/index.md")
  .then(function(response) {
    document.getElementById("prompt").innerHTML = marked(response.data, {
      renderer: rendererMD
    });
  })
  .catch(function(error) {
    // handle error
    console.log(error);
  });
axios
  .get("./md/demo.md")
  .then(function(response) {
    document.getElementById("demo").innerHTML = marked(response.data, {
      renderer: rendererMD
    });
  })
  .catch(function(error) {
    // handle error
    console.log(error);
  });
