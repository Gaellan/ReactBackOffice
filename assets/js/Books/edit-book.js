const e = React.createElement;

class EditBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            book : {
                title : "",
                description : "",
                publishedYear : -1,
                author: ""
            },
            modifiedBook : {

            }
        };

        this.updateTitle = this.updateTitle.bind(this);
        this.updateDescription = this.updateDescription.bind(this);
        this.updateYear = this.updateYear.bind(this);
        this.updateAuthor = this.updateAuthor.bind(this);
        this.submit = this.submit.bind(this);
    }

    updateTitle(event) {
        let modifiedBook = this.state.modifiedBook;
        let book = this.state.book;
        book.title = event.target.value;
        modifiedBook.title = event.target.value;
        this.setState({modifiedBook : modifiedBook, book : book});
    }

    updateDescription(event) {
        let modifiedBook = this.state.modifiedBook;
        let book = this.state.book;
        book.description = event.target.value;
        modifiedBook.description = event.target.value;
        this.setState({modifiedBook : modifiedBook, book : book});
    }

    updateYear(event) {
        let modifiedBook = this.state.modifiedBook;
        let book = this.state.book;
        book.publishedYear = event.target.value;
        modifiedBook.publishedYear = event.target.value;
        this.setState({modifiedBook : modifiedBook, book : book});
    }

    updateAuthor(event) {
        let modifiedBook = this.state.modifiedBook;
        let book = this.state.book;
        book.author = event.target.value;
        modifiedBook.author = event.target.value;
        this.setState({modifiedBook : modifiedBook, book : book});
    }

    submit(event) {
        event.preventDefault();
        console.log(this.state.modifiedBook);

        const options = {
            method: "POST",
            headers : {
                "Content-Type" : "text/plain"
            },
            body: JSON.stringify(this.state.modifiedBook)
        };

        console.log(options);

        fetch('http://127.0.0.1:3001/books/' + this.state.book.id, options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                window.location.href = "books.html";
            });
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
            })
    }

    render() {
        return (
            <React.Fragment>
                <nav aria-label="breadcrumb my-2">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="books.html">Books</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Create book</li>
                    </ol>
                </nav>
                <h1 className="my-3">
                    Update a book
                </h1>
                <form className="py-3" onSubmit={this.submit}>
                    <fieldset className="my-4">
                        <label htmlFor="book-title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="book-title" name="book-title" onChange={this.updateTitle} value={this.state.book.title}/>
                    </fieldset>
                    <fieldset className="my-4">
                        <label htmlFor="book-description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="book-description" name="book-description" onChange={this.updateDescription} value={this.state.book.description}/>
                    </fieldset>
                    <fieldset className="my-4">
                        <label htmlFor="book-year" className="form-label">Publication year</label>
                        <input type="number" className="form-control" id="book-year" name="book-year" onChange={this.updateYear} value={"" + this.state.book.publishedYear}/>
                    </fieldset>
                    <fieldset className="my-4">
                        <label htmlFor="book-author" className="form-label">Author</label>
                        <input type="text" className="form-control" id="book-author" name="book-author" onChange={this.updateAuthor} value={this.state.book.author}/>
                    </fieldset>
                    <button type="submit" className="btn btn-primary">Create</button>
                </form>
            </React.Fragment>
        );
    }
}

const domContainer = document.querySelector('#edit-book');
ReactDOM.render(e(EditBook), domContainer);