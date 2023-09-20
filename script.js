// # Qutting 2023-09-19 at 5:03 PM
// ==================================
// ## Accomplished
// 1. I'm getting the movie data and calling sortRows(), passing the sort order
// 2. The results of sortRows appear to be correct
// 3. The following statement is working to empty the table
// 4. The sort order indicator is getting added
// ## To Do
// - [ ] The following statement is not repopulating the table with the sorted movie data
// - [ ] Delete the old sort order indicator *before* I add the new one
// - [ ] Validate the movie title and rating fields according to the requirements
// - [ ] Add a sorting function for ratings
// - [ ] Check final solution with ChatGPT for pointers

// # Starting jQuery Exercise
// 2023-09-20 at 11:36 AM
// Plan to work for 2h
// ==================================
// ## Objective
// Complete jQuery exercie
//
// ## To Do
// - [ ] The following statement is not repopulating the table with the sorted movie data
// - [ ] Delete the old sort order indicator *before* I add the new one
// - [ ] Validate the movie title and rating fields according to the requirements
// - [ ] Add a sorting function for ratings
// - [ ] Check final solution with ChatGPT for pointers

// # Qutting jQuery Exercise
// 2023-09-20 at 1:09 PM
// Worked for TIME
// ==================================
// ## Accomplished
// 1.
//
// ## Learned
// - I need to develop a more structured, methodical, deliberate, and less-rushed approach to coding. I immediately jump in and start trying to code everything at once, which just leads to problems. I create problem after problem without solving any. This is something I should discuss with Shane.
//
// ## Tee Up What To Do Next
// - [ ]

$("#movie").submit((e) => {
  e.preventDefault();
  const titleInput = $("#movie").find("#title").val();
  const ratingInput = $("#movie").find("#rating").val();
  const errorMessage = validateInput();
  if (!errorMessage) {
    $("table tbody").append(
      "<tr class='rated-movie'><td>" +
        titleInput +
        "</td><td>" +
        ratingInput +
        "</td><td><button>&#x2715;</button></tr>"
    );
  } else {
    alert(errorMessage);
  }
});
$("table").on("click", "button", (e) => {
  $(e.target).closest(".rated-movie").remove();
});

let titleSortOrder = "";
let $ratedMovies = $("tbody tr").toArray();

$("#sort-title").on("click", (e) => {
  let currentSortOrder = $("#sort-title").find(".title-sort-order");
  $("#sort-rating .rating-sort-order").remove();
  console.log(currentSortOrder);
  if (currentSortOrder.text() === "") {
    $(e.target).append(' <span class="title-sort-order">asc</span>');
    titleSortOrder = "asc";
  } else if (currentSortOrder.text() === "asc") {
    currentSortOrder.remove();
    $(e.target).append(' <span class="title-sort-order">desc</span>');
    titleSortOrder = "desc";
  } else {
    currentSortOrder.remove();
    $(e.target).append(' <span class="title-sort-order">asc</span>');
    titleSortOrder = "asc";
  }
  let sortedRows = sortRows(titleSortOrder);

  $("tbody").empty().append(sortedRows);
});

$("#sort-rating").on("click", (e) => {
  let currentSortOrder = $("#sort-rating").find(".rating-sort-order");
  $("#sort-title .title-sort-order").remove();
  if (currentSortOrder.text() === "") {
    $(e.target).append(' <span class="rating-sort-order">asc</span>');
    ratingSortOrder = "asc";
  } else if (currentSortOrder.text() === "asc") {
    currentSortOrder.remove();
    $(e.target).append(' <span class="rating-sort-order">desc</span>');
    ratingSortOrder = "desc";
  } else {
    currentSortOrder.remove();
    $(e.target).append(' <span class="rating-sort-order">asc</span>');
    ratingSortOrder = "asc";
  }
  let sortedRows = sortRows(ratingSortOrder);

  $("tbody").empty().append(sortedRows);
});

function sortRows(order) {
  return $ratedMovies.sort((a, b) => {
    const titleA = $(a).children("td").eq(0).text();
    const titleB = $(b).children("td").eq(0).text();

    if (order === "asc") {
      return titleA.localeCompare(titleB);
    } else {
      return titleB.localeCompare(titleA);
    }
  });
}
const validations = {
  rating: {
    errorMessage: "Ratings must be between 0 and 10",
    validate: (inputValue) => {
      return inputValue > 0 && inputValue <= 10;
    },
  },
  title: {
    errorMessage: "Titles must be at least 2 characters",
    validate: (inputValue) => {
      return inputValue.length >= 2;
    },
  },
};

function validateInput() {
  let errorMessage = "";
  for (let field in validations) {
    let inputValue = $(`#${field}`).val();
    if (!validations[field].validate(inputValue)) {
      errorMessage += `${validations[field].errorMessage}\n`;
    }
  }
  if (errorMessage != "") {
    return errorMessage;
  }
  return true;
}
