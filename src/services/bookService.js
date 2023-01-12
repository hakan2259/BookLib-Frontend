import axios from "axios";
export default class BookService{
    getBooks(){
        return axios.get("http://localhost:8080/api/books/getAll")
    }
}