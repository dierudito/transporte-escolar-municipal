using AutoMapper;
using DM.TransporteEscolar.Application.ViewModels.Requests;
using DM.TransporteEscolar.Application.ViewModels.Responses;
using DM.TransporteEscolar.Domain.Entities;

namespace DM.TransporteEscolar.Application.AutoMapper;

public class StudentMap : Profile
{
    public StudentMap()
    {
        CreateMap<AddStudentRequestViewModel, Student>();
        CreateMap<UpdateStudentRequestViewModel, Student>();
        CreateMap<Student, StudentResponseViewModel>();
    }
}