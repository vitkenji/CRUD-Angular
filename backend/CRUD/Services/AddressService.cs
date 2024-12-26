using CRUD.DTO;
using CRUD.Repositories.Interfaces;
using CRUD.Services.Interfaces;
using CRUD.Entities;

namespace CRUD.Services
{
    public class AddressService : IAddressService
    {
        private readonly IAddressRepository addressRepository;
        private readonly HttpClient httpClient;

        public AddressService(IAddressRepository addressRepository, HttpClient httpClient)
        {
            this.addressRepository = addressRepository;
            this.httpClient = httpClient;
        }

        public async Task<ViaCEPResponse> GetAddressByCEP(int CEP)
        {
            var url = $"https://viacep.com.br/ws/{CEP}/json/";
            var response = await httpClient.GetAsync(url);

            var result = await response.Content.ReadFromJsonAsync<ViaCEPResponse>();
            if(result == null)
            {
                throw new Exception("Error getting address");
            }
            return result;
      
        }

        public async Task CreateAddress(AddressDTO request, int personId)
        {
            var address = new Address
            {
                PersonId = personId,
                Street = request.Street,
                City = request.City,
                Number = request.Number,
                Neighborhood = request.Neighborhood,
                CEP = request.CEP,
                AddressType = request.addressType,
            };
            await addressRepository.CreateAddress(address);
        }


        public async Task DeleteAddress(int personId, int addressId)
        {
            await addressRepository.DeleteAddress(personId, addressId);
        }
    }
}
