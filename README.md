# Floor Management

Drag and drop  functionality with aranging the floor of the room

## Table of Contents

- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Running the Application](#running-the-application)
  - [Frontend](#frontend)
  - [Backend](#backend)


## Technologies

- React (Vite)
- Node.js
- Express
- MongoDB 
- Material UI
- React-Konva (drag & drop)
- Redux-Toolkit
- React-Router
  

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- npm (comes with Node.js)



## Drag-and-Drop Mechanism
- The drag-and-drop functionality in this application is implemented using the react-konva library, which provides a robust way to handle canvas elements.

- Event Handling: The application captures drag events using the onDragEnd handler. The position of the dragged element is obtained through getPointerPosition(), ensuring precise placement.

- Coordinate System: A defined work area allows for adjusting the pointer's position, preventing elements from being placed outside the intended layout.

- State Management: The positions of elements are managed through React's state, ensuring that the UI updates immediately in response to user interactions.

##Justification for the Approach

This approach enhances user experience by allowing intuitive positioning of elements while maintaining accuracy. 
It also leverages React's capabilities for efficient state management and modularity, making future enhancements easier.

## Validation of Libraries and Tools

- React (Vite): Chosen for its fast development server and optimized build process, enabling rapid prototyping and efficient performance.
- Node.js and Express: Provide a reliable backend framework, facilitating RESTful API creation and handling asynchronous requests seamlessly.
- MongoDB: Utilized for its flexibility and scalability in managing data, making it a great fit for applications with varying data structures.
- Material UI: Offers a comprehensive set of pre-designed components that adhere to Material Design principles, ensuring a consistent and modern UI.
- React-Konva: Ideal for handling canvas-based elements and providing drag-and-drop functionality in a straightforward manner.
- Redux Toolkit: Simplifies state management, making it easier to manage complex application states and enhance performance.
- React Router: Essential for managing navigation and routing in a single-page application, improving the user experience.

