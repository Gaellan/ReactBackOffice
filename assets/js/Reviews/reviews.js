const e = React.createElement;

class ReviewsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews : []
        };
    }

    componentDidMount() {
        fetch('http://127.0.0.1:3001/reviews')
            .then(response => response.json())
            .then(json => {
                this.setState({users : json})
            })
    }

    render() {

        let users = this.state.users.map((user) =>
            <tr key={user.id}>
                <td>
                    { user.id }
                </td>
                <td>
                    { user.firstName } {user.lastName}
                </td>
                <td>
                    { user.email }
                </td>
                <td>
                    { user.role }
                </td>
                <td>
                    <a href="" className="btn btn-success mx-1"><span className="bi-pencil"></span></a>
                    <a href="" className="btn btn-danger mx-1"><span className="bi-trash3"></span></a>
                </td>
            </tr>
        );

        return (
            <React.Fragment>
                <h1 className="mb-3">Users</h1>
                <a className="btn btn-primary" href=""><span className="bi-plus-square"></span> Create a user</a>
                <table className="table mt-5">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    { users }
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}

const domContainer = document.querySelector('#reviews');
ReactDOM.render(e(ReviewsList), domContainer);