
import React,{useState} from 'react'
import {ReactQueryDevtools}  from "react-query/devtools"
import { QueryClient, QueryClientProvider } from 'react-query'
import { ParentComponent } from '../types/Props'
import { useNavigate } from 'react-router-dom'
import { isAxiosError } from 'axios'


const ReactQueryClientProvider : React.FC<ParentComponent> = ({children}) => {
  const navigate = useNavigate()
  const client = new QueryClient({
    defaultOptions : {
      queries : {
        refetchOnWindowFocus : false,
        retry : false,
        onError(err){
          if(isAxiosError(err)){
            if(err.response?.status == 401) {
              return navigate("/login");
            }
          }
        },
      },
      mutations : {
        retry : false,
        onError(err){
          if(isAxiosError(err)){
            if(err.response?.status == 401) {
              return navigate("/login");
            }
          }
        }
      }
    }
  })


  return (
    <QueryClientProvider  client={client}>
      <ReactQueryDevtools position='bottom-right' />
      {children}
    </QueryClientProvider>
  )
}

export default ReactQueryClientProvider