import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import PostsService from '../services/Posts'

function Home() {

    const { categories, posts, page, pages, setPage, setTotal, setPosts, setPages, categoryFilter, yearFilter, searchFilter } = useContext(AppContext)

    useEffect(() => {
        const fetchPosts = async () => {
            const posts = await PostsService.getAll(page, {category: categoryFilter, year: yearFilter, search: searchFilter})
            setPosts(posts.data)
            setPage(posts.meta.currentPage)
            setTotal(posts.meta.total)
            setPages(posts.meta.pages)
        }
        fetchPosts().catch(console.error)
    }, [page, categoryFilter, yearFilter, searchFilter])

    const getCategory = (id) => {
        return categories.filter(category => {
            return category.id === id
        })
    }

    const changePage = (page) => {
        setPage(page)
    }

    const deletePost = async (postId) => {
        console.log('delete', postId)
        await PostsService.delete(postId)
        setPosts(posts.filter(p => p.id !== postId))
    }

    console.log('pages', pages)

    const ratings = [1,2,3,4,5,6,7,8,9,10]

    return (
        <div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Название</th>
                        <th scope="col">Категория</th>
                        <th scope="col">Год</th>
                        <th scope="col">Рейтинг</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => {
                        const [category] = getCategory(post.category_id)
                        return (
                            <tr key={post.id}>
                                <th scope="row">
                                    <Link to={`/post/${post.id}`}>
                                        <i className="bi bi-pencil-square"></i>
                                    </Link>
                                    <i className="bi bi-trash3" onClick={() => {deletePost(post.id)}}></i>
                                </th>
                                <td>{post.name}</td>
                                <td>{category ? category.name : ''}</td>
                                <td>{post.year}</td>
                                <td>
                                    {ratings.map(rating => 
                                        <span key={rating}>
                                            {post.rating < rating 
                                            ? <i className="bi bi-star"/>
                                            : <i className="bi bi-star-fill"/>
                                            }
                                        </span>
                                    )}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {pages > 1 && 
                <Pagination pages={pages} currentPage={page} changePage={changePage}/>
            }
            
        </div>
    )
}

export default Home;