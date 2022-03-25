const API = (url) => {
  const cacheName = location.hostname

  async function query(query, { callback }) {

    let data = null
    let fetching = true
    let error = null

    const handleResponse = response => {
      fetching = false

      if (response) {
        if (!response.ok) {
          error = new Error(response.statusText)
          callback({ data, fetching, error })
          return error
        }
      }

      return response.json()
    }

    const handleData = data => {
      callback({ data, error, fetching })
      return { data, error, fetching }
    }

    caches.open(cacheName).then(cache => {
      cache.match(url).then((cachedResponse) => {
        if (!cachedResponse) {
          callback({ data, fetching, error })
        }
      })
    })

    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: "force-cache",
      body: JSON.stringify({ query }),
    }).then(handleResponse).then(handleData)
  }

  return { query }
}

export default API
