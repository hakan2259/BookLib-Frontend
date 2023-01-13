import axios from "axios";

export default class BookService {
    getBooks() {
        return axios.get("http://localhost:8080/api/books/getAll")
    }

    saveBook(bookName, bookISBN, category, authorName) {
        return axios.post("http://localhost:8080/api/books/addBook", {
            name:bookName,
            isbn:bookISBN,
            category:category,
            author:{
                id:authorName
            }
        
        })
    }
}