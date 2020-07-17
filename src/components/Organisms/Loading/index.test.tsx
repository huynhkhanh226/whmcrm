import { render } from '@testing-library/react'
import Loading from './index';
import React from 'react';

describe('DOM Testing', () => {
    test('render successfully', async () => {
        const {container  } = render(<Loading/>);
        const element = await container.querySelector("span");
        expect(element && element.innerHTML).toBe("Loading...");
    });
});