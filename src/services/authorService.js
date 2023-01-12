import axios from "axios";

export default class AuthorService{
    getAuthors(){
        return axios.get("http://localhost:8080/api/authors/getAll")
    }
}