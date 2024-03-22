using Microsoft.EntityFrameworkCore;
using UniWithReact.Server.Models;

namespace UniWithReact.Server.Data
{
    public class UniContext:DbContext
    {
        public UniContext(DbContextOptions<UniContext> options) : base(options) { }
        DbSet<Student> Students { get; set; }
        DbSet<Course> Courses { get; set; }
        DbSet<Instructor> Instructors { get; set; }
        DbSet<Department> Departments { get; set; }
        DbSet<Enrollment> Enrollments { get; set; }
        DbSet<OfficeAssignment> OfficeAssignments { get; set; }
    }
}
