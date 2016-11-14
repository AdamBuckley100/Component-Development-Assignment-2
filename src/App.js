import React from 'react';
import './App.css' ;
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
                   <option value="release-year">Oldest First</option>
               </select>
                 </div>
                );
              }
           });

     var ProductItem = React.createClass({
          render: function(){
               return (
              <li className="thumbnail product-listing">
                <a href={'/products/' + this.props.product.id} className="thumb">
                     <img src={this.props.product.imageUrl} 
                     alt={this.props.product.name} /> </a>
                <a href={'/products/' + this.props.product.id}> {this.props.product.name}</a>
                <p>{this.props.product.snippet}</p>
              </li>
                ) ;
             }
         }) ;

   var FilteredProductList = React.createClass({
        render: function(){
            var displayedProducts = this.props.products.map(function(product) {
              return <ProductItem key={product.id} product={product} /> ;
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
     getInitialState: function() {
           return { search: '', sort: 'name' } ;
      }, 
     handleChange : function(type,value) {
            if ( type === 'search' ) {
                this.setState( { search: value } ) ;
              } else {
                 this.setState( { sort: value } ) ;
              }
      }, 
       render: function(){
         console.log('Criteria: Search= ' + this.state.search + 
                     ' ; Sort= ' + this.state.sort);
           var list = this.props.products.filter(function(p) {
                  return p.name.toLowerCase().search(
                         this.state.search.toLowerCase() ) !== -1 ;
                    }.bind(this) );
           var filteredList = _.sortBy(list, this.state.sort) ;
           return (
              <div className="view-container">
              <div className="view-frame">
                 <div className="container-fluid">
                   <div className="row">
                      <SelectBox onUserInput={this.handleChange } 
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