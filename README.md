# Card Management App

This is a simple Vue 3 web application that allows users to manage their payment cards.

## Features

- View your currently selected payment method
- Switch between available cards
- Add new cards with proper input validation
- Delete cards with confirmation modal
- Responsive and accessible interface
- Keyboard-accessible elements and screen reader-friendly labels

## Technologies Used

- **Vue 3**
- **Vite** as the development server and bundler
- **Axios** for HTTPS requests


## API Integration

The app communicates with a backend using Axios. All API calls are centralized in `src/services/cardService.js`. Axios is pre-configured with a base URL in `src/utils/axiosSetup.js`.

Environment variables are stored in `.env`:

```
VITE_API_BASE_URL= ******
```

## Input Validation

- Card number: Must be exactly 16 digits.
- Expiry date: Must follow `MM/YY` format and be a valid future date.
- CVV: Must be exactly 3 digits and masked.

If any input is invalid, inline error messages are shown below the corresponding input field.

## Accessibility

- All interactive elements are keyboard-navigable.
- Buttons and links are correctly labeled for screen readers.
- Contrast and focus indicators follow WCAG guidelines.

## Setup and Run

1. Clone the repository:
   ```bash
   git clone <URL>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open in browser:
   ```
   http://localhost:5173
   ```
