using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieApi.Data;
using MovieApi.Entities;
using MovieApi.Services;

namespace MovieApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilmController : ControllerBase
    {
       
        private readonly IFilmService _filmService;
        public FilmController(IFilmService filmService)
        {
            _filmService = filmService;
        }
        [HttpGet("get")]
        [AllowAnonymous]

        public async Task<List<Film>> GetAllFilm()
        {
            List<Film> films = await _filmService.GetFilm();
             return films;
        }
    }
}
