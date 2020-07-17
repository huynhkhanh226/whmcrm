import { render } from '@testing-library/react'
import NotFound from './index';
import React from 'react';

describe('DOM Testing', () => {
    test('render successfully', async () => {
        const {findByTestId  } = render(<NotFound/>);
        const element = await findByTestId("not-found");
        expect(element.innerHTML).toBe("Not found");
    });
});