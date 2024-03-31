const input = document.getElementById("input");
const listArray = [];
const button = document.getElementById("btn");
const list = document.getElementById("list");

button.addEventListener("click", () => {
  input.value.length > 1 && listArray.push(input.value);
  input.value = "";
  listArray.reverse();

  list.innerHTML = "";

  listArray.forEach((item, index) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    span.textContent = item;
    editBtn.textContent = "Edit";
    deleteBtn.textContent = "Delete";

    li.append(span, editBtn, deleteBtn);
    list.appendChild(li);

    span.addEventListener("click", () => {
      span.classList.toggle("done");
    });

    let clickCount = 0;

    editBtn.addEventListener("click", () => {
      if (clickCount === 0) {
        const inputField = document.createElement("input");
        inputField.value = span.textContent;

        editBtn.disabled = true;
      } else if (clickCount === 1) {
      }
      //   if (!span.classList.contains("done")) {
      //     const inputField = document.createElement("input");
      //      // Set the initial value of the input field
      //     inputField.addEventListener("change", () => {
      //       span.textContent = inputField.value; // Update the span's text content when the input field changes
      //       span.removeChild(inputField); // Remove the input field after editing is done
      //     });
      //     span.innerHTML = ""; // Clear the span's content
      //     span.appendChild(inputField); // Add the input field to the span
      //     inputField.focus(); // Focus on the input field for immediate editing
      //   }
      clickCount++;
    });

    deleteBtn.addEventListener("click", () => {
      listArray.splice(index, 1);
      list.removeChild(li);
    });
  });
});
