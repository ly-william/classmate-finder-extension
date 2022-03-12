let spanNumber = 0;
let currSpan = document.getElementById("CLASS_NAME$span$" + spanNumber);
let classNumbers = [];
while (currSpan != null) {
  // Finds the class number associated with the span and adds it to the array
  let textContent = currSpan.textContent;
  let regex = /\d{5}/g;
  classNumbers.push(textContent.match(regex)[0]); // .match returns an array

  // Starts from the next span
  spanNumber++;
  currSpan = document.getElementById("CLASS_NAME$span$" + spanNumber);
}

if (classNumbers.length == 0) {
  // User didn't have any classes, perhaps they aren't registered for any, the page is wrong, or they SPIRE updated how they stored class numbers.
  // TODO: Display error message, potentially add a report button so that I can check if SPIRE changed how they store class numbers.
  console.log("Error: No class numbers");
  return;
}


