
using Microsoft.AspNetCore.Identity;

namespace MovieApi.Entities
{
    public class User : IdentityUser
    {
        public string? Role { get; set; }
    }
}
