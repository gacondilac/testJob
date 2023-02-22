
using Microsoft.EntityFrameworkCore;
using MovieApi.Data;
using MovieApi.Entities;

namespace MovieApi.Services
{
    public class FilmService : IFilmService
    {
        private readonly MovieApiDbContext _movieApiDbContext;

        public FilmService(MovieApiDbContext movieApiDbContext)
        {
            _movieApiDbContext = movieApiDbContext;
        }
        Task<List<Film>> IFilmService.GetFilm()
        {
            return _movieApiDbContext.Films.ToListAsync();
        }
    }
}
