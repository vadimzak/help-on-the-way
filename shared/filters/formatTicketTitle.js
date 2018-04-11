import categoriesTree from '../constants/categoriesTree'

export default function (ticket, omitElderName) {
  const withElder = !omitElderName;
  if (!ticket || !ticket.category)
    return 'טיוטת פנייה'

  const category = categoriesTree[ticket.category].self;
  const destination = ticket.details.destinationAddressAlias
  return formatSentence(category.value, category.noun, ticket.elder.firstName, ticket.details.subject, destination, withElder)
}

function formatSentence(ticketType, categoryNoun, elderName, ticketSubject, destination, withElder){
  if (ticketType === 'MEDICAL') {
    const to = ticketSubject || destination;
    return withElder ? `${categoryNoun} ${elderName} ל${to}` : `${categoryNoun} ל${to}`;
  }

  if (ticketType === 'SHOPPING')
    return withElder ? `${categoryNoun} ${elderName} לקניית ${ticketSubject}` : `${categoryNoun} לקניית ${ticketSubject}`;

  if (ticketType === 'SOCIAL_AT_HOME')
    return withElder ? `${categoryNoun} עם ${elderName}`  : `${categoryNoun}`

  if (ticketType === 'SOCIAL_ESCORT')
    return  withElder ? `${categoryNoun}${ticketSubject} עם ${elderName}` : `${categoryNoun}${ticketSubject}`;

  return withElder ? `${categoryNoun} ${ticketSubject} ל${elderName}` : `${categoryNoun} ${ticketSubject}`;
}


