import React, { useState, useEffect } from 'react'
import { Field, Form, Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { FormField, Button, Label } from 'semantic-ui-react'
import AuthorService from '../services/authorService'
import BookService from '../services/bookService'
import { ToastContainer, toast } from 'react-toastify';

export default function AddBook() {
  const initialValues = { bookName: "", bookISBN: "", category: "", authorId: "" }
  const validationSchema = Yup.object({
    bookName: Yup.string().required("Book name is required!"),
    bookISBN: Yup.string().required("Book isbn is required!"),
    category: Yup.string().required("Book category is required!"),
    authorName: Yup.string().required("Author name is required!")
  })
  const [authors, setAuthors] = useState([])
  useEffect(() => {
    let authorService = new AuthorService()
    authorService.getAuthors().then(result => setAuthors(result.data.data))

  }, [])


  return (
    <div>
      <ToastContainer />
     
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          let bookService = new BookService()
          bookService.saveBook(values.bookName,values.bookISBN,values.category,values.authorName)
          .then(res => {
            if(res.data.success == false){
              toast.error(res.data.message, {
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
            else if(res.data.success == true){
              toast.success('Book added successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              }); 
            }
          })
          .catch(err => {
            if(err){
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
        }}
      >
        <Form className='ui form'>
          <FormField>
            <Field name="bookName" type="text" placeholder="Book Name">
            </Field>
            <ErrorMessage name='bookName' render={error =>
              <Label pointing prompt content={error}></Label>
            }></ErrorMessage>
          </FormField>
          <FormField>
            <Field name="bookISBN" type="text" placeholder="Book ISBN">
            </Field>
            <ErrorMessage name='bookISBN' render={error =>
              <Label pointing prompt content={error}></Label>
            }></ErrorMessage>
          </FormField>
          <FormField>
            <Field name="category" type="text" placeholder="Category">
            </Field>
            <ErrorMessage name='category' render={error =>
              <Label pointing prompt content={error}></Label>
            }></ErrorMessage>
          </FormField>
          <FormField>
            <Field as="select" name="authorName">
              <option selected disabled>Please choose</option>
              {
                authors.map((author) => (
                  <option key={author.id} value={author.id}>{author.name}</option>
                ))
              }
              <ErrorMessage name='authorName' render={error =>
                <Label pointing prompt content={error}></Label>
              }></ErrorMessage>
            </Field>
          </FormField>
          <Button basic color='grey' type='submit'>Save</Button>
        </Form>

      </Formik>
    </div>
  )
}
