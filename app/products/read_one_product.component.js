window.ReadOneProductComponent = React.createClass({
    getInitialState: function() {
    // Get this product fields from the data attributes we set on the
    // #content div, using jQuery
    return {
    	products : [],
        id: 0,
        nama: '',
        alamat: '',
        telepon: '',
        tempat_lahir: '',
        tgl_lahir: ''
    };
},
 
// on mount, read product data and them as this component's state
componentDidMount: function(){
 
    var productId = this.props.productId;
 
    this.serverRequestProd = $.get("http://localhost/reactjs/vendor/slim/slim/customer/" + productId,
        function (product) {
        	this.setState({products: product.customer});
            this.setState({alamat: product.customer[0].alamat});
            this.setState({id: product.customer[0].id});
            this.setState({nama: product.customer[0].nama});
            this.setState({tempat_lahir: product.customer[0].tempat_lahir});
            this.setState({tgl_lahir: product.customer[0].tgl_lahir});
            this.setState({telepon: product.customer[0].telepon});
        }.bind(this));
 
    $('.page-header h1').text('Kembali');
},
 
// on unmount, kill categories fetching in case the request is still pending
componentWillUnmount: function() {
    this.serverRequestProd.abort();
},
 
// render component html will be here
render: function() {
 
    return (
        <div>
            <a href='#'
                onClick={() => this.props.changeAppMode('read')}
                className='btn btn-primary margin-bottom-1em'>
                Read Products
            </a>
 
            <form onSubmit={this.onSave}>
                <table className='table table-bordered table-hover'>
                    <tbody>
                    <tr>
                        <td>Nama</td>
                        <td>{this.state.nama}</td>
                    </tr>
 
                    <tr>
                        <td>Alamat</td>
                        <td>{this.state.alamat}</td>
                    </tr>
 
                    <tr>
                        <td>Tempat Lahir</td>
                        <td>{this.state.tempat_lahir}</td>
                    </tr>
 
                    <tr>
                        <td>Tanggal Lahir</td>
                        <td>{this.state.tgl_lahir}</td>
                    </tr>
                    <tr>
                        <td>Telepon</td>
                        <td>{this.state.telepon}</td>
                    </tr>
 
                    </tbody>
                </table>
            </form>
        </div>
    );
}
});