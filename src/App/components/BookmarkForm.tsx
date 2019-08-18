import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styled from 'styled-components';
import { Bookmark } from '../state';
import { addBookmark } from '../actions';

const initialFormState: Bookmark = {
   category: '',
   technology: '',
   notes: ''
};
const BookmarkForm: React.FC = (): JSX.Element => {
   const [bookmark, setBookmark] = useState<Bookmark>(initialFormState);
   const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.persist();
      setBookmark(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
   };

   return (
      <Form
         onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            addBookmark(bookmark);
         }}>
         <InputWrapper>
            <InputLabel htmlFor='category'>Category</InputLabel>
            <Input name='category' value={bookmark.category || ''} onChange={handleInput} />
         </InputWrapper>
         <InputWrapper>
            <InputLabel htmlFor='technology'>Technology</InputLabel>
            <Input name='technology' value={bookmark.technology || ''} onChange={handleInput} />
         </InputWrapper>
         <InputWrapper>
            <InputLabel htmlFor='notes'>Notes</InputLabel>
            <Notes name='notes' value={bookmark.notes || ''} onChange={handleInput} />
         </InputWrapper>
         <SubmitButton>Add</SubmitButton>
      </Form>
   );
};

export default BookmarkForm;

const Form = styled.form`
   width: 90%;
   padding: 7px 10px;
   margin: 0 auto;
`;

const InputWrapper = styled.div`
   margin: 7px auto;
   font-size: 0.8em;
`;
const InputLabel = styled.label.attrs(({ htmlFor }) => ({ htmlFor }))`
   display: block;
   margin: 0 0 5px 4px;
   font-weight: 600;
   padding: 5px;
`;

const Input = styled.input.attrs(({ name }) => ({ type: 'text', name }))`
   padding: 5px 7px;
   border-radius: 5px;
   border: 1px thin lightgray;
   width: 100%;
`;
const Notes = styled.textarea.attrs(({ cols, rows, name }) => ({ cols, rows, name }))`
   padding: 5px 7px;
   border-radius: 5px;
   border: 1px thin lightgray;
   width: 100%;
`;

const SubmitButton = styled.button.attrs({ type: 'submit' })`
   background-color: #0077D6;
   color: #eee;
   padding: 4px 6px;
   border: none;
   border-radius: 4px;
   font-size: 1em;
`;
