import { useEffect, useState } from 'react'

import './App.css'

import jobsList from './data.json'

function App() {
  const [languageFilter, setLanguageFilter] = useState<string[]>([])
  const [toolsFilter, setToolsFilter] = useState<string[]>([])
  const [roleFilter, setRoleFilter] = useState<string[]>([])

  const [filteredJobs, setFilteredJobs] = useState(jobsList)

  useEffect(()=>{
    const filteredJobs = jobsList.filter((job)=>{
      const languageFilterPassed = languageFilter.length === 0 ||
          languageFilter.every((filterWord) => job.languages.includes(filterWord))
      const toolsFilterPassed = toolsFilter.length === 0 ||
          toolsFilter.every((filterWord) => job.tools.includes(filterWord))
      const roleFilterPassed = roleFilter.length === 0 || roleFilter.includes(job.role);

      return languageFilterPassed && toolsFilterPassed && roleFilterPassed
    })

    setFilteredJobs(filteredJobs)
    
  },[languageFilter, toolsFilter, roleFilter])

  const clearFilters = () =>{
    setLanguageFilter([])
    setToolsFilter([])
    setRoleFilter([])
  }

  const addLanguageFilter = (filter: string) =>{
    setLanguageFilter([...languageFilter, filter])
  }

  const removeLanguageFilter = (filter: string) =>{
    setLanguageFilter(languageFilter.filter((item) => item != filter ))
  }

  const addToolsFilter = (filter: string) =>{
    setToolsFilter([...toolsFilter, filter])
  }

  const removeToolsFilter = (filter: string) =>{
    setToolsFilter(toolsFilter.filter((item) => item != filter ))
  }

  const addRoleFilter = (filter: string) => {
    setRoleFilter([...roleFilter, filter]);
  };

  const removeRoleFilter = (filter: string) => {
    setRoleFilter(roleFilter.filter((item) => item !== filter));
  };

  console.log(jobsList)

  return (
    <>

    <div>
    {languageFilter.length > 0 || toolsFilter.length > 0 || roleFilter.length > 0 ? 
    (
      <div>
        {languageFilter.map((filterValue)=>(
          <div key={filterValue} >
            {filterValue}
            <p onClick={()=> removeLanguageFilter(filterValue)}>x</p>
          </div>
        ))}
        {toolsFilter.map((filterValue)=>(
            <div key={filterValue}>
              {filterValue}
              <p onClick={()=>removeToolsFilter(filterValue)} >x</p>
            </div>
          ))}

          {roleFilter.map((filterValue)=>(
            <div key={filterValue}>
              {filterValue}
              <p onClick={()=>removeRoleFilter(filterValue)} >x</p>
            </div>
          ))}

          <div onClick={clearFilters} >clear</div>
      </div>
    )
    : (
      <div style={{display:'none'}}></div>
    )}
    </div>

    <div>
      {
        filteredJobs.map((jobs)=>{
          return(
            <div key={jobs.id}>
              <h4>{jobs.company}</h4>
              <div>
                {jobs.languages.map((language => (
                  <div onClick={()=>addLanguageFilter(language)} key={language}>{language}</div>
                )))}

                {jobs.tools.map((tool)=>(
                  <div onClick={()=>addToolsFilter(tool)} key={tool} >{tool}</div>
                ))}

                <div onClick={()=>addRoleFilter(jobs.role)} >{jobs.role}</div>
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
