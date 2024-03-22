namespace UniWithReact.Server.Models
{
    public class Department
    {
        public int DepartmentID { get; set; }
        public string Name { get; set; }
        public decimal Budget { get; set; }
        public DateTime StartDate { get; set; }
        public int? InstructorID { get; set; }
        public Instructor Admin { get; set; }
        public ICollection<Course> Courses { get; set; }
    }
}