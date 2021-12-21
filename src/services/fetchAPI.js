

const APIUrl = 'http://localhost:5000/'

export const getToken = () => {
  let token = localStorage.getItem('token')
  return token
}

export const fetcher = (method, URL, body, auth=false) => {
  let authHeader = ''
  if(auth) {
    let token = getToken()
    authHeader = 'Bearer ' + token
  }
  return fetch(APIUrl+URL,{
    method: method,
    body: body,
    headers: {
      'Authorization': authHeader
    }
  })
}

export const Auth = {
  status: () => {
    return fetcher('POST', 'user/status', null, true)
  },
  login: (form) => {
    return fetcher('POST', 'user/login', form)
  },
  register: (form) => {
    return fetcher('POST', 'user/register', form)
  },
  registerAdmin: (form) => {
    return fetcher('POST', 'user/register', form, true)
  }
}

export const News = {
  getAll: () => {
    return fetcher('GET', 'news')
  },
  getSearch: (form) => {
    return fetcher('POST', 'news/search', form)
  }
}

export const Comments = {
  getList: (form) => {
    return fetcher('POST', 'comment/commentList', form, false)
  },
  add: (form) => {
    return fetcher('POST', 'comment/addComment', form, true)
  },
  delete: (form) => {
    return fetcher('POST', 'comment/deleteComment', form, true)
  },
  edit: (form) => {
    return fetcher('PATCH', 'comment/editComment', form, true)
  }
}

export default getToken