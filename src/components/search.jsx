import React from 'react';
import { useLocation } from 'react-router-dom';
import courses from './courseData'; // Ensure the path is correct
import { Link } from 'react-router-dom';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

function SearchResults() {
  const query = useQuery();
  const searchTerm = query.get('query')?.toLowerCase() || '';
  const filteredCourses = Object.entries(courses).filter(([key, course]) =>
    course.title.toLowerCase().includes(searchTerm) ||
    course.description.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="container mt-5">
      <h2>Search Results for "{searchTerm}"</h2>
      <div className="row row-cols-1 row-cols-md-3 g-3">
        {filteredCourses.length > 0 ? (
          filteredCourses.map(([key, course], index) => (
            <div className="col" key={index}>
              <div className="card h-100">
                <Link to={`/courses/${key}`} className="lnk" onClick={(e) => e.stopPropagation()}>
                  <img src={course.image} className="card-img-top" alt={course.title} />
                  <div className="card-body">
                    <h5 className="card-title">{course.title}</h5>
                    <p className="card-text">{course.description}</p>
                  </div>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No courses match your search term.</p>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
