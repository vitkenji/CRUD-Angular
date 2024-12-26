using CRUD.Data;
using CRUD.Repositories.Interfaces;
using CRUD.Entities;
using Microsoft.EntityFrameworkCore;

namespace CRUD.Repositories
{
    public class CollaboratorRepository  : ICollaboratorRepository
    {
        private readonly Context _context;

        public CollaboratorRepository(Context context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Collaborator>> GetCollaborators()
        {
            return await _context.Collaborator
                .Include(c => c.Person).ThenInclude(a => a!.Addresses)
                .Include(c => c.Person).ThenInclude(t => t!.Telephones)
                .ToListAsync();
        }

        public async Task<Collaborator?> GetCollaboratorById(int collaboratorId)
        {
            return await _context.Collaborator.Where(c => c.Id == collaboratorId)
                .Include(c => c.Person).ThenInclude(a => a!.Addresses)
                .Include(c => c.Person).ThenInclude(t => t!.Telephones)
                .FirstOrDefaultAsync();     
        }

        public async Task PostCollaborator(Collaborator collaborator)
        {
            await _context.Collaborator.AddAsync(collaborator);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCollaborator(int collaboratorId)
        {
            var collaborator = _context.Collaborator.Where(c => c.Id == collaboratorId)
                .Include(c => c.Person).ThenInclude(a => a!.Addresses)
                .Include(c => c.Person).ThenInclude(t => t!.Telephones)
                .FirstOrDefault();
            if (collaborator != null)
            {
                foreach(var phone in collaborator.Person!.Telephones!)
                {
                    _context.Remove(phone);
                }
                foreach(var address in collaborator.Person!.Addresses!)
                {
                    _context.Remove(address);
                }
                _context.Remove(collaborator.Person);
                _context.Remove(collaborator);
                await _context.SaveChangesAsync();
            }
        }
    }
}
