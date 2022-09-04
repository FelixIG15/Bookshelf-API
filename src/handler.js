const { nanoid } = require('nanoid');
const books = require('./books')
 
const addBookHandler = (request, h) => {
  const { name, year,author} = request.payload;
 
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  
  const newBook = {
    id, name, year, author, createdAt, updatedAt,
  };

  books.push(newBook);
  const isSuccess = books.filter((book) => book.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllBooksHandler = () => ({
    status: 'success',
    data: {
      books,
    },
});
   
module.exports = { addBookHandler, getAllBooksHandler };