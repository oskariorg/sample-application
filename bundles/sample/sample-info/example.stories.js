import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from 'oskari-frontend/bundles/admin/admin-layereditor/components/Button';

storiesOf('Sample Application', module)
    .add('with text', () => (
        <Button>Hello from sample application</Button>
    ))
