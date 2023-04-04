import { useContext } from "react"
import { AppContext } from "../App"

const Pagination = (props) => {

    let pages = []
    for(let i = 1; i <= props.pages; i++) {
        pages.push(i)
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                {pages.map((page, index) => 
                    <li key={index} className="page-item"><a className="page-link" href="#" onClick={() => props.changePage(page)}>{page}</a></li>
                )}
            </ul>
        </nav>
    );
}

export default Pagination