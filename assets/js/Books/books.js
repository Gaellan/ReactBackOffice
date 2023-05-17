const e = React.createElement;

class BooksList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books : []
        };
    }

    componentDidMount() {
        fetch('http://127.0.0.1:3001/books')
            .then(response => response.json())
            .then(json => {
                this.setState({books : json})
            })
    }

    render() {

        let books = this.state.books.map((book) =>
        <tr key={book.id}>
            <td>
                { book.id }
            </td>
            <td>
                { book.title }
            </td>
            <td>
                { book.publishedYear }
            </td>
            <td>
                { book.author }
            </td>
            <td>
                <a href={"book.html?book=" + book.id} className="btn btn-primary mx-1"><span className="bi-eye"></span></a>
                <a href={"edit-book.html?book=" + book.id} className="btn btn-success mx-1"><span className="bi-pencil"></span></a>
                <a href="#" data-book-id={book.id} className="del-book-btn btn btn-danger mx-1"><span className="bi-trash3"></span></a>
            </td>
        </tr>
        );

        return (
            <React.Fragment>
                <h1 className="mb-3">Books</h1>
                <a className="btn btn-primary" href=""><span className="bi-plus-square"></span> Create a book</a>
                <table className="table mt-5">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Publication Year</th>
                        <th>Author</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        { books }
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}

const domContainer = document.querySelector('#books');
ReactDOM.render(e(BooksList), domContainer);