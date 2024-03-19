import { useState } from 'react'
import { Routes, Route, Link, useMatch, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import CreateNew from './components/createForm'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div className="mb-10">
      <a href='/' style={padding}>anecdotes</a>
      <a href='/create' style={padding}>create new</a>
      <a href='/about' style={padding}>about</a>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2 className="text-4xl font-bold text-blue-600">Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
        {
          return <li key={anecdote.id} ><Link to={`/anecdotes/${anecdote.id}` }>{anecdote.content}</Link> </li>
        }
      )}
    </ul>
  </div>
)

const Anecdote = ({anecdote}) => {
  if (!anecdote) {
    return (
      <div className="text-red-600">
        Anecdote not found
      </div>
    )
  }
  return (
    <div>
      <h2>`<span className="italic">{anecdote.content}</span> by <span className="text-sm">{anecdote.author}</span>`</h2>
      <div>has {anecdote.votes} votes</div>
      <div className="skew-y-1">for more info see <a href={anecdote.info}>{anecdote.info}</a></div>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is &quot;a story with a point.&quot;</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div className="mt-10">
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const Notification = ({notification}) => {
  if (!notification) return
  return (
    <div className="bg-blue-100 border border-blue-400 text-blue-700 px-8 animate-pulse py-3 rounded absolute top-10 right-10 height-100">
      <h2>{notification}</h2>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])
  const [notification, setNotification] = useState('')
  const anecdoteById = (id) => {
    console.log('anecdoteById() id:', id)
    if (!id) return null
    return anecdotes.find(a => a.id === Number(id))
  }

  const navigate = useNavigate()
  const match = useMatch('/anecdotes/:id')
  const anecdote = match ? anecdoteById(match.params.id) : null

  const addNew = (anecdote) => {
    if (!anecdote) {
      console.error('Anecdote not found')
      setNotification('Anecdote not found')
      return
    }
    if (!anecdote.content) {
      console.error('Anecdote content cannot be empty')
      setNotification('Anecdote content cannot be empty')
      return
    }
    if (!anecdote.author) {
      console.error('Anecdote author cannot be empty')
      setNotification('Anecdote author cannot be empty')
      return
    }

    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    console.log('addNew() anecdote:', anecdote)
    setNotification(`a new anecdote ${anecdote.content} created`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
    navigate('/')
  }

  const vote = (id) => {
    if (!id) {
      console.error('Id not found')
      return
    }
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div className="m-12">
      <Notification notification={notification} />
      <h1 className="text-5xl font-bold text-blue-300">Software anecdotes</h1>
      <Menu />
      <Routes>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path='/create' element={<CreateNew addNew={addNew} />} />
        <Route path='/about' element={<About />} />
        <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App

AnecdoteList.propTypes = {
  anecdotes: PropTypes.array.isRequired
}
Anecdote.propTypes = {
  anecdote: PropTypes.object
}
CreateNew.propTypes = {
  addNew: PropTypes.func.isRequired
}
Notification.propTypes = {
  notification: PropTypes.string
}
