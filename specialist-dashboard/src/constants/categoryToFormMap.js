import ticketCategories from './enums/TicketCategory';
import * as forms from './formsSchemas';

export default {
    [ticketCategories.repairs.value]: forms.repairForm,
};