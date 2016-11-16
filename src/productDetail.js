import React from 'react';
import request from 'superagent' ; 

  var Specification = React.createClass({
	  
      render: function(){
	  
          var product = this.props.product ; 
          			
          var display = (
		
		  
              <div>
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
	   
       componentDidMount: function() {
		   
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
            </div>
            );
      }
    });

    export default ProductDetail;