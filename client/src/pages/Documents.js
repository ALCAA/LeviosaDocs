import React from 'react'
import TopBar from '../components/TopBar/TopBar'
import ItemBar from '../components/ItemBar/ItemBar'
import Editor from '../components/Editor/Editor'
import '../App.css'

class Documents extends React.Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <TopBar username={this.props.location.username} />
          <ItemBar />
        </header>
        <div className='App-body'>
          <Editor />
        </div>
      </div>
    )
  }
}

export default Documents
