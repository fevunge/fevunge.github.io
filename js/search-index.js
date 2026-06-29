const searchInput = document.getElementById("search-index")

const indexItems = document.getElementsByClassName("searchable-item");

searchInput.addEventListener("keyup", (event) => {
	for (let index = 0; index < indexItems.length; index++) {
		const element = indexItems[index];
		if (!(element.textContent.includes(searchInput.value))) {
			element.classList.add("hidden")
		}else {
			element.classList.remove("hidden")
		}
	}
})