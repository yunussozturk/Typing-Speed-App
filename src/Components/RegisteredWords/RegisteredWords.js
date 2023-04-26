import React, { useEffect , useRef } from 'react'
import "./style.css"

import { useSelector , useDispatch } from 'react-redux'
import { addTheCorrectlySpelledWord , mix } from "../../redux/wordSlice";

function RegisteredWords() {
  
// scroll ' u hareket ettirmak için end oluşturuldu
  const end = useRef();
  
  const dispatch = useDispatch()

  const registeredWords = useSelector((state) => state.word.registeredWords)
  const registeredWordsArray = registeredWords.split(" ")        //registeredWords array yapıldı
  const registeredWordsShuffle = useSelector((state) => state.word.registeredWordsShuffle)
  const writtenWords = useSelector((state) => state.word.writtenWords)

//registeredWordsArray ' i karıştır ve registeredWordsShuffle ' ye ekle
  useEffect(() =>{
    dispatch(mix(registeredWordsArray))
  },[])
  
//doğru kelimeleri bul ve correctlySpelledWords ' e ekle
  useEffect(() =>{
      registeredWordsShuffle.slice(writtenWords.length - 1 , registeredWordsShuffle.length).map((data) => 
      registeredWordsShuffle[registeredWordsShuffle.indexOf(data)] === writtenWords[registeredWordsShuffle.indexOf(data)] && 
      dispatch(addTheCorrectlySpelledWord(registeredWordsShuffle[registeredWordsShuffle.indexOf(data)]))     
    )
    writtenWords.length > 0 && end.current.scrollIntoView();
  },[writtenWords])


  return (
    <>
        <div className='registeredWord1'>         
          {
            registeredWordsShuffle.slice(0 , writtenWords.length).map((data , key) =>(
              <div key={key} 
              className={`registeredWord2 ${registeredWordsShuffle[registeredWordsShuffle.indexOf(data)] === writtenWords[registeredWordsShuffle.indexOf(data)] ? "green" : "red"}`}>
                {data}
              </div>
            ))
          }
          {
            registeredWordsShuffle.slice(writtenWords.length , writtenWords.length + 1).map((data , key) =>(
              <div  key={key} className={`registeredWord2 grey`}>{data}</div>
            ))
          }
          <div style={{marginTop : "-8px"}} ref={end}></div>
          {
            registeredWordsShuffle.slice(writtenWords.length + 1 , registeredWordsShuffle.length).map((data , key) =>(
            <div key={key}>
              <div className={`registeredWord2`}>{data}</div>
            </div>
            ))
          }
        </div>
    </>
  )
  }

export default RegisteredWords