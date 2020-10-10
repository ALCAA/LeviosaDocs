import React from 'react'
import TopBar from '../components/TopBar/TopBar'
import ItemBar from '../components/ItemBar/ItemBar'
import Editor from '../components/Editor/Editor'
import UserBubble from '../components/UserBubble/UserBubble'
import '../App.css'

class Documents extends React.Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <TopBar username={this.props.location.username} doctitle={this.props.location.doctitle} />
          <ItemBar />
        </header>
        <div className='App-body'>
          <Editor />
          <UserBubble/>
        </div>
      </div>
    )
  }
}

export default Documents
