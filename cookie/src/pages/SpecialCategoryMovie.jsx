import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axiosInstance from "../api/auth/axiosInstance";

const MoreSpecialMovie = () => {
    const location = useLocation();
    const mainCategory = location.state.mainCategory;
    const subCategory = location.state.subCategory;

    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const observer = useRef();

    const fetchMovies = async (page) => {
        if (isLoading || page >= totalPages) return;
        setIsLoading(true);
        console.log(`Fetching movies for page: ${page}`);

        try {
            const response = await axiosInstance.get("/api/movies/categoryMovies", {
                params: {
                    mainCategory: mainCategory,
                    subCategory: subCategory,
                    page: page,
                    size: 10,
                },
            });

            setMovies((prevMovies) => [...prevMovies, ...response.data.movies]);
            setTotalPages(response.data.totalPages);
            setCurrentPage(page + 1);
        } catch (error) {
            console.error("영화 불러오기 실패:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const lastMovieElementRef = (node) => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                fetchMovies(currentPage);
            }
        });
        if (node) observer.current.observe(node);
    };

    useEffect(() => {
        fetchMovies(0); // 첫 페이지 로드
    }, []);

    return (
        <Container>
            <Header>
                {mainCategory} - {subCategory}
            </Header>
            <CategoryTitle>

            </CategoryTitle>
            <MovieList>
                {movies.map((movie, index) => (
                    <MovieItem
                        key={movie.id}
                        ref={index === movies.length - 1 ? lastMovieElementRef : null}
                    >
                        <Poster src={movie.poster} alt={movie.title} />
                        <Info>
                            <Title>{movie.title}</Title>
                        </Info>
                    </MovieItem>
                ))}
            </MovieList>
            {isLoading && <Loading>Loading...</Loading>}
        </Container>
    );
};

export default MoreSpecialMovie;

const Container = styled.div`
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
    background-color: #000000;
`;

const Header = styled.h2`
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center;
`;

const CategoryTitle = styled.div`
  
`

const MovieList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
`;

const MovieItem = styled.div`
    width: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

const Poster = styled.img`
    width: 100%;
    border-radius: 0.3rem;
    margin-bottom: 10px;
`;

const Info = styled.div`
    font-size: 14px;
`;

const Title = styled.div`
    font-weight: bold;
    margin-bottom: 5px;
`;

const Loading = styled.div`
    text-align: center;
    margin-top: 20px;
    font-size: 16px;
    font-weight: bold;
`;
