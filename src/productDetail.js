    import React from 'react';
    import request from 'superagent' ; 

  var Specification = React.createClass({
      render: function(){
	  
          var product = this.props.product ; 
          			
          var display = (
              <div>
                 <ul className="specs">
                  <li >
				    <span>Display</span>
					
					
					<span>Display</span>
                    <span>Basic Information:</span>
                    <dl>
                      <dt>{product.description}</dt>
                    </dl>
                  </li>
                  <li>
                    <dl>
                      <dt>Release Year:</dt>
                      <dd>{product.manufacturer}</dd>
                    </dl>
                  </li>    
				  
                  </ul>            
            </div>
           )
            return (
                 <div>
                  {display}
              </div>
             );
      }
  });

    var ImagesSection = React.createClass({
      render: function(){
		  
            var thumbImages = this.props.product.images.map(function(img,index) {
              return (
                  <li>
                   <img key={index} src={"/productSpecs/" + img}
                       alt="missing" />
                </li>
                ) ;
                } );
				

			
              return (
                  <div>
                   <h1>{this.props.product.name} Details</h1>
                   <p>{this.props.product.description}</p>
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
	   
       componentDidMount: function() {
		   console.log("Checking........" + this.props.params.id);
		   
		   var url = '/theJsonFiles/' + this.props.params.id + '.json';
		   console.log(url);
		   
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
//console.log(product);
var display;

            var product = this.state.product ;
          if (product)
		  {
           display =  (
                <div>
                   <ImagesSection product={product} />
                   <Specification  product={product} />       
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
            </div>
            );
      }
    });

    export default ProductDetail;