import { useField } from '../hooks'
import PropTypes from 'prop-types'

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Add new anecdote', content.value, author.value, info.value)
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  const handleReset = (e) => {
    e.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2 className="text-4xl font-bold text-blue-600">Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>content</td>
              <td><input name='content' {...content} /></td>
            </tr>
            <tr>
              <td>author</td>
              <td><input name='author' {...author} /></td>
            </tr>
            <tr>
              <td>url for more info</td>
              <td><input name='info' {...info} /></td>
            </tr>
          </tbody>
        </table>
        <button>create</button>
        <button onClick={handleReset} className="ml-1">reset</button>
      </form>
    </div>
  )
}

export default CreateNew

CreateNew.propTypes = {
  addNew: PropTypes.func.isRequired
}