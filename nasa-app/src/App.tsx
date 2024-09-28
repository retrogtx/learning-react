import { useEffect, useState } from "react"
import Footer from "./components/Footer"
import Main from "./components/Main"
import SideBar from "./components/Sidebar"

interface NasaData {
  hdurl?: string;
  title?: string;
  date?: string;
  explanation?: string;
}

function App() {
  const [data, setData] = useState<NasaData | null>(null)
  const [showModal, setShowModal] = useState(false)

  function handleToggleModal() {
    setShowModal(!showModal)
  }

  useEffect(() => {
    async function fetchAPIData() {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
      const url = 'https://api.nasa.gov/planetary/apod' + `?api_key=${NASA_KEY}`

      const today = (new Date()).toDateString()
      const localKey = `NASA-${today}`
      if (localStorage.getItem(localKey)) {
        const storedData = localStorage.getItem(localKey)
        if (storedData) {
          const apiData = JSON.parse(storedData)
          setData(apiData)
          console.log('Fetched from cache today')
          return
        }
      }
      localStorage.clear()

      try {
        const res = await fetch(url)
        const apiData = await res.json()
        localStorage.setItem(localKey, JSON.stringify(apiData))
        setData(apiData)
        console.log('Fetched from API today')
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message)
        } else {
          console.log('An unknown error occurred')
        }
      }
    }
    fetchAPIData()
  }, [])

  return (
    <>
      {data && data.hdurl ? (
        <Main data={{hdurl: data.hdurl, title: data.title}} />
      ) : (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      )}
      {showModal && data && (
        <SideBar data={data} handleToggleModal={handleToggleModal} />
      )}
      {data && (
        <Footer data={data} handleToggleModal={handleToggleModal} />
      )}
    </>
  )
}

export default App