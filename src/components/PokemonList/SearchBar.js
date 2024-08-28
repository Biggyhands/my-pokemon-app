import React from 'react'
import {placeHolderPhrase} from '../../utils/placeholderPhrase';


export default function SearchBar(props) {
  
const {formHandler} = props;

  const {formState, onInputChange,onResetForm} = formHandler

  const {searchInput} = formState;
  return (
    <>
    <section className='searchBar-Container'>
      <input 
        placeholder={placeHolderPhrase()}
        
        onChange={onInputChange}
        name='searchInput'
        value={searchInput}
        />
      <button onClick={onResetForm}>
      Search
      </button>        
     </section>
    </>
  )

}
