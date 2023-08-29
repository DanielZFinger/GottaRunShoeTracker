import json
import boto3
import uuid

dynamodb_client = boto3.resource('dynamodb')
table = dynamodb_client.Table('OrderTable')

def lambda_handler(event, context):
    operation = event['operation']
    
    
    # update a specific orders contents based on its orderID
    if operation == 'update':
        order_id = event['OrderID']
        employee_id = event['EmployeeID']
        customer_id = event['CustomerID']
        
        try:
            messageResponse = table.update_item(
                Key={'OrderID': order_id, 'EmployeeID': employee_id},
                UpdateExpression='SET CustomerID = :cid',
                ExpressionAttributeValues={':cid': customer_id}
            )
            mResponse = "Order updated succesfully!"
            response = {
                "statusCode": 200,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                    "Content-Type": "*/*",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
            "body": json.dumps(mResponse)
    }
            return response
        except Exception as e:
            mResponse = "Order failed to update!"
            response = {
                "statusCode": 400,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                    "Content-Type": "*/*",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
            "body": json.dumps(mResponse)
            }
            return {response}
    
    # create an order
    elif operation == 'create':
        # Extract order details from the event
        # add new order params here when wishing to expan table variables
        employee_id = event['EmployeeID']
        customer_id = event['CustomerID']
        
        # Create a new order in the table
        try:
            # creates random UUID for Order ID
            order_id = str(uuid.uuid4())
            
            messageResponse = table.put_item(
                Item={
                    'OrderID': order_id,
                    'EmployeeID': employee_id,
                    'CustomerID': customer_id
                }
            )
            mResponse = "Succesfully created order!"
            response = {
                "statusCode": 200,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                    "Content-Type": "*/*",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
            "body": json.dumps(mResponse)}
            return response
        except Exception as e:
            mResponse = "Order failed to create!"
            response = {
                "statusCode": 400,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                    "Content-Type": "*/*",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
            "body": json.dumps(mResponse)
            }
            return {response}
    
    # retrieve info regarding a specific order
    elif operation == 'retrieve':
        order_id = event['OrderID']
        employee_id = event['EmployeeID']
        
        try:
            response = table.get_item(Key={'OrderID': order_id, 'EmployeeID': employee_id})
            order = response.get('Item')
            if order:
                mResponse = "Order succesfully retrieved!"
                response = {
                    "statusCode": 200,
                    "headers": {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "*",
                        "Content-Type": "*/*",
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                    },
                "body": json.dumps(mResponse)}
            else:
                mResponse = "Order failed to retrieve!"
                response = {
                    "statusCode": 400,
                    "headers": {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "*",
                        "Content-Type": "*/*",
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                    },
                "body": json.dumps(mResponse)
                }
                return {response}
        except Exception as e:
            mResponse = "Order failed to update!"
            response = {
                "statusCode": 400,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                    "Content-Type": "*/*",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
            "body": json.dumps(mResponse)
            }
            return {response}
    
    else:
        mResponse = "Invalid operation!"
        response = {
            "statusCode": 400,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Content-Type": "*/*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
        "body": json.dumps(mResponse)
        }
        return {response}

