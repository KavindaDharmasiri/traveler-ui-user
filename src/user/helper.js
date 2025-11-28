export const getStatusBadgeClasses = (status) => {
    switch (status) {
        case 'Active':
            return 'status-active';
        case 'Pending':
            return 'status-pending';
        case 'Returned':
            return 'status-returned';
        default:
            return 'status-returned';
    }
};

export const getStatusIcon = (status) => {
    switch (status) {
        case 'Active':
            return 'fa-check-circle';
        case 'Pending':
            return 'fa-hourglass-half';
        case 'Returned':
            return 'fa-history';
        default:
            return 'fa-history';
    }
}