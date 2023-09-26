function findAuthorById(authors = [], id = 0) {
  let findobj = authors.find((authorobj) => {
    return authorobj.id === id;
  });
  return findobj;
}

function doesBookExist(books = [], id = "") {
  return books.some((book) => {
    return book.id === id;
  });
}

function findBookById(books = [], id = "") {
  if (doesBookExist(books, id)){
  let bookobj = books.find((book) => {
    return book.id === id;
  });
  return bookobj;}
}

function partitionBooksByBorrowedStatus(books = []) {
  let filteredArray = [];
  let checkedoutArray = books.filter((book) => {
    return book.borrows[0].returned === false;
  });
  let returnedArray = books.filter((book) => {
    return book.borrows[0].returned === true;
  });
  filteredArray.push(checkedoutArray);
  filteredArray.push(returnedArray);
  return filteredArray;
}

function getBorrowersForBook(book={}, accounts=[]) {
  const borrowers = book.borrows.map(borrow => {
    const account = accounts.find(account => account.id === borrow.id);
    return { ...account, returned: borrow.returned };
  });

  return borrowers.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
