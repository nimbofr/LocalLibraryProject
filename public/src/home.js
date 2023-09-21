const { partitionBooksByBorrowedStatus } = require("./books");

function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books = []) {
  const allbooksarray = partitionBooksByBorrowedStatus(books);
  return allbooksarray[0].length;
}

function getMostCommonGenres(books=[]) {
  const lookup = {};
  books.forEach((bookobj)=>{
    const {genre} = bookobj;
    if(!lookup[genre]){
      lookup[genre] = 1
    }
    else {
      lookup[genre]++
    }
  })
  const result = []
  for (let genreNameKey in lookup){
    const obj = { name: genreNameKey, count: lookup[genreNameKey]};
    result.push(obj)
    result.sort((a, b)=>{
      return b.count - a.count
    })
  }
  return result.slice(0,5)
  
}

function getMostPopularBooks(books=[]) {
  books.sort((booka, bookz)=> bookz.borrows.length - booka.borrows.length)
  const mostPopularBooks = books.slice(0,5)
  return mostPopularBooks.map((book)=>{
    return { name: book.title, count: book.borrows.length}
  })
}

function getMostPopularAuthors(books = [], authors = []) {
  const mostPopularBooksSliced = books
    .sort((booka, bookz) => bookz.borrows.length - booka.borrows.length)
    .slice(0, 5);
  const result = mostPopularBooksSliced.map((book) => {
    const author = authors.find((author) => author.id === book.authorId);
    return {
      name: `${author.name.first} ${author.name.last}`,
      count: book.borrows.length,
    };
  });
  return result;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
