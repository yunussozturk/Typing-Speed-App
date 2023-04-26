import React, { useEffect, useState } from 'react'
import "./style.css"

import { useSelector , useDispatch } from 'react-redux'
import { addTheTypedWord , decreaseSeconds , secondRestart , mix } from "../../redux/wordSlice";

import { FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons"

function WrittenWord() {

  const dispatch = useDispatch()

  const registeredWords = useSelector((state) => state.word.registeredWords)
  const registeredWordsArray = registeredWords.split(" ")        //registeredWords array yap
  
  const [ writtenWord , setWrittenWord ] = useState("")  // inputa girilen değeri kullanmak için oluşturuldu

  const [runSeconds , setRunSeconds] = useState(false)   // inputa harf girince true yap ki sayaç çalışsın
  const second = useSelector((state) => state.word.second);
  const minute = useSelector((state) => state.word.minute);

//yazdığımız kelimeyi yazdigimizKelimeler ' e ekle ve sayacı çalıştırmak için saniyeCalistir ' ı true yap
  useEffect((e) =>{
    if(writtenWord.includes(" ")){
      dispatch(addTheTypedWord(writtenWord.trim()))
      setWrittenWord("")
    }

    if(writtenWord !== ""){
      setRunSeconds(true)
    }
  },[writtenWord])

//second(saniye) 0 olana kadar saniyeyi çalıştır.
  useEffect(() =>{
    if(runSeconds == true){
      if(second !== 0){
        setTimeout(() =>{
          dispatch(decreaseSeconds())
        },1000)
      }
    }
  },[second , runSeconds])


  const restart = () =>{
    setRunSeconds(false)
    setWrittenWord("")   
    setTimeout(() =>{
      dispatch(secondRestart ())
      dispatch(mix(registeredWordsArray))
    },1000)
  }

  return (
    <>
        <div className='writtenWord1'> 
            <div className='writtenWord2'>
                <input value={writtenWord} onChange={(e) => setWrittenWord(e.target.value)} />
            </div>
{/* saniye 10 ' dan düşük olunca sayının yanına 0 yazıldı */}
            <div className='writtenWord3'>
                {minute}:{(second % 60) > 9 ? (second % 60) : `0${second % 60}`} 
            </div>

            <div className='writtenWord4'>
                <button onClick={restart}><FontAwesomeIcon icon={faArrowsRotate} /></button>
            </div>
        </div>
    </>
  )
}

export default WrittenWord