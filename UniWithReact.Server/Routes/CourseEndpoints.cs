using Microsoft.EntityFrameworkCore;
using UniWithReact.Server.Data;
using UniWithReact.Server.Models;

namespace UniWithReact.Server.Routes
{
    public static class CourseEndpoints
    {
        public static void Map(WebApplication app)
        {
            app.MapGet("/Courses", async (UniContext db) => await db.Courses.ToListAsync());
            app.MapGet("/Courses/{id}", async (UniContext db, int id) => await db.Courses.FindAsync(id));
            app.MapPost("/Courses", async (UniContext db, Course course) =>
            {
                await db.Courses.AddAsync(course);
                await db.SaveChangesAsync();
                return Results.Created($"/Courses/{course.CourseID}", course);
            });
            app.MapPut("/Courses/{id}", async (UniContext db, Course updatedCourse, int id) =>
            {
                var course = await db.Courses.FindAsync(id);
                if (course == null) {
                   return Results.NotFound();
                }
                course.Title = updatedCourse.Title;
                course.Credits = updatedCourse.Credits;
                course.DepartmentID = updatedCourse.DepartmentID;
                await db.SaveChangesAsync();
                return Results.NoContent();
            });
            app.MapDelete("/Courses/{id}", async (UniContext db, int id) =>
            {
                var course = await db.Courses.FindAsync(id);
                if (course == null)
                {
                    return Results.NotFound();
                }
                db.Courses.Remove(course);
                await db.SaveChangesAsync();
                return Results.Ok();
            });
        }
    }
}
