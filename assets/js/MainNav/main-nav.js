const e = React.createElement;

class MainNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            links : [
                {
                    name : "Books",
                    link : "books.html",
                    active : true
                },
                {
                    name : "Users",
                    link : "users.html",
                    active : false
                }
            ]
        };
    }

    makeLinksList(active, list)
    {
        let newList = list.map((item) => {
            if(item.link === active) {
                item.active = true;
            }
            else
            {
                item.active = false;
            }
            return item;
        });

        return newList;
    }

    componentDidMount() {
        let href = window.location.href;
        let page = href.substring(href.lastIndexOf("/") + 1);
        let list = this.state.links;

        this.setState({
            links : this.makeLinksList(page, list)
        });
    }

    render() {

        let links = this.state.links.map((link) => {
                if (link.active === true) {
                    return (
                        <li key={link.name} className="nav-item">
                            <a className="nav-link active" href={link.link}>{link.name}</a>
                        </li>
                    );
                } else {
                    return (
                        <li key={link.name} className="nav-item">
                            <a className="nav-link" href={link.link}>{link.name}</a>
                        </li>
                    );
                }
            }
        );

        return (
            <React.Fragment>
                <a href="index.html" className="navbar-brand">
                    Back Office
                </a>
                <nav className="">
                    <ul className="navbar-nav">
                        {links}
                    </ul>
                </nav>
            </React.Fragment>
        );
    }
}

const domContainer = document.querySelector('#main-nav');
ReactDOM.render(e(MainNav), domContainer);