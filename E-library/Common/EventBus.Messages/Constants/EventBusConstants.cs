﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventBus.Messages.Constants
{
    public static class EventBusConstants
    {
        public const string CartCheckoutQueue = "cartcheckout-queue";

        public const string AddToLibraryQueue = "addtolibrary-queue";

        public const string UpdateCatalogQueue = "updatecatalog-queue";

        public const string MembershipQueue = "membership-queue";

        public const string RemoveBookFromLibraryQueue = "removebookfromlibrary-queue";
    }
}
