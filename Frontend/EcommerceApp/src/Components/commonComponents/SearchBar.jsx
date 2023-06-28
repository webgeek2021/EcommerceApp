
import React from 'react';
import { Form ,InputGroup} from 'react-bootstrap';
import { searchProduct  } from '../../Api/ProductApi/ProductApi';
import { useNavigate } from 'react-router-dom';
const SearchBar = (props) => {
  
  const [search,setSearch] = React.useState("")
  const [searchList , setSearchList] = React.useState([])
  const [isli , setIsli] = React.useState(false)
     const navigate = useNavigate()


  React.useEffect(()=>{
    if(search.length > 3){
        searchProduct(search,setSearchList)
    }
  },[search])


  const handleChange = (e)=>{
    const value = e.target.value
    // console.log(e.target.value)
    setSearch(value)
    if(value === "")
    setSearchList([])
    
  }

  const handleKeyDown = (e)=>{
    // console.log(e)
    if(e.key === "Enter")
    {
      setSearch("")
      navigate(`/search/product/${search}`)
    }else if(e.key === "Backspace")
    {
      setIsli(false)
    }
  }
  const handleDropClick  = (t) =>{
    setSearch(t)
    setIsli(prev => !prev)
    navigate(`/search/product/${t}`)
    setSearch("")
  }
  const list = searchList?.map((li,index)=>{
    return(
      <li key={index} onClick={()=>handleDropClick(li)}>{li}</li>
    )
  })

  return (
    <div className='search-bar'>
      <InputGroup >
        <Form.Control
          type="text"
          placeholder="Search By Product Title"
          value={search}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </InputGroup>
      {
        searchList.length > 0  && search !== "" &&  
        <ul className={`seachBar__options ${isli ? "hide-option" : ""}`}>
          {list}
        </ul>
      }
    </div> 
  )
}

export default SearchBar