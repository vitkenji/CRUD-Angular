using CRUD.DTO;
using CRUD.Entities;
using CRUD.Repositories.Interfaces;
using CRUD.Services.Interfaces;

namespace CRUD.Services
{
    public class TelephoneService : ITelephoneService
    {
        private readonly ITelephoneRepository telephoneRepository;

        public TelephoneService(ITelephoneRepository telephoneRepository)
        {
            this.telephoneRepository = telephoneRepository;
        }

        public async Task CreateTelephone(TelephoneDTO request, int personId)
        {
            var telephone = new Telephone
            {
                PersonId = personId,
                Number = request.Number,
                TelephoneType = request.TelephoneType,
            };
            await telephoneRepository.CreateTelephone(telephone);

        }

        public async Task DeleteTelephone(int personId, int telephoneId)
        {
            await telephoneRepository.DeleteTelephone(personId, telephoneId);
        }
    }
}
