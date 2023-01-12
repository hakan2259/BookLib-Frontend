import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddAuthor from '../pages/AddAuthor'
import AddBook from '../pages/AddBook'
import BookList from '../pages/BookList'
import Navi from './Navi'
export default function Dashboard() {
    return (
        <div>
            <Navi />
            <Routes>
                <Route path='/' element={<BookList />} />
                <Route path='/books' element={<BookList />} />
                <Route path='/addBook' element={<AddBook />} />
                <Route path='/addAuthor' element={<AddAuthor />} />
            </Routes>
        </div>
    )
}
