import React, { Component} from "react";
import { Link } from "react-router-dom";
//import config from '../../config'
//import TokenService from '../../Services/token-service'
import TopicsApiService from '../../Services/topics-api-service'
import NoteListPage from '../NotesPage/NotesListPage';
import slugify from 'slugify';
//import Nav from '../Nav/Nav'

/*
TopicsList maps over NotesListPage component showing all of a users topics
*/
class TopicsList extends Component {
  state = {
    topics: [],
    
  };
  
    

   componentDidMount() {
     TopicsApiService.getTopics()
     .then(data =>{
      data.map(each=>each.slug=slugify(`${each.topic_name}`))
      this.setState({ topics: data })});

    
       
  }

  render() {
    document.title = "Topics Dashboard - Overlays";
    return (
      
      <>
        
        
        <Link to="/submit"><i className="fas fa-plus-square"></i>Submit New Topic

 </Link>
              <h2>YOUR TOPICS</h2>

        {this.state.topics.map( topic => {

        return <NoteListPage key={topic.id} history={this.props.history} topic={topic}/> })}
      
        </> ) 



        
}
}

export default TopicsList;
