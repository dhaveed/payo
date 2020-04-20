# rules to tradexplorer API

- All routes are REST complaint

- All form error triggers a 400 error code, render error messages

- All unathorized access triggers 403 error, render error message

- All services are linked with a message queue, do not try to import a file from one service to another

- Every detail partaining to the user making the API request is gotten from the token
