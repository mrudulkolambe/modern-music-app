
function setLocalStorage(key, value) {
	if (typeof (value) === "string") {
		window.localStorage.setItem(key, value)
	} else {
		window.localStorage.setItem(key, JSON.stringify(value))
	}
}

function getLocalStorage(key) {
	return JSON.parse(window.localStorage.getItem(key))
}
export { setLocalStorage, getLocalStorage };