    import React from 'react';
	{/* import './App.css' */}

    var SelectBox = React.createClass({
      render: function(){
           return (
             <div className="col-md-10">
            <input type="text" placeholder="Search" />
            Sort by:
            <select>
              <option value="name">Alphabetical</option>
              <option value="age">Newest</option>
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
      render: function(){
          return (
              <div className="view-container">
              <div className="view-frame">
                 <div className="container-fluid">
                   <div className="row">
                       <SelectBox />
                       <FilteredProductList products={this.props.products}  />
						</div>
                  </div>                   
                </div>
              </div>
          );
      }
    });

export default ProductCatalogueApp;