import axios from "axios";
export default class AuthorService {
    getAuthors() {
        return axios.get("http://localhost:8080/api/authors/getAll")
    }
    saveAuthor(authorName, authorAge, authorGender, authorCountry) {
        return axios.post("http://localhost:8080/api/authors/addAuthor", {
            name: authorName,
            age: authorAge,
            gender: authorGender,
            country: authorCountry
        })
    }
}