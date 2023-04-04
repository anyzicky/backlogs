import { useContext, useEffect, useState } from "react"
import { AppContext } from "../App"
import { useNavigate, useParams } from "react-router-dom"
import PostsService from '../services/Posts'

const Post = () => {

    const navigate = useNavigate();

    const params = useParams()
    const { posts, categories } = useContext(AppContext)
    const [post, setPost] = useState({
        id: 0,
        name: '',
        description: '',
        category_id: 1,
        year: 2023,
        rating: 1
    })

    useEffect(() => {
        const [currentPost] = getPost(parseInt(params.id))
        if(currentPost) {
            console.log('currentPost', currentPost)
            if(!currentPost.description) currentPost.description = ''
            setPost(currentPost)
        }
    }, [])

    const setName = (e) => {
        setPost(prevState => ({...prevState, name: e.target.value}))
    }

    const setDescription = (e) => {
        setPost(prevState => ({...prevState, description: e.target.value}))
    }

    const setYear = (e) => {
        setPost(prevState => ({...prevState, year: e.target.value}))
    }

    const setRating = (e) => {
        setPost(prevState => ({...prevState, rating: e.target.value}))
    }

    const setCategory = (e) => {
        setPost(prevState => ({...prevState, category_id: e.target.value}))
    }

    const getPost = (id) => {
        return posts.filter(post => {
            return post.id === id
        })
    }

    const addPost = async (e) => {
        e.preventDefault()
        const create = await PostsService.create(post)
        console.log('submit', post)
        console.log('create', create)
        navigate('/', {replace: true});
    }

    const years = [
        2020, 2021, 2022, 2023
    ]

    const ratings = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    ]

    return (
        <div className="container">
            <form onSubmit={addPost}>
                <div className="mb-6">
                    <label htmlFor="name" className="form-label">Название</label>
                    <input type="text" className="form-control" id="name" name="name" value={post.name} onChange={setName}/>
                </div>
                <div className="mb-6">
                    <label htmlFor="description" className="form-label">Описание</label>
                    <textarea className="form-control" id="decription" name="description" value={post.description} onChange={setDescription}/>
                </div>
                <div className="mb-6">
                    <label htmlFor="year" className="form-label">Год</label>
                    <select id="year" className="form-select" name="year" value={post.year} onChange={setYear}>
                        <option>Выбрать...</option>
                        {years.map((year, index) =>
                            <option key={index} value={year}>{year}</option>    
                        )}
                    </select>
                </div>
                <div className="mb-6">
                    <label htmlFor="rating" className="form-label">Рейтинг</label>
                    <select id="rating" className="form-select" name="rating" value={post.rating} onChange={setRating}>
                        <option>Выбрать...</option>
                        {ratings.map((rating, index) =>
                            <option key={index} value={rating}>{rating}</option>    
                        )}
                    </select>
                </div>
                <div className="mb-6">
                    <label htmlFor="category_id" className="form-label">Категория</label>
                    <select id="category_id" className="form-select" name="category_id" value={post.category_id} onChange={setCategory}>
                        <option>Выбрать...</option>
                        {categories.map((category, index) =>
                            <option key={index} value={category.id}>{category.name}</option>    
                        )}
                    </select>
                </div>
                <br/>
                {post.name && post.category_id > 0 && post.rating > 0 && post.year > 0 && 
                    <button type="submit" className="btn btn-primary">Сохранить</button>
                }
                
            </form>
        </div>
    )
}

export default Post