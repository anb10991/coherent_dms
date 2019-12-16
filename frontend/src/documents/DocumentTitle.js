import React from 'react';
import { translate } from 'react-admin';

export default translate(({ record, translate }) => (
    <span>
        {record ? translate('document.title', { title: record.name }) : ''}
    </span>
));
