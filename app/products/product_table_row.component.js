window.ProductRow = React.createClass({
    render: function() {
    return (
        <tr>
            <td>{this.props.product.nama}</td>
            <td>{this.props.product.alamat}</td>
            <td>{this.props.product.telepon}</td>
            <td>{this.props.product.tempat_lahir}</td>
            <td>{this.props.product.tgl_lahir}</td>
            <td>
                <a href='#'
                    onClick={() => this.props.changeAppMode('readOne', this.props.product.id)}
                    className='btn btn-info m-r-1em'> Read One
                </a>
                <a href='#'
                    onClick={() => this.props.changeAppMode('update', this.props.product.id)}
                    className='btn btn-primary m-r-1em'> Edit
                </a>
                <a
                    onClick={() => this.props.changeAppMode('delete', this.props.product.id)}
                    className='btn btn-danger'> Delete
                </a>
            </td>
        </tr>
        );
    }
});