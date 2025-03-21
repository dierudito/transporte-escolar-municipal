﻿using DM.TransporteEscolar.Domain.Entities.Base;

namespace DM.TransporteEscolar.Domain.Entities;

public class School : Entity
{
    public string Name { get; set; } = null!;
    public string Address { get; set; } = null!;
    public string ZipCode { get; set; } = null!;
    public string Phone { get; set; } = null!;

    public ICollection<TransportRequest> TransportRequests { get; set; }
}
