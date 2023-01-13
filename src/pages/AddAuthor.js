import React, { useEffect, useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Button, Container, FormField, Label } from 'semantic-ui-react'
import AuthorService from '../services/authorService'
import { ToastContainer, toast } from 'react-toastify';
export default function AddAuthor() {

  const initialValues = { authorName: "", age: "", gender: "", country: "" }
  const validationSchema = Yup.object({
    authorName: Yup.string().required("Author name is required!"),
    age: Yup.number().required("Author age is required!"),
    gender: Yup.string().required("Author gender is required!"),
    country: Yup.string().required("Author country is required!")
  })
  return (
    <div>
      <ToastContainer />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          let authorService = new AuthorService()

          authorService.saveAuthor(values.authorName, values.age, values.gender, values.country)
            .then(res => {
              if (res.data.success == false) {
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
              else if (res.data.success == true) {
                toast.success('Author added successfully!', {
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

        }}
      >
        <Form className='ui form'>
          <FormField>
            <Field name="authorName" type="text" placeholder="Author Name">
            </Field>
            <ErrorMessage name='authorName' render={error =>
              <Label pointing prompt content={error}></Label>
            }></ErrorMessage>
          </FormField>
          <FormField>
            <Field name="age" placeholder="Author Age">
            </Field>
            <ErrorMessage name='age' render={error =>
              <Label pointing prompt content={error}></Label>
            }></ErrorMessage>
          </FormField>
          <FormField>
            <Field name="gender" placeholder="Author Gender">
            </Field>
            <ErrorMessage name='gender' render={error =>
              <Label pointing prompt content={error}></Label>
            }></ErrorMessage>
          </FormField>
          <FormField>
            <Field name="country" placeholder="Author Country">
            </Field>
            <ErrorMessage name='country' render={error =>
              <Label pointing prompt content={error}></Label>
            }></ErrorMessage>
          </FormField>
          <Button basic color='grey' type='submit'>Save</Button>
        </Form>
      </Formik>
    </div >
  )
}
