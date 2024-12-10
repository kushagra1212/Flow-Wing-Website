document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("code_editor_output");
  const form = document.getElementById("code_editor_form");
  const editor = document.getElementById("editor");
  const input = document.getElementById("code_editor_input");
  const compilerAndRunButton = document.getElementById("code_editor_submit");
  const readDocsButton = document.getElementById("code_editor_read_docs");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission

    compilerAndRunButton.classList.add("loading");
    fetch(form.action, {
      method: "POST", // Use method from the form
      headers: {
        "Content-Type": "text/plain",
      },
      body: JSON.stringify({
        code:
          "/;  Your Code Here  \n" + editor.children[1].children[0].textContent,
        input: input.value,
      }),
    })
      .then((response) => response.text() || "")
      .then((data) => {
        console.log("Response From Server Raw", data);

        const colorizedCode = parseANSI(data);
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
