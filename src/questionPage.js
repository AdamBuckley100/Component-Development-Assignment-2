    import React from 'react';
    import _ from 'lodash';
    import api from './stubAPIQuestions/stubAPI';

    var Form = React.createClass({
		
       getInitialState: function() {
           return { question: '', name: ''};
        },
		
        handleQuestionChange: function(e) {
             this.setState({question : e.target.value});
         },
		 
         handleNameChange: function(e) {
             this.setState({name: e.target.value});
         },
		 
         onSubmit : function(e) {
              e.preventDefault();
              var question = this.state.question.trim();
              var name = this.state.name.trim();
              if (!question ) {
                  return;
              }
              this.props.questionHandler(question ,name );
              this.setState({question: '', name: ''});
         },
		 
        render : function() {
             return (
               <form  style={{marginTop: '30px'}}>
                <h3>Add a new question</h3>

                <div className="form-group">
                  <input type="text"  className="form-control"
                        placeholder="question" value={this.state.question}
                        onChange={this.handlequestionChange} ></input>
                </div>     
                <div className="form-group">
                  <input type="text"  className="form-control"
                        placeholder="Your name" value={this.state.name}
                        onChange={this.handleNameChange} ></input>
                </div>
                <button type="submit" className="btn btn-primary"
                        onClick={this.onSubmit}>Submit</button>
              </form>
              );
          }
       });

    var Question = React.createClass({
        handleVote : function() {
             this.props.upvoteHandler(this.props.question.id);
        },
        render : function() {
            var lineStyle = {
                 fontSize: '20px', marginLeft: '10px'  };
            return (
               <div>
                  <span className="glyphicon glyphicon-thumbs-up"
                        onClick={this.handleVote}></span>
                    {this.props.question.upvotes} - by {this.props.question.author}
                  <span style={lineStyle} >
                    {this.props.question.question}
                  </span>
                </div>                
               );
          }
     }) ;

    var QuestionList = React.createClass({
		
        render : function() {
          var items = this.props.questions.map(function(question,index) {
                 return <Question key={index} question={question} 
                          upvoteHandler={this.props.upvoteHandler}  /> ;
             }.bind(this) )
          return (
                <div>
                  {items}
                </div>
            );
        }
    }) ;  

    var QuestionView = React.createClass({
		
        addQuestion : function(c,n) {
          var pid = parseInt( this.props.params.postId, 10);
          api.addQuestion(pid,c,n);
          this.setState({});
      }, 
	  
      incrementUpvote : function(questionId) {
             var pid = parseInt( this.props.params.postId, 10);
            api.upvoteQuestion(pid, questionId) ;
           this.setState({});
      },    
	  
      render: function(){
             var pid = parseInt(this.props.params.postId,10) ;
           var post = api.getPost( pid);
           var line = null ;
           if (post.link ) {
               line = <a href={post.link} >
                            {post.title} </a> ;
            } else {
               line = <span>{post.title} </span> ;
            }
          var questions = _.sortBy(post.questions, function(question) {
                                 return - question.upvotes;
                            }
                    ); 
          return (  
             <div >
               <h3>{line} </h3>
               <QuestionList questions={questions} 
                   upvoteHandler={this.incrementUpvote } />
               <Form post={post}  questionHandler={this.addQuestion} /> 
             </div>
          );
      }
    });

    export default QuestionView;