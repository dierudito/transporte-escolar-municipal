namespace DM.TransporteEscolar.Application.ViewModels.Responses;
public record PagedResponseViewModel<TResponse>(int PageNumber, int PageSize,
    int TotalPages, int TotalRecords, IEnumerable<TResponse> Data) where TResponse : class;