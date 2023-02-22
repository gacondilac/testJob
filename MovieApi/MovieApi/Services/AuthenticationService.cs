﻿using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Identity;
using MovieApi.Dtos;
using MovieApi.Entities;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace MovieApi.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;
        public AuthenticationService(UserManager<User> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }

        public async Task<string> Register(RegisterRequest request)
        {
            var userByEmail = await _userManager.FindByEmailAsync(request.Email);
            var userByUsername = await _userManager.FindByNameAsync(request.UserName);
            if (userByEmail is not null || userByUsername is not null)
            {
                throw new ArgumentException($"User with email {request.Email} or username {request.UserName} already exists.");
            }

            User user = new()
            {
                Email = request.Email,
                UserName = request.UserName,
                Role = "Admin",
                SecurityStamp = Guid.NewGuid().ToString()
            };

            var result = await _userManager.CreateAsync(user, request.Password);

            if (!result.Succeeded)
            {
                throw new ArgumentException($"Unable to register user {request.UserName}");
            }

            return await Login(new LoginRequest { UserName = request.Email, Password = request.Password });
        }
        public async Task<string> Login(LoginRequest request)
        {
            var user = await _userManager.FindByNameAsync(request.UserName);

            if (user is null)
            {
                user = await _userManager.FindByEmailAsync(request.UserName);
            }

            if (user is null || !await _userManager.CheckPasswordAsync(user, request.Password))
            {
                throw new ArgumentException($"Unable to authenticate user {request.UserName}");
            }

            var authClaims = new List<Claim>
        {
            new(ClaimTypes.Name, user.UserName),
            new(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };

            var token = GetToken(authClaims);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        private JwtSecurityToken GetToken(IEnumerable<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256));

            return token;
        }


    }
}
