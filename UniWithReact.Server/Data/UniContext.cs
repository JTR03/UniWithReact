using Microsoft.EntityFrameworkCore;
using UniWithReact.Server.Models;

namespace UniWithReact.Server.Data
{
    public class UniContext:DbContext
    {
        public UniContext(DbContextOptions<UniContext> options) : base(options) { }
        public DbSet<Student> Students { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Instructor> Instructors { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Enrollment> Enrollments { get; set; }
        public DbSet<OfficeAssignment> OfficeAssignments { get; set; }
    }
}
