using CRUD.Data;
using CRUD.Entities;
using CRUD.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CRUD.Repositories
{
    public class TelephoneRepository : ITelephoneRepository
    {
        private readonly Context _context;

        public TelephoneRepository(Context context)
        {
            _context = context;
        }
        
        public Telephone? GetTelephone(int personId, int telephoneId)
        {
            return _context.Telephone.Where(t => t.Id == telephoneId && t.Person!.Id == personId).FirstOrDefault();
        }

        public async Task CreateTelephone(Telephone telephone)
        {
            await _context.Telephone.AddAsync(telephone);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteTelephone(int personId, int telephoneId)
        {
            var telephone = GetTelephone(personId, telephoneId);
            if(telephone != null)
            {
                _context.Remove(telephone);
                await _context.SaveChangesAsync();

            }
        }

    }
}
