using System.ComponentModel.DataAnnotations;

namespace MovieApi.Entities
{
    public class Film
    {
        [Key]
        public string? Id { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? Image { get; set; }
        [Required]
        public int? NumLike  { get; set; } = 0;
    }
}
