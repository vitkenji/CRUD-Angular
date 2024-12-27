using CRUD.Enums;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace CRUD.DTO
{
    public class CollaboratorDTO
    {
        [Required]
        [Range(0, double.MaxValue)]
        public int RegistrationNumber { get; set; }
        [Required]
        [MinLength(6)]
        [MaxLength(50)]
        public string? Name { get; set; }
        [Required]
        [Range(0, 99999999999)]
        public decimal CPF { get; set; }
        [Required]
        [JsonConverter(typeof(DateOnlyConverter))]
        public DateTime BirthDate { get; set; }

        [Required]
        [MaxLength(11)]
        public string? RG { get; set; }
        [Range(0, 9999.99)]
        public decimal Contribution { get; set; }
        [Required]
        public CollaboratorType CollaboratorType { get; set; }
        [JsonConverter(typeof(DateOnlyConverter))]
        public DateTime AdmissionDate { get; set; }
    }

    public class DateOnlyConverter : JsonConverter<DateTime>
    {
        public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            string date = reader.GetString();
            return DateTime.ParseExact(date, "yyyy-MM-dd", CultureInfo.InvariantCulture);
        }

        public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
        {
            writer.WriteStringValue(value.ToString("yyyy-MM-dd"));
        }
    }
}
