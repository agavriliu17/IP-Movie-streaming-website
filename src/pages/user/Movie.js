import React from "react";

import PageLayout from "../PageLayout";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RatingDisplay from "../../components/ratings/RatingDisplay";
import Chip from "@mui/material/Chip";
import Comments from "../../components/comments/Comments";
import MoviesCarousel from "../../components/carousel/MoviesCarousel";

import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { IMAGES_URL } from "../../resources/constants";
import LoadingMovieCard from "../../components/loadingElements/LoadingMovieCard";
import RateButton from "../../components/ratings/RateButton";
import { getMoviesById } from "../../resources/helpers/movieApiHelper";

import { getTopRated } from "../../resources/helpers/movieApiHelper";
import AddMovieButton from "../../components/AddMovieButton";
import { useNavigate } from "react-router-dom";

const Movie = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = React.useState({});
  const [topRatedData, setDataTop] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo(0, 0);

    (async function () {
      try {
        const movieData = await getMoviesById(movieId);
        setMovie(movieData);

        const topMovieData = await getTopRated();
        setDataTop(topMovieData);

        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  const topRated = topRatedData.slice(0, 10);

  const handleGenreSearch = (genre) =>
    navigate(`/IP-Movie-streaming-website/search/${genre}`);

  return (
    <PageLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          marginTop: "10vh",
        }}
      >
        <img
          src={`${IMAGES_URL}${movie?.posterPath || movie?.backdropPath}`}
          alt={movie.name}
          style={{
            display: "block",
            maxWidth: "400px",
            maxHeight: "600px",
            width: "auto",
            height: "auto",
            borderRadius: "15px",
          }}
        />
        {!loading && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <Typography
                mb="20px"
                textAlign="left"
                variant="h3"
                fontWeight="600"
              >
                {movie.name}
              </Typography>
              <AddMovieButton />
            </Box>
            {movie?.type && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginBottom: "20px",
                }}
              >
                {movie.type.map((genre, index) => (
                  <Chip
                    label={genre.name}
                    key={`${genre.id}-${index}`}
                    onClick={() => handleGenreSearch(genre.name)}
                    sx={{ margin: "0px 5px" }}
                    clickable
                  />
                ))}
              </Box>
            )}
            <Typography fontSize="20px" mt={5} textAlign="left" color="#fff">
              {movie.description}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                marginTop: "10px",
              }}
            >
              <Typography fontSize="15px" mt={1} textAlign="left" color="gray">
                Release date:
              </Typography>
              <Typography ml="20px" fontSize="15px" mt={1} textAlign="left">
                {movie.releaseDate.slice(0, 10)}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
              <Typography fontSize="15px" mt={1} textAlign="left" color="gray">
                Runtime:
              </Typography>
              <Typography ml="20px" fontSize="15px" mt={1} textAlign="left">
                {`${movie.duration} min`}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>

      <Box
        sx={{
          width: "100%",
          marginTop: "25px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <RatingDisplay
          voteAverage={movie?.voteAverage}
          voteCount={movie?.voteCount}
        />
        <RateButton title={movie?.name} />
      </Box>

      {/* Hardcoded id for test purposes only */}
      {movieId === "238" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginTop: "25px",
            width: "100%",
            height: "50%",
            aspectRatio: "16/9",
          }}
        >
          <Typography
            mb="20px"
            mt="20px"
            textAlign="left"
            variant="h3"
            fontWeight="600"
          >
            Trailer
          </Typography>
          <ReactPlayer
            controls
            url="https://www.youtube.com/watch?v=UaVTIH8mujA"
            width="100%"
            height="100%"
          />
        </Box>
      )}

      <Box sx={{ width: "100%", height: "500px", marginTop: "30px" }}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {[...Array(4)].map((el, ind) => (
              <LoadingMovieCard key={ind} />
            ))}
          </Box>
        ) : (
          <MoviesCarousel
            movieList={topRated}
            genreTitle="Recommended"
            contained
          />
        )}
      </Box>

      <Divider sx={{ marginTop: "5vh", width: "100%" }} />
      <Comments movieId={movieId} />
    </PageLayout>
  );
};

export default Movie;
