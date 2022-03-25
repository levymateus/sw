import List from './list.js'
import API from './api.js'
import start from './bootstrap.js'

const url = 'https://countries.trevorblades.com/'

const QUERY = `
  query select {
    countries {
      code
      name
    }
  }
`

function app () {
  const api = API(url)

  let loading = false
  const list = List()

  function handleQuery({ fetching }) {
    loading = fetching
    if (loading) {
      document.getElementById('status').innerHTML = 'Loading ...'
    } else {
      document.getElementById('status').innerHTML = ''
    }
  }

  const queryOpts = { callback: handleQuery }

  const fetch = () => api.query(QUERY, queryOpts).then(({ data }) => {
    list.concat(data.data?.countries.map(item => item.name))
  })
  const refetch = fetch

  fetch()

  document.getElementById('refetch').addEventListener('click', refetch)
}

start(app)
