# Oracle Database JPA Application

This application demonstrates how to connect to an Oracle database using JPA (Java Persistence API) with a Spring Boot backend and a React frontend.

## Project Structure

The project is structured as a full-stack application with:

- **Backend**: Spring Boot application with JPA for Oracle database connectivity
- **Frontend**: React application with TypeScript and Tailwind CSS

## Features

- Complete CRUD operations for employee data
- JPA entity mapping with Hibernate
- RESTful API endpoints
- Responsive UI with search and filtering capabilities
- Form validation
- Error handling

## Prerequisites

Before running the application, ensure you have:

1. Java JDK 17 or later
2. Node.js and npm
3. Oracle Database (local or remote)
4. Maven

## Configuration

### Database Configuration

The database connection is configured in `src/main/resources/application.properties`. Update the following properties with your Oracle database information:

```properties
spring.datasource.url=jdbc:oracle:thin:@//localhost:1521/XEPDB1
spring.datasource.username=your_username
spring.datasource.password=your_password
```

## Running the Application

### Backend

1. Open a terminal in the project root directory
2. Run the Spring Boot application:
   ```
   ./mvnw spring-boot:run
   ```
   
The backend will start on `http://localhost:8080`

### Frontend

1. Open another terminal in the project root directory
2. Run the React development server:
   ```
   npm run dev
   ```

The frontend will start on `http://localhost:5173`

## API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/employees | Get all employees |
| GET | /api/employees/{id} | Get employee by ID |
| POST | /api/employees | Create new employee |
| PUT | /api/employees/{id} | Update employee |
| DELETE | /api/employees/{id} | Delete employee |
| GET | /api/employees/search?lastName={lastName} | Search by last name |
| GET | /api/employees/salary?minSalary={minSalary} | Get employees with salary greater than minimum |
| GET | /api/employees/hired-in-year?year={year} | Get employees hired in specific year |
| GET | /api/employees/department/{department} | Get employees by department |

## Technologies Used

### Backend
- Spring Boot
- Spring Data JPA
- Hibernate
- Oracle JDBC Driver
- Lombok
- Jakarta Validation

### Frontend
- React
- TypeScript
- Tailwind CSS
- Axios
- React Router
- Lucide React (for icons)