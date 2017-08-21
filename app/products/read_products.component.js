window.ReadProductsComponent = React.createClass({
    getInitialState: function() {
        return {
            products: []
        };
    },
componentDidMount: function(){
	this.serverRequest = $.get("http://localhost/reactjs/vendor/slim/slim/customer", function(data){
        //console.log(data.customer);
		this.setState  ({products : data.customer});
	}.bind(this));
},
componentWillUnmount: function() {
        this.serverRequest.abort();
    },
     render: function() {
        // list of products
        var filteredProducts = this.state.products;
        console.log(filteredProducts);
        $('.page-header h1').text('Read Products');
 
        return (
            <div className='overflow-hidden'>
                <TopActionsComponent changeAppMode={this.props.changeAppMode} />
 
                <ProductsTable
                    products={filteredProducts}
                    changeAppMode={this.props.changeAppMode} />
            </div>
        );
    }
});