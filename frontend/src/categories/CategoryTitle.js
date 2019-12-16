import React from 'react';
import { translate } from 'react-admin';

export default translate(({ record, translate }) => (
    <span>
        {record ? translate('category.edit.title', { title: record.name }) : ''}
    </span>
));
