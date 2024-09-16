import React, { useEffect, useState } from 'react';
import axios from 'axios';

const News = () => {
    const [articles, setArticles] = useState([]); // News articles
    const [query, setQuery] = useState('India');  // Default query is set to 'India'

    // Fetch news when query changes (e.g. on typing)
    useEffect(() => {
        fetchNews();
    }, [query]);

    const fetchNews = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/news?q=${query}`);
            setArticles(response.data.articles);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    return (
        <div className="news-container">
            <h1>Acowale News - India Edition</h1>
            
            {/* Search Bar */}
            <input 
                type="text" 
                placeholder="Search news in India" 
                onChange={(e) => setQuery(e.target.value)} 
                value={query}
                className="search-bar"
            />

            {/* News Articles Grid */}
            <div className="news-grid">
                {articles.map((article, index) => (
                    <div key={index} className="news-article">
                        <img src={article.image} alt="news" className="news-image" />
                        <h2>{article.title}</h2>
                        <p>{article.description}</p>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default News;
