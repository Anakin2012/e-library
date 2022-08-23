using AutoMapper;
using Catalog.API.DTOs;
using Catalog.API.Entities;
using Catalog.API.Repositories.Interfaces;
using EventBus.Messages.Events;
using MassTransit;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog.API.EventBusConsumers
{
    public class RemoveBookFromLibraryConsumer : IConsumer<RemoveBookFromLibraryEvent>
    {
        private readonly IBookRepository _repository;
        private readonly IMapper _mapper;
        private readonly ILogger<RemoveBookFromLibraryConsumer> _logger;

        public RemoveBookFromLibraryConsumer(IBookRepository repository, IMapper mapper, ILogger<RemoveBookFromLibraryConsumer> logger)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task Consume(ConsumeContext<RemoveBookFromLibraryEvent> context)
        {

            BookDTO bookDTO = await _repository.GetBook(context.Message.BookId);
            bookDTO.IsAvailable = true;
            Book bookEntity = _mapper.Map<Book>(bookDTO);
            await _repository.UpdateBook(bookDTO.Id, _mapper.Map<UpdateBookDTO>(bookEntity));
            _logger.LogInformation($"{typeof(RemoveBookFromLibraryConsumer).Name} consumed successfully. BookID: {bookEntity.Title} updated");


        }
    }
}
