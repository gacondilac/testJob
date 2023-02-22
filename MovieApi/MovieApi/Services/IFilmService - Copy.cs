
using MovieApi.Entities;

namespace MovieApi.Services
{
    public interface IFilmService
    {
        Task<List<Film>> GetFilm();
    }
}
