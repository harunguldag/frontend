import "../styles/notfound.css";

function NotFound() {
    return (
        <section className="page_404">
            <div className="container">
                <h1 className="error-title">404</h1> 
                <div className="four_zero_four_bg"></div>
                <div className="contant_box_404">
                    <h3 className="h2">Looks like you're lost</h3>
                    <p>The page you are looking for is not available!</p>
                    <a href="/" className="link_404">Go to Home</a>
                </div>
            </div>
        </section>
    );
}

export default NotFound;
