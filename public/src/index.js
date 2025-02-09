const renderList = async() => {
    const link = document.querySelector("#link");
    const files = await fetch("/list");
    const images = await files.json();
    const urls = Array.from(images);
    const template = `<li><a href='%URL' target="_blank">%URL</a></li>`;
    let html = "<ul>"
    html += urls.map((e) => {
      return template.replaceAll("%URL",e);
    }).join("");
    html += "</ul>";
    link.innerHTML = html;
}

(async () => {
    const inputFile = document.querySelector('#file');
    const button = document.querySelector("#button");
    const errorDiv = document.querySelector("#error");
  
    handleSubmit = async (event) => {
      const formData = new FormData();
      if (!inputFile.files[0]) {
        errorDiv.innerHTML = "<p>Insert a file</p>";
        return;
      }
      formData.append("file", inputFile.files[0]);
      const body = formData;
      const fetchOptions = {
        method: 'post',
        body: body
      };
      try {
        const res = await fetch("/upload", fetchOptions);
        const data = await res.json();
        await renderList();
      } catch (e) {
        console.log(e);
      }
    }
    button.onclick = handleSubmit;
  })();

  renderList().then(() => {
    setInterval(async() => {
        await renderList();
    },30000)
  }).catch(console.error)