using CRUD.Entities;
using Microsoft.EntityFrameworkCore;

namespace CRUD.Data
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options)
        {
        }

        public DbSet<User> User { get; set; }
        public DbSet<Person> Person { get; set; }
        public DbSet<Collaborator> Collaborator { get; set; }
        public DbSet<Address> Address { get; set; }
        public DbSet<Telephone> Telephone { get; set; }

    }
}
