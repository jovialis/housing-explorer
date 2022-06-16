# housing-explorer
This is the web interface for the economic mobility research project under Professor Kim

## Notes
This project was originally created over two years ago and by two previous Research Assistants, hence the strange directory structure and weird tech stack.

A year ago, I took over the project and completely rewrote the backend and frontend for security and stability. As such, it's a weird combination of old, senseless code and my clunky code bolted onto the side.

Regardless, the project works. It looks pretty good.

It is hosted on an AWS EB instance.

## Required Environmental Variables
```MONGODB_URI```: Database connection URI
```NODE_ENV```: Flag the production status (development/production)
```SESSION_SECRET```: Cookie session secret
```SESSION_DOMAIN```: Cookie domain
```PORT```: Port to host the server on

## Commands
1. Build the frontend: ```yarn build```
2. Start the server: ```yarn start```
