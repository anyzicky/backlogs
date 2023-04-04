import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
  } from 'react-router-dom';

import Home from './pages/Home'
import Post  from './pages/Post'
import NavBar from './components/NavBar'
import { createContext, useEffect, useState } from 'react';
import CategoriesService from './services/Categories'


export const AppContext = createContext({})

const App = () => {

    const [categories, setCategories] = useState([])
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [pages, setPages] = useState(0)
    const [categoryFilter, setCategoryFilter] = useState(0)
    const [yearFilter, setYearFilter] = useState(0)
    const [searchFilter, setSearchFilter] = useState('')

    useEffect(() => {
        const fetchCategories = async () => {
            const cats = await CategoriesService.getAll()
            setCategories(cats)
        }
        fetchCategories().catch(console.error)
    }, [])

    return (
        <Router>
            <div className="App">
                <AppContext.Provider value={{ categories, posts, setPosts, page, total, pages, setPage, setTotal, setPages, searchFilter, setSearchFilter, categoryFilter, setCategoryFilter, yearFilter, setYearFilter }}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <NavBar></NavBar>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <Routes>
                                    <Route path="/" element={<Home/>}></Route>
                                    <Route path="/post/:id" element={<Post/>}></Route>
                                </Routes>
                            </div>
                        </div>
                    </div>
                </AppContext.Provider>
            </div>
        </Router>
    );
}

export default App;
