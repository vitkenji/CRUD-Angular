using CRUD.Data;
using CRUD.Repositories.Interfaces;
using CRUD.Entities;
using Microsoft.EntityFrameworkCore;

namespace CRUD.Repositories
{
    public class AddressRepository : IAddressRepository
    {
        private readonly Context _context;

        public AddressRepository(Context context)
        {
            _context = context;
        }

        public Address? GetAddress(int personId, int addressId)
        {
            return _context.Address.Where(a => a.Id == addressId && a.Person!.Id == personId).FirstOrDefault();
        }

        public async Task CreateAddress(Address address)
        {
            await _context.Address.AddAsync(address);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAddress(int personId, int addressId)
        {
            var address = GetAddress(personId, addressId);
            if(address != null)
             {
                _context.Remove(address);
                await _context.SaveChangesAsync();

            }
        }



    }
}
