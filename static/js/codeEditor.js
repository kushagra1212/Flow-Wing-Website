document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("code_editor_output");
  const form = document.getElementById("code_editor_form");
  const editor = document.getElementById("editor");
  const compilerAndRunButton = document.getElementById("code_editor_submit");
  const readDocsButton = document.getElementById("code_editor_read_docs");
  // Asynchronous form submission
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission

    compilerAndRunButton.classList.add("loading");

    fetch(form.action, {
      method: "POST", // Use method from the form
      headers: {
        "Content-Type": "text/plain",
      },
      body: JSON.stringify({
        code: editor.children[1].children[0].textContent,
      }),
    })
      .then((response) => response.text() || "")
      .then((data) => {
        console.log("Response From Server Raw", data);

        const colorizedCode = parseANSI(
          data.replaceAll("<", "{").replaceAll(">", "}")
        );
        console.log("Response From Server", colorizedCode);
        output.innerHTML = colorizedCode;
        // Update the output section with server response
      })
      .catch((error) => {
        console.log("Error:", new Error(error).message);
        output.innerHTML = "";
      })
      .finally(() => {
        compilerAndRunButton.classList.remove("loading");
      });
  });

  readDocsButton.addEventListener("click", (e) => {
    e.preventDefault();
    handleOpenDocs();
  });

  function handleOpenDocs() {
    window.open("https://flow-wing-docs.vercel.app/", "_blank");
  }
});
