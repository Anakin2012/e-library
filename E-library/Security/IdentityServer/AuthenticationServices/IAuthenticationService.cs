﻿using IdentityServer.DTOs;
using IdentityServer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer.AuthenticationServices
{
    public interface IAuthenticationService
    {
        Task<Member> ValidateUser(MemberCredentialsDTO userCredentials); 
        Task<AuthenticationModel> CreateAuthenticationModel(Member member);

    }
}