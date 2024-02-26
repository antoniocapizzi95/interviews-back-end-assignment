
  
<!---
Hi! We're happy you opened this file, not everyone does!
To let us know you did, paste a capybara picture 
in the How to Run section 😊 
These will be extra points for you!
-->

# Backend Engineer Interview Assignment

## Introduction

This is an interview exercise for the Digital Products team of [xtream](https://www.linkedin.com/company/xtream-srl). In the following sections, you will find a number of challenges that we ask you to implement. You **DO NOT NECESSARILY need to complete 100% of them**: you can choose to complete as many as you want.

:watch: We give you **1 week** to submit a solution, so that you can do it at your own pace. We are aware that you might have other commitments, so we are not expecting you to work on this full-time. You will be evaluated based on the quality of your work, not on the time you spent on it.

### Deliverables

Simply fork this repository and work on it as if you were working on a real-world project assigned to you. A week from now, we will assess your work.

:heavy_exclamation_mark: **Important**: At the end of this README, you will find a "How to run" section that is not written out. Please, write there instructions on how to run your code: we will use this section to evaluate your work.


### Evaluation

Your work will be assessed according to several criteria. As an example, these include:

* Code quality
* Design Patterns
* Project Structure
* Work quality (commits, branches, workflow, tests, ...)
* Provided Documentation

#### A Friendly Reminder:
We’re all about embracing the latest in AI, including GPT and similar technologies. They’re great tools that can provide a helping hand, whether it’s for generating ideas, debugging, or refining solutions. However, for this coding challenge, we’re really keen to see your personal touch. We're interested in your thought process, decision-making, and the solutions you come up with.

Remember, while using AI tools can be incredibly helpful, the essence of this task is to showcase your skills and creativity. Plus, be prepared to dive into the details of your code during the technical interview. Understanding the 'why' and 'how' behind your decisions is crucial, as it reflects your ability to critically engage with the technology you're using.

So, feel free to lean on AI for support, but ensure your work remains distinctly yours. We're looking for a blend of technical savvy and individual flair. Dive in, get creative, and let’s see what you can create. Excited to see your work. Happy coding! 🚀💼👩‍💻

### Let's get started

We do understand that some topics might be unfamiliar for you. Therefore, pick any number of challenges and try to complete them.

:heavy_exclamation_mark:**Important**: you might feel like the tasks are somehow too broad, or the requirements are not fully elicited. **This is done on purpose**: we want to give you the freedom to make your own choices and to put as fewer constraints as possible on your work. We appreciate if you could record any decisions, assumptions and doubts, together with any questions that you will ask in a real-world scenario. If you want to choose our stack instead, we generally work with TypeScript and NestJS.

---   

### Problem Domain

Your task is to build the backend for **FreshCart Market**, a simple grocery e-commerce website, where you can search for products, add to a cart, and pay for the products.   

The store also has a membership reward program: based on what you spend, you get points that you can use to get discounts.   

For the sake of this assignment, let's focus on creating the **customer** part instead of the **admin** part ( which handles all the products and their available quantities): the **admin** part can be directly manipulated in the database.   

Do not consider authentication,sign in or multiple users: for simplicity, imagine the user that is interacting with the system is always the same.

#### Challenge #1: Available Products

Design an API to get the list of the available products. Each product should have a name, an image, a price and the available quantity, and a category.   
The frontend of FreshCart Market (which you don't need to develop) will use this API directly: consider the possible heavy load that receiving a large list of product can generate and propose a solution.

#### Challenge #2: Categories and Search

The FreshCart website can be also explored by category: there is a left panel where the user can see all the categories and the number of products available in that category.  
When users click on the category, they can see all the products for that category. There is also an input that can be used to search for a specific product. 
Design an API (or multiple APIs) to allow these features.

#### Challenge #3: Order & Payment

It's time to implement the order and payment part. The user can add products to the cart and then place the order. The order should contain the list of products and the quantity.   
For simplicity, the API receives all this info together with the credit card details. If the user has enough money, the API will return a success message, otherwise, it will return an error message.
An external service must be used to get the money from the user: you can find the swagger documentation in the file `payment-service.yaml`.

#### Challenge #4: Reward Program

For every euro spent, the user receives 1 reward point. 25 points equals 1 euro discount.   
Update the order placement API (Challenge #3) to update points on every placed order.  
Also update such API to allow the user to use the points to get a discount on the order.  
Moreover, there are some special products that increase the amount of points earned: such property must be set in the product catalog.

#### Challenge #5: Discounts
Every grocery store has some temporary discounts. FreshCart Market needs to consider that the administrator will insert in a table a list of products together with a percentage discount that will be valid only for a specific date range.   
Update the system to include this information in the whole process.

## How to run

To run the project, you will need to follow these steps:

1. Clone this repository.

2. On project root create a ```.env``` file and copy the contents of the ```.env.sample``` file already present in the repository.

3. Make sure you have Docker installed on your machine.

4. Run the following command to start the project:

    ```docker-compose up```

The project will start on the default port 3000.

On the .env file, it is possible to set the variable 'DISABLE_PAYMENT', which allows the order to be executed by skipping the call to the external service making the payment. If you want to see how the application works with the call to the payment service, simply change the value of "DISABLE_PAYMENT" from "true" to empty (the call will fail because the payment service is fake).


## API Documentation

This section documents the endpoints exposed by the application. It should be noted that the project was developed up to Challange 3, the database is mocked up in memory.

### Base URL

All URLs referenced in the documentation have the following base:

http://localhost:3000


This base URL will change according to the environment where the API is deployed.

### Products

 List All Products

- **GET** `/products`
- **Description**: Retrieve a list of all available products, with optional pagination.
- **Query Parameters**:
  - `page` (optional): The page number of the products list.
  - `limit` (optional): The number of products per page.
- **Success Response**: `200 OK`
- **Example Request**:
  
    ```http
    GET /products?page=1&limit=10
    ```
- **Example Response**:
    ```json
    {
        "data": [
            {
                "id": 1,
                "name": "prod1",
                "image": "imgurl",
                "price": 100,
                "availableQuantity": 10,
                "categoryId": 1
            }
        ],
        "page": 1,
        "limit": 1,
        "totalPages": 1,
        "totalItems": 1
    }
    ```

Search Products

- **GET** /products/search
- **Description**: Search for products by name.
- **Query Parameters**:
    - `name`: The name or partial name of the product to search for.
- **Success Response**: 200 OK
- **Example Request**:
    ```http
    GET /products/search?name=apple
    ```
- **Example Response**:
    ```json
    [
        {
            "id": 1,
            "name": "apple",
            "image": "imgurl",
            "price": 100,
            "availableQuantity": 10,
            "categoryId": 1
        }
    ]
    ```

List Products by Category

- **GET** /products/category/:categoryId
- **Description**: Retrieve a list of products belonging to a specific category. For reasons of simplicity, no form of pagination has been placed in this endpoint, but it might be reasonable to add it if there are many products in a category.
- **URL Parameters**:
    - `categoryId`: The unique identifier of the category.
- **Success Response**: 200 OK
- **Example Request**:

    ```http
    GET /products/category/1
    ```
- **Example Response**:
    ```json
    [
        {
            "id": 1,
            "name": "prod1",
            "image": "imgurl",
            "price": 100,
            "availableQuantity": 10,
            "categoryId": 1
        }
    ]
    ```

### Orders
Place an Order

- **POST** /orders
- **Description**: Place a new order with products and payment details.
- **Body**:
    ```json
    {
        "items": [
            {
            "productId": "1",
            "quantity": 2
            }
        ],
        "totalAmount": 200,
        "paymentDetails": {
            "cardNumber": "4111111111111111",
            "expiryMonth": "12",
            "expiryYear": "2023",
            "cvv": "123"
        }
    }
    ```
- **Success Response**: 200 OK
- **Example Response**:
    ```json
    {
        "success": true,
        "message": "Order processed successfully",
        "orderId": 1,
        "transactionId": "76566996"
    }
    ```

List Orders

- **GET** /orders
- **Description**: Retrieve a list of all orders present in the database. This endpoint (implemented in this way) does not make much sense in a real application, it only serves to verify the correct saving of orders.
- **Success Response**: 200 OK
- **Example Request**:

    ```http
    GET /orders
    ```
- **Example Response**:
    ```json
    [
        {
            "items": [
                {
                    "productId": 1,
                    "quantity": 1
                }
            ],
            "totalAmount": 100,
            "id": 1
        },
        {
            "items": [
                {
                    "productId": 1,
                    "quantity": 1
                }
            ],
            "totalAmount": 100,
            "id": 2
        }
    ]
    ```