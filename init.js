chrome.tabs.query({ active: true, currentWindow: true }).then(([tab]) => {
	if (["Student Center", "Class Schedule"].includes(tab.title) 
			|| tab.title.match(/SPIRE:.*\'s Student Center\b/gm)) {
		document.getElementById("export-button").addEventListener("click", async () => {
			document.getElementById("error").style.display = 'none';
			chrome.scripting.executeScript({
				target: { tabId: tab.id },
				function: exportClassNumbers,
			}, callback);
		});
	} else {
		// hide the normal section, show the other section
		document.getElementById("export-button").style.display = 'none';
		document.getElementById("open-student-center").style.display = 'block';
	}
	let links = document.getElementsByClassName("open-student-center-link");
	for (let link of links)
		link.addEventListener("click", () => window.open("https://www.spire.umass.edu/psp/heproda/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSS_STUDENT_CENTER.GBL", "_blank"))
});


// The body of this function will be executed as a content script inside the
// current page
function exportClassNumbers() {
	// helper function
	function findClassNumbers(array, format) {
		// if "ptifrmtgtframe" doesn't exist, that means this is new spire student center case
		let iframeDocument = document.getElementById('ptifrmtgtframe') ? document.getElementById('ptifrmtgtframe').contentWindow.document : document;
		let spanNumber = 0;
		let currSpan = iframeDocument.getElementById(format + spanNumber);
		// normal caase
		while (currSpan != null) {
			// Finds the class number associated with the span and adds it to the array
			let textContent = currSpan.textContent;
			let regex = /\d{5}/g; // matches section of string with 5 digits
			array.push(textContent.match(regex)[0]); // .match returns an array

			// Starts from the next span
			spanNumber++;
			currSpan = iframeDocument.getElementById(format + spanNumber);
		}
	}

	let url = "https://lywilliam.pythonanywhere.com/import_classes?"
	let classNumbers = [];
	// "normal" student center + "new" student center case
	findClassNumbers(classNumbers, "CLASS_NAME$span$");
	// new version of spire case

	// "normal" Class Schedule case
	// cases are mutually exclusive
	findClassNumbers(classNumbers, "DERIVED_CLS_DTL_CLASS_NBR$");

	// means that currSpan was null, which means page wasn't loaded or student has no classes yet
	if (classNumbers.length == 0) {
		return false;
	}
	let finalUrl = classNumbers.reduce((acc, e) => acc+"&class="+e, url)
	window.open(finalUrl, "_blank");
	return true
}



function callback(result) {
	if (result[0].result) {
		// success
	} else {
		// failure...
		// page didn't load completely yet, they aren't registered for any classes, or they SPIRE updated how they stored class numbers.
		// going to assume that they did register for classes
		document.getElementById("error").style.display = 'block';
	}
}