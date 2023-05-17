const e = React.createElement;

class Book extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            book : {

            },
            reviews : [

            ]
        };
    }

    getBookId() {
        let queryString = window.location.search;
        let urlParams = new URLSearchParams(queryString);

        return urlParams.get("book");
    }

    componentDidMount() {
        let bookId = this.getBookId();
        fetch('http://127.0.0.1:3001/books/' + bookId)
            .then(response => response.json())
            .then(json => {
                let book = json[0];
                this.setState({book : book});

                fetch('http://127.0.0.1:3001/books/' + book.id + '/reviews')
                    .then(response => response.json())
                    .then(json => {

                        json.map((review) => {
                            fetch('http://127.0.0.1:3001/book-reviews/' + review.id)
                                .then(response =>response.json())
                                .then(json => {
                                    review.author = json.user.firstName + ' ' + json.user.lastName;
                                    let stateReviews = this.state.reviews;
                                    stateReviews.push(review);
                                    this.setState({ reviews : stateReviews });
                                })
                        });
                    })
            })
    }

    render() {

        let reviews = this.state.reviews.map((review) =>
            <tr key={review.id}>
                <td>
                    { review.id }
                </td>
                <td>
                    { review.title }
                </td>
                <td>
                    { review.author }
                </td>
                <td>
                    { review.stars }
                </td>
                <td>
                    <a href={"book-review.html?book-review="+ review.id} className="btn btn-primary mx-1"><span className="bi-eye"></span></a>
                    <a href="#" data-review-id={review.id} className="del-review-btn btn btn-danger mx-1"><span className="bi-trash3"></span></a>
                </td>
            </tr>
        );

        return (
            <React.Fragment>
                <nav aria-label="breadcrumb my-2">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="books.html">Books</a></li>
                        <li className="breadcrumb-item active" aria-current="page">{this.state.book.title}</li>
                    </ol>
                </nav>
                <h1 className="my-3">
                    { this.state.book.title }
                </h1>
                <h2 className="my-2">
                    { this.state.book.author }
                </h2>
                <p className="my-1">
                    { this.state.book.description }
                </p>
                <p className="my-1">
                    { this.state.book.publishedYear }
                </p>
                <h3 className="my-3">Reviews</h3>
                <table className="table">
                    <thead>
                    <tr>
                        <th>
                            #
                        </th>
                        <th>
                            Title
                        </th>
                        <th>
                            Author
                        </th>
                        <th>
                            Stars
                        </th>
                        <th>
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                        { reviews }
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}

const domContainer = document.querySelector('#book');
ReactDOM.render(e(Book), domContainer);