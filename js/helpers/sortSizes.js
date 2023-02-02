const sortSizes = (a, b) => {
    const sizes = [
        'XXXS',
        'XXS',
        'XS',
        'S',
        'M',
        'L',
        'XL',
        'XXL',
        'XXXL',
    ];

    const aIdx = sizes.indexOf(a.toUpperCase());
    const bIdx = sizes.indexOf(b.toUpperCase());

    if (aIdx < 0) {
        if (!isNaN(a) && !isNaN(b)) {
            return Number(a) - Number(b);
        }
        return !isNaN(a) ? -1 : 1;
    }
    if (bIdx < 0) {
        if (!isNaN(a) && !isNaN(b)) {
            return Number(a) - Number(b);
        }
        return !isNaN(b) ? -1 : 1;
    }
    return aIdx - bIdx;
};