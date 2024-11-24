import PropTypes from "prop-types";

const SearchResultsForReview = ({ filteredMovies, onMovieClick }) => {
  return (
    <div>
      {filteredMovies.map((movie) => (
        <div
          key={movie.id}
          onClick={() => onMovieClick(movie)} // 영화 객체 전달
          style={{
            cursor: "pointer",
            margin: "10px 0",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <img
            src={movie.imageUrl} // 올바른 이미지 속성 적용
            alt={movie.title}
            style={{ width: "80px", height: "120px", objectFit: "cover" }}
          />
          <div>
            <h4 style={{ margin: 0 }}>{movie.title}</h4>
            <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
              {movie.genre} / {movie.year}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

SearchResultsForReview.propTypes = {
  filteredMovies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired, // poster 대신 imageUrl로 변경
    })
  ).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

export default SearchResultsForReview;