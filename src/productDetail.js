import React from 'react';
import request from 'superagent' ; 
import api from './stubAPIQuestions/stubAPI';
import { Link } from 'react-router';
import _ from 'lodash';
import './App.css';

  var Specification = React.createClass({
	  
      render: function(){
	  
          var product = this.props.product ; 
          			
          var display = (
	
              <div>
			  <Link to={'/'}> Home </Link>
			  
			  	 <h1>{this.props.product.name} Details</h1>
			  
			  <br>
			  </br>
			  <br>
			  </br>
			  
                 <ul className="specs">
                  
				  <li>
                    <dl>
                      <dt>Official Product Name</dt>
                         {product.name}
                    </dl>
                  </li>
				  
				  <li>
                    <dl>
                      <dt>Release Year</dt>
                         {product.releaseYear}
                    </dl>
                  </li>

				  <li>
                    <dl>
                      <dt>Version</dt>
                         {product.version}
                    </dl>
                  </li>
				  <br></br>
				  
				  <li>
                    <dl>
                      <dt>RAM</dt>
                         {product.ram}
                    </dl>
                  </li>
				  
				  <li>
                    <dl>
                      <dt>Manufacturer</dt>
                         {product.manufacturer}
                    </dl>
                  </li>
				  
				  <li>
                    <dl>
                      <dt>Weight</dt>
                         {product.weight}
                    </dl>
                  </li>
				  
                  </ul> 

					<br>
					</br>
            </div>
           )
            return (
			
                 <div>
                  {display}
              </div>
			  
             );
      }
  });
  
  	var Form = React.createClass({

       getInitialState: function() {
           return { query: '', subject: ''};
        },
		
		handleSubjectChange: function(e) {
           this.setState({subject: e.target.value});
       },
		
       handleQueryChange: function(e) {
           this.setState({query: e.target.value});
       },
	   
	    handleSubmit: function(e) { {/* submit is the add button! */}
        e.preventDefault();
	    var subject = this.state.subject.trim();
        var query = this.state.query.trim();
        if (!query ) {
          return;
        }
        this.props.addHandler(subject,query);
        this.setState({subject: '', query: ''});
       }, 
		
        render : function() {
           return (
		   
             <form style={{marginTop: '30px'}}>
			  
                <h3>Ask A Question about the item for sale:</h3>
				
                <div className="form-group">
				
				<input type="text" className="form-control" placeholder="Subject" value={this.state.subject} onChange={this.handleSubjectChange}>
				  
				  </input>
                
				</div>
				
                <div className="form-group">
				
                  <input type="text" className="form-control" placeholder="Query" value={this.state.query} onChange={this.handleQueryChange}>
				  
				  </input>
				  
                </div>
				
                <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit Question</button>
				
              </form>
			  
            );
			
          }
		  
       });
	   
    var QuestionItem = React.createClass({
		
			getInitialState : function() {
               return {
                status : '',
				subject: this.props.question.subject,
                query: this.props.question.addess,
               } ;
            },
			
		handleVote : function() {
          this.props.upvoteHandler(this.props.post.id);
        },
		
        render : function() {
			
            var lineStyle = {
                 fontSize: '20px', marginLeft: '10px'  };
            var cursor = { cursor: 'pointer' } ;

			var line ;
			
               line = <span>

			   <li>
			   <dl>
			   <dt>Question Regarding {this.props.question.subject}</dt>
			   {this.props.question.query}
			   </dl>
			   </li>
			   <br></br>

			   </span>;
			   
            return (
              <div >
   
                <span style={lineStyle}> {line} <span>
   <Link to={'/questions/' + this.props.question.id }>Answers</Link>
                  </span>
                </span>
              </div>  
        );
        }
       }) ;
	   
	  var QuestionList = React.createClass({
        render : function() {
          var items = this.props.questions.map(function(question,index) {
             return <QuestionItem key={index} question={question} 
						addHandler={this.props.addHandler} /> ;
            }.bind(this) )
          return (
            <div>
                  {items}
                  </div>
            );
        }
    }) ; 
	   
    var ImagesSection = React.createClass({
      render: function(){
		  
            var thumbImages = this.props.product.images.map(function(img,index) {
				
              return (
                  <li>
				  <br>
				  </br>
				  <br>
				  </br>
                   <img key={index} src={"/productSpecs/" + img} alt="missing" />
				  <br>
				  </br>	
				  <br>
				  </br>
                  </li>
                );
                });
				
              return (
			  
                  <div>
			  	 <p><b>Photos Of {this.props.product.name}:</b></p>
				 <br></br>
                   <ul className="product-thumbs">
                       {thumbImages}
                   </ul>
                  </div>
                  );
          }
    })

    var ProductDetail = React.createClass({
		
       getInitialState: function() {
           return { product: null };
       },
	   
	   		 addQuestion : function(t,l) {
            if (api.add(t,l)) {
             this.setState({});
			}
          },
	   
       componentDidMount: function() {
		   

		   var url = '/theJsonFiles/' + this.props.params.id + '.json';
		   console.log("mmmmmmmmmmmm" + url);
		   
		   
          request.get(
             url, function(err, res) {
                 window.resp = res;
				 
				 
				 var json = JSON.parse(res.text);
                if (this.isMounted()) {
                    this.setState({ product : json});
          }
        }.bind(this));
      } ,
	  
      render: function(){	  

		 var questions = _.sortBy(api.getAll(), function(question) {
         return - question;
             }
          );
	  
		var display;

            var product = this.state.product ;
			
				if (product)
				{
				display =  (
                <div>
				   <Specification  product={product} />
                   <ImagesSection product={product} />  
                </div>
                ) ;
             }
			 
			 else
			 {
			display = <p>No product details</p> ; 
			 }
			 
            return (
                <div>
				{display}
				<QuestionList questions={questions} />
               <Form addHandler={this.addQuestion}  />
            </div>
            );
      }
    });

    export default ProductDetail;