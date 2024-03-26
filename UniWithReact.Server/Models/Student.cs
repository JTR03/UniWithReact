using System.ComponentModel.DataAnnotations;

namespace UniWithReact.Server.Models
{
    public class Student
    {
        public int StudentID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString ="{0:yyyy-MM-dd", ApplyFormatInEditMode = true)]
        public DateTime EnrollmentDate { get; set; }

        public string FullName
        {
            get
            {
                return $"{FirstName} {LastName}";
            }
        }

        public ICollection<Enrollment> Enrollments { get; set; }
    }
}
