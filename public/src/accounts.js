const { findAuthorById } = require("./books")

function findAccountById(accounts=[], id="") {
  let finalobj = accounts.find((account)=>account.id===id)
  return finalobj
}

function sortAccountsByLastName(accounts=[]) {
  accounts.sort((a,z)=>{
    return (a.name.last.toLowerCase() < z.name.last.toLowerCase()) ? -1 : 1
  })
  return accounts
}

function getTotalNumberOfBorrows(account={}, books=[]) {
  let finalnumber = books.reduce((acc, book)=>{
    let filteredarray= book.borrows.filter((borrow => {
      return borrow.id === account.id
    }))
    return acc+filteredarray.length
  },0)
  return finalnumber
}

function getBooksPossessedByAccount(account = {}, books = [], authors = []) {
  return books.filter((book) =>
      book.borrows
      .some((borrow) => borrow.id === account.id && !borrow.returned
      )
    )
    .map((book) => ({
      ...book,
      author: authors.find((author) => author.id === book.authorId),
    }));
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
