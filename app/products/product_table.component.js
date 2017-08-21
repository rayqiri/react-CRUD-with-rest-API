window.ProductsTable = React.createClass({
    render: function() {
 
    var rows = this.props.products
        .map(function(product, i) {
            return (
                <ProductRow
                    key={i}
                    product={product}
                    changeAppMode={this.props.changeAppMode} />
            );
        }.bind(this));
 
        return(
            !rows.length
                ? <div className='alert alert-danger'>No products found.</div>
                :
                <table className='table table-bordered table-hover'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Alamat</th>
                            <th>Telp</th>
                            <th>Tempat Lahir</th>
                            <th>Tanggal Lahir</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
        );
    }
});