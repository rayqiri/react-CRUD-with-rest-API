window.CreateProductComponent = React.createClass({
    getInitialState: function() {
    return {
        nama: '',
        alamat: '',
        telepon: '',
        tempat_lahir: '',
        tgl_lahir: '',
        successCreation: null
    };
},
 
// on mount, get all categories and store them in this component's state

 
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

onSave: function(e){
 
    // data in the form
    var form_data={
        nama: this.state.nama,
        alamat: this.state.alamat,
        tempat_lahir: this.state.tempat_lahir,
        telepon: this.state.telepon,
        tgl_lahir: this.state.tgl_lahir
    };
 
    // submit form data to api
    $.ajax({
        url: "http://localhost/reactjs/vendor/slim/slim/customer",
        type : "POST",
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
 
            this.state.successCreation == "Data Customer Tersimpan" ?
                <div className='alert alert-success'>
                    Data Customer Tersimpan.
                </div>
            : null
        }
 
        {
 
            this.state.successCreation == "Tidak dapat menyimpan data Customer" ?
                <div className='alert alert-danger'>
                    Tidak dapat menyimpan data Customer. Please try again.
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
                    <td>Tempat Lahir</td>
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
                        onClick={this.onSave}>Save</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </form>
    </div>
    );
}

});