import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);  // Add loading state
  const [error, setError] = useState(null);  // Add error state

  useEffect(() => {
    const apiKey = import.meta.env.VITE_API_KEY;

    if (!apiKey) {
      console.error("API Key is missing.");
      setError("API Key is missing.");
      setLoading(false);
      return;
    }

    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
    
    // Reset articles and error states when category changes
    setArticles([]);
    setError(null);
    setLoading(true);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.articles) {
          setArticles(data.articles);
        } else {
          console.error("Articles not found in the response.");
          setError("No articles found.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
        setError("Error fetching news.");
        setLoading(false);
      });
  }, [category]);

  return (
    <div>
      <h2 className="text-center mt-2 mb-3">
        Latest <span className="badge bg-danger">News</span>
      </h2>
      
      {/* Loading state */}
      {loading && <p>Loading articles...</p>}
      
      {/* Error state */}
      {error && <p className="text-danger">{error}</p>}

      {/* Display articles if available */}
      {articles.length > 0 && !loading && !error ? (
        articles.map((news) => (
          <NewsItem
            key={news.url}  // Use a unique key, here we use 'url' which is typically unique
            title={news.title}
            description={news.description}
            src={news.urlToImage}
            url={news.url}
          />
        ))
      ) : (
        !loading && !error && <p>No articles available.</p>
      )}
    </div>
  );
};

export default NewsBoard;
