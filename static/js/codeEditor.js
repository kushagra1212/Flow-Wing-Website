document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("code_editor_output");
  const form = document.getElementById("code_editor_form");
  const editor = document.getElementById("editor");
  const input = document.getElementById("code_editor_input");
  const compilerAndRunButton = document.getElementById("code_editor_submit");
  const readDocsButton = document.getElementById("code_editor_read_docs");

  // Load code from localStorage if available

  const savedCode = localStorage.getItem(
    FLOW_WING_LOCAL_STORAGE.CODE_LOCAL_STORAGE_KEY
  );
  const savedInput = localStorage.getItem(
    FLOW_WING_LOCAL_STORAGE.INPUT_LOCAL_STORAGE_KEY
  );

  setTimeout(() => {
    if (
      savedCode &&
      editor?.childNodes?.[1]?.childNodes?.[0] &&
      editor?.childNodes?.[1]?.childNodes?.[0]?.innerHTML !== savedCode
    ) {
      editor.childNodes[1].childNodes[0].innerHTML = savedCode;
    }

    if (savedInput) {
      input.value = savedInput;
    }
  }, 800);
  // Observe changes in the editor and update localStorage
  const observer = new MutationObserver((records) => {
    const currentCode = editor?.childNodes?.[1]?.childNodes?.[0]?.innerHTML;
    if (currentCode) {
      localStorage.setItem(
        FLOW_WING_LOCAL_STORAGE.CODE_LOCAL_STORAGE_KEY,
        currentCode
      ); // Save to localStorage
    }
  });

  input.addEventListener("input", () => {
    localStorage.setItem(
      FLOW_WING_LOCAL_STORAGE.INPUT_LOCAL_STORAGE_KEY,
      input.value
    ); // Save to localStorage
  });

  observer.observe(editor, { childList: true, subtree: true });

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
  window.addEventListener("load", () => {});
});
