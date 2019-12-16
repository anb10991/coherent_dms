import React from 'react';
import { translate } from 'react-admin';

export default translate(({ record, translate }) => (
    <span>
        {record ? translate('textentry.title', { title: record.name }) : ''}
    </span>
));
