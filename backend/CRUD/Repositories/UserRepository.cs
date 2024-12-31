using CRUD.Data;
using CRUD.Entities;
using CRUD.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;

namespace CRUD.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly Context _context;
        public UserRepository(Context context)
        {
            _context = context;
        }
        public async Task<IEnumerable<User>> getUsers()
        {
            return await _context.User.ToListAsync();
        }

        public async Task<User?> getUserByUsername(string username)
        {
            var user =  await _context.User.Where(c => c.Username == username).FirstOrDefaultAsync();
            return user;
        }

        public async Task PostUser(User user)
        {
            if (user == null)
            {
                throw new Exception("Request is null");
            }
            var existingUser = await _context.User.Where(c => c.Username == user.Username).FirstOrDefaultAsync();

            if (existingUser != null)
            {
                existingUser.Name = user.Name;
                existingUser.Password = user.Password;
                existingUser.Admin = user.Admin;
                _context.User.Update(existingUser);
            }
            else
            {
                await _context.User.AddAsync(user);
            }
            await _context.SaveChangesAsync();
        }

        public async Task DeleteUser(string username)
        {
            var user = await getUserByUsername(username);
            _context.Remove(user);
            await _context.SaveChangesAsync();
        }

    }
}
