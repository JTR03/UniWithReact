﻿using System.ComponentModel.DataAnnotations;

namespace UniWithReact.Server.Models
{
    public class OfficeAssignment
    {
        [Key]
        public int InstructorID { get; set; }
        public string Location { get; set; }
        public Instructor Instructor { get; set; }
    }
}