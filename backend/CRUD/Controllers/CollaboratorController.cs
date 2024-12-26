using CRUD.DTO;
using CRUD.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CollaboratorController : ControllerBase
    {
        private readonly ICollaboratorService _collaboratorService;
        private readonly IAddressService _addressService;
        private readonly ITelephoneService _telephoneService;

        public CollaboratorController(ICollaboratorService collaboratorService, IAddressService addressService, ITelephoneService telephoneService)
        {
            _collaboratorService = collaboratorService;
            _addressService = addressService;
            _telephoneService = telephoneService;
        }

        [HttpGet]
        public async Task<IActionResult> getCollaborators()
        {
            try
            {
                var response = await _collaboratorService.GetCollaborators();
                return Ok(response);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("{collaboratorId}")]
        public async Task<IActionResult> getCollaboratorById([FromRoute] int collaboratorId)
        {
            try
            {
                var response = await _collaboratorService.GetCollaboratorById(collaboratorId);
                return Ok(response);

            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost]
        public async Task<IActionResult> postCollaborator([FromQuery] CollaboratorDTO request)
        {
            try
            {
                await _collaboratorService.PostCollaborator(request);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpDelete("{collaboratorId}")]
        public async Task<IActionResult> deleteCollaborator([FromRoute] int collaboratorId)
        {
            try
            {
                await _collaboratorService.DeleteCollaborator(collaboratorId);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
