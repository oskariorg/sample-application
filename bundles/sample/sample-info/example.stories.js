import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from 'oskari-ui';

storiesOf('Sample Application', module)
    .add('with text', () => (
        <Button>Hello from sample application</Button>
    ));
