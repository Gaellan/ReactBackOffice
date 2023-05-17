const e = React.createElement;

class CreateBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title : "",
            description : "",
            publishedYear : -1,
            author: ""
        };

        this.updateTitle = this.updateTitle.bind(this);
        this.updateDescription = this.updateDescription.bind(this);
        this.updateYear = this.updateYear.bind(this);
        this.updateAuthor = this.updateAuthor.bind(this);
        this.submit = this.submit.bind(this);
    }

    updateTitle(event) {
        this.setState({title : event.target.value});
    }

    updateDescription(event) {
        this.setState({description : event.target.value});
    }

    updateYear(event) {
        this.setState({publishedYear : parseInt(event.target.value)});
    }

    updateAuthor(event) {
        this.setState({author : event.target.value});
    }

    submit(event) {
        event.preventDefault();
        console.log(this.state);

        const options = {
            method: 'POST',
            body: JSON.stringify(this.state)
        };

        fetch('http://127.0.0.1:3001/books', options)
            .then(response => response.json())
            .then(data => {
                window.location.href = "books.html";
            });
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
                    Create a book
                </h1>
                <form className="py-3" onSubmit={this.submit}>
                    <fieldset className="my-4">
                        <label htmlFor="book-title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="book-title" name="book-title" onChange={this.updateTitle}/>
                    </fieldset>
                    <fieldset className="my-4">
                        <label htmlFor="book-description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="book-description" name="book-description" onChange={this.updateDescription}/>
                    </fieldset>
                    <fieldset className="my-4">
                        <label htmlFor="book-year" className="form-label">Publication year</label>
                        <input type="number" className="form-control" id="book-year" name="book-year" onChange={this.updateYear}/>
                    </fieldset>
                    <fieldset className="my-4">
                        <label htmlFor="book-author" className="form-label">Author</label>
                        <input type="text" className="form-control" id="book-author" name="book-author" onChange={this.updateAuthor}/>
                    </fieldset>
                    <button type="submit" className="btn btn-primary">Create</button>
                </form>
            </React.Fragment>
        );
    }
}

const domContainer = document.querySelector('#create-book');
ReactDOM.render(e(CreateBook), domContainer);