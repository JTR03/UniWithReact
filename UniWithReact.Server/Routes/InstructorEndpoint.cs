using Microsoft.EntityFrameworkCore;
using UniWithReact.Server.Data;
using UniWithReact.Server.Models;

namespace UniWithReact.Server.Routes
{
    public static class InstructorEndpoint
    {
        public static void Map(WebApplication app)
        {
            app.MapGet("/instructors", async (UniContext db) => await db.Instructors.ToListAsync());
            app.MapGet("/instructors/{id}", async (UniContext db, int id) => await db.Instructors.FindAsync(id));
            app.MapPost("/instructors", async (UniContext db, Instructor instructor) =>
            {
                await db.Instructors.AddAsync(instructor);
                await db.SaveChangesAsync();
                return Results.Created();
            });
            app.MapPut("/instructors/{id}", async (UniContext db, Instructor updatedInstructor, int id) =>
            {
                var instructor = await db.Instructors.FindAsync(id);
                if(instructor == null)
                {
                    return Results.NotFound();
                }
                instructor.FirstName = updatedInstructor.FirstName;
                instructor.LastName = updatedInstructor.LastName;
                instructor.OfficeAssignment = updatedInstructor.OfficeAssignment;
                await db.SaveChangesAsync();
                return Results.NoContent();
            });
            app.MapDelete("/instructors/{id}", async (UniContext db, int id) =>
            {
                var instructor = await db.Instructors.FindAsync(id);
                if (instructor == null)
                {
                    return Results.NotFound();
                }
                db.Instructors.Remove(instructor);
                await db.SaveChangesAsync();
                return Results.Ok();
            });
        }
    }
}
