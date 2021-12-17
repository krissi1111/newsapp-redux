

const APIUrl = 'http://localhost:5000/news/search'

export const getToken = () => {
  let token = localStorage.getItem('token')
  return token
}

export const fetcher = (method, body) => {
  return fetch(APIUrl,{
    method: method,
    body: body
  })
}


export default getToken