import React from 'react'
import "./style.css"

import { useDispatch, useSelector } from 'react-redux'
import { secondRestart } from "../../redux/wordSlice";

import { FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

function Score() {

  const dispatch = useDispatch()

  const writtenWords = useSelector((state) => state.word.writtenWords)
  const correctlySpelledWords = useSelector((state) => state.word.correctlySpelledWords)

  const second = useSelector((state) => state.word.second)

  // close ' a basınca yeniden başlatır.
  const close = () =>{
    dispatch(secondRestart())
  }
  
  return (
    <div className='score1'>
      <div className='score2'>Sonuç<span>{second === 0 && (<FontAwesomeIcon onClick={close} icon={faXmark} />) }</span></div>
      <div className='score3'>Toplam Kelime  <span>{writtenWords.length}</span></div>
      <div className='score4'>Doğru Kelime  <span>{correctlySpelledWords.length}</span></div>
      <div className='score5'>Yanlış Kelime  <span>{writtenWords.length - correctlySpelledWords.length}</span></div>
    </div>
  )
}

export default Score