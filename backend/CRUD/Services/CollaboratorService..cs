using CRUD.DTO;
using CRUD.Entities;
using CRUD.Repositories.Interfaces;
using CRUD.Services.Interfaces;

namespace CRUD.Services
{
    public class CollaboratorService : ICollaboratorService
    {
        private readonly ICollaboratorRepository _collaboratorRepository;

        public CollaboratorService(ICollaboratorRepository collaboratorRepository)
        {
            _collaboratorRepository = collaboratorRepository;
        }

        public async Task<IEnumerable<Collaborator>> GetCollaborators()
        {
            return await _collaboratorRepository.GetCollaborators();
        }

        public async Task<Collaborator?> GetCollaboratorById(int collaboratorId)
        {
            return await _collaboratorRepository.GetCollaboratorById(collaboratorId);
        }

        public async Task PostCollaborator(CollaboratorDTO request)
        {
            var collaborator = new Collaborator
            {
                AdmissionDate = DateOnly.FromDateTime(request.AdmissionDate),
                Contribution = request.Contribution,
                RegistrationNumber = request.RegistrationNumber,
                CollaboratorType = request.CollaboratorType,
                Person = new Person
                {
                    RG = request.RG,
                    CPF = request.CPF,
                    BirthDate = DateOnly.FromDateTime(request.BirthDate),
                    Name = request.Name,
                }
            };
            await _collaboratorRepository.PostCollaborator(collaborator);

        }

        public async Task DeleteCollaborator(int id)
        {
            await _collaboratorRepository.DeleteCollaborator(id);
        }



    }
}
