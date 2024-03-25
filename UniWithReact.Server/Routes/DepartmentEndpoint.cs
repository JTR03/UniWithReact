using Microsoft.EntityFrameworkCore;
using UniWithReact.Server.Data;
using UniWithReact.Server.Models;

namespace UniWithReact.Server.Routes
{
    public static class DepartmentEndpoint
    {
        public static void Map(WebApplication app)
        {
            app.MapGet("/departments", async (UniContext db) => await db.Departments.ToListAsync());
            app.MapGet("/departments/{id}", async (UniContext db, int id) => await db.Departments.FindAsync(id));
            app.MapPost("/departments", async (UniContext db, Department department) =>
            {
                await db.Departments.AddAsync(department);
                await db.SaveChangesAsync();
                return Results.Created();
            });
            app.MapPut("/departments/{id}", async (UniContext db, int id, Department updatedDepartment) =>
            {
                var department = await db.Departments.FindAsync(id);
                if(department == null)
                {
                    return Results.NotFound();
                }
                department.Name = updatedDepartment.Name;
                department.Budget = updatedDepartment.Budget;
                await db.SaveChangesAsync();
                return Results.NoContent();
            });
            app.MapDelete("/departments/{id}", async (UniContext db, int id) =>
            {
                var department = await db.Departments.FindAsync(id);
                if(department == null)
                {
                    return Results.NotFound();
                }
                db.Departments.Remove(department);
                await db.SaveChangesAsync();
                return Results.Ok();
            });

        }
    }
}
