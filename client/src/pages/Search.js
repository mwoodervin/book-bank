import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { Input, TextArea, FormBtn } from "../components/Form";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { CardDeck } from 'react-bootstrap'
import Books from "./Books";
import BookCard from "../components/Card";


function Detail(props) {
  const [books, setBooks] = useState([])
  const [formObject, setFormObject] = useState({})


  // When this component mounts, grab the book with the _id of props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  const {id} = useParams()
  // useEffect(() => {
  //   API.getBook(id)
  //     .then(res => setBook(res.data))
  //     .catch(err => console.log(err));
  // }, [])

    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
      const { name, value } = event.target;
      setFormObject({...formObject, [name]: value})
    };
  
    // When the form is submitted, use the API.saveBook method to save the book data
    // Then reload books from the database
    function handleFormSubmit(event) {
      event.preventDefault();
      if (formObject.title) {
        API.searchBooks(formObject.title)
          .then(res => {
            console.log(res);
            setBooks(res.data.items)
          })
          .catch(err => console.log(err));
      }
    };
  
    // API.saveBook({
    //   title: formObject.title,
    //   author: formObject.author,
    //   synopsis: formObject.synopsis
    // })
    //   .then(res => loadBooks())
    //   .catch(err => console.log(err));


  return (
      <Container fluid>
        <Row>
        <Col size="md-12">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input
                onChange={handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <FormBtn
                disabled={!(formObject.title)}
                onClick={handleFormSubmit}
              >
                Search
              </FormBtn>
            </form>
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/books">← Go To Saved Books</Link>
          </Col>
        </Row>
        <Row>
        <CardDeck>
          {books.map((book) => (<BookCard 
          thumbnail={book.volumeInfo.imageLinks.thumbnail} 
          title={book.volumeInfo.title}></BookCard>))}
        </CardDeck>
        </Row>
      </Container>
    );
  }


export default Detail;
