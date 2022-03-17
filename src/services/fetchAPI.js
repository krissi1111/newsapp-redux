
const port = process.env.REACT_APP_BACKEND_PORT
const APIUrl = 'http://127.0.0.1:'+port+'/'

export const getToken = () => {
  let token = localStorage.getItem('token')
  return 'Bearer ' + token
}

export const fetcher = (method, URL, body, auth=false) => {
  let authHeader = ''
  if(auth) {
    let tokenHeader = getToken()
    authHeader = tokenHeader
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
  },
  getPopular: () => {
    return fetcher('GET', 'news/popularComments')
  },
  addNews: () => {
    return fetcher('GET', 'news/add', null, true)
  },
  delete: (form) => {
    return fetcher('POST', 'news/delete', form, true)
  },
  getFeeds: (form) => {
    return fetcher('POST', 'news/feeds', form, true)
  }
}

export const Comments = {
  getList: (form) => {
    return fetcher('POST', 'news/commentList', form, true)
  },
  add: (form) => {
    return fetcher('POST', 'comment/addComment', form, true)
  },
  delete: (form) => {
    return fetcher('POST', 'comment/deleteComment', form, true)
  },
  deleteReply: (form) => {
    return fetcher('POST', 'comment/deleteReply', form, true)
  },
  restore: (form) => {
    return fetcher('POST', 'comment/restoreComment', form, true)
  },
  restoreReply: (form) => {
    return fetcher('POST', 'comment/restoreReply', form, true)
  },
  edit: (form) => {
    return fetcher('PATCH', 'comment/editComment', form, true)
  },
  editReply: (form) => {
    return fetcher('PATCH', 'comment/editReply', form, true)
  }
}

export const Reply = {
  add: (form) => {
    return fetcher('POST', 'comment/addReply', form, true)
  },
  delete: (form) => {
    return fetcher('POST', 'comment/deleteReply', form, true)
  },
  edit: (form) => {
    return fetcher('PATCH', 'comment/editReply', form, true)
  }
}

export const Favorite = {
  addRemove: (form) => {
    return fetcher('POST', 'news/favAddRemove', form, true)
  },
  userFavs: () => {
    return fetcher('GET', 'news/userFav', null, true)
  }
}

export default getToken