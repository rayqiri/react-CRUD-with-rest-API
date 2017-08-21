window.UpdateProductComponent = React.createClass({
    // initial component states will be here
    getInitialState: function() {
    // Get this product fields from the data attributes we set on the
    // #content div, using jQuery
    return {
        products: [],
        id: 0,
        name: '',
        alamat: '',
        telepon: '',
        tempat_lahir: '',
        tgl_lahir: '',
        successUpdate: null
    };
},
 
// on mount, fetch all categories and one product data to stored them as this component's state
componentDidMount: function(){
 
    // read categories
    this.serverRequestCat = $.get("http://localhost/reactjs/vendor/slim/slim/customer",
        function (products) {
            this.setState({
                products: products.customer,

            });
        }.bind(this));
 
    // read one product data
    var productId = this.props.productId;
    this.serverRequestProd = $.get("http://localhost/reactjs/vendor/slim/slim/customer/" + productId,
        function (product) {
            this.setState({telepon: product.customer[0].telepon});
            this.setState({id: product.customer[0].id});
            this.setState({nama: product.customer[0].nama});
            this.setState({alamat: product.customer[0].alamat});
            this.setState({tempat_lahir: product.customer[0].tempat_lahir});
            this.setState({tgl_lahir: product.customer[0].tgl_lahir});
        }.bind(this));
 
    $('.page-header h1').text('Update product');
},
 
// on unmount, kill categories fetching in case the request is still pending
componentWillUnmount: function() {
    this.serverRequestCat.abort();
    this.serverRequestProd.abort();
},
 
// handle form field changes here
// handle category change
onAlamatChange: function(e) {
    this.setState({alamat: e.target.value});
},
 
// handle name change
onNamaChange: function(e) {
    this.setState({nama: e.target.value});
},
 
// handle description change
onTempatChange: function(e) {
    this.setState({tempat_lahir: e.target.value});
},
 
// handle price change
onTanggalChange: function(e) {
    this.setState({tgl_lahir: e.target.value});
},
onTeleponChange: function(e) {
    this.setState({telepon: e.target.value});
},
 
// handle save changes button here
onSave: function(e){
 
    // data in the form
    var form_data={
        nama: this.state.nama,
        alamat: this.state.alamat,
        tempat_lahir: this.state.tempat_lahir,
        telepon: this.state.telepon,
        tgl_lahir: this.state.tgl_lahir
    };
 var productId = this.props.productId;
    // submit form data to api
    $.ajax({
        url: "http://localhost/reactjs/vendor/slim/slim/customer/"+productId,
        type : "PUT",
        contentType : 'application/json',
        data : JSON.stringify(form_data),
        success : function(response) {
 
            // api message
            this.setState({successCreation: response['message']});
 
            // empty form
            this.setState({nama: ""});
            this.setState({alamat: ""});
            this.setState({tempat_lahir: ""});
            this.setState({tgl_lahir:""});
            this.setState({telepon:""});
 
        }.bind(this),
        error: function(xhr, resp, text){
            // show error to console
            console.log(xhr, resp, text);
        }
    });
 
    e.preventDefault();
},
render: function() {
 
    // make categories as option for the select tag.
 
    return (
    <div>
        {
 
            this.state.successCreation == "Data Sukses Diupdate" ?
                <div className='alert alert-success'>
                    Data Sukses Diupdate.
                </div>
            : null
        }
 
        {
 
            this.state.successCreation == "Tidak dapat menyimpan data Customer" ?
                <div className='alert alert-danger'>
                   Data Gagal Diupdate. Please try again.
                </div>
            : null
        }
 
        <a href='#'
            onClick={() => this.props.changeAppMode('read')}
            className='btn btn-primary margin-bottom-1em'> Read Products
        </a>
 
 
        <form onSubmit={this.onSave}>
            <table className='table table-bordered table-hover'>
            <tbody>
                <tr>
                    <td>Nama</td>
                    <td>
                        <input
                        type='text'
                        className='form-control'
                        value={this.state.nama}
                        required
                        onChange={this.onNamaChange} />
                    </td>
                </tr>
 
                <tr>
                    <td>Alamat</td>
                    <td>
                        <textarea
                        type='text'
                        className='form-control'
                        required
                        value={this.state.alamat}
                        onChange={this.onAlamatChange}>
                        </textarea>
                    </td>
                </tr>
 
                <tr>
                    <td>Tempat Lahir</td>
                    <td>
                        <input
                        type='text'
                        className='form-control'
                        value={this.state.tempat_lahir}
                        required
                        onChange={this.onTempatChange}/>
                    </td>
                </tr>
                <tr>
                    <td>Tanggal Lahir</td>
                    <td>
                        <input
                        type='text'
                        className='form-control'
                        value={this.state.tgl_lahir}
                        required
                        onChange={this.onTanggalChange}/>
                    </td>
                </tr>
                <tr>
                    <td>Telepon</td>
                    <td>
                        <input
                        type='text'
                        className='form-control'
                        value={this.state.telepon}
                        required
                        onChange={this.onTeleponChange}/>
                    </td>
                </tr>
 
                <tr>
                    <td></td>
                    <td>
                        <button
                        className='btn btn-primary'
                        onClick={this.onSave}>Update</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </form>
    </div>
    );
}
});