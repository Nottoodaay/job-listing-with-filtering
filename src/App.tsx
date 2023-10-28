import { useEffect, useState } from 'react'

import './App.css'

import jobsList from './data.json'

function App() {
  const [filtersArray, setFiltersArray] = useState<string[]>([])
  const [filteredJobs, setFilteredJobs] = useState(jobsList)

  useEffect(()=>{
    const filteredJobs = jobsList.filter(job =>{
      return filtersArray.every(filterWord => job.languages.includes(filterWord))
    })

    setFilteredJobs(filteredJobs)
    
  },[filtersArray])

  return (
    <>

    <div>
      {filtersArray.length > 0 ? 
      <>
        <div>
          {filtersArray.map((filterValue)=>(
            <div key={filterValue}>{filterValue}</div>
          ))}
          <div onClick={()=>setFiltersArray([])} >Clear</div>
        </div>
      </>
      : 
      <div style={{display:'none'}} ></div> }
    </div>

    <div>
      {
        filteredJobs.map((jobs)=>{
          return(
            <div key={jobs.id}>
            <h4>{jobs.company}</h4>
            <div>
              {jobs.languages.map((language => (
                <p onClick={()=>setFiltersArray([...filtersArray, language])} key={language}>{language}</p>
              )))}
              <p>{jobs.level}</p>
            </div>
           </div>
          )
          
        })
      }
      </div>
    </>
  )
}

export default App
