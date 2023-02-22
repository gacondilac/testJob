using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MovieApi.Entities;

namespace MovieApi.Data
{
    public class MovieApiDbContext : IdentityDbContext<User>
    {
        public MovieApiDbContext (DbContextOptions<MovieApiDbContext> options) : base(options)
        { 
        }
        public DbSet<Film> Films { get; set; }

    }
}
