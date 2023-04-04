import { useContext, useEffect, useState } from "react";
import PostsService from '../services/Posts'
import { AppContext } from "../App";
import { Link } from "react-router-dom";

function NavBar() {

    const { categories, categoryFilter, setCategoryFilter, yearFilter, setYearFilter, searchFilter, setSearchFilter } = useContext(AppContext)
    const [years, setYears] = useState([])

    useEffect(() => {
        const fetchYears = async () => {
            const years = await PostsService.getYears()
            setYears(years)
        }
        fetchYears().catch(console.error)
    }, [])

    const setCategory = (e) => {
        console.log('category set', e.target.value)
        setCategoryFilter(e.target.value)
    }

    const setYear = (e) => {
        console.log('category set', e.target.value)
        setYearFilter(e.target.value)
    }

    const find = (e) => {
        if(e.target.value.length > 3 || e.target.value.length == 0) {
            console.log('check')
            setSearchFilter(e.target.value)
        }
        
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Главная</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={`/post/0`}>
                                    Добавить
                                </Link>
                            </li>
                        </ul>
                        
                        <form className="d-flex">
                            <select id="category" className="form-select" name="category" value={categoryFilter} onChange={setCategory}>
                                <option >Категория</option>
                                {categories.map(category => 
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                )}
                            </select>
                            <select id="category" className="form-select" name="category" value={yearFilter} onChange={setYear}>
                                <option >Год</option>
                                {years.map((year, index) =>  
                                    <option key={index} value={year.year}>{year.year}</option>
                                )}
                            </select>
                            <input className="form-control me-2" type="search" placeholder="Search" onChange={find} aria-label="Search" />
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar;