import React from 'react'
import { useSelector } from 'react-redux'
import RegisteredWords from './RegisteredWords/RegisteredWords'
import Header from './Header/Header'
import WriteWord from './WriteWord/WriteWord'
import Score from './Score/Score'

function Container() {

  const second = useSelector((state) => state.word.second)

//second(saniye) 0 olunca score ekranını ver.
  return (
  <>
    {
      second > 0 ? 
    (
    <div>
      <Header />
      <RegisteredWords />
      <WriteWord />
      <Score />
    </div>
    )
    :
    (
      <div>
        <Score />
      </div>
    )
    }
  </>

  )
}

export default Container