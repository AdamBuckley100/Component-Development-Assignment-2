    import React from 'react';
	import './App.css';
	import _ from 'lodash';
	   
  var SelectBox = React.createClass({
	  
      handleChange : function(e, type,value) {
           e.preventDefault();
           this.props.onUserInput( type,value);
      },
	  
      handleTextChange : function(e) {
          this.handleChange( e, 'search', e.target.value);
      },
	  
      handleSortChange : function(e) {
          this.handleChange(e, 'sort', e.target.value);
      },
	  
      render: function(){
          return (
                <div className="col-md-10">
               <input type="text" placeholder="Search" 
                          value={this.props.filterText}
                          onChange={this.handleTextChange} />
						  
                    Sort by:
                  <select id="sort" value={this.props.order } 
                         onChange={this.handleSortChange} >
						 
                       <option value="name">Alphabetical (ascending)</option>
                       <option value="age">Newest First</option>
					   
                     </select>
             </div>
               );
          }
       });
	   
       var Product = React.createClass({
		   render: function(){
			   return (
			   
			<li class="thumbnail product-listing">

            <a href={this.props.oneSingleProduct.imageUrl} class="thumb"> 
			
            <img src={this.props.oneSingleProduct.imageUrl} alt={this.props.oneSingleProduct.name} /> </a>
			   
			<a href={this.props.oneSingleProduct.id}> {this.props.oneSingleProduct.name} </a>
				
            <p>{this.props.oneSingleProduct.snippet}</p>
			
			</li>
			   
			   );
		   }
	   });

       var FilteredProductList = React.createClass({
            render: function(){
                var displayedProducts = this.props.products.map( product => {
                  return <Product key={product.id} oneSingleProduct={product} /> ;
                }) ;
                return (
                        <div className="col-md-10">
                          <ul className="products">
                              {displayedProducts}
                          </ul>
                        </div>
                  ) ;
            }
        });

    var ProductCatalogueApp = React.createClass({
		
	  getInitialState: function()
	  {
           return { search: '', sort: 'name' } ;
      },
		
      handleChange : function(type,value) {
		  
        if ( type == 'search' ) {
            this.setState( { search: value } ) ;
          } else {
             this.setState( { sort: value } ) ;
          }
      }, 
	  
      render: function(){
         console.log('Criteria: Search= ' + this.state.search + 
                     ' ; Sort= ' + this.state.sort);
		 
		  var list = this.props.products.filter(function(p) {
          return p.name.toLowerCase().search( this.state.search.toLowerCase() ) != -1 ;
                    }.bind(this) );
            var filteredList = _.sortBy(list, this.state.sort) ; {/*  .sortBy is from lodash*/}
		 
         return (
              <div className="view-container">
              <div className="view-frame">
                 <div className="container-fluid">
                 <div className="row">
				 
                    <SelectBox onUserInput={this.handleChange} 
                           filterText={this.state.search} 
                           sort={this.state.sort} />
                     <FilteredProductList products={filteredList} />
					 
                </div> 
                </div>                   
              </div>
            </div>
        );
      }
  });

export default ProductCatalogueApp;