import './App.css'
import {usersArr} from './users'
import {useEffect, useState} from "react";

function App() {
  const [initialUsers] = useState(usersArr)
  const [otherUsers, setOtherUsers] = useState(usersArr.slice(5, 10))
  const [page, setPage] = useState(1)

  const itemsPerPage = 20
  const firstUsers = initialUsers.slice(0, itemsPerPage)

  const loadMore = () => {
    setPage(prevPage => prevPage + 1)
    setOtherUsers([...otherUsers, ...initialUsers.slice(page * itemsPerPage, (page+1) * itemsPerPage)])
  }

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      if ((scrollTop + clientHeight >= scrollHeight - 50) && page > 1) {
        loadMore()
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loadMore]);


  return (
    <div className='app'>
      <h1 className='app__title'>Список пользователей</h1>
      <div className='users'>
        {firstUsers.map((user, index) => {
          return (
            <div key={index} className='users__block'>
              <p>Имя: {user.name}</p>
              <p>Фамилия: {user.surname}</p>
            </div>
          )
        })}
        {page > 1 && otherUsers.map((user, index) => {
          return (
            <div key={index} className='users__block users__block_new'>
              <p>Имя: {user.name}</p>
              <p>Фамилия: {user.surname}</p>
            </div>
          )
        })}
      </div>
      {(page === 1) && <button onClick={loadMore} className='app__button'>Загрузить еще</button>}
    </div>
  )
}

export default App
