# Next.js Frontend

This is a web application built using the Next.js framework. It provides a user interface for interacting with the Threads service backend. This README file aims to provide a comprehensive overview of the frontend, its functionalities, and instructions on how to use it.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies](#technologies)
4. [Getting Started](#getting-started)
5. [Components](#components)
6. [Pages](#pages)
7. [API Integration](#api-integration)
8. [Authentication](#authentication)

## Introduction

The will be designed to provide a user-friendly interface for interacting with the Threads service backend. It allows users to create, update, delete, and interact with threads, as well as perform other actions such as searching for threads and viewing user-specific threads.

## Features

The threads Frontend offers the following features:

1. User Registration: Users can create an account to access the full functionality of the application.
2. User Login: Registered users can log in to their accounts to access their threads and perform authenticated actions.
3. Create a new thread: Users can create new threads with a title, content, and optional tags.
4. Update a thread: Users can update the content, title, or tags of their threads.
5. Delete a thread: Users can delete their threads if they no longer want to keep them.
6. Comment on a thread: Users can add comments to existing threads.
7. Update a comment: Users can modify the content of their comments.
8. Delete a comment: Users can delete their comments from threads.
9. Upvote a thread: Users can upvote threads they find interesting or useful.
10. View user's threads: Users can see a list of threads they have created.
11. Search threads: Users can search for threads using keywords or tags.

## Technologies

The threads Frontend is built using the following technologies:

- Framework: Next.js
- UI Library: React
- Styling: CSS Modules
- State Management: Redux
- API Integration: Axios
- Authentication: JWT

## Getting Started

To get started with the threads Frontend, follow these steps:

1. Clone the repository.
2. Install the required dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser and navigate to `http://localhost:3000`

## Components

The threads Frontend utilizes various reusable UI components to build the user interface. These components are located in the `components` folder and can be easily customized or extended to fit specific requirements.

## Pages

The threads Frontend consists of several pages, each representing a different route or view within the application. These pages are located in the `app` folder and can be modified or extended to add new functionality or views.

## API Integration

The threads Frontend integrates with the Threads service backend using API endpoints provided by the backend. The `server` folder contains utility functions for making API requests and handling responses. These functions can be used to interact with the backend and perform actions such as creating threads, adding comments, and upvoting threads.

## Authentication

The threads Frontend requires authentication to access certain features and perform authenticated actions. Users must register an account and log in to access their threads and perform actions such as creating threads, adding comments, and upvoting threads. Authentication is handled using JWT tokens. This is done via AWS Amplify.
