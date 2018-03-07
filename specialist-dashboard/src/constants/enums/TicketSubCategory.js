import TicketCategoryType from './TicketCategory';
export default {
    legalHelp: {
        value: 'LEGAL_HELP',
        text: 'סיוע משפטי',
        icon: '',
        parent: TicketCategoryType.bureaucracy
    },
    postoffice: {
        value: 'POSTOFFICE',
        text: 'שליחת מכתבים',
        icon: '',
        parent: TicketCategoryType.bureaucracy
    },
    government: {
        value: 'GOVERNMENT',
        text: 'בקשות מול משרדי המדינה',
        icon: '',
        parent: TicketCategoryType.bureaucracy
    },
    socialRights: {
        value: 'SOCIAL_RIGHTS',
        text: 'מיצוי זכויות',
        icon: '',
        parent: TicketCategoryType.bureaucracy
    },
    socialSecurity: {
        value: 'SOCIAL_SECURITY',
        text: 'ביטוח לאומי',
        icon: '',
        parent: TicketCategoryType.bureaucracy
    },
    nursingCare: {
        value: 'NURSING_CARE',
        text: 'טיפול סיעודי',
        icon: '',
        parent: TicketCategoryType.bureaucracy
    },
    housing: {
        value: 'HOUSING',
        text: 'דיור',
        icon: '',
        parent: TicketCategoryType.bureaucracy
    },
    paperOrganization: {
        value: 'PAPER_ORGANIZATION',
        text: 'מסמכים וניירות',
        icon: '',
        parent: TicketCategoryType.clean_organize
    },
    move_items: {
        value: 'MOVE_ITEMS',
        text: 'הזזת חפצים',
        icon: '',
        parent: TicketCategoryType.clean_organize
    },
    cleaning: {
        value: 'CLEANING',
        text: 'ניקיון',
        icon: '',
        parent: TicketCategoryType.clean_organize
    },
    throwAwayItems: {
        value: 'THROW_AWAY_ITEMS',
        text: 'זריקת חפצים',
        icon: '',
        parent: TicketCategoryType.clean_organize
    },
    repairDoorsWindows: {
        value: 'REPAIR_DOORS_WINDOWS',
        text: 'דלתות וחלונות',
        icon: '',
        parent: TicketCategoryType.repairs
    },
    repairMultimedia: {
        value: 'REPAIR_MULTIMEDIA',
        text: 'מולטימדיה',
        icon: '',
        parent: TicketCategoryType.repairs
    },
    repairInfrastructure: {
        value: 'REPAIR_INFRASTRUCTURE',
        text: 'תשתית',
        icon: '',
        parent: TicketCategoryType.repairs
    },
    repairFurniture: {
        value: 'REPAIR_FURNITURE',
        text: 'רהיטים',
        icon: '',
        parent: TicketCategoryType.repairs
    }
    
}