import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { toast, ToastContainer } from 'react-toastify'
import Search from '../components/Search'
import BookService from '../services/bookService'
export default function BookList() {
    const [books, setBooks] = useState([])
    const [search, setSearch] = useState("")
    const [filteredBooks, setFilteredBooks] = useState([])

    useEffect(() => {
        let bookService = new BookService()
        bookService.getBooks().then(result => setBooks(result.data.data))
            .catch(err => {
                if (err) {
                    toast.error('API ERROR!', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                }

            })
        bookService.getBooks().then(result => setFilteredBooks(result.data.data))
    }, [])

    useEffect(() => {
        const result = books.filter(book => {
            var filterBookName = book.name.toLowerCase().match(search.toLowerCase())
            var filterCategory = book.category.toLowerCase().match(search.toLowerCase())
            var filterIsbn = book.isbn.toLowerCase().match(search.toLowerCase())
            var filterAuthor = book.author.name.toLowerCase().match(search.toLowerCase())
            return filterBookName || filterCategory || filterIsbn || filterAuthor
        })
        setFilteredBooks(result)
    }, [search])

    const columns = [
        {
            name: "Book Name",
            selector: (row) => row.name,
            sortable: true
        },
        {
            name: "ISBN",
            selector: (row) => row.isbn,
            sortable: true
        },
        {
            name: "Category",
            selector: (row) => row.category,
            sortable: true
        },
        {
            name: "Author Name",
            selector: (row) => row.author.name,
            sortable: true
        },
        {
            name: "Age",
            selector: (row) => row.author.age,
            sortable: true
        },
        {
            name: "Gender",
            selector: (row) => row.author.gender,
            sortable: true
        },
        {
            name: "Country",
            selector: (row) => row.author.country,
            sortable: true
        }
    ]

    return (
        <>
            <ToastContainer />
            <DataTable title="Book List"
                fixedHeader
                columns={columns}
                data={filteredBooks}
                fixedHeaderScrollHeight="400px"
                selectableRowsHighlight
                highlightOnHover
                pagination
                subHeader
                subHeaderComponent={
                    <Search search={search} setSearch={setSearch} />
                }
            />
        </>

    )
}
