using Microsoft.EntityFrameworkCore;
using UniWithReact.Server.Data;
using UniWithReact.Server.Models;

namespace UniWithReact.Server.Routes
{
    public static class StudentEndpoint
    {
        public static void Map(WebApplication app)
        {
            app.MapGet("/students", async (UniContext db) => await db.Students.ToListAsync());
            app.MapGet("/students/{id}", async (UniContext db, int id) =>
            { 
                 await db.Students
                .Include(p => p.Enrollments)
                .AsNoTracking()
                .SingleOrDefaultAsync(m => m.StudentID == id);
               
              });
            app.MapPost("/students", async (UniContext db, Student student) =>
            {
                await db.Students.AddAsync(student);
                await db.SaveChangesAsync();
                return Results.Created($"/students/{student.StudentID}", student);
            });
            app.MapPut("/students/{id}", async(UniContext db,Student updatedStudent, int id) =>
            {
                var student = await db.Students.FindAsync(id);
                if (student == null) 
                {
                    return Results.NotFound();
                }
                student.FirstName = updatedStudent.FirstName;
                student.LastName = updatedStudent.LastName;
                student.EnrollmentDate = updatedStudent.EnrollmentDate;
                await db.SaveChangesAsync();
                return Results.NoContent();
            });
            app.MapDelete("/Students/{id}", async (UniContext db, int id) =>
            {
                var student = db.Students.Find(id);
                if(student == null)
                {
                    return Results.NotFound();
                }
                db.Remove(student);
                await db.SaveChangesAsync();
                return Results.Ok();
            });
        }
    }
}
